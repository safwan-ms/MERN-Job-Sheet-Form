import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFinalInspectionReportStore } from "@/store/finalInspectionReport/useFinalInspectionReportStore";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit3, FiCheck, FiX, FiRefreshCw } from "react-icons/fi";
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

const FinalInspectionReportDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    finalInspectionDetail,
    finalInspectionDetailLoading,
    finalInspectionDetailError,
    fetchFinalInspectionReportById,
    deleteFinalInspectionReport,
    updateFinalInspectionReport,
    isSubmitting,
    successMessage,
    errors,
  } = useFinalInspectionReportStore();

  const [isEditing, setIsEditing] = React.useState(false);
  const [expanded, setExpanded] = React.useState({
    staticPressure: true,
    testingLength: true,
    continuity: true,
    options: true,
    finalAcceptance: true,
    inspector: true,
  });
  const emptyTestingLengthRow = React.useMemo<TestingLengthRow[]>(
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
  const emptyContinuityRows = React.useMemo<ContinuityRow[]>(
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
  const emptyFinalInspectionRows = React.useMemo<FinalInspectionRow[]>(
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
  const [staticPressure, setStaticPressure] =
    React.useState<StaticPressureDetails>({
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
  const [testingLengthRows, setTestingLengthRows] = React.useState<
    TestingLengthRow[]
  >(emptyTestingLengthRow);
  const [continuityRows, setContinuityRows] =
    React.useState<ContinuityRow[]>(emptyContinuityRows);
  const [finalInspectionRows, setFinalInspectionRows] = React.useState<
    FinalInspectionRow[]
  >(emptyFinalInspectionRows);
  const [options, setOptions] = React.useState({
    airPurging: false,
    nitrogenPurging: false,
    capping: false,
    blueGoldCleaning: false,
  });
  const [acceptedQty, setAcceptedQty] = React.useState<string>("");
  const [rejectedQty, setRejectedQty] = React.useState<string>("");
  const [inspectorName, setInspectorName] = React.useState<string>("");
  const [inspectorDate, setInspectorDate] = React.useState<string>("");

  useEffect(() => {
    if (id) fetchFinalInspectionReportById(id);
  }, [id, fetchFinalInspectionReportById]);

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
            <h1 className="text-2xl font-bold">
              Final Inspection Report Detail
            </h1>
            <div className="flex gap-3">
              {!isEditing ? (
                <>
                  <button
                    className="group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    onClick={() => {
                      if (!finalInspectionDetail) return;
                      setIsEditing(true);
                      setStaticPressure({
                        ...finalInspectionDetail.staticPressure,
                      });
                      setTestingLengthRows(
                        (finalInspectionDetail.testingLength || []).map(
                          (r, idx) => ({
                            slNo: r.slNo ?? idx + 1,
                            tagNo: r.tagNo || "",
                            gaugeSlNo: r.gaugeSlNo || "",
                            beforeWithoutWater: r.beforeWithoutWater || "",
                            beforeAt10psi: r.beforeAt10psi || "",
                            duringTestL1: r.duringTestL1 || "",
                            afterTestL2: r.afterTestL2 || "",
                            elongationPercent: r.elongationPercent || "",
                            remarks: r.remarks || "",
                          })
                        )
                      );
                      setContinuityRows(
                        (finalInspectionDetail.continuity || []).map(
                          (r, idx) => ({
                            slNo: r.slNo ?? idx + 1,
                            tagNo: r.tagNo || "",
                            before: r.before || "",
                            during: r.during || "",
                            after: r.after || "",
                            remarks: r.remarks || "",
                          })
                        )
                      );
                      setFinalInspectionRows(
                        (finalInspectionDetail.finalAcceptance?.rows || []).map(
                          (r, idx) => ({
                            slNo: r.slNo ?? idx + 1,
                            tagNo: r.tagNo || "",
                            hoseBld: r.hoseBld || "",
                            assemblyLength: r.assemblyLength || "",
                            endFittingVerification:
                              r.endFittingVerification || "",
                            identification: r.identification || "",
                            colourCodes: r.colourCodes || "",
                            remarks: r.remarks || "",
                          })
                        )
                      );
                      setOptions({ ...finalInspectionDetail.options });
                      setAcceptedQty(
                        finalInspectionDetail.finalAcceptance?.acceptedQty?.toString() ||
                          ""
                      );
                      setRejectedQty(
                        finalInspectionDetail.finalAcceptance?.rejectedQty?.toString() ||
                          ""
                      );
                      setInspectorName(
                        finalInspectionDetail.inspector?.name || ""
                      );
                      setInspectorDate(
                        finalInspectionDetail.inspector?.date || ""
                      );
                    }}
                  >
                    <FiEdit3 className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (id) {
                        await deleteFinalInspectionReport(id);
                        navigate("/final-inspection-reports");
                      }
                    }}
                    className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <RiDeleteBin6Fill className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    Delete
                  </button>
                  <button
                    className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/final-inspection-reports")}
                  >
                    Back to List
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="group flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                    onClick={async () => {
                      if (!id) return;
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

                      await updateFinalInspectionReport(id, payload);
                      if (Object.keys(errors).length === 0) {
                        setIsEditing(false);
                      }
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FiRefreshCw className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiCheck className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                        Save
                      </>
                    )}
                  </button>
                  <button
                    className="group flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl hover:from-gray-600 hover:to-gray-700 transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={() => setIsEditing(false)}
                  >
                    <FiX className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="p-6">
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">
                {successMessage}
              </div>
            )}
            {finalInspectionDetailLoading ? (
              <div className="text-center text-gray-500 py-8">Loading...</div>
            ) : finalInspectionDetailError ? (
              <div className="text-center text-red-600 py-8">
                {finalInspectionDetailError}
              </div>
            ) : !finalInspectionDetail ? (
              <div className="text-center text-gray-500 py-8">
                No data found.
              </div>
            ) : !isEditing ? (
              <div className="space-y-6">
                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Static Pressure
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <span className="font-medium">Type:</span>{" "}
                      {finalInspectionDetail.staticPressure.type}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span>{" "}
                      {finalInspectionDetail.staticPressure.date}
                    </div>
                    <div>
                      <span className="font-medium">Operator:</span>{" "}
                      {finalInspectionDetail.staticPressure.operator}
                    </div>
                    <div>
                      <span className="font-medium">Working Pressure:</span>{" "}
                      {finalInspectionDetail.staticPressure.workingPressure}
                    </div>
                    <div>
                      <span className="font-medium">Test Pressure:</span>{" "}
                      {finalInspectionDetail.staticPressure.testPressure}
                    </div>
                    <div>
                      <span className="font-medium">Duration (WP):</span>{" "}
                      {finalInspectionDetail.staticPressure.durationWP}
                    </div>
                    <div>
                      <span className="font-medium">Duration (TP):</span>{" "}
                      {finalInspectionDetail.staticPressure.durationTP}
                    </div>
                    <div>
                      <span className="font-medium">Gauge No:</span>{" "}
                      {finalInspectionDetail.staticPressure.gaugeNo}
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-medium">Result:</span>{" "}
                      {finalInspectionDetail.staticPressure.result}
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Testing Length
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700">
                      <thead>
                        <tr className="text-left text-gray-600">
                          <th className="py-2 pr-4">SL No</th>
                          <th className="py-2 pr-4">Tag No</th>
                          <th className="py-2 pr-4">Gauge SL No</th>
                          <th className="py-2 pr-4">Before (No Water)</th>
                          <th className="py-2 pr-4">Before @10psi</th>
                          <th className="py-2 pr-4">During Test L1</th>
                          <th className="py-2 pr-4">After Test L2</th>
                          <th className="py-2 pr-4">Elongation %</th>
                          <th className="py-2 pr-4">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {finalInspectionDetail.testingLength.map((row) => (
                          <tr
                            key={row.slNo}
                            className="border-t border-gray-200"
                          >
                            <td className="py-2 pr-4">{row.slNo}</td>
                            <td className="py-2 pr-4">{row.tagNo}</td>
                            <td className="py-2 pr-4">{row.gaugeSlNo}</td>
                            <td className="py-2 pr-4">
                              {row.beforeWithoutWater}
                            </td>
                            <td className="py-2 pr-4">{row.beforeAt10psi}</td>
                            <td className="py-2 pr-4">{row.duringTestL1}</td>
                            <td className="py-2 pr-4">{row.afterTestL2}</td>
                            <td className="py-2 pr-4">
                              {row.elongationPercent}
                            </td>
                            <td className="py-2 pr-4">{row.remarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Continuity
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700">
                      <thead>
                        <tr className="text-left text-gray-600">
                          <th className="py-2 pr-4">SL No</th>
                          <th className="py-2 pr-4">Tag No</th>
                          <th className="py-2 pr-4">Before</th>
                          <th className="py-2 pr-4">During</th>
                          <th className="py-2 pr-4">After</th>
                          <th className="py-2 pr-4">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {finalInspectionDetail.continuity.map((row) => (
                          <tr
                            key={row.slNo}
                            className="border-t border-gray-200"
                          >
                            <td className="py-2 pr-4">{row.slNo}</td>
                            <td className="py-2 pr-4">{row.tagNo}</td>
                            <td className="py-2 pr-4">{row.before}</td>
                            <td className="py-2 pr-4">{row.during}</td>
                            <td className="py-2 pr-4">{row.after}</td>
                            <td className="py-2 pr-4">{row.remarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Options
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <span className="font-medium">Air Purging:</span>{" "}
                      {finalInspectionDetail.options.airPurging ? "Yes" : "No"}
                    </div>
                    <div>
                      <span className="font-medium">Nitrogen Purging:</span>{" "}
                      {finalInspectionDetail.options.nitrogenPurging
                        ? "Yes"
                        : "No"}
                    </div>
                    <div>
                      <span className="font-medium">Capping:</span>{" "}
                      {finalInspectionDetail.options.capping ? "Yes" : "No"}
                    </div>
                    <div>
                      <span className="font-medium">Blue Gold Cleaning:</span>{" "}
                      {finalInspectionDetail.options.blueGoldCleaning
                        ? "Yes"
                        : "No"}
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Final Acceptance
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <span className="font-medium">Accepted Qty:</span>{" "}
                      {finalInspectionDetail.finalAcceptance.acceptedQty ?? "-"}
                    </div>
                    <div>
                      <span className="font-medium">Rejected Qty:</span>{" "}
                      {finalInspectionDetail.finalAcceptance.rejectedQty ?? "-"}
                    </div>
                  </div>
                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full text-sm text-gray-700">
                      <thead>
                        <tr className="text-left text-gray-600">
                          <th className="py-2 pr-4">SL No</th>
                          <th className="py-2 pr-4">Tag No</th>
                          <th className="py-2 pr-4">Hose BLD</th>
                          <th className="py-2 pr-4">Assembly Length</th>
                          <th className="py-2 pr-4">
                            End Fitting Verification
                          </th>
                          <th className="py-2 pr-4">Identification</th>
                          <th className="py-2 pr-4">Colour Codes</th>
                          <th className="py-2 pr-4">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {finalInspectionDetail.finalAcceptance.rows.map(
                          (row) => (
                            <tr
                              key={row.slNo}
                              className="border-t border-gray-200"
                            >
                              <td className="py-2 pr-4">{row.slNo}</td>
                              <td className="py-2 pr-4">{row.tagNo}</td>
                              <td className="py-2 pr-4">{row.hoseBld}</td>
                              <td className="py-2 pr-4">
                                {row.assemblyLength}
                              </td>
                              <td className="py-2 pr-4">
                                {row.endFittingVerification}
                              </td>
                              <td className="py-2 pr-4">
                                {row.identification}
                              </td>
                              <td className="py-2 pr-4">{row.colourCodes}</td>
                              <td className="py-2 pr-4">{row.remarks}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Inspector
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <span className="font-medium">Name:</span>{" "}
                      {finalInspectionDetail.inspector.name}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span>{" "}
                      {finalInspectionDetail.inspector.date}
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <form className="space-y-8">
                {Object.keys(errors).length > 0 && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
                    <h3 className="font-medium">
                      Please fix the following errors:
                    </h3>
                    <ul className="mt-2 list-disc list-inside">
                      {Object.entries(errors).map(([field, message]) => (
                        <li key={field}>
                          {field}: {message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <StaticPressureSection
                  data={staticPressure}
                  onChange={(d) =>
                    setStaticPressure({ ...staticPressure, ...d })
                  }
                  isExpanded={expanded.staticPressure}
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
                  onToggle={() =>
                    setExpanded((s) => ({
                      ...s,
                      testingLength: !s.testingLength,
                    }))
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
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalInspectionReportDetail;
