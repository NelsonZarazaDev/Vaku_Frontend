import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import ViewVaccinationCardModal from "../modals/ViewVaccinationCardModal";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import EditVaccinationCardModal from "../modals/EditVaccinationCardModal";

export default function TableSearchChildren({ data }) {
  const { setChildrenAuthStore } = useChildrenAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const viewVaccinationCard = () => {
    setChildrenAuthStore({
      persDocument: data.childDocument,
    });
    setIsModalOpen(true);
  };

  const editVaccinationCard = () => {
    setChildrenAuthStore({
      persDocument: data.childDocument,
    });
    setIsModalEditOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };

  return (
    <>
      <div className="w-full mt-15 md:mt-30 flex justify-center">
        <div className="w-[80%] max-w-full overflow-x-auto">
          <table className="min-w-[600px] md:min-w-full mx-auto">
            <thead>
              <tr className="bg-dark-cyan h-10">
                <th className="rounded-tl-lg">Nombre</th>
                <th className="border-x border-table">Documento</th>
                <th className="border-x border-table">Fecha de nacimiento</th>
                <th className="rounded-tr-lg">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                <tr className="bg-secondary text-center h-10">
                  <td className="">
                    {data.childNames} {data.childLastNames}
                  </td>
                  <td className="border-x border-table">
                    {data.childDocument}
                  </td>
                  <td className="border-x border-table">
                    {data.parentBirthDate}
                  </td>
                  <td className="">
                    <button
                      onClick={viewVaccinationCard}
                      className="hover:bg-dark-cyan rounded-lg cursor-pointer"
                    >
                      <IoEyeOutline className="text-2xl mx-2" />
                    </button>
                    <button
                      onClick={editVaccinationCard}
                      className="hover:bg-accent rounded-lg cursor-pointer"
                    >
                      <CiEdit className="text-2xl mx-2" />
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-600">
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <ViewVaccinationCardModal isOpen={true} onClose={closeModal} />
      )}
      {isModalEditOpen && (
        <EditVaccinationCardModal isOpen={true} onClose={closeModalEdit} />
      )}
    </>
  );
}
