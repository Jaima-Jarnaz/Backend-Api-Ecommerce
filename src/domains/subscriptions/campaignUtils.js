const EmailCampaign = require("./campaignModel");

const finalizeCampaignIfDone = async (campaignId) => {
  const campaign = await EmailCampaign.findById(campaignId);
  if (!campaign || campaign.status === "completed") return campaign;

  const processedBatches = campaign.completedBatches + campaign.failedBatches;

  if (processedBatches >= campaign.totalBatches) {
    campaign.status = "completed";
    campaign.completedAt = new Date();
    await campaign.save();
  }

  return campaign;
};

module.exports = { finalizeCampaignIfDone };
