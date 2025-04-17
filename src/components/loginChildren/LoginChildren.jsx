import React from "react";
import { Link } from "react-router";
import { ROUTE_PATHS } from "../../constants/routePath";
import doctorChildrenLongin from "/src/assets/images/doctorChildrenLongin.webp";
import UseLoginChildrenLogic from "../../hooks/loginChildren/UseLoginChildrenLogic";

export default function LoginChildren() {
  const { login, onInputChange, onSubmit } = UseLoginChildrenLogic();

  return (
    <>
      <div className="w-full h-dvh flex items-center bg-background overflow-hidden fixed -z-20">
        <div className="w-full h-dvh flex items-center justify-center lg:justify-end z-10">
          <div className="w-[80%] h-[80%] md:h-[70%] flex flex-col justify-center items-center box-shadow-card bg-surface rounded-2xl p-4 md:p-16">
            <h1 className="font-LeckerliOne text-text text-6xl md:text-8xl">
              vaku
            </h1>
            <div className="my-10 w-full">
              <h2 className="font-bold text-text text-3xl md:text-5xl">
                Inicia sesi&oacute;n
              </h2>
              <h5 className="font-bold text-text-second text-lg">Paciente</h5>
            </div>
            <form className="flex flex-col items-center w-full" onSubmit={onSubmit}>
              <input
                className="w-full p-4 border-2 border-border rounded-lg placeholder:font-bold placeholder:text-lg mb-6 z-10"
                placeholder="Documento"
                type="text"
                name="persDocument"
                id="persDocument"
                value={login.persDocument}
                onChange={onInputChange}
              />
              <button className="font-bold text-lg text-surface w-48 h-[56px] bg-button rounded-full my-7 cursor-pointer">
                Iniciar sesi&oacute;n
              </button>
            </form>
            <Link
              to={ROUTE_PATHS.LOGIN_EMPLOYEE}
              className="font-bold text-lg text-text-second mb-6"
            >
              Eres un empleado
            </Link>
          </div>
        </div>

        <div className="hidden lg:visible w-full h-dvh lg:flex lg:items-end items-center justify-center z-10 mb-74">
          <img
            className="h-[60%] before-login"
            src={doctorChildrenLongin}
            alt=""
          />
        </div>

        <div className="absolute -right-40 -bottom-230  lg:-right-40 lg:-bottom-170 bg-bulle w-[90%] h-[150%] rounded-full -z-1"></div>
      </div>
    </>
  );
}
