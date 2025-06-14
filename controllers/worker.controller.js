import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import dayjs from "dayjs";
import subscriptionmodel from "../models/subscriptionmodel.js";
import { sendReminderEmail } from "../utils/sendEmail.js";

const REMAINDERS = [7, 5, 2, 1];
const sendRemainders = serve(async (context) => {
  console.log("Running sendRemainders workflow");

  const { subscriptionId } = context.requestPayload;
  const fetchedSub = await fetchSubscription(context, subscriptionId);
  if (!fetchedSub && fetchedSub.status !== "active") return;
  const renewaldate = dayjs(fetchedSub.endDate);
  if (renewaldate.isBefore(dayjs())) {
    console.log(`Remainder has passed for ${subscriptionId}`);
    return;
  }
  for (let daysbefore of REMAINDERS) {
    const remainderDate = renewaldate.subtract(daysbefore, "day");
    if (remainderDate.isAfter()) {
      await sleepuntilRemainder(
        context,
        `Remainder ${daysbefore} days before`,
        remainderDate
      );
    }

    if (dayjs().isSame(remainderDate, "day")) {
      await triggerRemainder(
        context,
        `${daysbefore} days before reminder`,
        fetchedSub
      );
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return context.run("get subscription", async () => {
    return await subscriptionmodel
      .findById(subscriptionId)
      .populate("userId", "name email");
  });
};

const sleepuntilRemainder = async (context, label, date) => {
  console.log(`sleeping ${label} until remainder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerRemainder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`triggered Reminder for ${label}`);

    await sendReminderEmail({
      type: label,
      subscription,
      to: subscription.userId.email,
    });
  });
};

export { sendRemainders };
