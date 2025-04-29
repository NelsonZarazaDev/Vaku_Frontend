import React from "react";
import CardsInfoVaccinationCard from "../../components/cardsInfoVaccinationCard/CardsInfoVaccinationCard";
import { LuUsersRound } from "react-icons/lu";
import { CiBookmarkCheck } from "react-icons/ci";
import TableVaccinationCard from "../../components/tableVaccinationCard/TableVaccinationCard";

export default function VaccinationCard({mostrarAction}) {
  return (
    <>
      <div className="px-5 md:px-20 w-full h-auto mb-9">
        <div className="w-full text-2xl text-dark-green font-bold mb-4">
          <div className="flex items-center justify-end">
            <div className="flex flex-col items-end">
              <div>Datos personales</div>
              <div>& familiares</div>
            </div>
            <LuUsersRound className="text-5xl text-accent ml-4" />
          </div>
        </div>

        <CardsInfoVaccinationCard />

        <div className="w-full text-2xl text-dark-green font-bold my-7">
          <div className="flex items-center">
            <CiBookmarkCheck className="text-5xl text-accent mr-4" />
            <div>
              <div>Esquema</div>
              <div>de vacunación</div>
            </div>
          </div>
        </div>

        <TableVaccinationCard mostrarAction={mostrarAction||false}/>

      </div>
    </>
  );
}
