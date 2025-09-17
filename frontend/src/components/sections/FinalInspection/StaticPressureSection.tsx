import React from "react";
import CollapsibleSection from "../../common/CollapsibleSection";
import type { StaticPressureDetails } from "./types";
import { inputBase, labelBase } from "./types";

type Props = {
  data: StaticPressureDetails;
  onChange: (data: Partial<StaticPressureDetails>) => void;
  isExpanded: boolean;
  onToggle: () => void;
};

const StaticPressureSection: React.FC<Props> = ({
  data,
  onChange,
  isExpanded,
  onToggle,
}) => {
  return (
    <CollapsibleSection
      title="Static Pressure Test Details"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelBase}>Type</label>
          <input
            className={inputBase}
            value={data.type}
            onChange={(e) => onChange({ type: e.target.value })}
            placeholder="Hydrostatic / Pneumatic"
          />
        </div>
        <div>
          <label className={labelBase}>Date</label>
          <input
            type="date"
            className={inputBase}
            value={data.date}
            onChange={(e) => onChange({ date: e.target.value })}
          />
        </div>
        <div>
          <label className={labelBase}>Operator (Sign & Name)</label>
          <input
            className={inputBase}
            value={data.operator}
            onChange={(e) => onChange({ operator: e.target.value })}
          />
        </div>
        <div>
          <label className={labelBase}>Working Pressure (bar/psi)</label>
          <input
            className={inputBase}
            value={data.workingPressure}
            onChange={(e) => onChange({ workingPressure: e.target.value })}
            placeholder="e.g. 10 bar"
          />
        </div>
        <div>
          <label className={labelBase}>Test Pressure (bar/psi)</label>
          <input
            className={inputBase}
            value={data.testPressure}
            onChange={(e) => onChange({ testPressure: e.target.value })}
            placeholder="e.g. 15 bar"
          />
        </div>
        <div>
          <label className={labelBase}>Duration @ W.P (min)</label>
          <input
            className={inputBase}
            value={data.durationWP}
            onChange={(e) => onChange({ durationWP: e.target.value })}
            placeholder="e.g. 10 min"
          />
        </div>
        <div>
          <label className={labelBase}>Duration @ T.P (min)</label>
          <input
            className={inputBase}
            value={data.durationTP}
            onChange={(e) => onChange({ durationTP: e.target.value })}
            placeholder="e.g. 5 min"
          />
        </div>
        <div>
          <label className={labelBase}>Gauge No</label>
          <input
            className={inputBase}
            value={data.gaugeNo}
            onChange={(e) => onChange({ gaugeNo: e.target.value })}
          />
        </div>

        <div className="sm:col-span-2">
          <span className={labelBase}>Result</span>
          <div className="mt-1 flex items-center gap-6">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="result"
                className="text-blue-600"
                checked={data.result === "passed"}
                onChange={() => onChange({ result: "passed" })}
              />
              Pass
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="result"
                className="text-blue-600"
                checked={data.result === "failed"}
                onChange={() => onChange({ result: "failed" })}
              />
              Fail
            </label>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default StaticPressureSection;
