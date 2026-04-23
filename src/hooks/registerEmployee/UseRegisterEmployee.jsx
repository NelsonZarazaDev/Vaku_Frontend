import { useState } from "react";
import { API } from "../../constants/api";
import { getAuthHeader } from "../../constants/authHeader";
import axios from "axios";
import { showApiError, showToast } from "../../components/notifyToast/NotifyToast";

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
      const document = employeeData[0]?.persDocument?.trim();
      if (document) {
        const existingPerson = await findPersonByDocument(document, headers);
        if (existingPerson) {
          showToast(
            `Documento ya registrado: ${existingPerson.persNames} ${existingPerson.persLastNames}`,
            "info"
          );
          return;
        }
      }

      const url = API.APIREGISTERFATHERSONANDEMPLOYEE;
      await axios.post(url, employeeData, { headers });
      showToast("Datos registrados con exito", "success");
      setEmployeeData(initialData);
    } catch (error) {
      showApiError(error, "Error inesperado en el servidor");
    }   
  };

  return {
    employeeData,
    onInputChange,
    onSubmit,
  };
}

async function findPersonByDocument(document, headers) {
  try {
    const url = `${API.APIPERSONBYDOCUMENT}/${document}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}
