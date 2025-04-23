import Children from "../pages/children/Children";
import LoginChildren from "../components/loginChildren/LoginChildren";
import LoginEmployee from "../components/loginEmployee/LoginEmployee";
import Priority from "../pages/priority/Priority";
import Employees from "../pages/employees/Employees";
import Inventory from "../pages/inventory/Inventory";
import RegisterFatherSon from "../pages/registerFatherSon/RegisterFatherSon"
import RegisterEmployee from "../pages/registerEmployee/RegisterEmployee";
import Home from "../pages/home/Home";

export const ROUTE_COMPONENTS = {
  LOGIN_CHILDREN: <LoginChildren />,
  LOGIN_EMPLOYEE: <LoginEmployee />,
  HOME: <Home/>,
  CHILDREN: <Children />,
  PRIORITY: <Priority />,
  REGISTRATION_CHILDREN: <RegisterFatherSon/> ,
  REGISTRATION_EMPLOYEE: <RegisterEmployee />,
  EMPLOYEES: <Employees />,
  INVENTORY: <Inventory />,
};
