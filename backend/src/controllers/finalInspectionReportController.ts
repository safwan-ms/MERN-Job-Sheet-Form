import { Request, Response } from "express";
import FinalInspectionReport from "../models/FinalInspectionReport.js";

export const createFinalInspectionReport = async (
  req: Request,
  res: Response
) => {
  try {
    const finalInspectionReport = new FinalInspectionReport(req.body);
    const savedInspection = await finalInspectionReport.save();

    res.status(201).json({
      message: "FinalInspectionReport created successfully",
      data: savedInspection,
    });
  } catch (error) {
    console.error(
      "Error in createFinalInspectionReport :",
      (error as Error).message
    );
    return res.status(500).json({
      success: false,
      message: "Failed to create FinalInspectionReport",
      error: (error as Error).message,
    });
  }
};

export const getAllFinalInspectionReports = async (
  req: Request,
  res: Response
) => {
  try {
    const finalInspectionReports = await FinalInspectionReport.find();
    res.status(200).json({
      success: true,
      data: finalInspectionReports,
    });
  } catch (error) {
    console.error("Error in getAllFinalInspection :", (error as Error).message);
    return res.status(500).json({
      success: false,
      message: "Server Error while fetching all Final Inspection",
      error: (error as Error).message,
    });
  }
};

export const getFinalInspectionReportById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const finalInspectionReport = await FinalInspectionReport.findById(id);
    if (!finalInspectionReport) {
      res.status(404).json({
        success: false,
        message: "Final Inspection report not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: finalInspectionReport,
    });
  } catch (error) {
    console.error(
      "Error get final inspection report by id: ",
      (error as Error).message
    );
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: `Error get final inspection report by id: ${
        (error as Error).message
      }`,
    });
  }
};

export const deleteFinalInspectionReport = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deletedFinalInspectionReport =
      await FinalInspectionReport.findByIdAndDelete(id);
    if (!deletedFinalInspectionReport) {
      return res.status(404).json({
        success: false,
        message: "Final Inspection Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Final Inspection Report deleted successfully",
    });
  } catch (error) {
    console.log(
      "Error while deleting the Final Inspection",
      (error as Error).message
    );
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: `Error while deleting final inspection: ${
        (error as Error).message
      }`,
    });
  }
};
