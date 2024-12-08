import React, { useState } from "react";
import FormRenderer from "./components/form-renderer";
import { formSchema } from "./models/form-schema";
import { layoutSchema } from "./models/layout-schema";

const App: React.FC = () => {
  const [formData, setFormData] = useState({});

  return (
    <div>
      <h1>Form Example</h1>
      <FormRenderer
        schema={formSchema}
        layout={layoutSchema}
        initialData={{ nome: "Mario" }}
        onChange={(data) => setFormData(data)}
      />
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

export default App;
