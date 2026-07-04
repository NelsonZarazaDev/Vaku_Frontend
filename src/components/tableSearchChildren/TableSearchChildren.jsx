import React from "react";
import { FiEdit2, FiEye } from "react-icons/fi";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routePath";

export default function TableSearchChildren({ data }) {
  const { setChildrenAuthStore } = useChildrenAuthStore();
  const navigate = useNavigate();
  const rows = Array.isArray(data) ? data : data ? [data] : [];

  const goToVaccinationCard = (mode, child) => {
    setChildrenAuthStore({
      persDocument: child.childDocument,
      idChildren: child.chilId,
      emailParent: child.parentEmail,
    });
    navigate(`${ROUTE_PATHS.HOME}/${ROUTE_PATHS.VACCINATIONCARD}`, {
      state: { mode },
    });
  };

  return (
    <div className="mt-4 section-card p-4 sm:p-5">
      <div className="data-table-wrap">
        <table className="data-table min-w-[620px]">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Fecha nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((child) => (
                <tr key={child.chilId || child.childDocument}>
                  <td>
                    {child.childNames} {child.childLastNames}
                  </td>
                  <td>{child.childDocument}</td>
                  <td>{child.childBirthDate}</td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => goToVaccinationCard("view", child)}
                        className="rounded-lg border border-border p-1.5 icon-sm text-dark-cyan hover:bg-secondary"
                        type="button"
                        title="Ver esquema"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => goToVaccinationCard("edit", child)}
                        className="rounded-lg border border-border p-1.5 icon-sm text-dark-cyan hover:bg-secondary"
                        type="button"
                        title="Editar esquema"
                      >
                        <FiEdit2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center typo-caption">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
