import { useState } from "react";
import { API } from "../../constants/api";
import axios from "axios";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routePath";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";

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

      navigate(ROUTE_PATHS.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    login,
    onInputChange,
    onSubmit,
  };
}
