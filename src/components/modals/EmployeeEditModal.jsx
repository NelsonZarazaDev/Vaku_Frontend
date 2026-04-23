import UseEmployeEditModal from "../../hooks/employeEditModal/UseEmployeEditModal";
import UseEmployeViewModal from "../../hooks/employeViewModal/UseEmployeViewModal";
import BaseModal from "./BaseModal";

export default function EmployeeEditModal({ onClose, onSaved }) {
  const { employeeData } = UseEmployeViewModal();
  const employee = employeeData[0];
  const { employeEditData, onInputChange, onSubmit } = UseEmployeEditModal({
    empleado: employee,
    onSuccess: async () => {
      if (typeof onSaved === "function") {
        await onSaved();
      }
      onClose();
    },
  });

  return (
    <BaseModal onClose={onClose}>
      {employee ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="typo-modal-title">Editar empleado</h2>
            <button onClick={onClose} type="button" className="btn-secondary typo-caption">
              Cerrar
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input className="form-input typo-body" type="text" name="persNames" value={employeEditData.persNames} onChange={onInputChange} />
            <input className="form-input typo-body" type="text" name="persLastNames" value={employeEditData.persLastNames} onChange={onInputChange} />
            <input className="form-input typo-body" type="text" disabled value={employee.persDocument} />
            <input className="form-input typo-body" type="text" name="persPhone" value={employeEditData.persPhone} onChange={onInputChange} />
            <input className="form-input typo-body sm:col-span-2" type="email" name="persEmail" value={employeEditData.persEmail} onChange={onInputChange} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className="form-input typo-body"
              type="password"
              name="persPassword"
              value={employeEditData.persPassword}
              onChange={onInputChange}
              placeholder="Nueva contrasena"
            />
            <select className="form-select typo-body" name="emplState" value={String(employeEditData.emplState)} onChange={onInputChange}>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <input className="form-input typo-body" type="text" disabled value={employee.depaName} />
            <input className="form-input typo-body" type="text" disabled value={employee.cityName} />
            <input className="form-input typo-body" type="text" disabled value={employee.persAddress} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <input className="form-input typo-body" type="text" disabled value={employee.persDateBirth} />
            <select className="form-select typo-body" name="persRole" value={employeEditData.persRole} onChange={onInputChange}>
              <option value="Enfermera">Enfermero/a</option>
              <option value="Jefe de enfermeria">Jefe de enfermeria</option>
            </select>
            <input
              className="form-input typo-body"
              type="text"
              disabled
              value={employee.persSex === "M" ? "Masculino" : "Femenino"}
            />
          </div>

          <div className="flex justify-end">
            <button className="btn-primary typo-body" type="submit">
              Actualizar
            </button>
          </div>
        </form>
      ) : (
        <p className="text-center typo-body font-medium text-gray">Cargando datos...</p>
      )}
    </BaseModal>
  );
}
