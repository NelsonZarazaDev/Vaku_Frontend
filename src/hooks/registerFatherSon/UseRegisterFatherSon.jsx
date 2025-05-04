import { useState } from "react";
import { API } from "../../constants/api";
import { getAuthHeader } from "../../constants/authHeader";
import axios from "axios";
import { showToast } from "../../components/notifyToast/NotifyToast";

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
      persRole: "Niño",
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
        updatedData[parseInt(index)].citys.cityId = parseInt(value, 10);
      } else {
        updatedData[parseInt(index)][key] = value;
      }
      return updatedData;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = API.APIREGISTERFATHERSONANDEMPLOYEE;
      const response = await axios.post(url, fatherSonData, { headers });
      showToast("Datos registrados con exito", "success");
      setFatherSonData(initialData);
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
    fatherSonData,
    onInputChange,
    onSubmit,
  };
}
