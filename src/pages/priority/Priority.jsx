import React from "react";
import ButtonEmailPriority from "../../components/buttonEmailPriority/ButtonEmailPriority";
import { CiCircleAlert } from "react-icons/ci";
import UsePriority from "../../hooks/priority/UsePriority";

export default function Priority() {
  const { priorityData } = UsePriority();
  console.log(priorityData)

  return (
    <>
      <div className="px-5 md:px-20 w-full h-36 flex justify-between items-center">
        <p className="font-bold text-2xl text-dark-cyan">
          Prioridad de niños a vacunar
        </p>
        <ButtonEmailPriority />
      </div>

      <div className="px-5 md:px-20 w-full">
        {priorityData.map((child, index) => (
          <div className="p-6 flex justify-between items-center box-shadow-card rounded-2xl font-bold mb-6">
            <div className="flex justify-center items-center">
              <CiCircleAlert className="text-4xl mr-2 text-error" />
              <div className="text-lg">
                <div>{child.childNames} {child.childLastNames}</div>
                <div>{child.childDocument}</div>
              </div>
            </div>

            <div className="text-lg">fecha: {child.vaapNextAppointmentDate}</div>
          </div>
        ))}
      </div>
    </>
  );
}
