import React from "react";
import Department from "../../components/department/Department";
import City from "../../components/city/City";
import UseRegisterEmployee from "../../hooks/registerEmployee/UseRegisterEmployee";
import Sex from "../../components/sex/Sex";

export default function RegisterEmployee() {
  const { employeeData, onInputChange, onSubmit } = UseRegisterEmployee();

  return (
    <section className="space-y-4">
      <header className="page-header">
        <div>
          <h1 className="page-title">Registro de empleados</h1>
          <p className="page-subtitle">Completa la informacion del usuario del sistema.</p>
        </div>
      </header>

      <div className="section-card p-4 sm:p-6">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid gap-3 md:grid-cols-2">
            <input className="form-input text-sm" type="text" name="persNames" id="persNames" value={employeeData[0].persNames} onChange={onInputChange} placeholder="Nombres" />
            <input className="form-input text-sm" type="text" name="persLastNames" id="persLastNames" value={employeeData[0].persLastNames} onChange={onInputChange} placeholder="Apellidos" />
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <input className="form-input text-sm" type="text" name="persDocument" id="persDocument" value={employeeData[0].persDocument} onChange={onInputChange} placeholder="Documento" />
            <input className="form-input text-sm" type="text" name="persPhone" id="persPhone" value={employeeData[0].persPhone} onChange={onInputChange} placeholder="Telefono" />
            <input className="form-input text-sm" type="email" name="persEmail" id="persEmail" value={employeeData[0].persEmail} onChange={onInputChange} placeholder="Correo" />
          </div>

          <input className="form-input text-sm" type="password" name="persPassword" id="persPassword" value={employeeData[0].persPassword} onChange={onInputChange} placeholder="Contrasena" />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray">Direccion</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Department />
                <City name={`cityId`} id={`cityId`} value={employeeData[0].citys.cityId} onChange={onInputChange} />
              </div>
              <input className="form-input text-sm" type="text" name="persAddress" id="persAddress" value={employeeData[0].persAddress} onChange={onInputChange} placeholder="Barrio / Casa" />
            </div>

            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray">Fecha</label>
                  <input className="form-input text-sm" type="date" name="persDateBirth" id="persDateBirth" value={employeeData[0].persDateBirth} onChange={onInputChange} />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray">Rol / Cargo</label>
                  <select className="form-select text-sm" name="persRole" id="persRole" value={employeeData[0].persRole} onChange={onInputChange}>
                    <option value="" disabled>
                      Selecciona
                    </option>
                    <option value="Enfermera">Enfermero/a</option>
                    <option value="Jefe de enfermería">Jefe de enfermeria</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray">Sexo</p>
                <div className="flex flex-wrap gap-2">
                  <Sex name={`persSex`} id={`persSex-f`} value={"F"} checked={employeeData[0].persSex === "F"} onChange={onInputChange} label={"Femenino"} />
                  <Sex name={`persSex`} id={`persSex-m`} value={"M"} checked={employeeData[0].persSex === "M"} onChange={onInputChange} label={"Masculino"} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn-primary text-sm" type="submit">
              Registrar empleado
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
