import { useEffect, useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";
import { showToast } from "../../components/notifyToast/NotifyToast";

export default function UseEmployees() {
  const headers = getAuthHeader();
  const [employeeAllData, setEmployeeAllData] = useState([]);

  useEffect(() => {
    const fetchAllEmployee = async () => {
      try {
        const url = API.APIGETALLEMPLOYEE;
        const result = await axios.get(url, { headers });
        setEmployeeAllData(result.data);
      } catch (error) {
        showToast("Error al obtener los empleados", "error");
      }
    };
    fetchAllEmployee();
  }, []);

  return { employeeAllData };
}