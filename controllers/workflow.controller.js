import dayjs from "dayjs";
import { createRequire } from "module";
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send.email.js";

const REMINDERS = [7, 5, 2, 1];

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

export const sendReminders = serve(async (context) => {
  console.log("⚡ Send Reminder API Triggered");
  console.log(
    "🚀 Workflow triggered with subscriptionId:",
    context?.requestPayload?.subscriptionId
  );

  const { subscriptionId } = context.requestPayload;

  // This line runs a step (must not be in try/catch)
  const subscription = await fetchSubscription(context, subscriptionId);
  console.log("📦 Subscription fetched:", subscription);

  // Now we can handle it outside of context.run
  if (!subscription || subscription.status !== "active") {
    console.log("🚫 No active subscription found. Exiting.");
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(`⏳ Renewal passed for ${subscriptionId}. Exiting workflow.`);
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    const subscription = await Subscription.findById(subscriptionId)
      .populate("user", "name email")
      .lean(); // <-- Important: convert to plain JS object
    return subscription;
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`😴 Sleeping until ${label} at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`🔔 Triggering ${label}`);
    await sendReminderEmail({
      to: subscription.updateSearchIndex.email,
      type: label,
      subscription,
    });
  });
};
