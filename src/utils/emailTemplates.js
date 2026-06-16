const getProductImageUrl = (imageUrl) => {
  if (!imageUrl) return "";
  if (typeof imageUrl === "string") return imageUrl;
  return imageUrl.url || imageUrl.secure_url || "";
};

const buildNewProductEmail = ({ product, productUrl, unsubscribeUrl }) => {
  const imageUrl = getProductImageUrl(product.imageUrl);

  const imageSection = imageUrl
    ? `
          <tr>
            <td style="padding:0;">
              <img
                src="${imageUrl}"
                alt="${product.name}"
                width="600"
                style="display:block;width:100%;max-width:600px;height:auto;border:0;"
              />
            </td>
          </tr>`
    : "";

  const colorRow = product.color
    ? `<p style="margin:0 0 8px;color:#6b7280;font-size:14px;"><strong>Color:</strong> ${product.color}</p>`
    : "";

  const modelRow = product.model
    ? `<p style="margin:0 0 16px;color:#6b7280;font-size:14px;"><strong>Model:</strong> ${product.model}</p>`
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Product</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <tr>
            <td style="background:linear-gradient(135deg,#111827,#374151);padding:28px 32px;text-align:center;">
              <p style="margin:0 0 8px;color:#fbbf24;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">
                New Arrival
              </p>
              <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.3;font-weight:700;">
                Just Dropped
              </h1>
            </td>
          </tr>
${imageSection}

          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 12px;color:#111827;font-size:24px;line-height:1.3;font-weight:700;">
                ${product.name}
              </h2>

              <p style="margin:0 0 20px;color:#6b7280;font-size:16px;line-height:1.6;">
                ${product.description}
              </p>

              ${colorRow}
              ${modelRow}

              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px 18px;">
                    <span style="color:#6b7280;font-size:13px;text-transform:uppercase;letter-spacing:1px;">
                      Price
                    </span>
                    <div style="color:#111827;font-size:28px;font-weight:700;margin-top:4px;">
                      $${product.price}
                    </div>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 24px;">
                <tr>
                  <td align="center" style="border-radius:8px;background-color:#111827;">
                    <a
                      href="${productUrl}"
                      style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;letter-spacing:0.5px;"
                    >
                      Shop Now
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;text-align:center;color:#9ca3af;font-size:14px;line-height:1.5;">
                Be the first to grab this item before it sells out.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#f9fafb;padding:24px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;line-height:1.5;">
                You received this email because you subscribed to our newsletter.
              </p>
              <a
                href="${unsubscribeUrl}"
                style="color:#6b7280;font-size:12px;text-decoration:underline;"
              >
                Unsubscribe
              </a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

const buildStatusPage = ({
  title,
  badge,
  heading,
  message,
  email,
  frontendUrl,
  variant = "success",
}) => {
  const icon =
    variant === "success"
      ? `<div style="width:64px;height:64px;margin:0 auto 20px;border-radius:50%;background-color:#ecfdf5;color:#059669;font-size:32px;line-height:64px;text-align:center;">&#10003;</div>`
      : `<div style="width:64px;height:64px;margin:0 auto 20px;border-radius:50%;background-color:#fef2f2;color:#dc2626;font-size:32px;line-height:64px;text-align:center;">!</div>`;

  const emailBlock = email
    ? `<p style="margin:0 0 24px;padding:12px 16px;background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;color:#374151;font-size:14px;">
        <strong>${email}</strong>
      </p>`
    : "";

  const shopButton = frontendUrl
    ? `
      <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto;">
        <tr>
          <td align="center" style="border-radius:8px;background-color:#111827;">
            <a
              href="${frontendUrl}"
              style="display:inline-block;padding:14px 28px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;"
            >
              Back to Store
            </a>
          </td>
        </tr>
      </table>`
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f7;min-height:100vh;padding:32px 16px;">
    <tr>
      <td align="center" valign="middle">
        <table role="presentation" width="520" cellspacing="0" cellpadding="0" style="max-width:520px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <tr>
            <td style="background:linear-gradient(135deg,#111827,#374151);padding:24px 32px;text-align:center;">
              <p style="margin:0;color:#fbbf24;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">
                ${badge}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 32px;text-align:center;">
              ${icon}

              <h1 style="margin:0 0 12px;color:#111827;font-size:28px;line-height:1.3;font-weight:700;">
                ${heading}
              </h1>

              <p style="margin:0 0 24px;color:#6b7280;font-size:16px;line-height:1.6;">
                ${message}
              </p>

              ${emailBlock}
              ${shopButton}
            </td>
          </tr>

          <tr>
            <td style="background-color:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">
                You can resubscribe anytime from our store newsletter form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

const buildUnsubscribeSuccessPage = ({ email }) =>
  buildStatusPage({
    title: "Unsubscribed",
    badge: "Newsletter",
    heading: "You've been unsubscribed",
    message:
      "We're sorry to see you go. You won't receive any more product update emails from us.",
    email,
    frontendUrl: process.env.FRONTEND_URL,
    variant: "success",
  });

const buildUnsubscribeAlreadyPage = ({ email }) =>
  buildStatusPage({
    title: "Already Unsubscribed",
    badge: "Newsletter",
    heading: "Already unsubscribed",
    message: "This email address is already removed from our newsletter list.",
    email,
    frontendUrl: process.env.FRONTEND_URL,
    variant: "success",
  });

const buildUnsubscribeErrorPage = ({ message }) =>
  buildStatusPage({
    title: "Unsubscribe Failed",
    badge: "Newsletter",
    heading: "Something went wrong",
    message: message || "This unsubscribe link is invalid or has expired.",
    frontendUrl: process.env.FRONTEND_URL,
    variant: "error",
  });

module.exports = {
  buildNewProductEmail,
  buildUnsubscribeSuccessPage,
  buildUnsubscribeAlreadyPage,
  buildUnsubscribeErrorPage,
};
