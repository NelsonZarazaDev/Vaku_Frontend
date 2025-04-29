import React from "react";
import UseDepartment from "../../hooks/department/UseDepartment";
import useDepartmentStore from "../../store/Department/useDepartmentStore";

export default function Department() {
  const { departmentData } = UseDepartment();
  const setDepaId = useDepartmentStore((state) => state.setDepaId);


  const handleChange = (e) => {
    setDepaId(e.target.value);
  };

  return (
    <>
      <div className="w-full">
        <div className="text-gray">Departamento</div>
        <select
          className="w-full border border-background-card p-3 rounded-lg"
          name="select"
          onChange={handleChange}
        > 
          <option hidden selected>
            Selecciona
          </option>
          {departmentData.map((departmenList, index) => (
            <option key={index} value={departmenList.depaId}>
              {departmenList.depaName}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
