import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TiUserAdd } from "react-icons/ti";
import { useFinalInspectionReportStore } from "@/store/finalInspectionReport/useFinalInspectionReportStore";

const FinalInspectionReportList: React.FC = () => {
  const navigate = useNavigate();
  const {
    finalInspectionReports,
    finalInspectionReportsLoading,
    finalInspectionReportsError,
    fetchFinalInspectionReports,
  } = useFinalInspectionReportStore();

  useEffect(() => {
    fetchFinalInspectionReports();
  }, [fetchFinalInspectionReports]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Final Inspection Report List</h1>
          </div>

          <div className="p-6">
            {finalInspectionReportsLoading ? (
              <div className="text-center text-gray-500 py-8">Loading...</div>
            ) : finalInspectionReportsError ? (
              <div className="text-center text-red-600 py-8">
                {finalInspectionReportsError}
              </div>
            ) : finalInspectionReports.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No final inspection reports found.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {finalInspectionReports.map((report) => {
                  const title = report.inspector?.name || "Unnamed Inspector";
                  const subtitleParts: string[] = [];
                  if (report.staticPressure?.type)
                    subtitleParts.push(report.staticPressure.type);
                  const dateStr =
                    report.staticPressure?.date ||
                    report.inspector?.date ||
                    (report.createdAt ? report.createdAt.slice(0, 10) : "");
                  if (dateStr) subtitleParts.push(dateStr);

                  return (
                    <li
                      key={report._id}
                      className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 rounded"
                      onClick={() =>
                        navigate(`/final-inspection-reports/${report._id}`)
                      }
                    >
                      <span className="font-medium text-gray-800">{title}</span>
                      <span className="text-gray-500">
                        {subtitleParts.join(" • ")}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <button
            className="fixed bottom-5 right-5 bg-blue-600 p-3 cursor-pointer rounded-full z-50 transition-transform duration-300"
            onClick={() => navigate("/final-inspection-reports/new")}
          >
            <TiUserAdd color="white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalInspectionReportList;
