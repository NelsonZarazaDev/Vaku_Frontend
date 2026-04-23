import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../constants/api";
import { getAuthHeader } from "../../constants/authHeader";
import { showApiError } from "../../components/notifyToast/NotifyToast";

export default function UseAuditLogs(initialSize = 50) {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(initialSize);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAuditLogs = useCallback(
    async (targetPage = page) => {
      setLoading(true);
      try {
        const headers = getAuthHeader();
        const url = `${API.APIAUDITLOGS}?page=${targetPage}&size=${size}`;
        const response = await axios.get(url, { headers });
        setLogs(response.data.content || []);
        setPage(response.data.number ?? targetPage);
        setTotalPages(response.data.totalPages ?? 0);
        setTotalElements(response.data.totalElements ?? 0);
      } catch (error) {
        showApiError(error, "No fue posible cargar la auditoria");
      } finally {
        setLoading(false);
      }
    },
    [page, size]
  );

  useEffect(() => {
    fetchAuditLogs(0);
  }, []);

  return {
    logs,
    page,
    size,
    totalPages,
    totalElements,
    loading,
    fetchAuditLogs,
  };
}
