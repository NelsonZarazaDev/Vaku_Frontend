import React, { useState } from "react";
import TableSearchChildren from "../../components/tableSearchChildren/TableSearchChildren";
import SearchChild from "../../components/searchChild/SearchChild";

export default function Children() {
  const [childResultData, setChildResultData] = useState(null);

  return (
    <section className="space-y-4">
      <header className="page-header">
        <div>
          <h1 className="page-title">Gestión de niños</h1>
          <p className="page-subtitle">Busca el paciente y accede a su esquema de vacunación.</p>
        </div>
      </header>

      <SearchChild onResult={setChildResultData} />
      <TableSearchChildren data={childResultData} />
    </section>
  );
}
