import React from "react";
import { RendererProps } from ".";

const TextRenderer: React.FC<RendererProps> = ({
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
        type="text"
        value={value || ""}
        onChange={(e) => {
          return onChange(path, e.target.value);
        }}
      />
    </div>
  );
};

export default TextRenderer;
