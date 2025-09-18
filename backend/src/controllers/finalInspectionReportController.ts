import { Request, Response } from "express";
import FinalInspection from "../models/FinalInspectionReport.js";

export const createFinalInspectionReport = async (
  req: Request,
  res: Response
) => {
  try {
    const finalInspection = new FinalInspection(req.body);
    const savedInspection = await finalInspection.save();

    res.status(201).json({
      message: "FinalInspection created successfully",
      data: savedInspection,
    });
  } catch (error) {
    console.error("Error creating FinalInspection:", error);
    res.status(500).json({
      message: "Failed to create FinalInspection",
      error: "Server Error",
    });
    console.error("Error in createFinalInspection :", (error as Error).message);
  }
};

export const getAllFinalInspectionReports = async (
  req: Request,
  res: Response
) => {
  try {
    const finalInspections = await FinalInspection.find();
    res.status(200).json({
      success: true,
      data: finalInspections,
    });
  } catch (error) {
    console.error("Error in getAllInspection :", (error as Error).message);
  }
};
