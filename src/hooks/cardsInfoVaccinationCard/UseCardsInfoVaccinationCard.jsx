import { useCallback, useEffect, useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import { showApiError } from "../../components/notifyToast/NotifyToast";

export default function UseCardsInfoVaccinationCard() {
  const [cardsData, setcardsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const persDocument = useChildrenAuthStore((state) => state.persDocument);

  const fetchCardsData = useCallback(async () => {
    if (!persDocument) {
      setcardsData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const headers = getAuthHeader();
      const url = `${API.APIINFOCHILDREN}/${persDocument}`;
      const result = await axios.get(url, { headers });
      setcardsData(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      setcardsData([]);
      showApiError(error, "No fue posible cargar los datos del paciente");
    } finally {
      setIsLoading(false);
    }
  }, [persDocument]);

  useEffect(() => {
    fetchCardsData();
  }, [fetchCardsData]);

  return { cardsData, isLoading, hasDocument: Boolean(persDocument) };
}
