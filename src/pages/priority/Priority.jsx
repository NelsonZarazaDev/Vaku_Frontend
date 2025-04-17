import React from "react";
import ButtonEmailPriority from "../../components/buttonEmailPriority/ButtonEmailPriority";
import { CiCircleAlert } from "react-icons/ci";

export default function Priority() {
  return (
    <>
      <div className="px-5 md:px-20 w-full h-36 flex justify-between items-center">
        <p className="font-bold text-2xl text-dark-cyan">
          Prioridad de niños a vacunar
        </p>
        <ButtonEmailPriority />
      </div>

      <div className="px-5 md:px-20 w-full">
        <div className="p-6 flex justify-between items-center box-shadow-card rounded-2xl font-bold">

          <div className="flex justify-center items-center">
            <CiCircleAlert className="text-4xl mr-2 text-error" />
            <div className="text-lg">
              <div>Nelson Mauricio Navarro Zaraza</div>
              <div>1007977211</div>
            </div>
          </div>

          <div className="text-lg">fecha: 04/06/2003</div>
        </div>
      </div>
    </>
  );
}
