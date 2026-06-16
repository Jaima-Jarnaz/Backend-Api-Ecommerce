const EmailCampaign = require("./campaignModel");
const CustomErrorHandler = require("../../utils/customErrorHandler");
const { SERVER_ERROR } = require("../../helpers/constants");

const getCampaignStatus = async (req, res, next) => {
  try {
    const campaign = await EmailCampaign.findById(req.params.id);

    if (!campaign) {
      return next(new CustomErrorHandler("Campaign not found", 404));
    }

    res.status(200).json({
      success: true,
      data: {
        id: campaign._id,
        productId: campaign.productId,
        productName: campaign.productName,
        status: campaign.status,
        totalSubscribers: campaign.totalSubscribers,
        totalBatches: campaign.totalBatches,
        sentCount: campaign.sentCount,
        failedCount: campaign.failedCount,
        pendingCount: campaign.pendingCount,
        completedBatches: campaign.completedBatches,
        failedBatches: campaign.failedBatches,
        startedAt: campaign.startedAt,
        completedAt: campaign.completedAt,
        createdAt: campaign.createdAt,
        updatedAt: campaign.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: SERVER_ERROR,
      error: error.message,
    });
  }
};

module.exports = { getCampaignStatus };
