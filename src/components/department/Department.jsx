import React from "react";
import UseDepartment from "../../hooks/department/UseDepartment";
import useDepartmentStore from "../../store/Department/useDepartmentStore";

export default function Department({ name = "select", id, value, onChange }) {
  const { departmentData } = UseDepartment();
  const setDepaId = useDepartmentStore((state) => state.setDepaId);
  const selectValueProps = value !== undefined ? { value: value ?? "" } : { defaultValue: "" };

  const handleChange = (e) => {
    setDepaId(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="w-full">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray">Departamento</label>
      <select
        className="form-select text-sm"
        name={name}
        id={id}
        onChange={handleChange}
        {...selectValueProps}
      >
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
