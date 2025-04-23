import React from "react";

export default function RegisterEmployee() {
  return (
    <>
      <div className="px-5 md:px-20 w-full h-36 flex justify-center items-center">
        <p className="font-bold text-3xl text-dark-cyan">
          Registro de usuarios
        </p>
      </div>

      <div className="px-5 md:px-20 mb-10">
        <div className="p-6 flex justify-between items-center box-shadow-card rounded-2xl relative">
          <form action="" className="w-full">
            <div className="w-full space-y-4 font-semibold">
              <div className="font-bold text-3xl text-dark-green">
                Datos parentales
              </div>

              <div className="w-full flex gap-3">
                <input
                  className="w-full border border-background-card p-3 rounded-lg"
                  type="text"
                  name=""
                  id=""
                  placeholder="Nombres"
                />
                <input
                  className="w-full border border-background-card p-3 rounded-lg"
                  type="text"
                  name=""
                  id=""
                  placeholder="Apellidos"
                />
              </div>

              <div className="w-full flex gap-3">
                <input
                  className="w-[50%] border border-background-card p-3 rounded-lg"
                  type="text"
                  name=""
                  id=""
                  placeholder="Documento"
                />
                <input
                  className="w-[50%] border border-background-card p-3 rounded-lg"
                  type="text"
                  name=""
                  id=""
                  placeholder="Telefono"
                />

                <input
                  className="w-full border border-background-card p-3 rounded-lg"
                  type="email"
                  name=""
                  id=""
                  placeholder="Correo"
                />
              </div>

              <div className="flex gap-6">
                <div className="w-full space-y-4">
                  <p className="font-bold text-dark-green">Dirección</p>
                  <div className="flex gap-3">
                    <div className="w-full">
                      <div className="text-gray">Departamento</div>
                      <select
                        className="w-full border border-background-card p-3 rounded-lg"
                        name="select"
                      >
                        <option hidden selected>
                          Selecciona
                        </option>
                        <option value="value1">Value 1</option>
                        <option value="value2">Value 2</option>
                        <option value="value3">Value 3</option>
                      </select>
                    </div>

                    <div className="w-full">
                      <div className="text-gray">Municipio</div>
                      <select
                        className="w-full border border-background-card p-3 rounded-lg"
                        name="select"
                      >
                        <option className="text-gray" hidden selected>
                          Selecciona
                        </option>
                        <option value="value1">Value 1</option>
                        <option value="value2">Value 2</option>
                        <option value="value3">Value 3</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <input
                      className="border w-full border-background-card p-3 rounded-lg"
                      type="text"
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
                    />
                  </div>

                  <div className="w-full">
                      <div className="text-gray">Rol / Cargo</div>
                      <select
                        className="w-full border border-background-card p-3 rounded-lg"
                        name="select"
                      >
                        <option hidden selected>
                          Selecciona
                        </option>
                        <option value="value1">Enfermero/a</option>
                        <option value="value2">Jefe de enfermeria</option>
                      </select>
                    </div>
                </div>
              </div>

              <div className="space-y-2 text-gray">
                <p className="font-bold text-dark-green">Sexo</p>
                <div className="space-x-2">
                  <input className="accent-accent" type="radio" name="" id="" />
                  <label htmlFor="">Femenino</label>
                </div>
                <div className="space-x-2">
                  <input className="accent-accent" type="radio" name="" id="" />
                  <label htmlFor="">Masculino</label>
                </div>
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
