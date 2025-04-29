import { useState } from "react";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import useEmployeeAuthStore from "../../store/authEmployee/useEmployeeAuthStore";
import { API } from "../../constants/api";
import axios from "axios";
import { getAuthHeader } from "../../constants/authHeader";
import { showToast } from "../../components/notifyToast/NotifyToast";

export default function UseSendVaccineApplied() {
  const headers = getAuthHeader();
  const emailParent = useChildrenAuthStore((state) => state.emailParent);
  const idVaccine = useChildrenAuthStore((state) => state.idVaccine);
  const idChildren = useChildrenAuthStore((state) => state.idChildren);
  const { idEmpl } = useEmployeeAuthStore((state) => state.employeeInfo);

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

    try {
      const encodedEmail = encodeURIComponent(emailParent);
      const url = `${API.APIREGISTERVACCINE}/${encodedEmail}`;
      const response = await axios.post(url, registerVaccine, { headers });
      showToast("Vacuna registrada exitosomente", "success");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          showToast(error.response.data?.message, "error");
        }
      }
    }
  };
  return {
    registerVaccine,
    onInputChange,
    onSubmit,
  };
}
