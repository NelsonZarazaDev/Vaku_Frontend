import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router";
import { ROUTE_PATHS } from "../../constants/routePath";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav>
      <div className="md:flex relative z-20 w-full justify-between items-center px-8">
        <div className="flex justify-between md:flex-none">
          <p className="font-LeckerliOne text-text text-6xl md:text-5xl text-shadow-lg/10">
            vaku
          </p>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <RxHamburgerMenu className="text-3xl" />
            </button>
            <div className="relative" ref={menuRef}>
              <button onClick={() => setOpen(!open)}>
                <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold cursor-pointer">
                  P
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-40 z-50">
                  <button className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center font-bold text-text bg-surface md:w-auto box-shadow-card h-auto mt-4 md:h-14 p-2 rounded-xl md:rounded-full md:relative absolute top-full left-0 w-full z-10`}
        >
          {linksArray.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex justify-center items-center w-full md:w-36 h-full 
                ${isActive ? "bg-button text-surface" : "bg-background"} 
                rounded-full transition-all duration-300 
                ${to !== "employees" ? "-ml-6" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="relative hidden md:block" ref={menuRef}>
          <button onClick={() => setOpen(!open)}>
            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold cursor-pointer">
              P
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-40 z-50">
              <button className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}


const linksArray = [
  {
    label: "Usuarios",
    to: ROUTE_PATHS.EMPLOYEES,
  },
  {
    label: "Prioridad",
    to: ROUTE_PATHS.PRIORITY,
  },
  {
    label: "Niños",
    to: ROUTE_PATHS.CHILDREN,
  },
  {
    label: "Registrar",
    to: ROUTE_PATHS.REGISTRATION_CHILDREN,
  },
  {
    label: "Registrar",
    to: ROUTE_PATHS.REGISTRATION_EMPLOYEE,
  },
  {
    label: "Inventario",
    to: ROUTE_PATHS.INVENTORY,
  },
];