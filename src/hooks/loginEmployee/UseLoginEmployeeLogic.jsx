import React, { useState } from "react";
import { API } from "../../constants/api";
import axios from "axios";
import useEmployeeAuthStore from "../../store/authEmployee/useEmployeeAuthStore";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routePath";
import { getAuthHeader } from "../../constants/authHeader";

export default function UseLoginEmployeeLogic() {
  let navigate = useNavigate();
  const headers = getAuthHeader();

  const [login, setLogin] = useState({
    persEmail: "",
    persPassword: "",
  });

  const { setEmployeeAuthStore,setEmployeeInfo  } = useEmployeeAuthStore();

  const onInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = API.APILOGINEMPLOYEE;
      const response = await axios.post(url, login);
      const token = response.data;

      setEmployeeAuthStore({
        token: token.token,
      });

      const urlInfoEmployee = `${API.APIINFOEMPLOYEE}${login.persEmail}`;
      const result = await axios.get(urlInfoEmployee, { headers });

      setEmployeeInfo({
        persEmail: result.data[0].persEmail,
        persDocument: result.data[0].persDocument,
        persNames: result.data[0].persNames,
        persLastNames: result.data[0].persLastNames,
        persRole: result.data[0].persRole,
        emplToken: result.data[0].emplToken,
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
