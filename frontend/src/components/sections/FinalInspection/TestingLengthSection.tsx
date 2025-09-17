import React from "react";
import CollapsibleSection from "../../common/CollapsibleSection";
import type { TestingLengthRow } from "./types";
import { inputBase } from "./types";

type Props = {
  rows: TestingLengthRow[];
  onChangeRow: (index: number, data: Partial<TestingLengthRow>) => void;
  isExpanded: boolean;
  onToggle: () => void;
};

const TestingLengthSection: React.FC<Props> = ({
  rows,
  onChangeRow,
  isExpanded,
  onToggle,
}) => {
  return (
    <CollapsibleSection
      title="Testing Length Details"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="border border-gray-200 px-2 py-1">SL No</th>
              <th className="border border-gray-200 px-2 py-1">Tag No</th>
              <th className="border border-gray-200 px-2 py-1">Gauge Sl No</th>
              <th className="border border-gray-200 px-2 py-1">
                Before Test (Without Water)
              </th>
              <th className="border border-gray-200 px-2 py-1">
                Before Test (@10 psi)
              </th>
              <th className="border border-gray-200 px-2 py-1">
                During Test (L1)
              </th>
              <th className="border border-gray-200 px-2 py-1">
                After Test (L2)
              </th>
              <th className="border border-gray-200 px-2 py-1">% Elongation</th>
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
                <td className="border border-gray-200 px-2 py-1 min-w-[120px]">
                  <input
                    className={inputBase}
                    value={row.gaugeSlNo}
                    onChange={(e) =>
                      onChangeRow(idx, { gaugeSlNo: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 min-w-[140px]">
                  <input
                    className={inputBase}
                    value={row.beforeWithoutWater}
                    onChange={(e) =>
                      onChangeRow(idx, { beforeWithoutWater: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 min-w-[140px]">
                  <input
                    className={inputBase}
                    value={row.beforeAt10psi}
                    onChange={(e) =>
                      onChangeRow(idx, { beforeAt10psi: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 min-w-[140px]">
                  <input
                    className={inputBase}
                    value={row.duringTestL1}
                    onChange={(e) =>
                      onChangeRow(idx, { duringTestL1: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 min-w-[140px]">
                  <input
                    className={inputBase}
                    value={row.afterTestL2}
                    onChange={(e) =>
                      onChangeRow(idx, { afterTestL2: e.target.value })
                    }
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 min-w-[120px]">
                  <input
                    className={inputBase}
                    value={row.elongationPercent}
                    onChange={(e) =>
                      onChangeRow(idx, { elongationPercent: e.target.value })
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

export default TestingLengthSection;
