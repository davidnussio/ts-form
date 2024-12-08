import React, { useState, useEffect } from "react";
import { FormProps, LayoutElement } from "./types";
import { rendererRegistry } from "./renderers";
import { getValueAtPath, setValueAtPath } from "../../utils/path-utils";
import { JSONSchema7 } from "json-schema";

const FormRenderer: React.FC<FormProps> = ({
  schema,
  layout,
  onChange,
  initialData = {},
}) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (onChange) {
      onChange(data);
    }
  }, [data, onChange]);

  const handleValueChange = (path: string, value: any) => {
    const newData = setValueAtPath(data, path, value);
    setData(newData);
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
      // scope tipicamente è "#/properties/nome"
      // Convertiamo scope in un path utilizzabile dalle nostre funzioni
      const pathParts = scope.replace("#/properties", "").split("/");
      const fieldName = pathParts[pathParts.length - 1];
      const fullPath = `properties${scope.replace("#/properties", "")}`;

      // Otteniamo lo schema del campo
      const fieldSchema = getFieldSchema(schema, pathParts);
      const value = getValueAtPath(data, fieldName);

      // Determiniamo quale renderer utilizzare
      const rendererType = layout.renderer
        ? layout.renderer
        : determineRendererType(fieldSchema);

      const RendererComponent = rendererRegistry[rendererType];

      if (!RendererComponent) {
        return <div>Renderer non trovato per {rendererType}</div>;
      }

      return (
        <div data-tag={layout.options?.tag}>
          <RendererComponent
            schema={fieldSchema}
            path={fieldName}
            value={value}
            onChange={handleValueChange}
            options={layout.options}
          />
        </div>
      );
    }

    return null;
  };

  const getFieldSchema = (
    rootSchema: JSONSchema7,
    pathParts: string[]
  ): JSONSchema7 => {
    let current: JSONSchema7 | undefined = rootSchema;
    for (let i = 1; i < pathParts.length; i++) {
      const part = pathParts[i];
      if (current && current.properties && current.properties[part]) {
        current = current.properties[part] as JSONSchema7;
      } else {
        break;
      }
    }
    return current!;
  };

  const determineRendererType = (fieldSchema: JSONSchema7): string => {
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

    // Per il nostro caso custom SART, possiamo mappare in layout renderer = "sart"
    // Altrimenti qui avremmo qualche logica aggiuntiva
    return "string";
  };

  return <form>{renderLayout(layout)}</form>;
};

export default FormRenderer;
