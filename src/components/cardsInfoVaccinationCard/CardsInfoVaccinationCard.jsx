import React, { useEffect } from "react";
import { HiOutlineCalendarDays, HiOutlineEnvelope, HiOutlineHeart, HiOutlineMapPin, HiOutlinePhone, HiOutlineUserCircle, HiOutlineUsers } from "react-icons/hi2";
import UseCardsInfoVaccinationCard from "../../hooks/cardsInfoVaccinationCard/UseCardsInfoVaccinationCard";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";

export default function CardsInfoVaccinationCard() {
  const { cardsData, isLoading, hasDocument } = UseCardsInfoVaccinationCard();
  const { setChildrenAuthStore } = useChildrenAuthStore();
  const info = cardsData[0];

  useEffect(() => {
    if (cardsData.length > 0) {
      const { chilId, parentEmail, childDocument } = cardsData[0];

      setChildrenAuthStore({
        idChildren: chilId,
        emailParent: parentEmail,
        persDocument: childDocument,
      });
    }
  }, [cardsData, setChildrenAuthStore]);

  if (!hasDocument) {
    return (
      <div className="section-card p-5 text-center">
        <p className="typo-section-title text-dark-cyan">No hay paciente seleccionado</p>
        <p className="mt-1 typo-body text-gray">
          Inicia sesión como paciente o abre el carnet desde la búsqueda de niños.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid w-full gap-4 lg:grid-cols-2">
        <div className="section-card h-[240px] animate-pulse bg-secondary/40" />
        <div className="section-card h-[240px] animate-pulse bg-secondary/40" />
      </div>
    );
  }

  if (!info) {
    return (
      <div className="section-card p-5 text-center">
        <p className="typo-section-title text-dark-cyan">No se encontraron datos del paciente</p>
        <p className="mt-1 typo-body text-gray">Verifica el documento e inténtalo nuevamente.</p>
      </div>
    );
  }

  return (
    <div className="grid w-full gap-4 lg:grid-cols-2">
      <article className="section-card p-4 sm:p-4">
        <header className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <HiOutlineUserCircle className="icon-md text-dark-cyan" />
            <h3 className="typo-section-title">Paciente</h3>
          </div>
          <span className="rounded-full border border-dark-cyan/25 bg-dark-cyan/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            Perfil clínico
          </span>
        </header>

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          <InfoCard
            label="Nombre"
            value={`${info.childNames} ${info.childLastNames}`}
            icon={<HiOutlineUsers />}
            span="full"
          />
          <InfoCard label="Documento" value={info.childDocument} icon={<HiOutlineUserCircle />} />
          <InfoCard label="Nacimiento" value={info.childBirthDate} icon={<HiOutlineCalendarDays />} />
          <InfoCard label="Sexo" value={info.childSex} icon={<HiOutlineHeart />} compact />
          <InfoCard label="Dirección" value={info.childAddress} icon={<HiOutlineMapPin />} />
          <InfoCard label="Municipio" value={info.childCity} icon={<HiOutlineMapPin />} />
          <InfoCard label="Departamento" value={info.childDepartment} icon={<HiOutlineMapPin />} />
          <InfoCard label="Teléfono" value={info.childPhone} icon={<HiOutlinePhone />} />
          <InfoCard label="Correo" value={info.childEmail} icon={<HiOutlineEnvelope />} />
        </div>
      </article>

      <article className="section-card p-4 sm:p-4">
        <header className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <HiOutlineHeart className="icon-md text-dark-cyan" />
            <h3 className="typo-section-title">Acudiente</h3>
          </div>
          <span className="rounded-full border border-dark-cyan/25 bg-dark-cyan/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            Contacto principal
          </span>
        </header>

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          <InfoCard label="Parentesco" value={info.parentRole} icon={<HiOutlineHeart />} />
          <InfoCard label="Sexo" value={info.parentSex} icon={<HiOutlineHeart />} compact />
          <InfoCard
            label="Nombre"
            value={`${info.parentNames} ${info.parentLastNames}`}
            icon={<HiOutlineUsers />}
            span="full"
          />
          <InfoCard label="Documento" value={info.parentDocument} icon={<HiOutlineUserCircle />} />
          <InfoCard label="Nacimiento" value={info.parentBirthDate} icon={<HiOutlineCalendarDays />} />
          <InfoCard label="Teléfono" value={info.parentPhone} icon={<HiOutlinePhone />} />
          <InfoCard
            label="Correo"
            value={info.parentEmail}
            icon={<HiOutlineEnvelope />}
            span="full"
          />
          <InfoCard
            label="Dirección"
            value={info.parentAddress}
            icon={<HiOutlineMapPin />}
            span="full"
          />
          <InfoCard label="Municipio" value={info.parentCity} icon={<HiOutlineMapPin />} />
          <InfoCard label="Departamento" value={info.parentDepartment} icon={<HiOutlineMapPin />} />
        </div>
      </article>
    </div>
  );
}

function InfoCard({ icon, label, value, span = "normal", compact = false }) {
  const textValue = value || "-";
  const isCompactValue = compact || String(textValue).trim().length <= 2;
  const spanClass = span === "full" ? "sm:col-span-2" : "";

  return (
    <div className={`flex min-h-[34px] items-center gap-1.5 ${spanClass}`}>
      <div className="shrink-0 icon-sm text-dark-cyan">{icon}</div>
      <p className="typo-label leading-tight">{label}:</p>
      <p
        className={
          isCompactValue
            ? "typo-body font-semibold text-primary"
            : "min-w-0 flex-1 typo-body break-words leading-tight text-primary"
        }
      >
        {textValue}
      </p>
    </div>
  );
}
