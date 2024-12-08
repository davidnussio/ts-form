import { ReactNode } from "react";
import { JSONSchema7 } from "json-schema";
// Renderers di base
import TextRenderer from "./text-renderer";
import NumberRenderer from "./number-renderer";
import SelectRenderer from "./select-renderer";
import SartRenderer from "./sart-renderer"; // aggiunto custom renderer

export interface RendererProps {
  schema: JSONSchema7;
  path: string;
  value: any;
  onChange: (path: string, value: any) => void;
  options?: Record<string, any>;
}

interface RendererRegistry {
  [key: string]: (props: RendererProps) => ReactNode;
}

export const rendererRegistry: RendererRegistry = {
  string: TextRenderer,
  number: NumberRenderer,
  enum: SelectRenderer,
  sart: SartRenderer, // aggiunto custom renderer
};
