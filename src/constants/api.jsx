const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const API = {
  APILOGINEMPLOYEE: `${API_BASE_URL}/auth/login`,
  APILOGINCHILDREN: `${API_BASE_URL}/auth/loginChild`,
  APIINFOEMPLOYEE: `${API_BASE_URL}/employee/`,
  APIOVERDUEVACCINATIONS: `${API_BASE_URL}/overdueVaccinations`,
  APINOTIFYEMAIL: `${API_BASE_URL}/overdueVaccinations/send-emails`,
  APIREGISTERFATHERSONANDEMPLOYEE: `${API_BASE_URL}/persons`,
  APIPERSONBYDOCUMENT: `${API_BASE_URL}/persons/document`,
  APIDEPARTMENT: `${API_BASE_URL}/departments`,
  APICITY: `${API_BASE_URL}/citys`,
  APIGETALLEMPLOYEE: `${API_BASE_URL}/employee`,
  APIEDITEMPLOYEE: `${API_BASE_URL}/employee`,
  APIINFOCHILDREN: `${API_BASE_URL}/vaccinesCard/info`,
  APIDOWNLOADCARNETPDF: `${API_BASE_URL}/auth/generar`,
  APIALLVACCINES: `${API_BASE_URL}/vaccines`,
  APIVACCINECARD: `${API_BASE_URL}/vaccinesCard`,
  APIREGISTERVACCINE:`${API_BASE_URL}/vaccineApplied`,
  APIAUDITLOGS: `${API_BASE_URL}/audit/logs`,
};
