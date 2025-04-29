import React from "react";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import UseSendVaccineApplied from "../../hooks/sendVaccineApplied/UseSendVaccineApplied.JSX";

export default function ViewVaccinationCardModal({ onClose, vaccineData }) {
  const { registerVaccine, onInputChange, onSubmit } = UseSendVaccineApplied();

  const idVaccine = useChildrenAuthStore((state) => state.idVaccine);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-500/75 bg-opacity-50"
        onClick={onClose}
      />

      <div className="bg-white p-6 z-50 rounded-xl shadow-lg md:m-20 w-full">
        <div className="text-4xl font-bold text-text my-4">
          Registrar vacuna
        </div>
        {vaccineData.map((vaccineInfo, index) => {
          return idVaccine === vaccineInfo.vaccId ? (
            <form onSubmit={onSubmit}>
              <div className="flex flex-col space-y-6">
                <div className="flex space-x-3">
                  <input
                    className="border w-[50%] border-background-card p-3 rounded-lg"
                    type="text"
                    disabled
                    value={vaccineInfo.vaccName}
                  />
                  <input
                    className="border w-[50%] border-background-card p-3 rounded-lg"
                    type="text"
                    disabled
                    value={vaccineInfo.vaccAgeDose}
                  />
                </div>
                <input
                  className="border w-[50%] border-background-card p-3 rounded-lg"
                  type="text"
                  disabled
                  value={vaccineInfo.vaccDosage}
                />

                <div className="flex flex-col">
                  <label className="text-gray">Fecha</label>
                  <input
                    className="border w-[50%] border-background-card p-3 rounded-lg"
                    type="date"
                    name="vaapNextAppointmentDate"
                    id="vaapNextAppointmentDate"
                    value={registerVaccine.vaapNextAppointmentDate}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="w-full flex justify-center mt-10">
                <button className="bg-button flex justify-center items-center font-bold text-surface box-shadow-card rounded-full w-30 h-10 cursor-pointer">
                  Register
                </button>
              </div>
            </form>
          ) : null; // Si no cumple la condición, retorna null en lugar de ""
        })}
      </div>
    </div>
  );
}
