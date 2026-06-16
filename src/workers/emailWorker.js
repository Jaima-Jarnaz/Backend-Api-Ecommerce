const dotenv = require("dotenv");
dotenv.config();

const { Worker } = require("bullmq");
const connectDatabase = require("../config/db");
const createRedisConnection = require("../config/redis");
const sendEmail = require("../utils/sendEmail");
const EmailCampaign = require("../domains/subscriptions/campaignModel");
const { finalizeCampaignIfDone } = require("../domains/subscriptions/campaignUtils");
const { buildNewProductEmail } = require("../utils/emailTemplates");

const EMAIL_CONCURRENCY = Number(process.env.EMAIL_CONCURRENCY) || 20;

connectDatabase();

const sendWithConcurrency = async (items, handler, concurrency) => {
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);

    const results = await Promise.allSettled(chunk.map(handler));

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        sent += 1;
      } else {
        failed += 1;
      }
    });
  }

  return { sent, failed };
};

const processBatch = async (job) => {
  const { campaignId, batchNumber, product, subscribers } = job.data;
  const productUrl = `${process.env.FRONTEND_URL}/product/${product._id}`;

  const { sent, failed } = await sendWithConcurrency(
    subscribers,
    async (subscriber) => {
      const unsubscribeUrl = `${process.env.BASE_URL}/subscriptions/unsubscribe/${subscriber.unsubscribeToken}`;

      await sendEmail({
        to: subscriber.email,
        subject: `New Arrival: ${product.name}`,
        html: buildNewProductEmail({ product, productUrl, unsubscribeUrl }),
      });
    },
    EMAIL_CONCURRENCY,
  );

  await EmailCampaign.findByIdAndUpdate(campaignId, {
    $inc: {
      sentCount: sent,
      failedCount: failed,
      pendingCount: -(sent + failed),
      completedBatches: 1,
    },
  });

  await finalizeCampaignIfDone(campaignId);

  return { batchNumber, sent, failed };
};

const connection = createRedisConnection();

const worker = new Worker("product-notification", processBatch, {
  connection,
  concurrency: 1,
});

worker.on("completed", (job, result) => {
  console.log(
    `Batch ${result.batchNumber} completed: ${result.sent} sent, ${result.failed} failed`,
  );
});

worker.on("failed", async (job, error) => {
  if (!job || job.attemptsMade < job.opts.attempts) {
    return;
  }

  console.error(`Batch ${job.data?.batchNumber} permanently failed:`, error.message);

  if (!job?.data?.campaignId) return;

  const batchSize = job.data.subscribers?.length || 0;

  await EmailCampaign.findByIdAndUpdate(job.data.campaignId, {
    $inc: {
      failedBatches: 1,
      failedCount: batchSize,
      pendingCount: -batchSize,
    },
    errorMessage: error.message,
  });

  await finalizeCampaignIfDone(job.data.campaignId);
});

console.log("Email worker started and listening for jobs...");
