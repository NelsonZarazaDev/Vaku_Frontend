import React, { useEffect, useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";

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
        console.error("Error al obtener prioridad:", error);
      }
    };
    fetchPriority();
  }, []);

  const notifyEmail = async () => {
    try {
      const url = API.APINOTIFYEMAIL;
      const result = await axios.post(url, {}, { headers });
      showToast("Notificación enviada correctamente", "success");
    } catch (error) {}
  };

  return { priorityData, notifyEmail };
}
