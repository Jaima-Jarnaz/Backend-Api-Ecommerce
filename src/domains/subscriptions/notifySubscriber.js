const Subscriber = require("./model");
const sendEmail = require("../../utils/sendEmail");
const { buildNewProductEmail } = require("../../utils/emailTemplates");

const notifySubscribersAboutProduct = async (product) => {
  try {
    const subscribers = await Subscriber.find({ isActive: true });

    if (!subscribers.length) {
      console.log("No active subscribers to notify.");
      return;
    }

    const productUrl = `${process.env.FRONTEND_URL}/product/${product._id}`;

    for (const subscriber of subscribers) {
      try {
        const unsubscribeUrl = `${process.env.BASE_URL}/subscriptions/unsubscribe/${subscriber.unsubscribeToken}`;

        await sendEmail({
          to: subscriber.email,
          subject: `New Arrival: ${product.name}`,
          html: buildNewProductEmail({ product, productUrl, unsubscribeUrl }),
        });
      } catch (error) {
        // Log per-subscriber failure; don't stop other emails
        console.error(`Failed to notify ${subscriber.email}:`, error.message);
      }
    }
  } catch (error) {
    console.error("notifySubscribersAboutProduct failed:", error.message);
  }
};

module.exports = notifySubscribersAboutProduct;
