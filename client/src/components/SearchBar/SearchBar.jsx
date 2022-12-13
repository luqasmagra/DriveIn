import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../../redux/actions/actions";
import { NavLink } from "react-router-dom";

export default function SearchBar() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  let cities = useSelector((state) => state.cities);
  const [input, setInput] = useState({
    country: "",
    id: "",
  });

  const handleCity = (e) => {
    e.preventDefault();
    if (e.target.value === "City") {
      setInput({
        ...input,
        id: "",
      });
    } else {
      setInput({
        ...input,
        id: e.target.value,
      });
    }
  };
  const handleCountry = (e) => {
    e.preventDefault();
    if (e.target.value === "City") {
      setInput({
        ...input,
        country: "",
        id: "",
      });
      cities = "";
    } else {
      setInput({
        ...input,
        country: e.target.value,
      });
      dispatch(getCities(e.target.value));
    }
  };

  return (
    <div className="bg-stone-200 relative max-md:bg-opacity-80  w-[484px] h-[449px] max-md:w-full    border-solid border-2 rounded-3xl  border-stone-200 flex flex-col text-sm font-medium text-white py-3 px-3 justify-center">
      <div className="text-2xl text-[#009A88] font-bold mb-5">
        <h2>Encontrá el vehículo ideal para alquilar en cada ciudad!</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <select
          onChange={(e) => handleCountry(e)}
          placeholder="País..."
          className="relative block w-[440px] cursor-default rounded-md border max-lg:w-fit border-[#F97D67]-300 bg-[#F97D67] py-2 pl-3 pr-10 text-left shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
        >
          <option value="City">Pais...</option>
          {countries &&
            countries.map((c, index) => {
              return (
                <option key={index} value={c}>
                  {c}
                </option>
              );
            })}
        </select>
        <select
          onChange={(e) => handleCity(e)}
          placeholder="Ciudad..."
          className="relative block w-[440px] cursor-default rounded-md border border-[#F97D67]-300 bg-[#F97D67] py-2 pl-3 pr-10 text-left shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 max-lg:w-fit my-6"
        >
          <option value="City">Ciudad...</option>
          {cities &&
            cities.map((c, index) => {
              return (
                <option key={index} value={c.id}>
                  {c.name}
                </option>
              );
            })}
        </select>
        {input.id && (
          <NavLink to={`/ciudad/${input.id}`}>
            <button
              type="submit"
              value="Buscar"
              className="inline-block rounded-lg bg-[#009A88] px-4 py-1.5 text-base font-semibold leading-7 text-white ring-1 ring-[#6ee7b7] hover:bg-[#34d399] hover:ring-[#34d399] "
            >
              <p className="justify-items-center justify-center text-center px-4 py-1.5">
                Buscar
              </p>
            </button>
          </NavLink>
        )}
      </form>
    </div>
  );
}
