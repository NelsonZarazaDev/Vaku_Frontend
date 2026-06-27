import { useState } from "react";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import useEmployeeAuthStore from "../../store/authEmployee/useEmployeeAuthStore";
import { API } from "../../constants/api";
import axios from "axios";
import { getAuthHeader } from "../../constants/authHeader";
import { showApiError } from "../../components/notifyToast/NotifyToast";

export default function UseSendVaccineApplied({ onSuccess } = {}) {
  const headers = getAuthHeader();
  const emailParent = useChildrenAuthStore((state) => state.emailParent);
  const idVaccine = useChildrenAuthStore((state) => state.idVaccine);
  const idChildren = useChildrenAuthStore((state) => state.idChildren);
  const { idEmpl } = useEmployeeAuthStore((state) => state.employeeInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [registerVaccine, setRegisterVaccine] = useState({
    vaapApplied: true,
    vaapDateApplication: getTodayDate(),
    vaapNextAppointmentDate: "",
    vaccines: {
      vaccId: idVaccine,
    },
    employees: {
      emplId: idEmpl,
    },
    childrens: {
      chilId: idChildren,
    },
  });

  const onInputChange = (e) => {
    setRegisterVaccine({ ...registerVaccine, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const url = API.APIREGISTERVACCINE;
      const vaccineToRegister = {
        ...registerVaccine,
        vaapApplied: true,
        vaapDateApplication: registerVaccine.vaapDateApplication || getTodayDate(),
        vaccines: {
          ...registerVaccine.vaccines,
          vaccId: idVaccine,
        },
        employees: {
          ...registerVaccine.employees,
          emplId: idEmpl,
        },
        childrens: {
          ...registerVaccine.childrens,
          chilId: idChildren,
        },
      };
      const payload = {
        vaccinesApplied: vaccineToRegister,
        emailFather: emailParent,
      };
      const response = await axios.post(url, payload, { headers });
      const savedVaccineApplied =
        response.data && typeof response.data === "object"
          ? {
              ...vaccineToRegister,
              ...response.data,
              vaapApplied: response.data.vaapApplied ?? true,
              vaapDateApplication:
                response.data.vaapDateApplication ||
                response.data.vaap_date_application ||
                vaccineToRegister.vaapDateApplication,
              vaapNextAppointmentDate:
                response.data.vaapNextAppointmentDate ||
                response.data.vaap_next_appointment_date ||
                vaccineToRegister.vaapNextAppointmentDate,
              vaccines: response.data.vaccines || vaccineToRegister.vaccines,
              employees: response.data.employees || vaccineToRegister.employees,
              childrens: response.data.childrens || vaccineToRegister.childrens,
            }
          : vaccineToRegister;

      if (typeof onSuccess === "function") {
        await onSuccess(savedVaccineApplied);
      }
    } catch (error) {
      showApiError(error, "Error al registrar la vacuna");
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    registerVaccine,
    onInputChange,
    onSubmit,
  };
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}
