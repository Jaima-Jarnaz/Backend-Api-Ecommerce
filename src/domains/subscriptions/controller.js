const crypto = require("crypto");
const Subscriber = require("./model");
const CustomErrorHandler = require("../../utils/customErrorHandler");
const { SERVER_ERROR } = require("../../helpers/constants");
const {
  buildUnsubscribeSuccessPage,
  buildUnsubscribeAlreadyPage,
  buildUnsubscribeErrorPage,
} = require("../../utils/emailTemplates");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new CustomErrorHandler("Email is required", 400));
    }

    if (!emailRegex.test(email)) {
      return next(new CustomErrorHandler("Invalid email format", 400));
    }

    let subscriber = await Subscriber.findOne({
      email: email.toLowerCase().trim(),
    });

    if (subscriber) {
      if (subscriber.isActive) {
        return res.status(200).json({
          success: true,
          message: "Already subscribed",
        });
      }

      subscriber.isActive = true;
      await subscriber.save();

      return res.status(200).json({
        success: true,
        message: "Resubscribed successfully",
      });
    }

    subscriber = await Subscriber.create({
      email: email.toLowerCase().trim(),
      unsubscribeToken: crypto.randomBytes(32).toString("hex"),
    });

    res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      data: { email: subscriber.email },
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new CustomErrorHandler("Email already subscribed", 409));
    }

    res.status(500).json({
      success: false,
      message: SERVER_ERROR,
      error: error.message,
    });
  }
};

const unsubscribe = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res
        .status(400)
        .type("html")
        .send(
          buildUnsubscribeErrorPage({
            message: "Unsubscribe token is required.",
          }),
        );
    }

    const subscriber = await Subscriber.findOne({ unsubscribeToken: token });

    if (!subscriber) {
      return res
        .status(404)
        .type("html")
        .send(
          buildUnsubscribeErrorPage({
            message: "This unsubscribe link is invalid or has expired.",
          }),
        );
    }

    if (!subscriber.isActive) {
      return res
        .status(200)
        .type("html")
        .send(buildUnsubscribeAlreadyPage({ email: subscriber.email }));
    }

    subscriber.isActive = false;
    await subscriber.save();

    res
      .status(200)
      .type("html")
      .send(buildUnsubscribeSuccessPage({ email: subscriber.email }));
  } catch (error) {
    res
      .status(500)
      .type("html")
      .send(
        buildUnsubscribeErrorPage({
          message: "Something went wrong. Please try again later.",
        }),
      );
  }
};

module.exports = {
  subscribe,
  unsubscribe,
};
