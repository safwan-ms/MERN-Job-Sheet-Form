import React from "react";
import CollapsibleSection from "../../common/CollapsibleSection";
import { inputBase } from "./types";
import type { ContinuityRow } from "./types";
type Props = {
  rows: ContinuityRow[];
  onChangeRow: (index: number, data: Partial<ContinuityRow>) => void;
  isExpanded: boolean;
  onToggle: () => void;
};

const ContinuitySection: React.FC<Props> = ({
  rows,
  onChangeRow,
  isExpanded,
  onToggle,
}) => {
  return (
    <CollapsibleSection
      title="Continuity Test Details"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="border border-gray-200 px-2 py-1">SL No</th>
              <th className="border border-gray-200 px-2 py-1">Tag No</th>
              <th className="border border-gray-200 px-2 py-1">
                Before Test (Without Water)
              </th>
              <th className="border border-gray-200 px-2 py-1">During Test</th>
              <th className="border border-gray-200 px-2 py-1">
                After Test (Without Water)
              </th>
              <th className="border border-gray-200 px-2 py-1">
                Test Results / Remarks
              </th>
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
                <td className="border border-gray-200 px-2 py-1 min-w-[120px]">
                  <input
                    className={inputBase}
                    value={row.tagNo}
                    onChange={(e) =>
                      onChangeRow(idx, { tagNo: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 min-w-[160px]">
                  <input
                    className={inputBase}
                    value={row.before}
                    onChange={(e) =>
                      onChangeRow(idx, { before: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 min-w-[140px]">
                  <input
                    className={inputBase}
                    value={row.during}
                    onChange={(e) =>
                      onChangeRow(idx, { during: e.target.value })
                    }
                  />
                </td>

                <td className="border border-gray-200 px-2 py-1 min-w-[160px]">
                  <input
                    className={inputBase}
                    value={row.after}
                    onChange={(e) =>
                      onChangeRow(idx, { after: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 min-w-[160px]">
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
    </CollapsibleSection>
  );
};

export default ContinuitySection;
