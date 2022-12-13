import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import Siguiente from "../../images/flechablancader.png";
import Anterior from "../../images/flechablancaizq.png";

export default function AllCards() {
  const vehicles = useSelector((state) => state.vehiclesByCity);
  const [currentPage, setCurrentPage] = useState(1);
  const vehicleByPage = 8;
  const lastVehicle = currentPage * vehicleByPage;
  const firstVehicle = lastVehicle - vehicleByPage;
  const currentVehicles =
    vehicles !== undefined ? vehicles.slice(firstVehicle, lastVehicle) : [];
  const pageNumbers = [];
  const totalVehicles = vehicles && vehicles.length;

  for (
    let index = 0;
    index < Math.ceil(totalVehicles / vehicleByPage);
    index++
  ) {
    pageNumbers.push(index + 1);
  }

  const Page = (page) => {
    setCurrentPage(page);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 1) return;
    setCurrentPage(prevPage);
  };

  const nextHandler = () => {
    const nextPage = currentPage + 1;
    if (nextPage > pageNumbers.length) return;
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <>
      <div className=" flex flex-wrap gap-x-16 gap-y-24 mt-10 mb-5 justify-center max-md:mx-0">
        {currentVehicles.length ? (
          currentVehicles.map((v, index) => (
            <div key={index}>
              <Card
                key={index + v.id}
                id={v.id}
                brand={v.brand}
                model={v.model}
                score={v.score}
                airconditioning={v.airconditioning}
                transmition={v.transmition}
                seats={v.seats}
                category={v.category}
                photo={v.photo}
                price={v.initialPrice}
              />
            </div>
          ))
        ) : (
          <h1 className="text-[#009A88] underline decoration-4">
            No existen autos con las caracteristicas solicitadas
          </h1>
        )}
      </div>
      {currentVehicles.length ? (
        <footer className="mb-5  space-x-4 inline-block align-middle  ">
          {currentPage !== 1 ? (
            <button
              className="bg-[#009A88] hover:bg-[#72aca5] p-3 h-10 w-10 rounded-full "
              onClick={prevHandler}
            >
              <img src={Anterior} alt="anterior" />
            </button>
          ) : null}
          {pageNumbers.map((number) => (
            <button
              className={
                currentPage === number
                  ? "bg-[#009A88] hover:bg-[#72aca5]  focus:bg-[#2E3A46] p-2 h-10 w-10 rounded-full flex-1 text-white text-center justify-center"
                  : " bg-[#009A88] hover:bg-[#72aca5] p-2 h-10 w-10 rounded-full flex-1 text-white text-center justify-center"
              }
              key={number}
              onClick={() => Page(number)}
            >
              {number}
            </button>
          ))}
          {currentPage !== pageNumbers.length ? (
            <button
              className="bg-[#009A88] hover:bg-[#72aca5] p-3 h-10 w-10 rounded-full items-center justify-center "
              onClick={nextHandler}
            >
              <img src={Siguiente} alt="siguiente" />
            </button>
          ) : null}
        </footer>
      ) : null}
    </>
  );
}
