import UseEmployeViewModal from "../../hooks/employeViewModal/UseEmployeViewModal";
import BaseModal from "./BaseModal";

export default function EmployeeViewModal({ onClose }) {
  const { employeeData } = UseEmployeViewModal();
  const employee = employeeData[0];

  return (
    <BaseModal onClose={onClose}>
      {employee ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="typo-modal-title">Datos del empleado</h2>
            <button onClick={onClose} type="button" className="btn-secondary typo-caption">
              Cerrar
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input className="form-input typo-body" type="text" disabled value={employee.persNames} />
            <input className="form-input typo-body" type="text" disabled value={employee.persLastNames} />
            <input className="form-input typo-body" type="text" disabled value={employee.persDocument} />
            <input className="form-input typo-body" type="text" disabled value={employee.persPhone} />
            <input className="form-input typo-body sm:col-span-2" type="email" disabled value={employee.persEmail} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <input className="form-input typo-body" type="text" disabled value={employee.depaName} />
            <input className="form-input typo-body" type="text" disabled value={employee.cityName} />
            <input className="form-input typo-body" type="text" disabled value={employee.persAddress} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <input className="form-input typo-body" type="text" disabled value={employee.persDateBirth} />
            <input className="form-input typo-body" type="text" disabled value={employee.persRole} />
            <input
              className="form-input typo-body"
              type="text"
              disabled
              value={employee.persSex === "M" ? "Masculino" : "Femenino"}
            />
          </div>
        </div>
      ) : (
        <p className="text-center typo-body font-medium text-gray">Cargando datos...</p>
      )}
    </BaseModal>
  );
}
