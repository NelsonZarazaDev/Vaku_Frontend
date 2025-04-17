import React from "react";
import { CiBookmarkCheck, CiSearch } from "react-icons/ci";

export default function SearchChild() {
  return (
    <div className="px-5 md:px-20 w-full h-36 flex flex-col items-center mt-6">
      <div className="flex w-full my-5">
        <CiBookmarkCheck className="text-4xl text-accent" />
        <p className="font-bold text-2xl text-dark-cyan">Registro de niños</p>
      </div>
      <div className="flex w-full px-2">
        <input
          className="w-60 text-lg placeholder:text-gray-500 placeholder:italic border-b-2 focus:outline-hidden"
          placeholder="Buscar..."
          type="search"
          name="search"
        />
        <CiSearch className="text-xl h-auto border-b-2" />
      </div>
    </div>
  );
}
