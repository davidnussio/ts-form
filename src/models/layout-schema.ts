export const layoutSchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/nome",
          options: {
            tag: "campo-nome",
          },
        },
        {
          type: "Control",
          scope: "#/properties/età",
          options: {
            tag: "campo-eta",
          },
        },
      ],
    },
    {
      type: "Control",
      scope: "#/properties/età",
      options: {
        tag: "campo-eta",
      },
    },
    {
      type: "Control",
      scope: "#/properties/indirizzo",
      options: {
        tag: "campo-indirizzo",
      },
    },
    {
      type: "Control",
      scope: "#/properties/nazionalità",
      options: {
        tag: "campo-nazionalita",
      },
    },
    {
      type: "Control",
      scope: "#/properties/attenzione",
      renderer: "sart",
      options: {
        tag: "campo-sart",
        config: {
          // Opzioni custom per il SART renderer, ad es. durata del test, livello di difficoltà, ecc.
          durata: 30000,
          livello: "medio",
        },
      },
    },
  ],
};
