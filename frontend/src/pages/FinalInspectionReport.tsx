import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StaticPressureSection from "../components/sections/FinalInspection/StaticPressureSection";
import TestingLengthSection from "../components/sections/FinalInspection/TestingLengthSection";
import ContinuitySection from "../components/sections/FinalInspection/ContinuitySection";
import OptionsSection from "../components/sections/FinalInspection/OptionsSection";
import FinalAcceptanceSection from "../components/sections/FinalInspection/FinalAcceptanceSection";
import InspectorSection from "../components/sections/FinalInspection/InspectorSection";
import type {
  ContinuityRow,
  FinalInspectionRow,
  StaticPressureDetails,
  TestingLengthRow,
} from "../components/sections/FinalInspection/types";
import { useFinalInspectionReportStore } from "@/store/finalInspectionReport/useFinalInspectionReportStore";

const FinalInspectionReport: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    finalInspectionDetail,
    finalInspectionDetailLoading,
    fetchFinalInspectionReportById,
    createFinalInspectionReport,
    updateFinalInspectionReport,
    isSubmitting,
    errors,
  } = useFinalInspectionReportStore();

  const [staticPressure, setStaticPressure] = useState<StaticPressureDetails>({
    type: "",
    date: "",
    operator: "",
    workingPressure: "",
    testPressure: "",
    durationWP: "",
    durationTP: "",
    gaugeNo: "",
    result: "",
  });

  const emptyTestingLengthRow = useMemo<TestingLengthRow[]>(
    () =>
      Array.from({ length: 8 }).map((_, idx) => ({
        slNo: idx + 1,
        tagNo: "",
        gaugeSlNo: "",
        beforeWithoutWater: "",
        beforeAt10psi: "",
        duringTestL1: "",
        afterTestL2: "",
        elongationPercent: "",
        remarks: "",
      })),
    []
  );

  const emptyContinuityRows = useMemo<ContinuityRow[]>(
    () =>
      Array.from({ length: 8 }).map((_, idx) => ({
        slNo: idx + 1,
        tagNo: "",
        before: "",
        during: "",
        after: "",
        remarks: "",
      })),
    []
  );

  const emptyFinalInspectionRows = useMemo<FinalInspectionRow[]>(
    () =>
      Array.from({ length: 2 }).map((_, idx) => ({
        slNo: idx + 1,
        tagNo: "",
        hoseBld: "",
        assemblyLength: "",
        endFittingVerification: "",
        identification: "",
        colourCodes: "",
        remarks: "",
      })),
    []
  );

  const [testingLengthRows, setTestingLengthRows] = useState<
    TestingLengthRow[]
  >(emptyTestingLengthRow);
  const [continuityRows, setContinuityRows] =
    useState<ContinuityRow[]>(emptyContinuityRows);
  const [finalInspectionRows, setFinalInspectionRows] = useState<
    FinalInspectionRow[]
  >(emptyFinalInspectionRows);

  const [options, setOptions] = useState({
    airPurging: false,
    nitrogenPurging: false,
    capping: false,
    blueGoldCleaning: false,
  });

  const [acceptedQty, setAcceptedQty] = useState<string>("");
  const [rejectedQty, setRejectedQty] = useState<string>("");
  const [inspectorName, setInspectorName] = useState<string>("");
  const [inspectorDate, setInspectorDate] = useState<string>("");

  const [expanded, setExpanded] = useState({
    staticPressure: true,
    testingLength: true,
    continuity: true,
    options: true,
    finalAcceptance: true,
    inspector: true,
  });

  // Load existing report in edit mode
  useEffect(() => {
    if (editId) {
      fetchFinalInspectionReportById(editId);
    }
  }, [editId, fetchFinalInspectionReportById]);

  // When detail loads, populate the form state
  useEffect(() => {
    if (editId && finalInspectionDetail) {
      setStaticPressure({ ...finalInspectionDetail.staticPressure });
      setTestingLengthRows(
        (finalInspectionDetail.testingLength || []).map((r, idx) => ({
          slNo: r.slNo ?? idx + 1,
          tagNo: r.tagNo || "",
          gaugeSlNo: r.gaugeSlNo || "",
          beforeWithoutWater: r.beforeWithoutWater || "",
          beforeAt10psi: r.beforeAt10psi || "",
          duringTestL1: r.duringTestL1 || "",
          afterTestL2: r.afterTestL2 || "",
          elongationPercent: r.elongationPercent || "",
          remarks: r.remarks || "",
        }))
      );
      setContinuityRows(
        (finalInspectionDetail.continuity || []).map((r, idx) => ({
          slNo: r.slNo ?? idx + 1,
          tagNo: r.tagNo || "",
          before: r.before || "",
          during: r.during || "",
          after: r.after || "",
          remarks: r.remarks || "",
        }))
      );
      setFinalInspectionRows(
        (finalInspectionDetail.finalAcceptance?.rows || []).map((r, idx) => ({
          slNo: r.slNo ?? idx + 1,
          tagNo: r.tagNo || "",
          hoseBld: r.hoseBld || "",
          assemblyLength: r.assemblyLength || "",
          endFittingVerification: r.endFittingVerification || "",
          identification: r.identification || "",
          colourCodes: r.colourCodes || "",
          remarks: r.remarks || "",
        }))
      );
      setOptions({ ...finalInspectionDetail.options });
      setAcceptedQty(
        finalInspectionDetail.finalAcceptance?.acceptedQty?.toString() || ""
      );
      setRejectedQty(
        finalInspectionDetail.finalAcceptance?.rejectedQty?.toString() || ""
      );
      setInspectorName(finalInspectionDetail.inspector?.name || "");
      setInspectorDate(finalInspectionDetail.inspector?.date || "");
    }
  }, [editId, finalInspectionDetail]);

  return (
    <div
      className="min-h-screen py-8"
      style={{
        backgroundImage: 'url("/bg.png")',
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Final Inspection Report</h1>
            <button
              className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Go to Home
            </button>
          </div>

          <form className="p-6 space-y-8">
            <StaticPressureSection
              data={staticPressure}
              onChange={(d) => setStaticPressure({ ...staticPressure, ...d })}
              isExpanded={expanded.staticPressure}
              errors={errors}
              onToggle={() =>
                setExpanded((s) => ({
                  ...s,
                  staticPressure: !s.staticPressure,
                }))
              }
            />

            <TestingLengthSection
              rows={testingLengthRows}
              onChangeRow={(index, d) => {
                const n = [...testingLengthRows];
                n[index] = { ...n[index], ...d };
                setTestingLengthRows(n);
              }}
              isExpanded={expanded.testingLength}
              errors={errors}
              onToggle={() =>
                setExpanded((s) => ({ ...s, testingLength: !s.testingLength }))
              }
            />

            <ContinuitySection
              rows={continuityRows}
              onChangeRow={(index, d) => {
                const n = [...continuityRows];
                n[index] = { ...n[index], ...d };
                setContinuityRows(n);
              }}
              isExpanded={expanded.continuity}
              onToggle={() =>
                setExpanded((s) => ({ ...s, continuity: !s.continuity }))
              }
            />

            <OptionsSection
              data={options}
              onChange={(d) => setOptions({ ...options, ...d })}
              isExpanded={expanded.options}
              onToggle={() =>
                setExpanded((s) => ({ ...s, options: !s.options }))
              }
              errors={errors}
            />

            <FinalAcceptanceSection
              rows={finalInspectionRows}
              onChangeRow={(index, d) => {
                const n = [...finalInspectionRows];
                n[index] = { ...n[index], ...d };
                setFinalInspectionRows(n);
              }}
              acceptedQty={acceptedQty}
              rejectedQty={rejectedQty}
              onChangeAcceptedQty={(v) => setAcceptedQty(v)}
              onChangeRejectedQty={(v) => setRejectedQty(v)}
              isExpanded={expanded.finalAcceptance}
              onToggle={() =>
                setExpanded((s) => ({
                  ...s,
                  finalAcceptance: !s.finalAcceptance,
                }))
              }
              errors={errors}
            />

            <InspectorSection
              inspectorName={inspectorName}
              inspectorDate={inspectorDate}
              onChangeName={setInspectorName}
              onChangeDate={setInspectorDate}
              isExpanded={expanded.inspector}
              onToggle={() =>
                setExpanded((s) => ({ ...s, inspector: !s.inspector }))
              }
              errors={errors}
            />

            <div className="flex items-center justify-end">
              <button
                type="button"
                disabled={
                  isSubmitting ||
                  (editId ? finalInspectionDetailLoading : false)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 shadow disabled:opacity-60 cursor-pointer"
                onClick={async () => {
                  const payload = {
                    staticPressure,
                    testingLength: testingLengthRows,
                    continuity: continuityRows,
                    options,
                    finalAcceptance: {
                      rows: finalInspectionRows,
                      acceptedQty: acceptedQty
                        ? Number(acceptedQty)
                        : undefined,
                      rejectedQty: rejectedQty
                        ? Number(rejectedQty)
                        : undefined,
                    },
                    inspector: { name: inspectorName, date: inspectorDate },
                  };

                  if (editId) {
                    await updateFinalInspectionReport(editId, payload);
                  } else {
                    await createFinalInspectionReport(payload);
                  }
                }}
              >
                {editId
                  ? isSubmitting
                    ? "Updating..."
                    : "Update"
                  : isSubmitting
                  ? "Saving..."
                  : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinalInspectionReport;
