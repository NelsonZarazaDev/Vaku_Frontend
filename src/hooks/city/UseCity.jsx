import { useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";
import useDepartmentStore from "../../store/Department/useDepartmentStore";
import { showToast } from "../../components/notifyToast/NotifyToast";

export default function UseCity() {
  const headers = getAuthHeader();
  const [cityData, setCityData] = useState([]);
  const depaId = useDepartmentStore((state) => state.depaId);

  const fetchCityData = async (selectedDepaId = depaId) => {
    if (!selectedDepaId) {
      setCityData([]);
      return;
    }

    try {
      const url = `${API.APICITY}/${selectedDepaId}`;
      const result = await axios.get(url, { headers });
      setCityData(result.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showToast("Ha ocurrido un error inesperado", "error");
      }
    }
  };

  return { cityData, fetchCityData };
}
