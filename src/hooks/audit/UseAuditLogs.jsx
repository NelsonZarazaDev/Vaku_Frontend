import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constants/api";
import { getAuthHeader } from "../../constants/authHeader";
import { showApiError } from "../../components/notifyToast/NotifyToast";

export default function UseAuditLogs(initialSize = 10) {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(initialSize);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAuditLogs = useCallback(
    async (targetPage = 0) => {
      setLoading(true);
      try {
        const headers = getAuthHeader();
        const url = `${API.APIAUDITLOGS}?page=${targetPage}&size=${size}`;
        const response = await axios.get(url, { headers });
        const payload = response.data;
        if (Array.isArray(payload)) {
          setLogs(payload);
          setPage(targetPage);
          setTotalElements(payload.length);
          setTotalPages(Math.max(Math.ceil(payload.length / size), 1));
        } else {
          const content = payload?.content || [];
          setLogs(content);
          setPage(payload?.number ?? targetPage);
          setTotalPages(Math.max(payload?.totalPages ?? 1, 1));
          setTotalElements(payload?.totalElements ?? content.length);
        }
      } catch (error) {
        showApiError(error, "No fue posible cargar la auditoria");
      } finally {
        setLoading(false);
      }
    },
    [size]
  );

  useEffect(() => {
    fetchAuditLogs(0);
  }, [fetchAuditLogs]);

  return {
    logs,
    page,
    size,
    setSize,
    totalPages,
    totalElements,
    loading,
    fetchAuditLogs,
  };
}
