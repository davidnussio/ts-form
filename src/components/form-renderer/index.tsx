// src/components/form-renderer/index.tsx
import React, { memo } from "react";
import equal from "fast-deep-equal";
import { useUnit } from "effector-react";
import {
  $schema,
  $layout,
  formDataChanged,
  $formData,
} from "../../stores/form";
import { rendererRegistry } from "./renderers";
import { getValueAtPath, setValueAtPath } from "../../utils/renderer-registry";
import { FormLayout, LayoutElement } from "./types";

const getFieldSchema = (rootSchema: any, pathParts: string[]) => {
  let current = rootSchema;
  for (let i = 1; i < pathParts.length; i++) {
    const part = pathParts[i];
    if (current && current.properties && current.properties[part]) {
      current = current.properties[part];
    } else {
      break;
    }
  }
  return current;
};

const determineRendererType = (fieldSchema: any): string => {
  if (
    fieldSchema.enum &&
    fieldSchema.enum.length > 0 &&
    fieldSchema.type === "string"
  ) {
    return "enum";
  }
  if (fieldSchema.type === "string") {
    return "string";
  }
  if (fieldSchema.type === "number") {
    return "number";
  }
  return "string";
};

const ControlRenderer = memo(
  ({ layout, schema, fieldSchema, fieldName, value, handleValueChange }) => {
    const rendererType = layout.renderer
      ? layout.renderer
      : determineRendererType(fieldSchema);

    const RendererComponent = rendererRegistry[rendererType];

    if (!RendererComponent) {
      return <div>Renderer non trovato per {rendererType}</div>;
    }

    if ((layout as any).hidden) {
      return null;
    }

    return (
      <div data-tag={layout.options?.tag}>
        <label>VALUE: ({value})</label>
        <RendererComponent
          schema={schema}
          fieldSchema={fieldSchema}
          path={fieldName}
          value={value}
          onChange={handleValueChange}
          options={layout.options}
        />
      </div>
    );
  },
  (prevProps, nextProps) => {
    return equal(prevProps.value, nextProps.value);
  }
);

const FormRenderer: React.FC = () => {
  const schema = useUnit($schema);
  const layout = useUnit($layout);
  const data = useUnit($formData);

  const handleValueChange = (path: string, value: any) => {
    const newData = setValueAtPath(data, path, value);
    console.log("# newData", newData);
    formDataChanged(newData);
  };

  const renderLayout = (
    layout: LayoutElement,
    parentPath: string = "#/properties"
  ): React.ReactNode => {
    if (
      layout.type === "VerticalLayout" ||
      layout.type === "HorizontalLayout"
    ) {
      return (
        <div
          style={{
            display: layout.type === "HorizontalLayout" ? "flex" : "block",
          }}>
          {layout.elements &&
            layout.elements.map((el, i) => (
              <div key={i} style={{ margin: "10px" }}>
                {renderLayout(el, parentPath)}
              </div>
            ))}
        </div>
      );
    }

    if (layout.type === "Control") {
      const scope = layout.scope || "";
      const pathParts = scope.replace("#/properties", "").split("/");
      const fieldName = pathParts[pathParts.length - 1];
      const fieldSchema = getFieldSchema(schema, pathParts);
      const value = getValueAtPath(data, fieldName);
      return (
        <ControlRenderer
          layout={layout}
          schema={schema}
          fieldSchema={fieldSchema}
          fieldName={fieldName}
          value={value}
          handleValueChange={handleValueChange}
        />
      );
    }

    return null;
  };

  return <form>{renderLayout(layout as FormLayout)}</form>;
};

export default FormRenderer;
