import React from "react";
import UseCity from "../../hooks/city/UseCity";
import useDepartmentStore from "../../store/Department/useDepartmentStore";
import { showToast } from "../../components/notifyToast/NotifyToast";

export default function City({ name, id, value, onChange }) {
  const { cityData, fetchCityData } = UseCity();
  const depaId = useDepartmentStore((state) => state.depaId);

  return (
    <div className="w-full">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray">Municipio</label>
      <select
        className="form-select text-sm"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => {
          if (depaId) {
            fetchCityData(depaId);
          } else {
            showToast("Selecciona primero un departamento", "info");
          }
        }}
      >
        <option hidden value="">
          Selecciona
        </option>
        {cityData.map((cityList, index) => (
          <option key={index} value={cityList.cityId}>
            {cityList.cityName}
          </option>
        ))}
      </select>
    </div>
  );
}
