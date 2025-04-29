import React, { useEffect } from "react";
import { BsFillCalendarDateFill, BsFillFilePersonFill } from "react-icons/bs";
import { FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { PiGenderIntersexBold } from "react-icons/pi";
import doctorCardChildren from "../../assets/images/doctorCardChildren.webp";
import doctorCardParent from "../../assets/images/doctorCardParent.webp";
import { AiFillHeart } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import UseCardsInfoVaccinationCard from "../../hooks/cardsInfoVaccinationCard/UseCardsInfoVaccinationCard";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";

export default function CardsInfoVaccinationCard() {
  const { cardsData } = UseCardsInfoVaccinationCard();
  const { setChildrenAuthStore } = useChildrenAuthStore();

  useEffect(() => {
    if (cardsData.length > 0) {
      const { chilId, parentEmail, childDocument } = cardsData[0]; // Desestructurar el objeto
  
      setChildrenAuthStore({
        idChildren: chilId,          // Setea el ID del niño
        emailParent: parentEmail,    // Setea el email del padre
        persDocument: childDocument, // Setea el documento del niño
      });
    }
  }, [cardsData]);
  

  return (
    <>
      <div className="lg:flex w-auto space-x-6 text-dark-green">
        <div className="w-full lg:w-[50%] flex border border-accent p-4 rounded-3xl mt-3">
          {cardsData.length > 0 ? (
            <>
              <div className="w-full flex flex-col space-y-3">
                <div className="flex items-center space-x-2 font-bold">
                  <BsFillFilePersonFill className="text-2xl md:text-3xl" />
                  <div>Nombre:</div>
                  <div>
                    {cardsData[0].childNames} {cardsData[0].childLastNames}
                  </div>
                </div>
                <div className="flex items-center space-x-2 font-bold">
                  <BsFillCalendarDateFill className="text-2xl md:text-2xl" />
                  <div>Fecha de nacimiento:</div>
                  <div>{cardsData[0].parentBirthDate}</div>
                </div>
                <div className="flex items-center space-x-2 font-bold">
                  <PiGenderIntersexBold className="text-2xl md:text-2xl" />
                  <div>Sexo:</div>
                  <div>{cardsData[0].childSex}</div>
                </div>
                <div className="flex items-center space-x-2 font-bold">
                  <FaLocationArrow className="text-2xl md:text-3xl" />
                  <div>Municipio:</div>
                  <div>{cardsData[0].childCity}</div>
                </div>
                <div className="flex items-center space-x-2 font-bold">
                  <GrMapLocation className="text-2xl md:text-3xl" />
                  <div>Departamento:</div>
                  <div>{cardsData[0].childDepartment}</div>
                </div>
              </div>

              <div className="w-90 relative hidden md:inline-flex">
                <img
                  className="absolute right-0 -bottom-4"
                  src={doctorCardChildren}
                  alt=""
                />
              </div>
            </>
          ) : (
            <p className="text-center font-bold text-gray-600">
              Cargando datos...
            </p>
          )}
        </div>

        <div className="w-full lg:w-[50%] flex border border-accent p-4 rounded-3xl mt-3">
          {cardsData.length > 0 ? (
            <>
              <div className="w-full flex flex-col space-y-3">
                <div className="flex items-center space-x-2 font-bold">
                  <AiFillHeart className="text-2xl md:text-3xl" />
                  <div>Parentesco:</div>
                  <div>{cardsData[0].parentRole}</div>
                </div>
                <div className="flex items-center space-x-2 font-bold">
                  <BsFillFilePersonFill className="text-2xl md:text-3xl" />
                  <div>Nombre:</div>
                  <div>
                    {cardsData[0].parentNames} {cardsData[0].parentLastNames}
                  </div>
                </div>
                <div className="flex items-center space-x-2 font-bold">
                  <GrMapLocation className="text-2xl md:text-3xl" />
                  <div>Direccion:</div>
                  <div>{cardsData[0].parentAddress}</div>
                </div>
                <div className="flex items-center space-x-2 font-bold">
                  <PiGenderIntersexBold className="text-2xl md:text-2xl" />
                  <div>Sexo:</div>
                  <div>{cardsData[0].parentSex}</div>
                </div>
                <div className="flex items-center space-x-2 font-bold">
                  <FaPhoneAlt className="text-2xl md:text-3xl" />
                  <div>Teléfono:</div>
                  <div>{cardsData[0].parentPhone}</div>
                </div>
                <div className="flex items-center space-x-2 font-bold">
                  <MdOutlineEmail className="text-2xl md:text-3xl" />
                  <div>Correo:</div>
                  <div className="max-w-[200px] overflow-x-auto">
                    {cardsData[0].parentEmail}
                  </div>
                </div>
              </div>

              <div className="w-90 relative hidden md:inline-flex">
                <img
                  className="absolute right-0 -bottom-4"
                  src={doctorCardParent}
                  alt=""
                />
              </div>
            </>
          ) : (
            <p className="text-center font-bold text-gray-600">
              Cargando datos...
            </p>
          )}
        </div>
      </div>
    </>
  );
}
