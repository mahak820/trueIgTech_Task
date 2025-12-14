const asyncHandler = require("express-async-handler");
const Plan = require("../Model/planModel");

// CREATE PLAN
exports.createPlan = asyncHandler(async (req, res) => {
  const { title, description, price, duration } = req.body;
  console.log(req.user)
  const plan = await Plan.create({
    title,
    description,
    price,
    duration,
    trainer: req.user.id,
  });

  res.status(201).json(plan);
});

// GET TRAINER PLANS
exports.getMyPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find({ trainer: req.user.id });
  res.json(plans);
});

// UPDATE PLAN
exports.updatePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);

  if (!plan) {
    res.status(404);
    throw new Error("Plan not found");
  }

  if (plan.trainer.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  const updatedPlan = await Plan.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedPlan);
});

// DELETE PLAN
exports.deletePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);

  if (!plan) {
    res.status(404);
    throw new Error("Plan not found");
  }

  if (plan.trainer.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  await plan.deleteOne();
  res.json({ message: "Plan deleted" });
});

// get a single plan
exports.getPlanById = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id).populate(
    "trainer",
    "name email"
  );

  if (!plan) {
    res.status(404);
    throw new Error("Plan not found");
  }

  const isSubscribed = req.user
    ? req.user.purchasedPlans.includes(plan._id)
    : false;

  // If subscribed → full access
  if (isSubscribed) {
    return res.json(plan);
  }

  // Preview only
  res.json({
    _id: plan._id,
    title: plan.title,
    price: plan.price,
    trainer: plan.trainer,
  });
});

