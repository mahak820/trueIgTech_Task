const asyncHandler = require("express-async-handler");
const User = require("../Model/userModel");
const Plan = require("../Model/planModel");

// USER SUBSCRIBE TO PLAN
exports.subscribePlan = asyncHandler(async (req, res) => {
  const planId = req.params.id;

  const plan = await Plan.findById(planId);
  if (!plan) {
    res.status(404);
    throw new Error("Plan not found");
  }

  const user = await User.findById(req.user._id);

  // Already subscribed check
  if (user.purchasedPlans.includes(planId)) {
    res.status(400);
    throw new Error("Already subscribed to this plan");
  }

  user.purchasedPlans.push(planId);
  await user.save();

  res.json({ message: "Subscription successful" });
});
