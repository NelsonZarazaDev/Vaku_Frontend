import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router";
import CardsInfoVaccinationCard from "../../components/cardsInfoVaccinationCard/CardsInfoVaccinationCard";
import { HiOutlineClipboardDocumentCheck, HiOutlineUserGroup } from "react-icons/hi2";
import TableVaccinationCard from "../../components/tableVaccinationCard/TableVaccinationCard";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";

export default function VaccinationCard() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { setChildrenAuthStore } = useChildrenAuthStore();
  const mode = location.state?.mode || searchParams.get("mode") || "view";
  const isEditable = mode === "edit";
  const documentFromUrl =
    searchParams.get("documento") ||
    searchParams.get("document") ||
    searchParams.get("persDocument");

  useEffect(() => {
    if (documentFromUrl) {
      setChildrenAuthStore({ persDocument: documentFromUrl.trim() });
    }
  }, [documentFromUrl, setChildrenAuthStore]);

  return (
    <section className="space-y-5">
      <div className="page-header">
        <div className="flex items-center gap-2">
          <HiOutlineUserGroup className="icon-md text-accent" />
          <div>
            <h1 className="page-title">Datos del paciente y acudiente</h1>
            <p className="page-subtitle">Resumen cl&iacute;nico y personal.</p>
          </div>
        </div>
      </div>

      <CardsInfoVaccinationCard />

      <div className="page-header">
        <div className="flex items-center gap-2">
          <HiOutlineClipboardDocumentCheck className="icon-md text-accent" />
          <div>
            <h2 className="page-title">Esquema de vacunaci&oacute;n</h2>
          </div>
        </div>
      </div>

      <div className="p-0">
        <TableVaccinationCard isEditable={isEditable} />
      </div>
    </section>
  );
}
