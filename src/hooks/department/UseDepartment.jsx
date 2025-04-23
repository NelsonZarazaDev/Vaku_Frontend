import React, { useEffect, useState } from "react";
import { getAuthHeader } from "../../constants/authHeader";
import { API } from "../../constants/api";
import axios from "axios";

export default function UseDepartment() {
  const headers = getAuthHeader();
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const url = API.APIDEPARTMENT;
        const result = await axios.get(url, { headers });
        setDepartmentData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartmentData();
  }, []);
  return { departmentData };
}
