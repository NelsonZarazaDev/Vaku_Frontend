import { useState, useEffect } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import { showApiError, showToast } from "../../components/notifyToast/NotifyToast";
import axios from "axios";

export default function UseEmployeEditModal({ empleado, onSuccess }) {
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
        emplToken: empleado.emplToken || "",
        emplState: empleado.emplState ?? true,
      });
    }
  }, [empleado]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeEditData({
      ...employeEditData,
      [name]: name === "emplState" ? value === "true" : value,
    });
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
      await axios.put(url, dataToSend, { headers });
      showToast("Datos actualizados con exito", "success");
      if (typeof onSuccess === "function") {
        await onSuccess();
      }
    } catch (error) {
      showApiError(error, "Error al actualizar los datos del empleado");
    }
  };

  return {
    employeEditData,
    onInputChange,
    onSubmit,
  };
}
