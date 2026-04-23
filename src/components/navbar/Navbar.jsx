import React, { useEffect, useMemo, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router";
import { ROUTE_PATHS } from "../../constants/routePath";
import UseCloseSession from "../../hooks/closeSession/UseCloseSession";
import useEmployeeAuthStore from "../../store/authEmployee/useEmployeeAuthStore";
import ButtonCarnetPdf from "../buttonCarnetPdf/ButtonCarnetPdf";
import { normalizeRole } from "../../utils/roles";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { logoutAll } = UseCloseSession();
  const { employeeInfo } = useEmployeeAuthStore();
  const persRole = employeeInfo?.persRole || "";
  const normalizedRole = normalizeRole(persRole);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const availableLinks = useMemo(() => {
    return linksArray.filter(({ roles }) => roles.includes(normalizedRole));
  }, [normalizedRole]);

  return (
    <nav className="sticky top-0 z-30 pt-3">
      <div className="section-card border px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <p className="font-LeckerliOne text-text typo-logo">vaku</p>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-full bg-secondary/55 p-1.5">
              {persRole === "" ? (
                <ButtonCarnetPdf />
              ) : (
                availableLinks.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `rounded-full px-4 py-2 typo-caption font-semibold transition-all ${
                        isActive ? "bg-button text-surface shadow" : "text-text hover:bg-surface"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden rounded-xl border border-border bg-surface p-2 icon-md text-text"
              aria-label="Abrir menu"
            >
              <RxHamburgerMenu />
            </button>

            <div className="relative" ref={menuRef}>
              <button onClick={() => setOpen((prev) => !prev)}>
                <div className="h-10 w-10 cursor-pointer rounded-full bg-dark-cyan text-white flex items-center justify-center font-bold">
                  {persRole ? "P" : "U"}
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-white p-2 shadow-lg">
                  <button
                    onClick={logoutAll}
                    className="block w-full cursor-pointer rounded-lg px-4 py-2 text-left font-semibold text-red-600 hover:bg-red-50"
                  >
                    Cerrar sesion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="mt-3 space-y-2 md:hidden">
            {persRole === "" ? (
              <ButtonCarnetPdf />
            ) : (
              availableLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2 typo-caption font-semibold ${
                      isActive ? "bg-button text-surface" : "bg-surface text-text"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

const linksArray = [
  {
    label: "Prioridad",
    roles: ["enfermera", "jefe de enfermeria"],
    to: ROUTE_PATHS.PRIORITY,
  },
  {
    label: "Usuarios",
    roles: ["jefe de enfermeria"],
    to: ROUTE_PATHS.EMPLOYEES,
  },
  {
    label: "Ninos",
    roles: ["enfermera", "jefe de enfermeria"],
    to: ROUTE_PATHS.CHILDREN,
  },
  {
    label: "Registrar nino",
    roles: ["enfermera", "jefe de enfermeria"],
    to: ROUTE_PATHS.REGISTRATION_CHILDREN,
  },
  {
    label: "Registrar empleado",
    roles: ["jefe de enfermeria"],
    to: ROUTE_PATHS.REGISTRATION_EMPLOYEE,
  },
  {
    label: "Auditoria",
    roles: ["jefe de enfermeria"],
    to: ROUTE_PATHS.AUDIT,
  },
];
