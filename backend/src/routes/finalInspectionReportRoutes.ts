import express from "express";
import {
  createFinalInspectionReport,
  deleteFinalInspectionReport,
  getAllFinalInspectionReports,
  getFinalInspectionReportById,
} from "../controllers/finalInspectionReportController.js";

const router = express.Router();

router.post("/", createFinalInspectionReport);
router.get("/", getAllFinalInspectionReports);
router.get("/:id", getFinalInspectionReportById);
router.delete("/:id", deleteFinalInspectionReport);

export default router;
