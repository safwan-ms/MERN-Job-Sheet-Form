import express from "express";
import {
  createFinalInspectionReport,
  getAllFinalInspectionReports,
} from "../controllers/finalInspectionReportController.js";

const router = express.Router();

router.post("/", createFinalInspectionReport);
router.get("/", getAllFinalInspectionReports);

export default router;
