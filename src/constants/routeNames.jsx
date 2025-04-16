import LoginChildren from "../components/loginChildren/LoginChildren";
import LoginEmployee from "../components/loginEmployee/LoginEmployee";


export const ROUTES = {
  PATHLOGINCHILDREN: "/",
  PATHLOGINEMPLOYEE: "/loginEmployee",

  NOT_FOUND: "*",

  LOGINCHILDREN:<LoginChildren/>,
  LOGINEMPLOYEE:<LoginEmployee/>  ,
};
