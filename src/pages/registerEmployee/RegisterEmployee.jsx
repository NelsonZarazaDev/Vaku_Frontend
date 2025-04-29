import React from "react";
import Department from "../../components/department/Department";
import City from "../../components/city/City";
import UseRegisterEmployee from "../../hooks/registerEmployee/UseRegisterEmployee";
import Sex from "../../components/sex/Sex";

export default function RegisterEmployee() {
  const { employeeData, onInputChange, onSubmit } = UseRegisterEmployee();

  return (
    <>
      <div className="px-5 md:px-20 w-full h-36 flex justify-center items-center">
        <p className="font-bold text-3xl text-dark-cyan">
          Registro de usuarios
        </p>
      </div>

      <div className="px-5 md:px-20 mb-10">
        <div className="p-6 flex justify-between items-center box-shadow-card rounded-2xl relative">
          <form onSubmit={onSubmit} className="w-full">
            <div className="w-full space-y-4 font-semibold">
              <div className="font-bold text-3xl text-dark-green">
                Datos parentales
              </div>

              <div className="w-full flex gap-3">
                <input
                  className="w-full border border-background-card p-3 rounded-lg"
                  type="text"
                  name="persNames"
                  id="persNames"
                  value={employeeData[0].persNames}
                  onChange={onInputChange}
                  placeholder="Nombres"
                />
                <input
                  className="w-full border border-background-card p-3 rounded-lg"
                  type="text"
                  name="persLastNames"
                  id="persLastNames"
                  value={employeeData[0].persLastNames}
                  onChange={onInputChange}
                  placeholder="Apellidos"
                />
              </div>

              <div className="w-full flex gap-3">
                <input
                  className="w-[50%] border border-background-card p-3 rounded-lg"
                  type="text"
                  name="persDocument"
                  id="persDocument"
                  value={employeeData[0].persDocument}
                  onChange={onInputChange}
                  placeholder="Documento"
                />
                <input
                  className="w-[50%] border border-background-card p-3 rounded-lg"
                  type="text"
                  name="persPhone"
                  id="persPhone"
                  value={employeeData[0].persPhone}
                  onChange={onInputChange}
                  placeholder="Telefono"
                />

                <input
                  className="w-full border border-background-card p-3 rounded-lg"
                  type="email"
                  name="persEmail"
                  id="persEmail"
                  value={employeeData[0].persEmail}
                  onChange={onInputChange}
                  placeholder="Correo"
                />
              </div>

              <input
                  className="w-full border border-background-card p-3 rounded-lg"
                  type="password"
                  name="persPassword"
                  id="persPassword"
                  value={employeeData[0].persPassword}
                  onChange={onInputChange}
                  placeholder="Contraseña"
                />

              <div className="flex gap-6">
                <div className="w-full space-y-4">
                  <p className="font-bold text-dark-green">Dirección</p>
                  <div className="flex gap-3">
                    <Department />

                    <City
                      name={`cityId`}
                      id={`cityId`}
                      value={employeeData[0].citys.cityId}
                      onChange={onInputChange}
                    />
                  </div>

                  <div>
                    <input
                      className="border w-full border-background-card p-3 rounded-lg"
                      type="text"
                      name="persAddress"
                      id="persAddress"
                      value={employeeData[0].persAddress}
                      onChange={onInputChange}
                      placeholder="Barrio / Casa"
                    />
                  </div>
                </div>

                <div className="flex w-full gap-3">
                  <div className="flex flex-col w-full">
                    <label className="text-gray">Fecha</label>
                    <input
                      className="border border-background-card p-3 rounded-lg"
                      type="date"
                      name="persDateBirth"
                      id="persDateBirth"
                      value={employeeData[0].persDateBirth}
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="w-full">
                    <div className="text-gray">Rol / Cargo</div>
                    <select
                      className="w-full border border-background-card p-3 rounded-lg"
                      name="persRole"
                      id="persRole"
                      value={employeeData[0].persRole}
                      onChange={onInputChange}
                    >
                      <option hidden selected>
                        Selecciona
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
                <Sex
                  name={`persSex`}
                  id={`persSex`}
                  value={"F"}
                  checked={employeeData[0].persSex === "F"}
                  onChange={onInputChange}
                  label={"Femenino"}
                />
                <Sex
                  name={`persSex`}
                  id={`persSex`}
                  value={"M"}
                  checked={employeeData[0].persSex === "M"}
                  onChange={onInputChange}
                  label={"Masculino"}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-5">
              <button className="flex justify-center items-center font-bold text-text box-shadow-card rounded-full w-30 h-10 cursor-pointer">
                Cancelar
              </button>
              <button className="bg-button flex justify-center items-center font-bold text-surface box-shadow-card rounded-full w-30 h-10 cursor-pointer">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
