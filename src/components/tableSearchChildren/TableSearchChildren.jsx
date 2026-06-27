import React from "react";
import { FiEdit2, FiEye } from "react-icons/fi";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routePath";

export default function TableSearchChildren({ data }) {
  const { setChildrenAuthStore } = useChildrenAuthStore();
  const navigate = useNavigate();

  const goToVaccinationCard = (mode) => {
    setChildrenAuthStore({
      persDocument: data.childDocument,
      idChildren: data.chilId,
      emailParent: data.parentEmail,
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
            {data ? (
              <tr>
                <td>
                  {data.childNames} {data.childLastNames}
                </td>
                <td>{data.childDocument}</td>
                <td>{data.parentBirthDate}</td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => goToVaccinationCard("view")}
                      className="rounded-lg border border-border p-1.5 icon-sm text-dark-cyan hover:bg-secondary"
                      type="button"
                      title="Ver esquema"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => goToVaccinationCard("edit")}
                      className="rounded-lg border border-border p-1.5 icon-sm text-dark-cyan hover:bg-secondary"
                      type="button"
                      title="Editar esquema"
                    >
                      <FiEdit2 />
                    </button>
                  </div>
                </td>
              </tr>
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
