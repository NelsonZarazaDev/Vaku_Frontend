import React, { useEffect } from "react";
import { HiOutlineCalendarDays, HiOutlineEnvelope, HiOutlineHeart, HiOutlineMapPin, HiOutlinePhone, HiOutlineUserCircle, HiOutlineUsers } from "react-icons/hi2";
import UseCardsInfoVaccinationCard from "../../hooks/cardsInfoVaccinationCard/UseCardsInfoVaccinationCard";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";

export default function CardsInfoVaccinationCard() {
  const { cardsData } = UseCardsInfoVaccinationCard();
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
  }, [cardsData]);

  if (!info) {
    return (
      <div className="grid w-full gap-4 lg:grid-cols-2">
        <div className="section-card h-[240px] animate-pulse bg-secondary/40" />
        <div className="section-card h-[240px] animate-pulse bg-secondary/40" />
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
            Perfil clinico
          </span>
        </header>

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          <InfoCard
            label="Nombre"
            value={`${info.childNames} ${info.childLastNames}`}
            icon={<HiOutlineUsers />}
            span="full"
          />
          <InfoCard label="Nacimiento" value={info.parentBirthDate} icon={<HiOutlineCalendarDays />} />
          <InfoCard label="Sexo" value={info.childSex} icon={<HiOutlineHeart />} compact />
          <InfoCard label="Municipio" value={info.childCity} icon={<HiOutlineMapPin />} />
          <InfoCard label="Departamento" value={info.childDepartment} icon={<HiOutlineMapPin />} />
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
          <InfoCard label="Telefono" value={info.parentPhone} icon={<HiOutlinePhone />} />
          <InfoCard
            label="Correo"
            value={info.parentEmail}
            icon={<HiOutlineEnvelope />}
            span="full"
          />
          <InfoCard
            label="Direccion"
            value={info.parentAddress}
            icon={<HiOutlineMapPin />}
            span="full"
          />
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
