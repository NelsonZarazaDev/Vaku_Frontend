import React from "react";
import { Link } from "react-router";
import { ROUTE_PATHS } from "../../constants/routePath";
import doctorEmployeeLogin from "/src/assets/images/doctorEmployeeLogin.webp";
import UseLoginEmployeeLogic from "../../hooks/loginEmployee/UseLoginEmployeeLogic";

export default function LoginEmployee() {
  const { login, onInputChange, onSubmit } = UseLoginEmployeeLogic();

  return (
    <div className="min-h-screen bg-transparent px-4 py-8 md:px-8">
      <div className="mx-auto grid min-h-[86vh] w-[90vw] max-w-[1600px] grid-cols-1 overflow-hidden rounded-3xl border border-border bg-white/92 shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden items-end justify-center bg-secondary/65 p-8 lg:flex">
          <img className="h-[80%] object-contain" src={doctorEmployeeLogin} alt="Personal medico" />
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <p className="font-LeckerliOne typo-logo text-text">vaku</p>
            <div className="mt-6">
              <h1 className="typo-modal-title">Iniciar sesion</h1>
              <p className="mt-1 typo-caption">Acceso para personal de salud</p>
            </div>

            <form className="mt-7 space-y-4" onSubmit={onSubmit}>
              <input
                className="form-input text-sm"
                placeholder="Correo institucional"
                type="email"
                name="persEmail"
                id="persEmail"
                value={login.persEmail}
                onChange={onInputChange}
              />
              <input
                className="form-input text-sm"
                placeholder="Contrasena"
                type="password"
                name="persPassword"
                id="persPassword"
                value={login.persPassword}
                onChange={onInputChange}
              />

              <button className="btn-primary w-full py-2.5 text-sm" type="submit">
                Entrar
              </button>
            </form>

            <Link
              to={ROUTE_PATHS.LOGIN_CHILDREN}
              className="mt-5 block text-center typo-caption font-semibold hover:text-dark-cyan"
            >
              Ingresar como paciente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
