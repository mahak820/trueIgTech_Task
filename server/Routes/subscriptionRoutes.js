const express = require("express");
const protect = require("../middleware/authMiddleware");
const { subscribePlan } = require("../Controller/subscriptionController");

const router = express.Router();

router.post("/:id", protect, subscribePlan);

module.exports = router;
