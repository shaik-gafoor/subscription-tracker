import dayjs from "dayjs";
import { createRequire } from "module";
import Subscription from "../models/subscription.model.js";

const REMINDERS = [7, 5, 2, 1];

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

export const sendReminders = serve(async (context) => {
  try {
    console.log("⚡ Send Reminder API Triggered");
    console.log(
      "🚀 Workflow triggered with subscriptionId:",
      context?.requestPayload?.subscriptionId
    );

    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

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
  } catch (err) {
    console.error("🔥 Workflow failed:", err);
    throw err;
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`😴 Sleeping until ${label} at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`🔔 Triggering ${label}`);
  });
};
