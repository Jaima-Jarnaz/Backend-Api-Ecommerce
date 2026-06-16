const Subscriber = require("./model");
const EmailCampaign = require("./campaignModel");

const BATCH_SIZE = Number(process.env.EMAIL_BATCH_SIZE) || 500;

const buildProductSnapshot = (product) => ({
  _id: product._id.toString(),
  name: product.name,
  description: product.description,
  price: product.price,
  color: product.color,
  model: product.model,
  imageUrl: product.imageUrl,
});

const startProductNotificationCampaign = async (product) => {
  const emailQueue = require("../../queues/emailQueue");

  const totalSubscribers = await Subscriber.countDocuments({ isActive: true });

  if (!totalSubscribers) {
    console.log("No active subscribers to notify.");
    return null;
  }

  const totalBatches = Math.ceil(totalSubscribers / BATCH_SIZE);
  const productSnapshot = buildProductSnapshot(product);

  const campaign = await EmailCampaign.create({
    productId: product._id,
    productName: product.name,
    status: "processing",
    totalSubscribers,
    totalBatches,
    pendingCount: totalSubscribers,
    startedAt: new Date(),
  });

  let lastId = null;
  let batchNumber = 0;

  while (true) {
    const query = { isActive: true };
    if (lastId) query._id = { $gt: lastId };

    const batch = await Subscriber.find(query)
      .sort({ _id: 1 })
      .limit(BATCH_SIZE)
      .select("email unsubscribeToken")
      .lean();

    if (!batch.length) break;

    batchNumber += 1;
    lastId = batch[batch.length - 1]._id;

    await emailQueue.add(
      "send-batch",
      {
        campaignId: campaign._id.toString(),
        batchNumber,
        product: productSnapshot,
        subscribers: batch,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 5000,
        },
        removeOnComplete: 100,
        removeOnFail: 500,
      },
    );
  }

  return campaign;
};

module.exports = startProductNotificationCampaign;
