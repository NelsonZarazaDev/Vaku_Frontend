import React from "react";
import UseRegisterFatherSon from "../../hooks/registerFatherSon/UseRegisterFatherSon";
import Department from "../../components/department/Department";
import City from "../../components/city/City";
import Sex from "../../components/sex/Sex";

export default function RegisterFatherSon() {
  const { fatherSonData, onInputChange, onSubmit } = UseRegisterFatherSon();

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
          <form onSubmit={onSubmit} className="w-full">
            <div className="flex w-full gap-6 font-semibold">
              <div className="w-full space-y-4">
                <div className="font-bold text-3xl text-dark-green">
                  Datos personales
                </div>

                <div className="w-full flex gap-3">
                  <input
                    className="w-full border border-background-card p-3 rounded-lg"
                    type="text"
                    name="1-persNames"
                    id="1-persNames"
                    value={fatherSonData[1].persNames}
                    onChange={onInputChange}
                    placeholder="Nombres"
                  />
                  <input
                    className="w-full border border-background-card p-3 rounded-lg"
                    type="text"
                    name="1-persLastNames"
                    id="1-persLastNames"
                    value={fatherSonData[1].persLastNames}
                    onChange={onInputChange}
                    placeholder="Apellidos"
                  />
                </div>

                <div>
                  <input
                    className="w-full border border-background-card p-3 rounded-lg"
                    type="text"
                    name="1-persDocument"
                    id="1-persDocument"
                    value={fatherSonData[1].persDocument}
                    onChange={onInputChange}
                    placeholder="Documento"
                  />
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-dark-green">Sexo</p>
                  <Sex
                    name={`1-persSex`}
                    id={`1-persSex`}
                    value={"F"}
                    checked={fatherSonData[1].persSex === "F"}
                    onChange={onInputChange}
                    label={"Femenino"}
                  />
                  <Sex
                    name={`1-persSex`}
                    id={`1-persSex`}
                    value={"M"}
                    checked={fatherSonData[1].persSex === "M"}
                    onChange={onInputChange}
                    label={"Masculino"}
                  />
                </div>

                <p className="font-bold text-dark-green text-lg">
                  Fecha y lugar de nacimiento
                </p>

                <div className="flex gap-3">
                  <Department />

                  <City
                    name={`1-cityId`}
                    id={`1-cityId`}
                    value={fatherSonData[1].citys.cityId}
                    onChange={onInputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray">Fecha</label>
                  <input
                    className="border w-[50%] border-background-card p-3 rounded-lg"
                    type="date"
                    name="1-persDateBirth"
                    id="1-persDateBirth"
                    value={fatherSonData[1].persDateBirth}
                    onChange={onInputChange}
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
                    name="0-persNames"
                    id="0-persNames"
                    value={fatherSonData[0].persNames}
                    onChange={onInputChange}
                    placeholder="Nombres"
                  />
                  <input
                    className="w-full border border-background-card p-3 rounded-lg"
                    type="text"
                    name="0-persLastNames"
                    id="0-persLastNames"
                    value={fatherSonData[0].persLastNames}
                    onChange={onInputChange}
                    placeholder="Apellidos"
                  />
                </div>

                <div className="w-full flex gap-3">
                  <input
                    className="w-full border border-background-card p-3 rounded-lg"
                    type="text"
                    name="0-persDocument"
                    id="0-persDocument"
                    value={fatherSonData[0].persDocument}
                    onChange={onInputChange}
                    placeholder="Documento"
                  />
                  <input
                    className="w-full border border-background-card p-3 rounded-lg"
                    type="text"
                    name="0-persPhone"
                    id="0-persPhone"
                    value={fatherSonData[0].persPhone}
                    onChange={onInputChange}
                    placeholder="Telefono"
                  />
                </div>

                <div>
                  <input
                    className="w-full border border-background-card p-3 rounded-lg"
                    type="email"
                    name="0-persEmail"
                    id="0-persEmail"
                    value={fatherSonData[0].persEmail}
                    onChange={onInputChange}
                    placeholder="Correo"
                  />
                </div>

                <div className="w-full">
                  <p className="font-bold text-dark-green">Parentesco</p>

                  <select
                    className="w-full border border-background-card p-3 rounded-lg"
                    name="0-persRole"
                    id="0-persRole"
                    value={fatherSonData[0].persRole}
                    onChange={onInputChange}
                  >
                    <option hidden selected>
                      Selecciona
                    </option>
                    <option value="Madre">Madre</option>
                    <option value="Padre">Padre</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-dark-green">Sexo</p>
                  <Sex
                    name={`0-persSex`}
                    id={`0-persSex`}
                    value={"F"}
                    checked={fatherSonData[0].persSex === "F"}
                    onChange={onInputChange}
                    label={"Femenino"}
                  />
                  <Sex
                    name={`0-persSex`}
                    id={`0-persSex`}
                    value={"M"}
                    checked={fatherSonData[0].persSex === "M"}
                    onChange={onInputChange}
                    label={"Masculino"}
                  />
                </div>

                <p className="font-bold text-dark-green text-xl">Dirección</p>
                <div className="flex gap-3">
                  <Department />

                  <City
                    name={`0-cityId`}
                    id={`0-cityId`}
                    value={fatherSonData[0].citys.cityId}
                    onChange={onInputChange}
                  />
                </div>

                <div>
                  <input
                    className="border w-full border-background-card p-3 rounded-lg"
                    type="text"
                    name="0-persAddress"
                    id="0-persAddress"
                    onChange={onInputChange}
                    value={fatherSonData[0].persAddress}
                    placeholder="Barrio / Casa"
                  />
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
