import React from "react";
import ButtonEmailPriority from "../../components/buttonEmailPriority/ButtonEmailPriority";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import UsePriority from "../../hooks/priority/UsePriority";

export default function Priority() {
  const {
    priorityData,
    page,
    size,
    setSize,
    totalPages,
    totalElements,
    loading,
    fetchPriority,
    notifyEmail,
  } = UsePriority(10);

  return (
    <section className="space-y-4">
      <header className="page-header">
        <div>
          <h1 className="page-title">Prioridad de vacunacion</h1>
          <p className="page-subtitle">
            Lista de pacientes con cita pendiente o vencida. Total: {totalElements}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="typo-caption" htmlFor="priority-page-size">
            Registros
          </label>
          <select
            id="priority-page-size"
            className="form-select !w-[92px] !py-2"
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <ButtonEmailPriority onNotify={notifyEmail} />
        </div>
      </header>

      <div className="space-y-3">
        {loading ? (
          <p className="typo-caption text-center">Cargando prioridad...</p>
        ) : priorityData.length === 0 ? (
          <p className="typo-caption text-center">No hay pacientes en prioridad.</p>
        ) : (
          priorityData.map((child, index) => (
            <div
              key={`${child.childDocument}-${index}`}
              className="section-card flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div className="flex items-center gap-2">
                <HiOutlineExclamationTriangle className="icon-md text-error" />
                <div className="typo-body">
                  <div>
                    {child.childNames} {child.childLastNames}
                  </div>
                  <div className="typo-caption">Documento: {child.childDocument}</div>
                </div>
              </div>

              <div className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-dark-green">
                Fecha: {child.vaapNextAppointmentDate}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="btn-secondary typo-caption"
          disabled={page <= 0 || loading}
          onClick={() => fetchPriority(page - 1)}
        >
          Anterior
        </button>
        <span className="typo-caption">
          Pagina {Math.max(page + 1, 1)} de {Math.max(totalPages, 1)}
        </span>
        <button
          type="button"
          className="btn-secondary typo-caption"
          disabled={page >= Math.max(totalPages, 1) - 1 || loading}
          onClick={() => fetchPriority(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}
