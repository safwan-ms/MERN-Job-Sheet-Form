import express from "express";
import {
  createFinalInspectionReport,
  deleteFinalInspectionReport,
  getAllFinalInspectionReports,
  getFinalInspectionReportById,
  updateFinalInspectionReport,
} from "../controllers/finalInspectionReportController.js";

const router = express.Router();

router.post("/", createFinalInspectionReport);
router.get("/", getAllFinalInspectionReports);
router.get("/:id", getFinalInspectionReportById);
router.delete("/:id", deleteFinalInspectionReport);
router.put("/:id", updateFinalInspectionReport);

export default router;
