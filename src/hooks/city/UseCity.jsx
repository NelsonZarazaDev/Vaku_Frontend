import { useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";
import useDepartmentStore from "../../store/Department/useDepartmentStore";

export default function UseCity() {
  const headers = getAuthHeader();
  const [cityData, setCityData] = useState([]);
  const depaId = useDepartmentStore((state) => state.depaId);

  const fetchCityData = async () => {
    try {
      const url = `${API.APICITY}/${depaId}`;
      const result = await axios.get(url, { headers });
      setCityData(result.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          showToast("Ah ocurrido un error inesperado", "error");
        }
      }
    }
  };

  return { cityData, fetchCityData };
}
