import mongoose from "mongoose";
import moment from "moment";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "User Subscription price is required"],
      min: [0, "price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "G8P", "RUPEES"],
      default: "RUPEES",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "Lifestyle",
        "technology",
        "finance",
        "politics",
        "others",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      required: false,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Convert dates from "DD-MM-YYYY" format if necessary
subscriptionSchema.pre("validate", function (next) {
  if (typeof this.startDate === "string") {
    const parsedStart = moment(this.startDate, "DD-MM-YYYY", true);
    if (parsedStart.isValid()) {
      this.startDate = parsedStart.toDate();
    }
  }

  if (typeof this.renewalDate === "string") {
    const parsedRenewal = moment(this.renewalDate, "DD-MM-YYYY", true);
    if (parsedRenewal.isValid()) {
      this.renewalDate = parsedRenewal.toDate();
    }
  }

  next();
});

subscriptionSchema.pre("save", function (next) {
  const renewalPeriods = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365,
  };

  if (!this.renewalDate || this.isNew) {
    this.renewalDate = new Date(this.startDate); // ensure it's initialized
    const daysToAdd = renewalPeriods[this.frequency?.toLowerCase()];

    if (!daysToAdd) {
      return next(new Error(`Invalid frequency value: ${this.frequency}`));
    }

    this.renewalDate.setDate(this.renewalDate.getDate() + daysToAdd);
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
