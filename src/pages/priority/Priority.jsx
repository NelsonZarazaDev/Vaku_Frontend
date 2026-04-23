import React from "react";
import ButtonEmailPriority from "../../components/buttonEmailPriority/ButtonEmailPriority";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import UsePriority from "../../hooks/priority/UsePriority";

export default function Priority() {
  const { priorityData } = UsePriority();

  return (
    <section className="space-y-4">
      <header className="page-header">
        <div>
          <h1 className="page-title">Prioridad de vacunacion</h1>
          <p className="page-subtitle">Lista de pacientes con cita pendiente o vencida.</p>
        </div>
        <ButtonEmailPriority />
      </header>

      <div className="space-y-3">
        {priorityData.map((child, index) => (
          <div key={`${child.childDocument}-${index}`} className="section-card flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-2">
              <HiOutlineExclamationTriangle className="icon-md text-error" />
              <div className="typo-body">
                <div>{child.childNames} {child.childLastNames}</div>
                <div className="typo-caption">Documento: {child.childDocument}</div>
              </div>
            </div>

            <div className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-dark-green">
              Fecha: {child.vaapNextAppointmentDate}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
