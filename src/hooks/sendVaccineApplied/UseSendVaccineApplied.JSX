import { useState } from "react";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import useEmployeeAuthStore from "../../store/authEmployee/useEmployeeAuthStore";
import { API } from "../../constants/api";
import axios from "axios";
import { getAuthHeader } from "../../constants/authHeader";
import { showApiError, showToast } from "../../components/notifyToast/NotifyToast";

export default function UseSendVaccineApplied({ onSuccess } = {}) {
  const headers = getAuthHeader();
  const emailParent = useChildrenAuthStore((state) => state.emailParent);
  const idVaccine = useChildrenAuthStore((state) => state.idVaccine);
  const idChildren = useChildrenAuthStore((state) => state.idChildren);
  const { idEmpl } = useEmployeeAuthStore((state) => state.employeeInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [registerVaccine, setRegisterVaccine] = useState({
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
      const payload = {
        vaccinesApplied: registerVaccine,
        emailFather: emailParent,
      };
      await axios.post(url, payload, { headers });
      showToast("Vacuna registrada exitosomente", "success");
      if (typeof onSuccess === "function") {
        await onSuccess();
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
