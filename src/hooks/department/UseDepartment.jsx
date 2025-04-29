import { useEffect, useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";

export default function UseDepartment() {
  const headers = getAuthHeader();
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const url = API.APIDEPARTMENT;
        const result = await axios.get(url, { headers });
        setDepartmentData(result.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            showToast(
              "Ah ocurrido un error inesperado",
              "error"
            );
          }
        }
      }
    };
    fetchDepartmentData();
  }, []);
  return { departmentData };
}
