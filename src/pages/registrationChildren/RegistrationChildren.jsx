import React from "react";

export default function RegistrationChildren() {
  return (
    <>
      <div className="px-5 md:px-20 w-full h-36 flex flex-col justify-center items-center">
        <p className="font-bold text-3xl text-dark-cyan">Registro de niños</p>
        <p className="text-2xl font-medium">
          Completa los datos para crear el pefil del niño
        </p>
      </div>

      <div className="px-5 md:px-20 mb-10">
        <div className="p-6 flex justify-between items-center box-shadow-card rounded-2xl relative">
          <form action="" className="w-full">
            <div className="flex w-full gap-6 font-semibold">
              <div className="w-full space-y-4">
                <div className="font-bold text-3xl text-dark-green">
                  Datos personales
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

                <div>
                  <input
                    className="w-full border border-background-card p-3 rounded-lg"
                    type="text"
                    name=""
                    id=""
                    placeholder="Documento"
                  />
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-dark-green">Sexo</p>
                  <div className="space-x-2">
                    <input
                      className="accent-accent"
                      type="radio"
                      name=""
                      id=""
                    />
                    <label className="text-gray">Femenino</label>
                  </div>
                  <div className="space-x-2">
                    <input
                      className="accent-accent"
                      type="radio"
                      name=""
                      id=""
                    />
                    <label className="text-gray">Masculino</label>
                  </div>
                </div>

                <p className="font-bold text-dark-green text-lg">Fecha y lugar de nacimiento</p>

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
                      <option hidden selected>
                        Selecciona
                      </option>
                      <option value="value1">Value 1</option>
                      <option value="value2">Value 2</option>
                      <option value="value3">Value 3</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-gray">Fecha</label>
                  <input
                    className="border w-[50%] border-background-card p-3 rounded-lg"
                    type="date"
                  />
                </div>
              </div>

              <div className="w-full space-y-4">
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
                    className="w-full border border-background-card p-3 rounded-lg"
                    type="text"
                    name=""
                    id=""
                    placeholder="Documento"
                  />
                  <input
                    className="w-full border border-background-card p-3 rounded-lg"
                    type="text"
                    name=""
                    id=""
                    placeholder="Telefono"
                  />
                </div>

                <div>
                  <input className="w-full border border-background-card p-3 rounded-lg" type="email" name="" id="" placeholder="Correo" />
                </div>


                <div className="w-full">
                    <p className="font-bold text-dark-green">Parentesco</p>

                    <select
                      className="w-full border border-background-card p-3 rounded-lg"
                      name="select"
                    >
                      <option hidden selected>
                        Selecciona
                      </option>
                      <option value="value1">Madre</option>
                      <option value="value2">Padre</option>
                    </select>
                  </div>


                  <div className="space-y-2">
                  <p className="font-bold text-dark-green">Sexo</p>
                  <div className="space-x-2">
                    <input
                      className="accent-accent"
                      type="radio"
                      name=""
                      id=""
                    />
                    <label className="text-gray">Femenino</label>
                  </div>
                  <div className="space-x-2">
                    <input
                      className="accent-accent"
                      type="radio"
                      name=""
                      id=""
                    />
                    <label className="text-gray">Masculino</label>
                  </div>
                </div>


                <p className="font-bold text-dark-green text-xl">Dirección</p>
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
                      <option hidden selected>
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
                    type="text" placeholder="Barrio / Casa"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-5">
              <button className='flex justify-center items-center font-bold text-text box-shadow-card rounded-full w-30 h-10 cursor-pointer'>Cancelar</button>
              <button className='bg-button flex justify-center items-center font-bold text-surface box-shadow-card rounded-full w-30 h-10 cursor-pointer'>Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
