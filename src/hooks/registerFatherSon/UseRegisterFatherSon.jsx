import { useState } from "react";
import { API } from "../../constants/api";
import { getAuthHeader } from "../../constants/authHeader";
import axios from "axios";
import { showApiError, showToast } from "../../components/notifyToast/NotifyToast";
import useDepartmentStore from "../../store/Department/useDepartmentStore";

export default function UseRegisterFatherSon() {
  const headers = getAuthHeader();
  const setDepaId = useDepartmentStore((state) => state.setDepaId);

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
  const [existingParent, setExistingParent] = useState(null);
  const [parentDepartmentId, setParentDepartmentId] = useState("");

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const [index, key] = name.split("-");

    setFatherSonData((prevData) => {
      const updatedData = [...prevData];
      if (key === "cityId") {
        updatedData[parseInt(index, 10)].citys.cityId = value ? parseInt(value, 10) : null;
      } else {
        updatedData[parseInt(index, 10)][key] = value;
      }
      return updatedData;
    });

    if (name === "0-persDocument") {
      setExistingParent(null);
      setParentDepartmentId("");
    }
  };

  const onParentDepartmentChange = (e) => {
    setParentDepartmentId(e.target.value);
  };

  const onParentDocumentBlur = async () => {
    const document = fatherSonData[0]?.persDocument?.trim();
    if (!document) {
      setExistingParent(null);
      return;
    }

    try {
      const person = await findPersonByDocument(document, headers);
      if (!person) {
        setExistingParent(null);
        return;
      }

      const role = normalizeText(person.persRole);
      if (role !== "madre" && role !== "padre") {
        showToast("El documento ingresado no pertenece a un acudiente", "error");
        setExistingParent(null);
        return;
      }

      const depaId = person.citys?.departments?.depaId || "";

      setFatherSonData((prevData) => {
        const updatedData = [...prevData];
        updatedData[0] = {
          ...updatedData[0],
          persNames: person.persNames || "",
          persLastNames: person.persLastNames || "",
          persDocument: person.persDocument || document,
          persSex: person.persSex || "",
          persAddress: person.persAddress || "",
          persDateBirth: person.persDateBirth || "",
          persRole: person.persRole || "",
          persEmail: person.persEmail || "",
          persPhone: person.persPhone || "",
          citys: { cityId: person.citys?.cityId || null },
        };
        return updatedData;
      });

      setParentDepartmentId(depaId);
      if (depaId) {
        setDepaId(depaId);
      }
      setExistingParent(person);
      showToast("Acudiente encontrado, se usaran sus datos", "success");
    } catch (error) {
      showApiError(error, "No fue posible consultar el acudiente");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const childDocument = fatherSonData[1]?.persDocument?.trim();
      if (childDocument) {
        const existingChild = await findPersonByDocument(childDocument, headers);
        if (existingChild) {
          showToast(
            `Documento ya registrado: ${existingChild.persNames} ${existingChild.persLastNames}`,
            "info"
          );
          return;
        }
      }

      const url = API.APIREGISTERFATHERSONANDEMPLOYEE;
      await axios.post(url, fatherSonData, { headers });
      showToast("Datos registrados con exito", "success");
      setFatherSonData(initialData);
      setExistingParent(null);
      setParentDepartmentId("");
    } catch (error) {
      showApiError(error, "Error al registrar la informacion");
    }
  };

  return {
    fatherSonData,
    existingParent,
    parentDepartmentId,
    onInputChange,
    onParentDepartmentChange,
    onParentDocumentBlur,
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

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}
