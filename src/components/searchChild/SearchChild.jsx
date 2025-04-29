import React from "react";
import { CiBookmarkCheck, CiSearch } from "react-icons/ci";
import UseSearchChild from "../../hooks/searchChild/UseSearchChild";

export default function SearchChild({onResult}) {
  const { searchData, onInputChange, onSubmit } = UseSearchChild({onResult});


  return (
    <div className="px-5 md:px-20 w-full h-36  items-center mt-6">
      <div className="flex flex-col w-full my-5 space-y-4">
        <div className="flex">
          <CiBookmarkCheck className="text-4xl text-accent" />
          <p className="font-bold text-2xl text-dark-cyan">Registro de niños</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="flex w-full px-2">
            <input
              className="w-60 text-lg placeholder:text-gray-500 placeholder:italic border-b-2 focus:outline-hidden"
              placeholder="Buscar..."
              type="text"
              id="search"
              name="search"
              value={searchData.search}
              onChange={onInputChange}
            />
            <button className="text-xl h-auto border-b-2">
              <CiSearch />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
