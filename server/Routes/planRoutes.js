const express = require("express");
const { createPlan, getMyPlans, updatePlan, deletePlan, getPlanById } = require("../Controller/planController");
const trainer = require("../middleware/trainerMiddleware");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",trainer, createPlan);
router.get("/my-plans",trainer,   getMyPlans);
router.put("/:id",trainer,   updatePlan);
router.delete("/:id", trainer,  deletePlan);
router.get("/:id", protect, getPlanById);


module.exports = router;
