import React from "react";
import { RendererProps } from ".";

// Questo è un placeholder semplificato. In realtà potrebbe essere molto complesso.
const SartRenderer: React.FC<RendererProps> = ({
  schema,
  path,
  value,
  onChange,
  options,
}) => {
  const handleRunTest = (e) => {
    e.preventDefault();
    const fakeResult = {
      tempoReazioneMedio: 250,
      errori: 2,
      dettagli: "Simulazione del test SART",
    };
    onChange(path, fakeResult);
  };

  return (
    <div>
      <label>{schema.title || path}</label>
      <button onClick={handleRunTest}>Avvia Test Attenzione (SART)</button>
      {value && <pre>{JSON.stringify(value, null, 2)}</pre>}
    </div>
  );
};

export default SartRenderer;
