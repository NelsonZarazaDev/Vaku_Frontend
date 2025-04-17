import React from "react";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

export default function TableSearchChildren() {
  return (
    <>
      <div className="w-full mt-15 md:mt-30 flex justify-center">
        <div className="w-[80%] max-w-full overflow-x-auto">
          <table className="min-w-[600px] md:min-w-full mx-auto">
            <thead>
              <tr className="bg-dark-cyan h-10">
                <th className="rounded-tl-lg">Nombre</th>
                <th className="border-x border-table">Documento</th>
                <th className="border-x border-table">Fecha de nacimiento</th>
                <th className="rounded-tr-lg">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-secondary text-center h-10">
                <td className="">Nelson Mauricio Navarro Zaraza</td>
                <td className="border-x border-table">10079777211</td>
                <td className="border-x border-table">2003-06-04</td>
                <td className="">
                  <button className="hover:bg-dark-cyan rounded-lg cursor-pointer">
                    <IoEyeOutline className="text-2xl mx-2" />
                  </button>
                  <button className="hover:bg-accent rounded-lg cursor-pointer">
                    <CiEdit className="text-2xl mx-2" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
