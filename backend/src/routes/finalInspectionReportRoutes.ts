import express from "express";
import {
  createFinalInspectionReport,
  getAllFinalInspectionReports,
  getFinalInspectionReportById,
} from "../controllers/finalInspectionReportController.js";

const router = express.Router();

router.post("/", createFinalInspectionReport);
router.get("/", getAllFinalInspectionReports);
router.get("/:id", getFinalInspectionReportById);

export default router;
