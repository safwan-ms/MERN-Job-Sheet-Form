import React from "react";
import CollapsibleSection from "../../common/CollapsibleSection";
import type { OptionsState } from "./types";
import type { FormErrors } from "@/types";

type Props = {
  data: OptionsState;
  onChange: (data: Partial<OptionsState>) => void;
  isExpanded: boolean;
  onToggle: () => void;
  errors: FormErrors;
};

const OptionsSection: React.FC<Props> = ({
  data,
  onChange,
  isExpanded,
  onToggle,
  errors,
}) => {
  return (
    <CollapsibleSection
      title="Options"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="inline-flex items-center gap-2 text-sm text-gray-800">
          <input
            type="checkbox"
            className="text-blue-600"
            checked={data.airPurging}
            onChange={(e) => onChange({ airPurging: e.target.checked })}
          />
          Air Purging
          {errors.airPurging && (
            <p className="text-red-500 text-sm mt-1">{errors.airPurging}</p>
          )}
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-gray-800">
          <input
            type="checkbox"
            className="text-blue-600"
            checked={data.nitrogenPurging}
            onChange={(e) => onChange({ nitrogenPurging: e.target.checked })}
          />
          Nitrogen Purging
          {errors.nitrogenPurging && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nitrogenPurging}
            </p>
          )}
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-gray-800">
          <input
            type="checkbox"
            className="text-blue-600"
            checked={data.capping}
            onChange={(e) => onChange({ capping: e.target.checked })}
          />
          Capping
          {errors.capping && (
            <p className="text-red-500 text-sm mt-1">{errors.capping}</p>
          )}
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-gray-800">
          <input
            type="checkbox"
            className="text-blue-600"
            checked={data.blueGoldCleaning}
            onChange={(e) => onChange({ blueGoldCleaning: e.target.checked })}
          />
          Blue Gold Cleaning
          {errors.blueGoldCleaning && (
            <p className="text-red-500 text-sm mt-1">
              {errors.blueGoldCleaning}
            </p>
          )}
        </label>
      </div>
    </CollapsibleSection>
  );
};

export default OptionsSection;
