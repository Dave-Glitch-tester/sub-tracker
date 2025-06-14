import { Schema, model, Types } from "mongoose";

const SubscriptionSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "Users",
    required: [true, "User ID is required"],
  },
  name: {
    type: String,
    required: [true, "Subscription name is required"],
    maxLength: 100,
    minLength: 2,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"],
  },
  currency: {
    type: String,
    required: [true, "Currency is required"],
    enum: ["USD", "EUR", "GBP", "INR"],
    default: "USD",
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return v <= new Date(); // Ensure start date is not in the future
      },
      message: "Start date cannot be in the future",
    },
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (v) {
        return v > this.startDate; // Ensure end date is after start date
      },
      message: "End date must be after start date",
    },
  },
  status: {
    type: String,
    required: [true, "Subscription status is required"],
    enum: ["active", "inactive", "cancelled"],
    default: "active",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
    enum: ["daily", "weekly", "yearly", "monthly"],
  },
});

SubscriptionSchema.pre("save", function (next) {
  if (!this.endDate) {
    const renewalperiod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(
      this.endDate.getDate() + renewalperiod[this.frequency]
    );
  }
  if (this.endDate < new Date()) {
    this.status = "inactive";
  }
  next();
});
export default model("Subscription", SubscriptionSchema);
