export const API_BASE_URL = "http://localhost:8080";

export const API = {
  APILOGINEMPLOYEE: `${API_BASE_URL}/auth/login`,
  APILOGINCHILDREN: `${API_BASE_URL}/auth/loginChild`,
  APIINFOEMPLOYEE: `${API_BASE_URL}/employee/`,
  APIOVERDUEVACCINATIONS: `${API_BASE_URL}/overdueVaccinations`,
  APINOTIFYEMAIL: `${API_BASE_URL}/overdueVaccinations/send-emails`,
  APIREGISTERFATHERSON: `${API_BASE_URL}/persons`,
  APIDEPARTMENT:`${API_BASE_URL}/departments`,
  APICITY:`${API_BASE_URL}/citys`,
};
