import UseEmployeEditModal from "../../hooks/employeEditModal/UseEmployeEditModal";
import UseEmployeViewModal from "../../hooks/employeViewModal/UseEmployeViewModal";

export default function EmployeeEditModal({ isOpen, onClose }) {
  const { employeeData } = UseEmployeViewModal();
  const { employeEditData, onInputChange, onSubmit } = UseEmployeEditModal({ empleado: employeeData[0] });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-500/75 bg-opacity-50"
        onClick={onClose}
      />

      <div className="bg-white p-6 z-50 rounded-xl shadow-lg md:m-20 w-full">
        {employeeData.length > 0 ? (
          <form onSubmit={onSubmit} className="w-full">
            <div className="w-full space-y-4 font-semibold">
              <div className="font-bold text-3xl text-dark-green">
                Datos del empleado
              </div>

              <div className="w-full flex gap-3">
                <input
                  className="w-full border border-background-card p-3 rounded-lg"
                  type="text"
                  name="persNames"
                  id="persNames"
                  placeholder={employeeData[0].persNames}
                  value={employeeData.persNames}
                  onChange={onInputChange}
                />
                <input
                  className="w-full border border-background-card p-3 rounded-lg"
                  type="text"
                  name="persLastNames"
                  id="persLastNames"
                  placeholder={employeeData[0].persLastNames}
                  value={employeeData.persLastNames}
                  onChange={onInputChange}
                />
              </div>

              <div className="w-full flex gap-3">
                <input
                  className="w-[50%] border border-background-card p-3 rounded-lg"
                  disabled
                  type="text"
                  name="persDocument"
                  id="persDocument"
                  value={employeeData[0].persDocument}
                  placeholder="Documento"
                />
                <input
                  className="w-[50%] border border-background-card p-3 rounded-lg"
                  type="text"
                  name="persPhone"
                  id="persPhone"
                  placeholder={employeeData[0].persPhone}
                  value={employeEditData.persPhone}
                  onChange={onInputChange}
                />

                <input
                  className="w-full border border-background-card p-3 rounded-lg"
                  type="email"
                  name="persEmail"
                  id="persEmail"
                  placeholder={employeeData[0].persEmail}
                  value={employeeData.persEmail}
                  onChange={onInputChange}
                />
              </div>

              <div className="w-full flex gap-3">
                <input
                  className="w-full border border-background-card p-3 rounded-lg"
                  type="password"
                  name="persPassword"
                  id="persPassword"
                  placeholder="Contraseña"
                  value={employeeData.persPassword}
                  onChange={onInputChange}
                />
                <div className="w-full">
                  <select
                    className="w-full border border-background-card p-3 rounded-lg"
                    name="emplState"
                    id="emplState"
                    value={employeeData.emplState}
                    onChange={onInputChange}
                  >
                    <option hidden selected>
                      {employeeData[0].emplState}
                    </option>
                    <option value={true}>Activo</option>
                    <option value={false}>Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-full space-y-4">
                  <p className="font-bold text-dark-green">Dirección</p>
                  <div className="flex gap-3">
                    <input
                      className="border w-full border-background-card p-3 rounded-lg"
                      type="text"
                      name="depaName"
                      id="depaName"
                      value={employeeData[0].depaName}
                      disabled
                      placeholder="Departmento"
                    />

                    <input
                      className="border w-full border-background-card p-3 rounded-lg"
                      type="text"
                      name="cityName"
                      id="cityName"
                      value={employeeData[0].cityName}
                      disabled
                      placeholder="Ciudad"
                    />
                  </div>

                  <div>
                    <input
                      className="border w-full border-background-card p-3 rounded-lg"
                      type="text"
                      name="persAddress"
                      id="persAddress"
                      disabled
                      value={employeeData[0].persAddress}
                      placeholder="Barrio / Casa"
                    />
                  </div>
                </div>

                <div className="flex w-full gap-3">
                  <div className="flex flex-col w-full">
                    <label className="text-gray">Fecha</label>
                    <input
                      className="border border-background-card p-3 rounded-lg"
                      type="text"
                      disabled
                      name="persDateBirth"
                      id="persDateBirth"
                      value={employeeData[0].persDateBirth}
                    />
                  </div>

                  <div className="w-full">
                    <div className="text-gray">Rol / Cargo</div>
                    <select
                      className="w-full border border-background-card p-3 rounded-lg"
                      name="persRole"
                      id="persRole"
                      value={employeeData.persRole}
                      onChange={onInputChange}
                    >
                      <option hidden selected>
                        {employeeData[0].persRole}
                      </option>
                      <option value="Enfermera">Enfermero/a</option>
                      <option value="Jefe de enfermería">
                        Jefe de enfermeria
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-dark-green">Sexo</p>
                <input
                  className="border border-background-card p-3 rounded-lg"
                  type="text"
                  disabled
                  name="persSex"
                  id="persSex"
                  value={
                    employeeData[0].persSex == "M" ? "Masculina" : "Femenina"
                  }
                  placeholder="Sexo"
                />
              </div>
            </div>

            <input 
                  className="w-full border border-background-card p-3 rounded-lg"
                  type="hidden"
                  name="token"
                  id="token"
                  disabled
                  value={employeeData.emplToken}
                  onChange={onInputChange}
                />

            <div className="flex justify-end gap-4 mt-5">
              <button className="bg-button flex justify-center items-center font-bold text-surface box-shadow-card rounded-full w-30 h-10 cursor-pointer">
                Actualizar
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center font-bold text-gray-600">
            Cargando datos...
          </p>
        )}
      </div>
    </div>
  );
}
