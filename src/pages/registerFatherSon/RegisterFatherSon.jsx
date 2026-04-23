import React from "react";
import UseRegisterFatherSon from "../../hooks/registerFatherSon/UseRegisterFatherSon";
import Department from "../../components/department/Department";
import City from "../../components/city/City";
import Sex from "../../components/sex/Sex";

export default function RegisterFatherSon() {
  const { fatherSonData, onInputChange, onSubmit } = UseRegisterFatherSon();

  return (
    <section className="space-y-4">
      <header className="page-header">
        <div>
          <h1 className="page-title">Registro de nino y acudiente</h1>
          <p className="page-subtitle">Datos clinicos y de contacto en un solo formulario.</p>
        </div>
      </header>

      <div className="section-card p-4 sm:p-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-dark-green">Datos del nino</h2>

              <div className="grid gap-3 sm:grid-cols-2">
                <input className="form-input text-sm" type="text" name="1-persNames" id="1-persNames" value={fatherSonData[1].persNames} onChange={onInputChange} placeholder="Nombres" />
                <input className="form-input text-sm" type="text" name="1-persLastNames" id="1-persLastNames" value={fatherSonData[1].persLastNames} onChange={onInputChange} placeholder="Apellidos" />
              </div>

              <input className="form-input text-sm" type="text" name="1-persDocument" id="1-persDocument" value={fatherSonData[1].persDocument} onChange={onInputChange} placeholder="Documento" />

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray">Sexo</p>
                <div className="flex flex-wrap gap-2">
                  <Sex name={`1-persSex`} id={`1-persSex-f`} value={"F"} checked={fatherSonData[1].persSex === "F"} onChange={onInputChange} label={"Femenino"} />
                  <Sex name={`1-persSex`} id={`1-persSex-m`} value={"M"} checked={fatherSonData[1].persSex === "M"} onChange={onInputChange} label={"Masculino"} />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Department />
                <City name={`1-cityId`} id={`1-cityId`} value={fatherSonData[1].citys.cityId} onChange={onInputChange} />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray">Fecha de nacimiento</label>
                <input className="form-input w-full text-sm sm:max-w-[220px]" type="date" name="1-persDateBirth" id="1-persDateBirth" value={fatherSonData[1].persDateBirth} onChange={onInputChange} />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-base font-semibold text-dark-green">Datos del acudiente</h2>

              <div className="grid gap-3 sm:grid-cols-2">
                <input className="form-input text-sm" type="text" name="0-persNames" id="0-persNames" value={fatherSonData[0].persNames} onChange={onInputChange} placeholder="Nombres" />
                <input className="form-input text-sm" type="text" name="0-persLastNames" id="0-persLastNames" value={fatherSonData[0].persLastNames} onChange={onInputChange} placeholder="Apellidos" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <input className="form-input text-sm" type="text" name="0-persDocument" id="0-persDocument" value={fatherSonData[0].persDocument} onChange={onInputChange} placeholder="Documento" />
                <input className="form-input text-sm" type="text" name="0-persPhone" id="0-persPhone" value={fatherSonData[0].persPhone} onChange={onInputChange} placeholder="Telefono" />
              </div>

              <input className="form-input text-sm" type="email" name="0-persEmail" id="0-persEmail" value={fatherSonData[0].persEmail} onChange={onInputChange} placeholder="Correo" />

              <select className="form-select text-sm" name="0-persRole" id="0-persRole" value={fatherSonData[0].persRole} onChange={onInputChange}>
                <option value="" disabled>
                  Selecciona parentesco
                </option>
                <option value="Madre">Madre</option>
                <option value="Padre">Padre</option>
              </select>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray">Sexo</p>
                <div className="flex flex-wrap gap-2">
                  <Sex name={`0-persSex`} id={`0-persSex-f`} value={"F"} checked={fatherSonData[0].persSex === "F"} onChange={onInputChange} label={"Femenino"} />
                  <Sex name={`0-persSex`} id={`0-persSex-m`} value={"M"} checked={fatherSonData[0].persSex === "M"} onChange={onInputChange} label={"Masculino"} />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Department />
                <City name={`0-cityId`} id={`0-cityId`} value={fatherSonData[0].citys.cityId} onChange={onInputChange} />
              </div>

              <input className="form-input text-sm" type="text" name="0-persAddress" id="0-persAddress" onChange={onInputChange} value={fatherSonData[0].persAddress} placeholder="Barrio / Casa" />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn-primary text-sm" type="submit">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
