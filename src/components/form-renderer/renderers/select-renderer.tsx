import React from "react";
import { RendererProps } from ".";

const SelectRenderer: React.FC<RendererProps> = ({
  schema,
  path,
  value,
  onChange,
  options,
}) => {
  const enumValues = (schema.enum as string[]) || [];

  return (
    <div>
      <label>{schema.title || path}</label>
      <select
        value={value || ""}
        onChange={(e) => onChange(path, e.target.value)}>
        <option value="">-- Seleziona --</option>
        {enumValues.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectRenderer;
