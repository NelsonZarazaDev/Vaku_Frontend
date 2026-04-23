import React from "react";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import UseSendVaccineApplied from "../../hooks/sendVaccineApplied/UseSendVaccineApplied.JSX";
import BaseModal from "./BaseModal";

export default function EditVaccineModal({ onClose, vaccineData, onSaved }) {
  const { registerVaccine, onInputChange, onSubmit } = UseSendVaccineApplied({
    onSuccess: async () => {
      if (typeof onSaved === "function") {
        await onSaved();
      }
      onClose();
    },
  });
  const idVaccine = useChildrenAuthStore((state) => state.idVaccine);
  const selectedVaccine = vaccineData.find((item) => item.vaccId === idVaccine);

  return (
    <BaseModal onClose={onClose} size="sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="typo-modal-title">Registrar vacuna</h2>
          <button onClick={onClose} type="button" className="btn-secondary typo-caption">
            Cerrar
          </button>
        </div>

        {selectedVaccine ? (
          <form onSubmit={onSubmit} className="space-y-3">
            <input className="form-input typo-body" type="text" disabled value={selectedVaccine.vaccName} />
            <div className="grid grid-cols-2 gap-3">
              <input className="form-input typo-body" type="text" disabled value={selectedVaccine.vaccAgeDose} />
              <input className="form-input typo-body" type="text" disabled value={selectedVaccine.vaccDosage} />
            </div>

            <div>
              <label className="mb-1 block typo-caption font-semibold uppercase tracking-wide text-gray">Fecha proxima cita</label>
              <input
                className="form-input typo-body"
                type="date"
                name="vaapNextAppointmentDate"
                id="vaapNextAppointmentDate"
                value={registerVaccine.vaapNextAppointmentDate}
                onChange={onInputChange}
              />
            </div>

            <div className="flex justify-end pt-2">
              <button className="btn-primary typo-body" type="submit">
                Guardar
              </button>
            </div>
          </form>
        ) : (
          <p className="typo-body text-gray">No se encontro la vacuna seleccionada.</p>
        )}
      </div>
    </BaseModal>
  );
}
