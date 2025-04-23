import React from "react";

export default function Sex({ name, id, value, checked, onChange, label }) {
  return (
    <div className="space-x-2">
      <input
        className="accent-accent"
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label className="text-gray">{label}</label>
    </div>
  );
}
