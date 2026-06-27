import React, { useMemo, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import UseTableVaccinationCard from "../../hooks/tableVaccinationCard/UseTableVaccinationCard";
import EditVaccineModal from "../modals/EditVaccineModal";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";

export default function TableVaccinationCard({ isEditable = false }) {
  const {
    vaccineData,
    vaccineCardData,
    isLoading,
    refreshVaccinationData,
    upsertAppliedVaccine,
  } = UseTableVaccinationCard();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { setChildrenAuthStore } = useChildrenAuthStore();

  const tableRows = useMemo(() => {
    const rows = [...vaccineData]
      .sort((a, b) => {
        const ageDiff = getAgeOrder(a.vaccAgeDose) - getAgeOrder(b.vaccAgeDose);
        if (ageDiff !== 0) return ageDiff;
        return String(a.vaccName || "").localeCompare(String(b.vaccName || ""), "es", {
          sensitivity: "base",
        });
      })
      .map((vaccine) => {
        const applied = findAppliedForVaccine(vaccineCardData, vaccine);
        const vaccineApplied = getAppliedFromVaccine(vaccine);
        return { vaccine, applied: applied || vaccineApplied };
      });

    const appliedWithoutBaseVaccine = vaccineCardData
      .filter((appliedItem) => !rows.some(({ vaccine }) => findAppliedForVaccine([appliedItem], vaccine)))
      .map((appliedItem) => ({
        vaccine: {
          vaccId: appliedItem.vVacc_id,
          vaccName: appliedItem.vaccName || "",
          vaccAgeDose: "",
          vaccDosage: "",
          inventories: {},
        },
        applied: appliedItem,
      }));

    return [...rows, ...appliedWithoutBaseVaccine];
  }, [vaccineData, vaccineCardData]);

  const columnsCount = isEditable ? 8 : 7;

  const openEditModal = (vaccineId) => {
    setChildrenAuthStore({ idVaccine: vaccineId });
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-full overflow-x-auto">
          <table className="min-w-[720px] md:min-w-full mx-auto text-[13px]">
            <thead>
              <tr className="bg-dark-cyan h-8">
                <th className="px-2 py-1.5">Edad</th>
                <th className="border-x border-table px-2 py-1.5">Vacuna</th>
                <th className="border-x border-table px-2 py-1.5">Dosis</th>
                <th className="border-x border-table px-2 py-1.5">
                  Fecha de aplicaci&oacute;n
                </th>
                <th className="border-x border-table px-2 py-1.5">Laboratorio</th>
                <th className="border-x border-table px-2 py-1.5">N&ordm; Lote</th>
                <th className="border-x border-table px-2 py-1.5">
                  Fecha pr&oacute;xima cita
                </th>
                {isEditable && (
                  <th className="border-x border-table px-2 py-1.5">Acciones</th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr className="bg-surface text-center h-10 border border-gray-400">
                  <td colSpan={columnsCount} className="px-2 py-2">
                    Cargando esquema de vacunaci&oacute;n...
                  </td>
                </tr>
              )}

              {!isLoading && tableRows.length === 0 && (
                <tr className="bg-surface text-center h-10 border border-gray-400">
                  <td colSpan={columnsCount} className="px-2 py-2">
                    No hay vacunas disponibles para mostrar.
                  </td>
                </tr>
              )}

              {!isLoading &&
                tableRows.map(({ vaccine, applied }, index) => (
                  <tr
                    key={`${vaccine.vaccId}-${index}`}
                    className="bg-surface text-center h-8 border border-gray-400"
                  >
                    <td className="px-2 py-1.5 font-semibold">
                      {vaccine.vaccAgeDose}
                    </td>
                    <td className="border-x border-table px-2 py-1.5">
                      {vaccine.vaccName}
                    </td>
                    <td className="border-x border-table px-2 py-1.5">
                      {vaccine.vaccDosage}
                    </td>
                    <td className="border-x border-table px-2 py-1.5">
                      {applied?.vaap_date_application || ""}
                    </td>
                    <td className="border-x border-table px-2 py-1.5">
                      {vaccine.inventories?.inveLaboratory || ""}
                    </td>
                    <td className="border-x border-table px-2 py-1.5">
                      {vaccine.inventories?.inveLot || ""}
                    </td>
                    <td className="border-x border-table px-2 py-1.5">
                      {applied?.vaap_next_appointment_date || ""}
                    </td>
                    {isEditable && (
                      <td className="border-x border-table px-2 py-1.5">
                        {!isApplied(applied) && (
                          <button
                            onClick={() => openEditModal(vaccine.vaccId)}
                            className="mx-auto flex rounded-lg border border-border p-1.5 icon-sm text-dark-cyan hover:bg-secondary"
                            type="button"
                            title="Registrar vacuna"
                            aria-label="Registrar vacuna"
                          >
                            <FiEdit2 />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && (
        <EditVaccineModal
          onClose={() => setIsEditModalOpen(false)}
          vaccineData={vaccineData}
          onSaved={async (savedVaccineApplied) => {
            upsertAppliedVaccine(savedVaccineApplied);
            await refreshVaccinationData();
          }}
        />
      )}
    </>
  );
}

function findAppliedForVaccine(appliedData, vaccine) {
  return appliedData.find((appliedItem) => {
    if (appliedItem.vVacc_id && vaccine.vaccId) {
      return String(appliedItem.vVacc_id) === String(vaccine.vaccId);
    }

    if (appliedItem.vaccName && vaccine.vaccName) {
      return normalizeText(appliedItem.vaccName) === normalizeText(vaccine.vaccName);
    }

    return false;
  });
}

function isApplied(applied) {
  if (!applied) return false;

  return Boolean(
    applied.vaapApplied ||
      applied.vaap_applied ||
      applied.vaapId ||
      applied.vaap_id ||
      applied.vaap_date_application ||
      applied.vaap_next_appointment_date
  );
}

function getAppliedFromVaccine(vaccine) {
  if (!isApplied(vaccine)) return null;

  return {
    vVacc_id: vaccine.vaccId,
    vaapId: vaccine.vaapId ?? vaccine.vaap_id,
    vaapApplied: vaccine.vaapApplied ?? vaccine.vaap_applied ?? true,
    vaap_date_application:
      vaccine.vaap_date_application ?? vaccine.vaapDateApplication ?? "",
    vaap_next_appointment_date:
      vaccine.vaap_next_appointment_date ?? vaccine.vaapNextAppointmentDate ?? "",
  };
}

function getAgeOrder(ageText) {
  if (!ageText) return Number.MAX_SAFE_INTEGER;

  const normalized = String(ageText)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalized.includes("recien nac")) return 0;

  const match = normalized.match(/(\d+)/);
  if (!match) return Number.MAX_SAFE_INTEGER;

  const value = Number(match[1]);
  if (normalized.includes("ano")) return value * 12;
  return value;
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}
