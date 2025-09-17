import React from "react";
import CollapsibleSection from "../../common/CollapsibleSection";
import type { FinalInspectionRow } from "./types";
import { inputBase, labelBase } from "./types";

type Props = {
  rows: FinalInspectionRow[];
  onChangeRow: (index: number, data: Partial<FinalInspectionRow>) => void;
  acceptedQty: string;
  rejectedQty: string;
  onChangeAcceptedQty: (value: string) => void;
  onChangeRejectedQty: (value: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
};

const FinalAcceptanceSection: React.FC<Props> = ({
  rows,
  onChangeRow,
  acceptedQty,
  rejectedQty,
  onChangeAcceptedQty,
  onChangeRejectedQty,
  isExpanded,
  onToggle,
}) => {
  return (
    <CollapsibleSection
      title="Final Inspection and Acceptance"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="border border-gray-200 px-2 py-1">SL No</th>
              <th className="border border-gray-200 px-2 py-1">Tag No</th>
              <th className="border border-gray-200 px-2 py-1">Hose BLD</th>
              <th className="border border-gray-200 px-2 py-1">
                Assembly Length (mtr)
              </th>
              <th className="border border-gray-200 px-2 py-1">
                End Fitting Verification
              </th>
              <th className="border border-gray-200 px-2 py-1">
                Identification
              </th>
              <th className="border border-gray-200 px-2 py-1">Colour Codes</th>
              <th className="border border-gray-200 px-2 py-1">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.slNo}
                className={idx % 2 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-200 px-2 py-1 text-center w-16">
                  {row.slNo}
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    className={inputBase}
                    value={row.tagNo}
                    onChange={(e) =>
                      onChangeRow(idx, { tagNo: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    className={inputBase}
                    value={row.hoseBld}
                    onChange={(e) =>
                      onChangeRow(idx, { hoseBld: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    className={inputBase}
                    value={row.assemblyLength}
                    onChange={(e) =>
                      onChangeRow(idx, { assemblyLength: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    className={inputBase}
                    value={row.endFittingVerification}
                    onChange={(e) =>
                      onChangeRow(idx, {
                        endFittingVerification: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    className={inputBase}
                    value={row.identification}
                    onChange={(e) =>
                      onChangeRow(idx, { identification: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    className={inputBase}
                    value={row.colourCodes}
                    onChange={(e) =>
                      onChangeRow(idx, { colourCodes: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    className={inputBase}
                    value={row.remarks}
                    onChange={(e) =>
                      onChangeRow(idx, { remarks: e.target.value })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelBase}>Accepted Qty</label>
          <input
            className={inputBase}
            value={acceptedQty}
            onChange={(e) => onChangeAcceptedQty(e.target.value)}
          />
        </div>
        <div>
          <label className={labelBase}>Rejected Qty</label>
          <input
            className={inputBase}
            value={rejectedQty}
            onChange={(e) => onChangeRejectedQty(e.target.value)}
          />
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default FinalAcceptanceSection;
