import React from "react";
import { Navigate } from "react-router";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import UseAuditLogs from "../../hooks/audit/UseAuditLogs";
import useEmployeeAuthStore from "../../store/authEmployee/useEmployeeAuthStore";
import { ROUTE_PATHS } from "../../constants/routePath";
import { isHeadNurseRole } from "../../utils/roles";

export default function Audit() {
  const role = useEmployeeAuthStore((state) => state.employeeInfo.persRole);
  const canViewAudit = isHeadNurseRole(role);
  const { logs, page, size, setSize, totalPages, totalElements, loading, fetchAuditLogs } =
    UseAuditLogs(10);

  if (!canViewAudit) {
    return <Navigate to={`${ROUTE_PATHS.HOME}/${ROUTE_PATHS.PRIORITY}`} replace />;
  }

  return (
    <section className="space-y-4">
      <header className="page-header">
        <div className="flex items-center gap-2">
          <HiOutlineClipboardDocumentList className="icon-md text-accent" />
          <div>
            <h1 className="page-title">Auditoria del sistema</h1>
            <p className="page-subtitle">Registro completo de acciones. Total: {totalElements}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="typo-caption" htmlFor="audit-page-size">
            Registros
          </label>
          <select
            id="audit-page-size"
            className="form-select !w-[92px] !py-2"
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <button className="btn-secondary typo-body" onClick={() => fetchAuditLogs(page)} type="button">
            Actualizar
          </button>
        </div>
      </header>

      <div className="data-table-wrap">
        <table className="data-table min-w-[980px]">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Accion</th>
              <th>Modulo</th>
              <th>Estado</th>
              <th>Duracion</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center typo-caption">
                  Cargando auditoria...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center typo-caption">
                  No hay registros de auditoria
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.auditId}>
                  <td>{formatDate(log.createdAt)}</td>
                  <td>{log.actorIdentifier || "-"}</td>
                  <td>{log.actorRole || "-"}</td>
                  <td>{log.action || actionFromMethod(log.httpMethod)}</td>
                  <td>{log.module || "-"}</td>
                  <td>{log.statusCode}</td>
                  <td>{log.durationMs} ms</td>
                  <td>{log.clientIp || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="btn-secondary typo-caption"
          disabled={page <= 0 || loading}
          onClick={() => fetchAuditLogs(page - 1)}
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
          onClick={() => fetchAuditLogs(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("es-CO");
}

function actionFromMethod(method) {
  if (method === "POST") return "Creo registro";
  if (method === "PUT" || method === "PATCH") return "Actualizo registro";
  if (method === "DELETE") return "Elimino registro";
  return method || "-";
}
