import React from "react";
import UseCity from "../../hooks/city/UseCity";
import useDepartmentStore from "../../store/Department/useDepartmentStore";

export default function City({name, id, value, onChange}) {
  const { cityData, fetchCityData } = UseCity();
  const depaId = useDepartmentStore((state) => state.depaId);

  return (
    <div className="w-full">
      <div className="text-gray">Municipio</div>
      <select
        className="w-full border border-background-card p-3 rounded-lg"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => {
          if (depaId) {
            fetchCityData(depaId);
          } else {
            console.log("Selecciona primero un departamento 🏞️");
          }
        }}
      >
        <option hidden selected>
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
