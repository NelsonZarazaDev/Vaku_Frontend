import { useState } from "react";
import { API } from "../../constants/api";
import axios from "axios";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routePath";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import { showToast } from "../../components/notifyToast/NotifyToast";

export default function UseLoginChildrenLogic() {
  let navigate = useNavigate();

  const [login, setLogin] = useState({
    persDocument: "",
  });

  const { setChildrenAuthStore } = useChildrenAuthStore();

  const onInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = API.APILOGINCHILDREN;
      const response = await axios.post(url, login);
      const token = response.data;

      setChildrenAuthStore({
        token: token.token,
        persDocument: login.persDocument,
      });

      showToast("Inicio de sesión exitoso", "success");
      navigate(`${ROUTE_PATHS.HOME}/${ROUTE_PATHS.VACCINATIONCARD}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          showToast(
            error.response.data?.message || "Documento erróneo",
            "error"
          );
        }
      }
    }
  };

  return {
    login,
    onInputChange,
    onSubmit,
  };
}
