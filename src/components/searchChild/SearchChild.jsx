import React from "react";
import { FiSearch, FiUserCheck } from "react-icons/fi";
import UseSearchChild from "../../hooks/searchChild/UseSearchChild";

export default function SearchChild({ onResult }) {
  const { searchData, onInputChange, onSubmit } = UseSearchChild({ onResult });

  return (
    <div className="section-card p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <FiUserCheck className="icon-md text-accent" />
        <p className="typo-section-title text-dark-cyan">Busqueda de ninos</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-2">
          <input
            className="form-input text-sm"
            placeholder="Documento del nino"
            type="text"
            id="search"
            name="search"
            value={searchData.search}
            onChange={onInputChange}
          />
          <button className="btn-primary px-3 py-2" type="submit">
            <FiSearch className="icon-sm" />
          </button>
        </div>
      </form>
    </div>
  );
}
