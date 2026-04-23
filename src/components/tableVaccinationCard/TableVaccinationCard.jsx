import React, { useMemo, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import UseTableVaccinationCard from "../../hooks/tableVaccinationCard/UseTableVaccinationCard";
import EditVaccineModal from "../modals/EditVaccineModal";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import useEmployeeAuthStore from "../../store/authEmployee/useEmployeeAuthStore";

export default function TableVaccinationCard({ mostrarAction }) {
  const { vaccineData, vaccineCardData, refreshVaccinationData } = UseTableVaccinationCard();
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { setChildrenAuthStore } = useChildrenAuthStore();
  const { setEmployeeInfo } = useEmployeeAuthStore();

  const emailParent = useChildrenAuthStore((state) => state.emailParent);
  const idChildren = useChildrenAuthStore((state) => state.idChildren);
  const idEmpl = useEmployeeAuthStore((state) => state.employeeInfo.idEmpl);
  const persDocument = useChildrenAuthStore((state) => state.persDocument);
  const { employeeInfo } = useEmployeeAuthStore.getState();

  const editVaccineCard = (
    idVaccine,
    emailParent,
    idChildren,
    idEmpl,
    persDocument
  ) => {
    setChildrenAuthStore({
      idVaccine: idVaccine,
      idChildren: idChildren,
      emailParent: emailParent,
      persDocument: persDocument,
    });
    setEmployeeInfo({
      persEmail: employeeInfo.persEmail,
      persDocument: employeeInfo.persDocument,
      persNames: employeeInfo.persNames,
      persLastNames: employeeInfo.persLastNames,
      persRole: employeeInfo.persRole,
      emplToken: employeeInfo.emplToken,
      idEmpl: idEmpl,
    });
    setIsModalEditOpen(true);
  };

  const closeModal = () => {
    setIsModalEditOpen(false);
  };

  const groupedRows = useMemo(() => {
    const sortedRows = [...vaccineData]
      .sort((a, b) => {
        const ageDiff = getAgeOrder(a.vaccAgeDose) - getAgeOrder(b.vaccAgeDose);
        if (ageDiff !== 0) return ageDiff;
        return a.vaccName.localeCompare(b.vaccName, "es", { sensitivity: "base" });
      })
      .map((vaccine) => {
        const applied = vaccineCardData.find(
          (appliedItem) => appliedItem.vVacc_id === vaccine.vaccId
        );
        return { vaccine, applied, age: vaccine.vaccAgeDose };
      });

    const ageCounts = sortedRows.reduce((acc, row) => {
      acc[row.age] = (acc[row.age] || 0) + 1;
      return acc;
    }, {});

    const seenAges = new Set();
    return sortedRows.map((row) => {
      const showAge = !seenAges.has(row.age);
      if (showAge) seenAges.add(row.age);
      return {
        ...row,
        showAge,
        ageRowSpan: ageCounts[row.age],
      };
    });
  }, [vaccineData, vaccineCardData]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-full overflow-x-auto">
          <table className="min-w-[600px] md:min-w-full mx-auto text-[13px]">
            <thead>
              <tr className="bg-dark-cyan h-8">
                <th className="px-2 py-1.5">Edad</th>
                <th className="border-x border-table px-2 py-1.5">Vacuna</th>
                <th className="border-x border-table px-2 py-1.5">Dosis</th>
                <th className="border-x border-table px-2 py-1.5">
                  Fecha de aplicacion
                </th>
                <th className="border-x border-table px-2 py-1.5">laboratorio</th>
                <th className="border-x border-table px-2 py-1.5">Nº Lote</th>
                <th className="border-x border-table px-2 py-1.5">
                  Fecha proxima cita
                </th>
                {mostrarAction ? <th className="px-2 py-1.5">Acciones</th> : ""}
              </tr>
            </thead>
            <tbody>
              {groupedRows.map(({ vaccine, applied, showAge, ageRowSpan }) => {
                return (
                  <tr
                    key={vaccine.vaccId}
                    className="bg-surface text-center h-8 border border-gray-400"
                  >
                    {showAge && (
                      <td className="px-2 py-1.5 align-middle font-semibold" rowSpan={ageRowSpan}>
                        {vaccine.vaccAgeDose}
                      </td>
                    )}
                    <td className="border-x border-table px-2 py-1.5">
                      {vaccine.vaccName}
                    </td>
                    <td className="border-x border-table px-2 py-1.5">
                      {vaccine.vaccDosage}
                    </td>

                    <td className="border-x border-table px-2 py-1.5">
                      {applied ? applied.vaap_date_application : ""}
                    </td>
                    <td className="border-x border-table px-2 py-1.5">
                      {vaccine.inventories.inveLaboratory}
                    </td>
                    <td className="border-x border-table px-2 py-1.5">
                      {vaccine.inventories.inveLot}
                    </td>
                    <td className="border-x border-table px-2 py-1.5">
                      {applied ? applied.vaap_next_appointment_date : ""}
                    </td>

                    {mostrarAction && !applied && (
                      <td className="px-2 py-1.5">
                        <button
                          onClick={() =>
                            editVaccineCard(
                              vaccine.vaccId,
                              emailParent,
                              idChildren,
                              idEmpl,
                              persDocument
                            )
                          }
                          className="rounded-lg border border-border p-1.5 text-base text-primary hover:bg-accent-light cursor-pointer"
                        >
                          <FiEdit2 />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isModalEditOpen && (
        <EditVaccineModal
          vaccineData={vaccineData}
          onSaved={refreshVaccinationData}
          isOpen={setIsModalEditOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}

function getAgeOrder(ageText) {
  if (!ageText) return Number.MAX_SAFE_INTEGER;

  const normalized = ageText
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

