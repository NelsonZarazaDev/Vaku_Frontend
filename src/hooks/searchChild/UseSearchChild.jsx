import { useCallback, useEffect, useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";
import { showToast } from "../../components/notifyToast/NotifyToast";

export default function UseSearchChild({ onResult }) {
  const [searchData, setSearchData] = useState({
    search: "",
  });

  const onInputChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const fetchChildren = useCallback(async (search = "", notify = false) => {
    try {
      const headers = getAuthHeader();
      const cleanSearch = search.trim();
      const query = cleanSearch ? `?document=${encodeURIComponent(cleanSearch)}` : "";
      const result = await axios.get(`${API.APICHILDREN}${query}`, { headers });
      const rows = Array.isArray(result.data) ? result.data : [];

      onResult(rows);

      if (notify) {
        showToast(
          rows.length > 0 ? "Usuario encontrado con exito" : "Usuario no encontrado",
          rows.length > 0 ? "success" : "error"
        );
      }
    } catch {
      onResult([]);
      showToast("Usuario no encontrado", "error");
    }
  }, [onResult]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetchChildren(searchData.search, true);
  };

  useEffect(() => {
    fetchChildren();
  }, [fetchChildren]);

  return { searchData, onInputChange, onSubmit };
}
