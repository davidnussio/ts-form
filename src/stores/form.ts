// src/stores/form.ts
import { createStore, createEvent, sample } from "effector";
import { JSONSchema7 } from "json-schema";
// import { applyConditionalLogic } from "../utils/apply-conditional-logic";

// Eventi
export const formDataChanged = createEvent<any>("form data changed");

// Schema e layout di base (importati dai file)
import { formSchema } from "../models/form-schema";
import { layoutSchema } from "../models/layout-schema";

// Store dei dati dell'utente
export const $formData = createStore<any>({}).on(
  formDataChanged,
  (state, payload) => {
    console.log("state", state);
    console.log("formDataChanged", payload);
    return { ...state, ...payload };
  }
);

// Store con schema e layout di base
export const $baseSchema = createStore<JSONSchema7>(formSchema);
export const $baseLayout = createStore<any>(layoutSchema);

// Ora creiamo store derivati per schema/layout dinamici
export const $schema = createStore<JSONSchema7>(formSchema);
export const $layout = createStore<any>(layoutSchema);

// Quando cambia $formData, ricalcola schema e layout
// sample({
//   clock: $formData,
//   source: {
//     schema: $baseSchema,
//     layout: $baseLayout,
//   },
//   fn: ({ schema, layout }, data) => {
//     const { schema: newSchema, layout: newLayout } = applyConditionalLogic(
//       data,
//       schema,
//       layout
//     );
//     return { newSchema, newLayout };
//   },
//   target: [
//     $schema.map((_, upd) => upd.newSchema),
//     $layout.map((_, upd) => upd.newLayout),
//   ],
// });
