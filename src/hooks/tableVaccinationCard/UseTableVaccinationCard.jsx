import { useCallback, useEffect, useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import { showApiError } from "../../components/notifyToast/NotifyToast";

export default function UseTableVaccinationCard() {
  const [vaccineData, setVaccineData] = useState([]);
  const [vaccineCardData, setVaccineCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const persDocument = useChildrenAuthStore((state) => state.persDocument);
  const idChildren = useChildrenAuthStore((state) => state.idChildren);

  const fetchVaccineData = useCallback(async () => {
    setIsLoading(true);
    try {
      const headers = getAuthHeader();
      const resultVaccine = await axios.get(API.APIALLVACCINES, { headers });
      const normalizedVaccineList = normalizeVaccineList(resultVaccine.data);
      setVaccineData(normalizedVaccineList);

      const appliedSources = [];

      if (idChildren) {
        const urlVaccineCardByChild = `${API.APIVACCINECARD}/child/${idChildren}`;
        const resultVaccineCardByChild = await fetchOptional(urlVaccineCardByChild, headers);
        appliedSources.push(...normalizeAppliedList(resultVaccineCardByChild?.data));
      }

      if (persDocument) {
        const urlVaccineCard = `${API.APIVACCINECARD}/${persDocument}`;
        const resultVaccineCard = await fetchOptional(urlVaccineCard, headers);
        appliedSources.push(...normalizeAppliedList(resultVaccineCard?.data));
      }

      setVaccineCardData(mergeAppliedVaccineLists([], appliedSources));
    } catch (error) {
      showApiError(error, "No fue posible cargar el esquema de vacunacion");
    } finally {
      setIsLoading(false);
    }
  }, [idChildren, persDocument]);

  const upsertAppliedVaccine = useCallback((appliedVaccine) => {
    const normalizedApplied = normalizeVaccineApplied(appliedVaccine);

    if (!normalizedApplied.vVacc_id) return;

    setVaccineCardData((currentData) => {
      return mergeAppliedVaccineLists(currentData, [normalizedApplied]);
    });
  }, []);

  useEffect(() => {
    fetchVaccineData();
  }, [fetchVaccineData]);

  return {
    vaccineData,
    vaccineCardData,
    isLoading,
    hasDocument: Boolean(persDocument),
    refreshVaccinationData: fetchVaccineData,
    upsertAppliedVaccine,
  };
}

function normalizeVaccineList(data) {
  const list = getFirstArray(
    data,
    "vaccines",
    "vaccine",
    "data",
    "content",
    "items",
    "results"
  );

  return Array.isArray(list) ? list.map(normalizeVaccine) : [];
}

async function fetchOptional(url, headers) {
  try {
    return await axios.get(url, { headers });
  } catch {
    return null;
  }
}

function normalizeAppliedList(data) {
  if (isAppliedRecord(data)) {
    return [normalizeVaccineApplied(data)].filter((item) => item.vVacc_id);
  }

  const list = getFirstArray(
    data,
    "vaccinesApplied",
    "vaccineApplied",
    "applications",
    "aplicaciones",
    "data",
    "content",
    "items",
    "results"
  );

  return Array.isArray(list)
    ? list.map(normalizeVaccineApplied).filter((item) => item.vVacc_id)
    : [];
}

function mergeAppliedVaccineLists(currentData, incomingData) {
  const mergedData = [...currentData];

  incomingData.forEach((incomingItem) => {
    const existingIndex = mergedData.findIndex(
      (currentItem) =>
        isSameAppliedVaccine(currentItem, incomingItem) ||
        isSameVaccineName(currentItem, incomingItem)
    );

    if (existingIndex === -1) {
      mergedData.push(incomingItem);
      return;
    }

    mergedData[existingIndex] = {
      ...incomingItem,
      ...mergedData[existingIndex],
      ...removeEmptyValues(incomingItem),
    };
  });

  return mergedData;
}

function isSameAppliedVaccine(firstItem, secondItem) {
  return (
    firstItem?.vVacc_id &&
    secondItem?.vVacc_id &&
    String(firstItem.vVacc_id) === String(secondItem.vVacc_id)
  );
}

function isSameVaccineName(firstItem, secondItem) {
  return (
    firstItem?.vaccName &&
    secondItem?.vaccName &&
    normalizeText(firstItem.vaccName) === normalizeText(secondItem.vaccName)
  );
}

function removeEmptyValues(value) {
  return Object.fromEntries(
    Object.entries(value || {}).filter(([, itemValue]) => itemValue !== "" && itemValue !== null && itemValue !== undefined)
  );
}

function isAppliedRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  return [
    "vVacc_id",
    "vVaccId",
    "vaccId",
    "vaccineId",
    "vaapId",
    "vaap_id",
    "vaapApplied",
    "vaap_applied",
    "vaap_date_application",
    "vaapDateApplication",
    "vaapNextAppointmentDate",
    "vaap_next_appointment_date",
    "fechaAplicacion",
    "fechaProximaCita",
    "vaccinesApplied",
    "vaccineApplied",
  ].some((key) => value[key] !== undefined);
}

function getFirstArray(value, ...keys) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];

  for (const key of keys) {
    const nested = value[key];
    if (Array.isArray(nested)) return nested;
    if (nested && typeof nested === "object") {
      const nestedArray = getFirstArray(nested, ...keys);
      if (nestedArray.length) return nestedArray;
    }
  }

  return [];
}

function normalizeVaccine(vaccine) {
  const inventory = vaccine.inventories || vaccine.inventory || {};
  const rawName = vaccine.vaccName ?? vaccine.vacc_name ?? vaccine.name;
  const rawAgeDose = vaccine.vaccAgeDose ?? vaccine.vacc_age_dose ?? vaccine.ageDose;
  const rawDosage = vaccine.vaccDosage ?? vaccine.vacc_dosage ?? vaccine.dosage;
  const values = normalizeVaccineColumns(rawName, rawAgeDose, rawDosage);

  return {
    ...vaccine,
    vaccId: vaccine.vaccId ?? vaccine.vacc_id ?? vaccine.id,
    vaccName: values.vaccName,
    vaccDosage: values.vaccDosage,
    vaccAgeDose: values.vaccAgeDose,
    vaapId: vaccine.vaapId ?? vaccine.vaap_id,
    vaapApplied: vaccine.vaapApplied ?? vaccine.vaap_applied,
    vaapDateApplication: normalizeDateValue(
      vaccine.vaapDateApplication ??
        vaccine.vaap_date_application ??
        vaccine.fechaAplicacion ??
        vaccine.fecha_aplicacion ??
        ""
    ),
    vaapNextAppointmentDate: normalizeDateValue(
      vaccine.vaapNextAppointmentDate ??
        vaccine.vaap_next_appointment_date ??
        vaccine.fechaProximaCita ??
        vaccine.fecha_proxima_cita ??
        ""
    ),
    inventories: {
      ...inventory,
      inveLaboratory:
        inventory.inveLaboratory ??
        inventory.inve_laboratory ??
        inventory.laboratory ??
        vaccine.inveLaboratory ??
        vaccine.inve_laboratory ??
        "",
      inveLot:
        inventory.inveLot ??
        inventory.inve_lot ??
        inventory.lot ??
        vaccine.inveLot ??
        vaccine.inve_lot ??
        "",
    },
  };
}

function normalizeVaccineColumns(vaccName, vaccAgeDose, vaccDosage) {
  const name = cleanText(vaccName);
  const ageDose = cleanText(vaccAgeDose);
  const dosage = cleanText(vaccDosage);

  if (looksLikeDosage(name) && looksLikeVaccineName(ageDose) && looksLikeAgeDose(dosage)) {
    return {
      vaccName: ageDose,
      vaccAgeDose: dosage,
      vaccDosage: name,
    };
  }

  return {
    vaccName: name,
    vaccAgeDose: ageDose,
    vaccDosage: dosage,
  };
}

function cleanText(value) {
  return value === undefined || value === null ? "" : String(value).trim();
}

function looksLikeDosage(value) {
  const normalized = normalizeText(value);

  return [
    "primera",
    "segunda",
    "tercera",
    "unica",
    "refuerzo",
    "primer refuerzo",
    "segundo refuerzo",
    "recien nacido",
  ].some((word) => normalized.includes(word));
}

function looksLikeAgeDose(value) {
  const normalized = normalizeText(value);

  return (
    normalized.includes("mes") ||
    normalized.includes("ano") ||
    normalized.includes("recien nac") ||
    normalized.includes("nino")
  );
}

function looksLikeVaccineName(value) {
  const normalized = normalizeText(value);

  return [
    "bcg",
    "hepatitis",
    "difteria",
    "tos ferina",
    "tetanos",
    "haemophilus",
    "polio",
    "rotavirus",
    "neumococo",
    "influenza",
    "sarampion",
    "rubeola",
    "paperas",
    "varicela",
    "fiebre",
    "papiloma",
  ].some((word) => normalized.includes(word));
}

function normalizeText(value) {
  return cleanText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeVaccineApplied(applied) {
  if (!applied || typeof applied !== "object") {
    return {};
  }

  const application = applied.vaccinesApplied || applied.vaccineApplied || applied;
  const nestedVaccine =
    application.vaccines || application.vaccine || applied.vaccines || applied.vaccine || {};

  return {
    ...applied,
    vVacc_id:
      application.vVacc_id ??
      application.vVaccId ??
      application.vvacc_id ??
      application.vvaccId ??
      application.vacc_id ??
      application.vaccId ??
      application.vaccine_id ??
      application.vaccineId ??
      application.idVaccine ??
      application.vaccine?.vaccId ??
      application.vaccines?.vaccId ??
      getNestedValue(nestedVaccine, ["vaccId", "vacc_id", "id"]),
    vaapId: application.vaapId ?? application.vaap_id,
    vaapApplied: application.vaapApplied ?? application.vaap_applied ?? true,
    vaccName:
      application.vaccName ??
      application.vacc_name ??
      application.vaccineName ??
      getNestedValue(nestedVaccine, ["vaccName", "vacc_name", "name"]) ??
      "",
    vaap_date_application: normalizeDateValue(
      application.vaap_date_application ??
        application.vaapDateApplication ??
        application.vaapApplicationDate ??
        application.vaapApplication ??
        application.vaapDateApplied ??
        application.vaapAppliedDate ??
        application.applicationDate ??
        application.dateApplication ??
        application.appliedDate ??
        application.fechaAplicacion ??
        application.fecha_aplicacion ??
        application.createdAt ??
        ""
    ),
    vaap_next_appointment_date: normalizeDateValue(
      application.vaap_next_appointment_date ??
        application.vaapNextAppointmentDate ??
        application.vaapNextAppointment ??
        application.vaap_next_date ??
        application.nextAppointmentDate ??
        application.nextAppointment ??
        application.nextDate ??
        application.fechaProximaCita ??
        application.fecha_proxima_cita ??
        ""
    ),
  };
}

function normalizeDateValue(value) {
  if (!value) return "";
  const textValue = String(value).trim();
  return textValue.includes("T") ? textValue.split("T")[0] : textValue;
}

function getNestedValue(value, keys) {
  if (!value || typeof value !== "object") return undefined;

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = getNestedValue(item, keys);
      if (found !== undefined && found !== null) return found;
    }
    return undefined;
  }

  for (const key of keys) {
    if (value[key] !== undefined && value[key] !== null) return value[key];
  }

  for (const nested of Object.values(value)) {
    if (nested && typeof nested === "object") {
      const found = getNestedValue(nested, keys);
      if (found !== undefined && found !== null) return found;
    }
  }

  return undefined;
}
