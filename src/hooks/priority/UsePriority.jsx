import { useCallback, useEffect, useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";
import { showApiError, showToast } from "../../components/notifyToast/NotifyToast";

export default function UsePriority(initialSize = 10) {
  const [priorityData, setPriorityData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(initialSize);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPriority = useCallback(
    async (targetPage = 0) => {
      setLoading(true);
      try {
        const headers = getAuthHeader();
        const url = `${API.APIOVERDUEVACCINATIONS}?page=${targetPage}&size=${size}`;
        const result = await axios.get(url, { headers });
        const payload = result.data;
        if (Array.isArray(payload)) {
          setPriorityData(payload);
          setPage(targetPage);
          setTotalElements(payload.length);
          setTotalPages(Math.max(Math.ceil(payload.length / size), 1));
        } else {
          const content = payload?.content || [];
          setPriorityData(content);
          setPage(payload?.number ?? targetPage);
          setTotalPages(Math.max(payload?.totalPages ?? 1, 1));
          setTotalElements(payload?.totalElements ?? content.length);
        }
      } catch (error) {
        showApiError(error, "Error al ver la prioridad");
      } finally {
        setLoading(false);
      }
    },
    [size]
  );

  useEffect(() => {
    fetchPriority(0);
  }, [fetchPriority]);

  const notifyEmail = async () => {
    try {
      const headers = getAuthHeader();
      const url = API.APINOTIFYEMAIL;
      await axios.post(url, {}, { headers });
      showToast("Notificacion enviada correctamente", "success");
    } catch (error) {
      showApiError(error, "Ha ocurrido un error inesperado");
    }
  };

  return {
    priorityData,
    page,
    size,
    setSize,
    totalPages,
    totalElements,
    loading,
    fetchPriority,
    notifyEmail,
  };
}
