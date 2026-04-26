import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import UseEmployees from "../../hooks/employees/UseEmployees";
import EmployeeEditModal from "../modals/EmployeeEditModal";
import EmployeeViewModal from "../modals/EmployeeViewModal";

import useEmployeeViewEditStore from "../../store/employeeView/useEmployeeViewEditStore";

export default function EmployesUserCard() {
  const {
    employeeAllData,
    page,
    size,
    setSize,
    totalPages,
    totalElements,
    loading,
    fetchAllEmployee,
    refreshEmployees,
  } = UseEmployees(12);
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
      <div className="flex items-center justify-between gap-2">
        <p className="typo-caption">Total usuarios: {totalElements}</p>
        <div className="flex items-center gap-2">
          <label className="typo-caption" htmlFor="users-page-size">
            Registros
          </label>
          <select
            id="users-page-size"
            className="form-select !w-[92px] !py-2"
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
            }}
          >
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>
      {loading ? (
        <p className="typo-caption text-center">Cargando usuarios...</p>
      ) : employeeAllData.length === 0 ? (
        <p className="typo-caption text-center">No hay usuarios para mostrar.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {employeeAllData.map((employeeData, index) => (
            <div key={index} className="section-card flex w-full flex-col p-4">
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
                <label>{employeeData.emplState ? "Activo" : "Inactivo"}</label>
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
        </div>
      )}

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="btn-secondary typo-caption"
          disabled={page <= 0 || loading}
          onClick={() => fetchAllEmployee(page - 1)}
        >
          Anterior
        </button>
        <span className="typo-caption">
          Pagina {Math.max(page + 1, 1)} de {Math.max(totalPages, 1)}
        </span>
        <button
          type="button"
          className="btn-secondary typo-caption"
          disabled={page >= Math.max(totalPages, 1) - 1 || loading}
          onClick={() => fetchAllEmployee(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </>
  );
}
