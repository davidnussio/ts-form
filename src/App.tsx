// src/app.tsx
import React from "react";
import { useUnit } from "effector-react";
import { $formData } from "./stores/form";
import FormRenderer from "./components/form-renderer";

const DisplayData: React.FC = () => {
  const data = useUnit($formData);

  return (
    <div>
      <h2>Form Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <h1>Form Example with Effector</h1>
      <FormRenderer />
      <DisplayData />
    </div>
  );
};

export default App;
