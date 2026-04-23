import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import UseEmployees from "../../hooks/employees/UseEmployees";
import EmployeeEditModal from "../modals/EmployeeEditModal";
import EmployeeViewModal from "../modals/EmployeeViewModal";

import useEmployeeViewEditStore from "../../store/employeeView/useEmployeeViewEditStore";

export default function EmployesUserCard() {
  const { employeeAllData, refreshEmployees } = UseEmployees();
  const { emailEmployee, setEmailEmployee } = useEmployeeViewEditStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenView, setIsModalOpenView] = useState(false);

  const openModalEdit = (email) => {
    setEmailEmployee(email);
    setIsModalOpen(true);
  };

  const openModalView = (email) => {
    setEmailEmployee(email);
    setIsModalOpenView(true);
  };

  const closeModalEdit = () => setIsModalOpen(false);
  const closeModalView = () => setIsModalOpenView(false);

  return (
    <>
      {isModalOpen && (
        <EmployeeEditModal
          isOpen={isModalOpen}
          onClose={closeModalEdit}
          onSaved={refreshEmployees}
        />
      )}

      {isModalOpenView && (
        <EmployeeViewModal isOpen={isModalOpenView} onClose={closeModalView} />
      )}
      {employeeAllData.map((employeeData, index) => (
        <div
          key={index}
          className="section-card flex w-full flex-col p-4"
        >
          <div className="flex flex-col">
            <div className="flex font-bold">
              <HiOutlineUserCircle className="icon-md text-dark-cyan" />
              <div>
                <p className="typo-section-title">
                  {employeeData.persNames} {employeeData.persLastNames}
                </p>
                <p className="mt-1 typo-caption">{employeeData.persRole}</p>
              </div>
            </div>
          </div>

          <div className="flex h-14 items-center justify-center font-semibold typo-body">
            <label>
              {employeeData.emplState ? "Activo" : "Inactivo"}
            </label>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={() => openModalEdit(employeeData.persEmail)}
              className="w-[42%] rounded-l-full border border-border bg-accent-light py-1.5 text-xs font-semibold cursor-pointer"
            >
              Editar
            </button>

            <button
              onClick={() => openModalView(employeeData.persEmail)}
              className="w-[42%] rounded-r-full border border-border bg-surface py-1.5 text-xs font-semibold cursor-pointer"
            >
              Ver
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
