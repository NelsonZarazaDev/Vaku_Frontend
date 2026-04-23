import { useEffect, useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";

export default function UseCardsInfoVaccinationCard() {
  const headers = getAuthHeader();
  const [cardsData, setcardsData] = useState([]);
  const persDocument = useChildrenAuthStore((state) => state.persDocument);

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const url = `${API.APIINFOCHILDREN}/${persDocument}`;
        const result = await axios.get(url, { headers });
        setcardsData(result.data);
      } catch (error) {
        setcardsData([]);
      }
    };
    fetchCardsData();
  }, [persDocument]);

  return { cardsData };
}
