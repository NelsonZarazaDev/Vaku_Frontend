import UseEmployeViewModal from "../../hooks/employeViewModal/UseEmployeViewModal";

export default function EmployeeViewModal({ isOpen, onClose }) {
  const { employeeData } = UseEmployeViewModal();

  console.log(employeeData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-500/75 bg-opacity-50"
        onClick={onClose}
      />

      <div className="bg-white p-6 z-50 rounded-xl shadow-lg md:m-20 w-full">
        {employeeData.length > 0 ? (
          <form className="w-full space-y-4 font-semibold">
            <div className="font-bold text-3xl text-dark-green">
              Datos parentales
            </div>

            <div className="w-full flex gap-3">
              <input
                className="w-full border border-background-card p-3 rounded-lg"
                type="text"
                name="persNames"
                disabled
                value={employeeData[0].persNames}
                placeholder="Nombres"
              />
              <input
                className="w-full border border-background-card p-3 rounded-lg"
                type="text"
                name="persLastNames"
                disabled
                value={employeeData[0].persLastNames}
                placeholder="Apellidos"
              />
            </div>

            <div className="w-full flex gap-3">
              <input
                className="w-[50%] border border-background-card p-3 rounded-lg"
                type="text"
                name="persDocument"
                disabled
                value={employeeData[0].persDocument}
                placeholder="Documento"
              />
              <input
                className="w-[50%] border border-background-card p-3 rounded-lg"
                type="text"
                name="persPhone"
                disabled
                value={employeeData[0].persPhone}
                placeholder="Telefono"
              />
            </div>

            <input
              className="w-full border border-background-card p-3 rounded-lg"
              type="email"
              name="persEmail"
              disabled
              value={employeeData[0].persEmail}
              placeholder="Correo"
            />

            <div className="flex gap-6">
              <div className="w-full space-y-4">
                <p className="font-bold text-dark-green">Dirección</p>
                <div className="flex gap-3">
                  <input
                    className="border w-full border-background-card p-3 rounded-lg"
                    type="text"
                    value={employeeData[0].depaName}
                    disabled
                    placeholder="Departamento"
                  />
                  <input
                    className="border w-full border-background-card p-3 rounded-lg"
                    type="text"
                    value={employeeData[0].cityName}
                    disabled
                    placeholder="Ciudad"
                  />
                </div>
                <input
                  className="border w-full border-background-card p-3 rounded-lg"
                  type="text"
                  name="persAddress"
                  disabled
                  value={employeeData[0].persAddress}
                  placeholder="Barrio / Casa"
                />
              </div>

              <div className="flex w-full gap-3">
                <div className="flex flex-col w-full">
                  <label className="text-gray">Fecha</label>
                  <input
                    className="border border-background-card p-3 rounded-lg"
                    type="text"
                    disabled
                    name="persDateBirth"
                    value={employeeData[0].persDateBirth}
                  />
                </div>

                <div className="w-full">
                  <div className="text-gray">Rol / Cargo</div>
                  <input
                    className="border border-background-card p-3 rounded-lg"
                    type="text"
                    disabled
                    name="persRole"
                    value={employeeData[0].persRole}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-dark-green">Sexo</p>
              <input
                className="border border-background-card p-3 rounded-lg"
                type="text"
                disabled
                value={
                  employeeData[0].persSex === "M" ? "Masculino" : "Femenino"
                }
                placeholder="Sexo"
              />
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
