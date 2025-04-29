import { API } from "../../constants/api";
import axios from "axios";
import { showToast } from "../../components/notifyToast/NotifyToast";
import UseCardsInfoVaccinationCard from "../cardsInfoVaccinationCard/UseCardsInfoVaccinationCard";
import UseTableVaccinationCard from "../tableVaccinationCard/UseTableVaccinationCard";
import { getAuthHeader } from "../../constants/authHeader";

export default function UseCarnetPdf() {
  const headers = getAuthHeader();
  const { cardsData } = UseCardsInfoVaccinationCard();
  const { vaccineData, vaccineCardData } = UseTableVaccinationCard();

  const data = {
    info: cardsData[0],
    aplicaciones: vaccineCardData,
    vacunas: vaccineData,
  };

  const carnetPdf = async () => {
    try {
      const url = API.APIDOWNLOADCARNETPDF;

      const response = await axios.post(
        url,
        data,
        {
          responseType: "blob",
        },
        { headers }
      );

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");

      showToast("Carnet abierto en nueva pestaña", "success");
    } catch (error) {
      showToast("Hubo un error al abrir el carnet", "error");
    }
  };

  return { carnetPdf };
}
