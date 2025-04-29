import { useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";
import { showToast } from "../../components/notifyToast/NotifyToast";

export default function UseSearchChild({ onResult }) {
  const headers = getAuthHeader();

  const [searchData, setSearchData] = useState({
    search: "",
  });

  const onInputChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();


    try {
      const url = `${API.APIINFOCHILDREN}/${searchData.search}`;
      const result = await axios.get(url, { headers });
      onResult(result.data[0]);
      showToast("Usuario encontrado con exito", "success");
    } catch (error) {
      showToast("Usuario no encontrado", "error");
    }
  };

  return { searchData, onInputChange, onSubmit };
}
