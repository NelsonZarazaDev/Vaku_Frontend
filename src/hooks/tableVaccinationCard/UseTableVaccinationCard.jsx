import { useEffect, useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";

export default function UseTableVaccinationCard() {
  const headers = getAuthHeader();
  const [vaccineData, setVaccineData] = useState([]);
  const [vaccineCardData, setVaccineCardData] = useState([]);
  const persDocument = useChildrenAuthStore((state) => state.persDocument);

  useEffect(() => {
    const fetchVaccineData = async () => {
      try {
        const urlVaccine = `${API.APIALLVACCINES}`;
        const urlVaccineCard = `${API.APIVACCINECARD}/${persDocument}`;
        const resultVaccine = await axios.get(urlVaccine, { headers });
        const resultVaccineCard = await axios.get(urlVaccineCard, { headers });
        setVaccineData(resultVaccine.data);
        setVaccineCardData(resultVaccineCard.data);
      } catch (error) {
      }
    };
    fetchVaccineData();
  }, [persDocument]);

  return {
    vaccineData,
    vaccineCardData,
  };
}
