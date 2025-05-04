import { useEffect, useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";
import { showToast } from "../../components/notifyToast/NotifyToast";

export default function UsePriority() {
  const headers = getAuthHeader();
  const [priorityData, SetPriorityData] = useState([]);

  useEffect(() => {
    const fetchPriority = async () => {
      try {
        const url = API.APIOVERDUEVACCINATIONS;
        const result = await axios.get(url, { headers });
        SetPriorityData(result.data);
      } catch (error) {
        showToast("Error al ver la prioridad", "error");
      }
    };
    fetchPriority();
  }, []);

  const notifyEmail = async () => {
    try {
      const url = API.APINOTIFYEMAIL;
      const result = await axios.post(url, {}, { headers });
      showToast("Notificación enviada correctamente", "success");
    } catch (error) {
      showToast("Ah ocurrido un error inesperado", "error");
    }
  };

  return { priorityData, notifyEmail };
}
