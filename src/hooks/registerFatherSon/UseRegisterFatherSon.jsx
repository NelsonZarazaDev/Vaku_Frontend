import { useState } from "react";
import { API } from "../../constants/api";
import { getAuthHeader } from "../../constants/authHeader";
import axios from "axios";
import { showApiError, showToast } from "../../components/notifyToast/NotifyToast";

export default function UseRegisterFatherSon() {
  const headers = getAuthHeader();

  const initialData = [
    {
      persNames: "",
      persLastNames: "",
      persDocument: "",
      persSex: "",
      persAddress: "",
      persDateBirth: "1974-09-03",
      persRole: "",
      persEmail: "",
      persPhone: "",
      citys: { cityId: null },
    },
    {
      persNames: "",
      persLastNames: "",
      persDocument: "",
      persSex: "",
      persAddress: "Calle 19b #13b-78",
      persDateBirth: "",
      persRole: "Nino",
      citys: { cityId: null },
    },
  ];

  const [fatherSonData, setFatherSonData] = useState(initialData);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const [index, key] = name.split("-");

    setFatherSonData((prevData) => {
      const updatedData = [...prevData];
      if (key === "cityId") {
        updatedData[parseInt(index, 10)].citys.cityId = parseInt(value, 10);
      } else {
        updatedData[parseInt(index, 10)][key] = value;
      }
      return updatedData;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const documentsToValidate = [
        fatherSonData[0]?.persDocument?.trim(),
        fatherSonData[1]?.persDocument?.trim(),
      ].filter(Boolean);

      for (const document of documentsToValidate) {
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
      await axios.post(url, fatherSonData, { headers });
      showToast("Datos registrados con exito", "success");
      setFatherSonData(initialData);
    } catch (error) {
      showApiError(error, "Error al registrar la informacion");
    }
  };

  return {
    fatherSonData,
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
