import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import UseEmployees from "../../hooks/employees/UseEmployees";
import EmployeeEditModal from "../modals/EmployeeEditModal";
import EmployeeViewModal from "../modals/EmployeeViewModal";

import useEmployeeViewEditStore from "../../store/employeeView/useEmployeeViewEditStore";

export default function EmployesUserCard() {
  const { employeeAllData } = UseEmployees();
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
        <EmployeeEditModal isOpen={isModalOpen} onClose={closeModalEdit} />
      )}

      {isModalOpenView && (
        <EmployeeViewModal isOpen={isModalOpenView} onClose={closeModalView} />
      )}
      {employeeAllData.map((employeeData, index) => (
        <div
          key={index}
          className="box-shadow-card flex flex-col p-4 w-full rounded-2xl"
        >
          <div className="flex flex-col">
            <div className="flex font-bold">
              <CiUser className="text-3xl" />
              <div>
                <p className="">
                  {employeeData.persNames} {employeeData.persLastNames}
                </p>
                <p className="text-gray mt-2">{employeeData.persRole}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center font-bold h-18">
            <label htmlFor="">
              {employeeData.emplState ? "Activo" : "Inactivo"}
            </label>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={() => openModalEdit(employeeData.persEmail)}
              className="bg-accent-light w-[40%] py-1.5 rounded-l-full border cursor-pointer"
            >
              Editar
            </button>

            <button
              onClick={() => openModalView(employeeData.persEmail)}
              className="bg-surface w-[40%] py-1.5 rounded-r-full border cursor-pointer"
            >
              Ver
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
