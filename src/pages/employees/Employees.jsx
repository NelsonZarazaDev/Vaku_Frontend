import React from "react";
import EmployesUserCard from "../../components/employesUserCard/EmployesUserCard";

export default function Employees() {
  return (
    <>
      <div className="px-5 md:px-20 w-full h-36 flex justify-between items-center">
        <p className="font-bold text-2xl text-dark-cyan">
          Usuarios del sistema
        </p>
      </div>

      <div className="px-5 md:px-20 w-full">
        <div class="grid gap-y-6 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6">
          <EmployesUserCard />
          <EmployesUserCard />
          <EmployesUserCard />
          <EmployesUserCard />
          <EmployesUserCard />
          <EmployesUserCard />
          <EmployesUserCard />
          <EmployesUserCard />
        </div>
      </div>
    </>
  );
}
