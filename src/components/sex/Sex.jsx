import React from "react";

export default function Sex({ name, id, value, checked, onChange, label }) {
  return (
    <label className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-medium text-text-second">
      <input
        className="accent-accent"
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
}
