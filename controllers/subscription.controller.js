import subscriptionmodel from "../models/subscriptionmodel.js";
import { NotFound } from "../Errors/index.js";
import workflow from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

const getSubscription = async (req, res) => {
  const { userId } = req.user;
  const subscription = await subscriptionmodel.find({ _id: userId });

  res.status(200).json({
    sucess: true,
    data: subscription,
  });
};
const getsubscriptiondetails = async (req, res) => {
  const { id } = req.params;
  const subscriptiondetails = await subscriptionmodel.findById(id);
  res.status(200).json({
    success: true,
    data: subscriptiondetails,
  });
};

const createSubscription = async (req, res) => {
  const { userId } = req.user;
  const newSubscription = new subscriptionmodel({
    ...req.body,
    userId,
  });
  await newSubscription.save();
  const workflowdata = await workflow.trigger({
    url: `${SERVER_URL}/api/v1/workflow/sendremainders`,
    body: { subscriptionId: newSubscription._id },
    headers: { "Content-Type": "application/json" },
    retries: 0,
  });
  res.status(201).json({
    success: true,
    data: newSubscription,
    workflowdata,
  });
};

const updateSubscription = async (req, res) => {
  const { id } = req.params;

  const updatedSubscription = await subscriptionmodel.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedSubscription)
    throw new NotFound(`Subscription for ${id} not found`);

  res.status(200).json({
    success: true,
    data: updatedSubscription,
  });
};
const deleteSubscription = async (req, res) => {
  const { id } = req.params;
  const deletedSubscription = await subscriptionmodel.findByIdAndDelete(id);

  if (!deletedSubscription)
    throw new NotFound(`Subscription for ${id} not Found`);

  res.status(200).json({
    success: true,
    message: "Subscription deleted successfully",
  });
};
export {
  getSubscription,
  getsubscriptiondetails,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};
