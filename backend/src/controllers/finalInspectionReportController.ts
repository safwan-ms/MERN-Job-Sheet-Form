import { Request, Response } from "express";
import FinalInspectionReport from "../models/FinalInspectionReport.js";
import { finalInspectionReportSchema } from "../validations/finalInspectionReportSchema.js";
import { ZodError } from "zod";

export const createFinalInspectionReport = async (
  req: Request,
  res: Response
) => {
  try {
    const parsed = finalInspectionReportSchema.parse(req.body);
    const finalInspectionReport = new FinalInspectionReport(parsed);
    const savedInspection = await finalInspectionReport.save();

    res.status(201).json({
      success: true,
      message: "Final Inspection Report created successfully.",
      data: savedInspection,
    });
  } catch (error) {
    console.error(
      "Error in createFinalInspectionReport :",
      (error as Error).message
    );
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }

    if ((error as any)?.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: (error as any).errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create Final Inspection Report",
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

export const updateFinalInspectionReport = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedFinalInspectionReport =
      await FinalInspectionReport.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

    if (!updatedFinalInspectionReport) {
      return res.status(404).json({
        success: false,
        message: "Final Inspection Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Final Inspection Report updated successfully",
      data: updatedFinalInspectionReport,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while updating final Inspection",
      error: `Error while updating final inspection: ${
        (error as Error).message
      }`,
    });
  }
};
