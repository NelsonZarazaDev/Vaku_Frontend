import React from "react";
import UseCarnetPdf from "../../hooks/buttonCarnetPdf/UseCarnetPdf";

export default function ButtonCarnetPdf() {
  const { carnetPdf } = UseCarnetPdf();

  return (
    <button onClick={carnetPdf} className="btn-primary min-w-40" type="button">
      Descargar PDF
    </button>
  );
}
