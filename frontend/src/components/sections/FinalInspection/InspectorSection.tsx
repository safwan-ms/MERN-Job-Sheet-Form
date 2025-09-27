import React from "react";
import CollapsibleSection from "../../common/CollapsibleSection";
import { inputBase, labelBase } from "./types";
import type { FormErrors } from "@/types";

type Props = {
  inspectorName: string;
  inspectorDate: string;
  onChangeName: (value: string) => void;
  onChangeDate: (value: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
  errors: FormErrors;
};

const InspectorSection: React.FC<Props> = ({
  inspectorName,
  inspectorDate,
  onChangeName,
  onChangeDate,
  isExpanded,
  onToggle,
  errors,
}) => {
  return (
    <CollapsibleSection
      title="Inspector"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelBase}>Inspector (Sign & Name)</label>
          <input
            className={inputBase}
            value={inspectorName}
            onChange={(e) => onChangeName(e.target.value)}
          />
          {errors.inspectorName && (
            <p className="text-red-500 text-sm mt-1">{errors.inspectorName}</p>
          )}
        </div>
        <div>
          <label className={labelBase}>Date</label>
          <input
            type="date"
            className={inputBase}
            value={inspectorDate}
            onChange={(e) => onChangeDate(e.target.value)}
          />
          {errors.inspectorDate && (
            <p className="text-red-500 text-sm mt-1">{errors.inspectorDate}</p>
          )}
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default InspectorSection;
