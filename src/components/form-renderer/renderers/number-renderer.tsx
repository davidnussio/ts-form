import React from "react";
import { RendererProps } from ".";

const NumberRenderer: React.FC<RendererProps> = ({
  schema,
  path,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label>{schema.title || path}</label>
      <input
        type="number"
        value={value || ""}
        onChange={(e) => onChange(path, parseFloat(e.target.value))}
      />
    </div>
  );
};

export default NumberRenderer;
