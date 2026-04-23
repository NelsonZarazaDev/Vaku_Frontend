import React from "react";
import { useLocation } from "react-router";
import CardsInfoVaccinationCard from "../../components/cardsInfoVaccinationCard/CardsInfoVaccinationCard";
import { HiOutlineClipboardDocumentCheck, HiOutlineUserGroup } from "react-icons/hi2";
import TableVaccinationCard from "../../components/tableVaccinationCard/TableVaccinationCard";

export default function VaccinationCard({ mostrarAction }) {
  const location = useLocation();
  const actionFromRoute = location.state?.mode === "edit";
  const canEdit = typeof mostrarAction === "boolean" ? mostrarAction : actionFromRoute;

  return (
    <section className="space-y-5">
      <div className="page-header">
        <div className="flex items-center gap-2">
          <HiOutlineUserGroup className="icon-md text-accent" />
          <div>
            <h1 className="page-title">Datos del paciente y acudiente</h1>
            <p className="page-subtitle">Resumen clinico y personal.</p>
          </div>
        </div>
      </div>

      <CardsInfoVaccinationCard />

      <div className="page-header">
        <div className="flex items-center gap-2">
          <HiOutlineClipboardDocumentCheck className="icon-md text-accent" />
          <div>
            <h2 className="page-title">Esquema de vacunacion</h2>
          </div>
        </div>
      </div>

      <div className="p-0">
        <TableVaccinationCard mostrarAction={canEdit} />
      </div>
    </section>
  );
}
