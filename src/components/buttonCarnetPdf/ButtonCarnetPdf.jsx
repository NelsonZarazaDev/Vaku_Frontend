import React from "react";
import UseCarnetPdf from "../../hooks/buttonCarnetPdf/UseCarnetPdf";

export default function ButtonCarnetPdf() {
  const { carnetPdf } = UseCarnetPdf();
  return (
    <div
      onClick={carnetPdf}
      className="bg-button flex justify-center items-center font-bold text-surface box-shadow-card rounded-full w-40 h-10 cursor-pointer"
    >
      Descargar pdf
    </div>
  );
}
