import { JSONSchema7 } from "json-schema";

// Tipo base per il layout
export interface LayoutElement {
  type: string;
  scope?: string;
  elements?: LayoutElement[];
  renderer?: string;
  options?: Record<string, any>;
}

export interface FormLayout {
  type: string;
  elements: LayoutElement[];
}

export interface FormProps {
  schema: JSONSchema7;
  layout: FormLayout;
  onChange?: (data: any) => void;
  initialData?: any;
}
