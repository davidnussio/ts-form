export const formSchema = {
  type: "object",
  properties: {
    nome: { type: "string", title: "Nome" },
    età: { type: "number", title: "Età" },
    nazionalità: {
      type: "string",
      title: "Nazionalità",
      enum: ["IT", "FR", "UK", "DE", "ES"],
    },
    attenzione: {
      type: "object",
      title: "Gioco dell'attenzione",
      properties: {
        risultati: {
          type: "object",
          tempoReazioneMedio: {
            type: "number",
          },
          errori: {
            type: "number",
          },
          dettagli: { type: "string" },
        }, // In questo campo finirà il risultato JSON del SART
      },
    },
  },
  required: ["nome", "età"],
};
