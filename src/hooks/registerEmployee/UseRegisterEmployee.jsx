import { useState } from "react";
import { API } from "../../constants/api";
import { getAuthHeader } from "../../constants/authHeader";
import axios from "axios";
import { showToast } from "../../components/notifyToast/NotifyToast";

export default function UseRegisterEmployee() {
  const headers = getAuthHeader();

  const initialData = [
    {
      persNames: "",
      persLastNames: "",
      persDocument: "",
      persSex: "",
      persAddress: "",
      persDateBirth: "",
      persRole: "",
      persEmail: "",
      persPassword: "",
      persPhone: "",
      citys: {
        cityId: null,
      },
    },
  ];

  const [employeeData, setEmployeeData] = useState(initialData);

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setEmployeeData((prevData) => {
      const updatedData = [...prevData];

      if (name === "cityId") {
        updatedData[0].citys.cityId = parseInt(value, 10);
      } else {
        updatedData[0][name] = value;
      }

      return updatedData;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = API.APIREGISTERFATHERSONANDEMPLOYEE;
      const response = await axios.post(url, employeeData, { headers });
      console.log("try "+response);
      showToast("Datos registrados con exito", "success");
      setEmployeeData(initialData);
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
    employeeData,
    onInputChange,
    onSubmit,
  };
}
