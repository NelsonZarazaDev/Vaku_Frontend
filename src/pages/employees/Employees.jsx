import React from "react";
import EmployesUserCard from "../../components/employesUserCard/EmployesUserCard";

export default function Employees() {
  return (
    <section className="space-y-4">
      <header className="page-header">
        <div>
          <h1 className="page-title">Usuarios del sistema</h1>
          <p className="page-subtitle">Gestiona perfiles del personal autorizado.</p>
        </div>
      </header>

      <EmployesUserCard />
    </section>
  );
}
