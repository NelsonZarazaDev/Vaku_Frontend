import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import UseTableVaccinationCard from "../../hooks/tableVaccinationCard/UseTableVaccinationCard";
import EditVaccineModal from "../modals/EditVaccineModal";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import useEmployeeAuthStore from "../../store/authEmployee/useEmployeeAuthStore";

export default function TableVaccinationCard({ mostrarAction }) {
  const { vaccineData, vaccineCardData } = UseTableVaccinationCard();
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { setChildrenAuthStore } = useChildrenAuthStore();
  const { setEmployeeAuthStore, setEmployeeInfo } = useEmployeeAuthStore();

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
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-full overflow-x-auto">
          <table className="min-w-[600px] md:min-w-full mx-auto">
            <thead>
              <tr className="bg-dark-cyan h-10">
                <th className="p-3">Edad</th>
                <th className="border-x border-table p-3">Vacuna</th>
                <th className="border-x border-table p-3">Dosis</th>
                <th className="border-x border-table p-3">
                  Fecha de aplicacion
                </th>
                <th className="border-x border-table p-3">laboratorio</th>
                <th className="border-x border-table p-3">Nº Lote</th>
                <th className="border-x border-table p-3">
                  Fecha proxima cita
                </th>
                {mostrarAction ? <th className="p-3">Acciones</th> : ""}
              </tr>
            </thead>
            <tbody>
              {vaccineData.map((vaccine) => {
                const applied = vaccineCardData.find(
                  (applied) => applied.vVacc_id === vaccine.vaccId
                );

                return (
                  <tr
                    key={vaccine.vaccId}
                    className="bg-surface text-center h-10 border border-gray-400"
                  >
                    <td className="p-3">{vaccine.vaccAgeDose}</td>
                    <td className="border-x border-table p-3">
                      {vaccine.vaccName}
                    </td>
                    <td className="border-x border-table p-3">
                      {vaccine.vaccDosage}
                    </td>

                    <td className="border-x border-table p-3">
                      {applied ? applied.vaap_date_application : ""}
                    </td>
                    <td className="border-x border-table p-3">
                      {vaccine.inventories.inveLaboratory}
                    </td>
                    <td className="border-x border-table p-3">
                      {vaccine.inventories.inveLot}
                    </td>
                    <td className="border-x border-table p-3">
                      {applied ? applied.vaap_next_appointment_date : ""}
                    </td>

                    {mostrarAction && applied && (
                      <td className="p-3">
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
                          className="hover:bg-accent rounded-lg cursor-pointer"
                        >
                          <CiEdit className="text-2xl mx-2" />
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
          isOpen={setIsModalEditOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}
