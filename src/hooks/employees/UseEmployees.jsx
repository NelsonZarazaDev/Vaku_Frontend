import { useCallback, useEffect, useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";
import { showApiError } from "../../components/notifyToast/NotifyToast";

export default function UseEmployees(initialSize = 12) {
  const [employeeAllData, setEmployeeAllData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(initialSize);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAllEmployee = useCallback(
    async (targetPage = 0) => {
      setLoading(true);
      try {
        const headers = getAuthHeader();
        const url = `${API.APIGETALLEMPLOYEE}?page=${targetPage}&size=${size}`;
        const result = await axios.get(url, { headers });
        const payload = result.data;
        if (Array.isArray(payload)) {
          setEmployeeAllData(payload);
          setPage(targetPage);
          setTotalElements(payload.length);
          setTotalPages(Math.max(Math.ceil(payload.length / size), 1));
        } else {
          const content = payload?.content || [];
          setEmployeeAllData(content);
          setPage(payload?.number ?? targetPage);
          setTotalPages(Math.max(payload?.totalPages ?? 1, 1));
          setTotalElements(payload?.totalElements ?? content.length);
        }
      } catch (error) {
        showApiError(error, "Error al obtener los empleados");
      } finally {
        setLoading(false);
      }
    },
    [size]
  );

  useEffect(() => {
    fetchAllEmployee(0);
  }, [fetchAllEmployee]);

  return {
    employeeAllData,
    page,
    size,
    setSize,
    totalPages,
    totalElements,
    loading,
    fetchAllEmployee,
    refreshEmployees: () => fetchAllEmployee(page),
  };
}
