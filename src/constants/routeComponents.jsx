import Children from "../pages/children/Children";
import LoginChildren from "../components/loginChildren/LoginChildren";
import LoginEmployee from "../components/loginEmployee/LoginEmployee";
import Priority from "../pages/priority/Priority";
import Employees from "../pages/employees/Employees";
import Inventory from "../pages/inventory/Inventory";
import RegistrationChildren from "../pages/registrationChildren/RegistrationChildren";
import RegistrationEmployee from "../pages/registrationEmployee/RegistrationEmployee";
import Home from "../pages/home/Home";

export const ROUTE_COMPONENTS = {
  LOGIN_CHILDREN: <LoginChildren />,
  LOGIN_EMPLOYEE: <LoginEmployee />,
  HOME: <Home/>,
  CHILDREN: <Children />,
  PRIORITY: <Priority />,
  REGISTRATION_CHILDREN: <RegistrationChildren />,
  REGISTRATION_EMPLOYEE: <RegistrationEmployee />,
  EMPLOYEES: <Employees />,
  INVENTORY: <Inventory />,
};
