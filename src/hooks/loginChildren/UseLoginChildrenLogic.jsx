import { useState } from "react";
import { API } from "../../constants/api";
import axios from "axios";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routePath";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import { showApiError, showToast } from "../../components/notifyToast/NotifyToast";

export default function UseLoginChildrenLogic() {
  let navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [login, setLogin] = useState({
    persDocument: "",
    persDateBirth: "",
  });

  const { setChildrenAuthStore } = useChildrenAuthStore();

  const onInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const document = login.persDocument.replace(/\D/g, "").trim();
    const isValidDocument = /^[0-9]{5,10}$/.test(document);
    if (!isValidDocument) {
      showToast("El documento debe tener entre 5 y 10 digitos", "error");
      return;
    }

    if (!login.persDateBirth) {
      showToast("Debe ingresar la fecha de nacimiento", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const url = API.APILOGINCHILDREN;
      const response = await axios.post(url, {
        persDocument: document,
        persDateBirth: login.persDateBirth,
      });
      const token = response.data;

      setChildrenAuthStore({
        token: token.token,
        persDocument: document,
      });

      showToast("Inicio de sesion exitoso", "success");
      navigate(`${ROUTE_PATHS.HOME}/${ROUTE_PATHS.VACCINATIONCARD}`);
    } catch (error) {
      showApiError(error, "Credenciales invalidas");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    login,
    onInputChange,
    onSubmit,
  };
}
