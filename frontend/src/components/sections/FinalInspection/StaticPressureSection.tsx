import React from "react";
import CollapsibleSection from "../../common/CollapsibleSection";
import type { StaticPressureDetails } from "./types";
import { inputBase, labelBase } from "./types";
import type { FormErrors } from "../../../types";

type Props = {
  data: StaticPressureDetails;
  onChange: (data: Partial<StaticPressureDetails>) => void;
  isExpanded: boolean;
  onToggle: () => void;
  errors: FormErrors;
};

const StaticPressureSection: React.FC<Props> = ({
  data,
  onChange,
  isExpanded,
  onToggle,
  errors,
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
            className={`${inputBase} ${
              errors["staticPressure.type"] ? "border-red-500" : ""
            }`}
            value={data.type}
            onChange={(e) => onChange({ type: e.target.value })}
            placeholder="Hydrostatic / Pneumatic"
          />
          {errors["staticPressure.type"] && (
            <p className="text-red-600 text-sm mt-1">
              {errors["staticPressure.type"]}
            </p>
          )}
        </div>
        <div>
          <label className={labelBase}>Date</label>
          <input
            type="date"
            className={`${inputBase} ${
              errors["staticPressure.date"] ? "border-red-500" : ""
            }`}
            value={data.date}
            onChange={(e) => onChange({ date: e.target.value })}
          />
          {errors["staticPressure.date"] && (
            <p className="text-red-600 text-sm mt-1">
              {errors["staticPressure.date"]}
            </p>
          )}
        </div>
        <div>
          <label className={labelBase}>Operator (Sign & Name)</label>
          <input
            className={`${inputBase} ${
              errors["staticPressure.operator"] ? "border-red-500" : ""
            }`}
            value={data.operator}
            onChange={(e) => onChange({ operator: e.target.value })}
          />
          {errors["staticPressure.operator"] && (
            <p className="text-red-600 text-sm mt-1">
              {errors["staticPressure.operator"]}
            </p>
          )}
        </div>
        <div>
          <label className={labelBase}>Working Pressure (bar/psi)</label>
          <input
            className={`${inputBase} ${
              errors["staticPressure.workingPressure"] ? "border-red-500" : ""
            }`}
            value={data.workingPressure}
            onChange={(e) => onChange({ workingPressure: e.target.value })}
            placeholder="e.g. 10 bar"
          />
          {errors["staticPressure.workingPressure"] && (
            <p className="text-red-600 text-sm mt-1">
              {errors["staticPressure.workingPressure"]}
            </p>
          )}
        </div>
        <div>
          <label className={labelBase}>Test Pressure (bar/psi)</label>
          <input
            className={`${inputBase} ${
              errors["staticPressure.testPressure"] ? "border-red-500" : ""
            }`}
            value={data.testPressure}
            onChange={(e) => onChange({ testPressure: e.target.value })}
            placeholder="e.g. 15 bar"
          />
          {errors["staticPressure.testPressure"] && (
            <p className="text-red-600 text-sm mt-1">
              {errors["staticPressure.testPressure"]}
            </p>
          )}
        </div>
        <div>
          <label className={labelBase}>Duration @ W.P (min)</label>
          <input
            className={`${inputBase} ${
              errors["staticPressure.durationWP"] ? "border-red-500" : ""
            }`}
            value={data.durationWP}
            onChange={(e) => onChange({ durationWP: e.target.value })}
            placeholder="e.g. 10 min"
          />
          {errors["staticPressure.durationWP"] && (
            <p className="text-red-600 text-sm mt-1">
              {errors["staticPressure.durationWP"]}
            </p>
          )}
        </div>
        <div>
          <label className={labelBase}>Duration @ T.P (min)</label>
          <input
            className={`${inputBase} ${
              errors["staticPressure.durationTP"] ? "border-red-500" : ""
            }`}
            value={data.durationTP}
            onChange={(e) => onChange({ durationTP: e.target.value })}
            placeholder="e.g. 5 min"
          />
          {errors["staticPressure.durationTP"] && (
            <p className="text-red-600 text-sm mt-1">
              {errors["staticPressure.durationTP"]}
            </p>
          )}
        </div>
        <div>
          <label className={labelBase}>Gauge No</label>
          <input
            className={`${inputBase} ${
              errors["staticPressure.gaugeNo"] ? "border-red-500" : ""
            }`}
            value={data.gaugeNo}
            onChange={(e) => onChange({ gaugeNo: e.target.value })}
          />
          {errors["staticPressure.gaugeNo"] && (
            <p className="text-red-600 text-sm mt-1">
              {errors["staticPressure.gaugeNo"]}
            </p>
          )}
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
          {errors["staticPressure.result"] && (
            <p className="text-red-600 text-sm mt-1">
              {errors["staticPressure.result"]}
            </p>
          )}
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default StaticPressureSection;
