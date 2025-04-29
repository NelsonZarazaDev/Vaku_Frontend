import { useEffect, useState } from "react";
import useEmployeeViewEditStore from "../../store/employeeView/useEmployeeViewEditStore";
import axios from "axios";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import { showToast } from "../../components/notifyToast/NotifyToast";

export default function UseEmployeViewModal() {
  const headers = getAuthHeader();
  const [employeeData, setEmployeeData] = useState([]);
  const emailEmployee = useEmployeeViewEditStore(
    (state) => state.emailEmployee
  );

  const fetchEmployeeData = async () => {
    try {
      const url = `${API.APIINFOEMPLOYEE}${emailEmployee}`;
      const result = await axios.get(url, { headers });
      setEmployeeData(result.data);
    } catch (error) {
      showToast("Error al obtener la informacion", error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [emailEmployee]);

  return { employeeData };
}
