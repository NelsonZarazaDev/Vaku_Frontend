import React from "react";
import { CiUser } from "react-icons/ci";

export default function EmployesUserCard() {
  return (
    <>
      <div className="box-shadow-card flex flex-col p-4 w-full rounded-2xl">
        <div className="flex flex-col">
          <div className="flex font-bold">
            <CiUser className="text-3xl" />
            <div>
              <p className="">Nelson Mauricio Navarro Zaraza</p>
              <p className="text-gray mt-2">Jefe de enfermeria</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center font-bold h-18">
          <input className="mr-2 accent-dark-cyan" type="radio" name="" id="" />
          <label htmlFor="">Activo</label>
        </div>

        <div className="flex justify-center items-center">
          <button className="bg-accent-light w-[40%] py-1.5 rounded-l-full border cursor-pointer">Editar</button>
          <button className="bg-surface w-[40%] py-1.5 rounded-r-full border cursor-pointer">Ver</button>
        </div>
      </div>
    </>
  );
}
