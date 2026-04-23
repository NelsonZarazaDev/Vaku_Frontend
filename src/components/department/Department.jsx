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
    <div className="w-full">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray">Departamento</label>
      <select className="form-select text-sm" name="select" onChange={handleChange} defaultValue="">
        <option value="" disabled>
          Selecciona
        </option>
        {departmentData.map((departmenList, index) => (
          <option key={index} value={departmenList.depaId}>
            {departmenList.depaName}
          </option>
        ))}
      </select>
    </div>
  );
}
