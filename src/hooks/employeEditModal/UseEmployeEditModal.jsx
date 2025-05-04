import { useState, useEffect } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import { showToast } from "../../components/notifyToast/NotifyToast";
import axios from "axios";

export default function UseEmployeEditModal({ empleado }) {
  const headers = getAuthHeader();

  const [employeEditData, setEmployeEditData] = useState({
    persNames: "",
    persLastNames: "",
    persEmail: "",
    persPhone: 0,
    persPassword: "",
    persRole: "",
    emplToken: "",
    emplState: true,
  });

  useEffect(() => {
    if (empleado) {
      setEmployeEditData({
        persNames: empleado.persNames || "",
        persLastNames: empleado.persLastNames || "",
        persEmail: empleado.persEmail || "",
        persPhone: empleado.persPhone || "",
        persPassword: empleado.persPassword || "",
        persRole: empleado.persRole || "",
        emplToken: empleado.emplToken || "", // Usar emplToken aquí
        emplState: empleado.emplState || true,
      });
    }
  }, [empleado]); // Se actualiza cuando "empleado" cambia.

  const onInputChange = (e) => {
    setEmployeEditData({ ...employeEditData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      persNames: employeEditData.persNames || empleado.persNames,
      persLastNames: employeEditData.persLastNames || empleado.persLastNames,
      persEmail: employeEditData.persEmail || empleado.persEmail,
      persPhone: employeEditData.persPhone || empleado.persPhone,
      persPassword: employeEditData.persPassword || empleado.persPassword,
      persRole: employeEditData.persRole || empleado.persRole,
      emplToken: employeEditData.emplToken || empleado.emplToken,
      emplState: employeEditData.emplState,
    };

    const url = `${API.APIEDITEMPLOYEE}/${dataToSend.emplToken}?state=${dataToSend.emplState}`;

    try {
      console.log(dataToSend);
      const response = await axios.put(url, dataToSend, { headers });
      showToast("Datos actualizados con éxito", "success");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const data = error.response.data;
          if (typeof data === "object") {
            Object.entries(data).forEach(([_, message]) => {
              showToast(message, "error");
            });
          } else {
            showToast("Error inesperado en el servidor", "error");
          }
        }
      }
    }
  };

  return {
    employeEditData,
    onInputChange,
    onSubmit,
  };
}
