import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterPrice, filter, getVehicles } from "../../redux/actions/actions";

export default function Filters({ setChange }) {
  const vehicles = useSelector((state) => state.allVehicles);
  const brand = [...new Set(vehicles.map((el) => el.brand))];
  const vehiclesByCity = useSelector((state) => state.vehiclesByCity);
  let data = {
    Micro: 0,
    Sedan: 0,
    CUV: 0,
    SUV: 0,
    Hatchback: 0,
    Convertible: 0,
    Cabriolet: 0,
    Pickup: 0,
    Coupe: 0,
    Deportivo: 0,
    Minivan: 0,
    Manual: 0,
    Automatico: 0,
    air: 0,
    seats: 0,
  };
  vehiclesByCity.map((v) => {
    if (v.category) data[v.category]++;
    if (v.transmition === "Manual") data.Manual++;
    if (v.transmition === "Automatico") data.Automatico++;
    if (v.air) data.air++;
    if (v.seats > 4) data.seats++;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch]);

  const handleFilters = (e) => {
    if (e.target.checked)
      dispatch(filter({ key: e.target.name, value: e.target.value }));
    if (!e.target.checked)
      dispatch(filter({ key: e.target.name, value: "all" }));
  };

  const handlePrice = (e) => {
    dispatch(filterPrice(e.target.value));
    setChange(e.target.value);
  };

  const handlerBrand = (e) => {
    dispatch(filter({ key: e.target.name, value: e.target.value }));
  };
  return (
    <div className="flex flex-col mt-[190px] w-full font-medium text-white bg-white h-fit rounded-tr-[100px] rounded-br-2xl shadow-xl max-md:rounded">
      <div>
        <br />
        <div className="p-5">
          <select
            defaultValue="price"
            onChange={handlePrice}
            className=" cursor-default rounded-md text-white bg-[#2E3A46] py-2 pl-3 pr-10 text-left shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
          >
            <option value="price" disabled>
              Precio
            </option>
            <option value="lower">De menor a mayor</option>
            <option value="higher">De mayor a menor</option>
          </select>
        </div>
        <br></br>
        <br />
        <div className="p-5 bg-white text-[#2E3A46] shadow-xl">
          <label className="font-medium flex justify-start text-[#009A88]">
            Categoría:{" "}
          </label>

          <div className="rounded-md p-3  flex flex-col items-start">
            <div>
              <input
                type="radio"
                name="category"
                id="all"
                value="all"
                onChange={handleFilters}
                className="border-gray-300 rounded h-5 w-5 mx-2 "
              />
              <label htmlFor="all" className="">
                Todos
              </label>
            </div>
            {data.Micro > -1 && (
              <div>
                <input
                  type="radio"
                  name="category"
                  id="Micro"
                  value="Micro"
                  onChange={handleFilters}
                  className="border-gray-300 rounded h-5 w-5 mx-2 "
                />
                <label htmlFor="Micro">
                  Micro{" "}
                  <span className="text-[#94a3b8]">{`(${data.Micro})`} </span>{" "}
                </label>
              </div>
            )}
            {data.Sedan > -1 && (
              <div>
                <input
                  type="radio"
                  name="category"
                  id="Sedan"
                  value="Sedan"
                  onChange={handleFilters}
                  className="border-gray-300 rounded h-5 w-5 mx-2 "
                />
                <label htmlFor="Sedan">
                  Sedan{" "}
                  <span className="text-[#94a3b8]">{`(${data.Sedan})`} </span>{" "}
                </label>
              </div>
            )}
            {data.CUV > -1 && (
              <div>
                <input
                  type="radio"
                  name="category"
                  id="CUV"
                  value="CUV"
                  onChange={handleFilters}
                  className="border-gray-300 rounded h-5 w-5 mx-2"
                />
                <label htmlFor="CUV">
                  Cuv <span className="text-[#94a3b8]">{`(${data.CUV})`} </span>
                </label>
              </div>
            )}
            {data.SUV > -1 && (
              <div>
                <input
                  type="radio"
                  name="category"
                  id="SUV"
                  value="SUV"
                  onChange={handleFilters}
                  className="border-gray-300 rounded h-5 w-5 mx-2"
                />
                <label htmlFor="SUV">
                  Suv <span className="text-[#94a3b8]">{`(${data.SUV})`} </span>{" "}
                </label>
              </div>
            )}
            {data.Hatchback > -1 && (
              <div>
                <input
                  type="radio"
                  name="category"
                  id="Hatchback"
                  value="Hatchback"
                  onChange={handleFilters}
                  className="border-gray-300 rounded h-5 w-5 mx-2"
                />
                <label htmlFor="Hatchback">
                  Hatchback{" "}
                  <span className="text-[#94a3b8]">
                    {`(${data.Hatchback})`}{" "}
                  </span>{" "}
                </label>
              </div>
            )}
            {data.Convertible > -1 && (
              <div>
                <input
                  type="radio"
                  name="category"
                  id="Convertible"
                  value="Convertible"
                  onChange={handleFilters}
                  className="border-gray-300 rounded h-5 w-5 mx-2"
                />
                <label htmlFor="Convertible">
                  Convertible{" "}
                  <span className="text-[#94a3b8]">
                    {`(${data.Convertible})`}{" "}
                  </span>{" "}
                </label>
              </div>
            )}
            {data.Cabriolet > -1 && (
              <div>
                <input
                  type="radio"
                  name="category"
                  id="Cabriolet"
                  value="Cabriolet"
                  onChange={handleFilters}
                  className="border-gray-300 rounded h-5 w-5 mx-2"
                />
                <label htmlFor="Cabriolet">
                  Cabriolet{" "}
                  <span className="text-[#94a3b8]">
                    {`(${data.Cabriolet})`}{" "}
                  </span>{" "}
                </label>
              </div>
            )}
            {data.Pickup > -1 && (
              <div>
                <input
                  type="radio"
                  name="category"
                  id="Pickup"
                  value="Pickup"
                  onChange={handleFilters}
                  className="border-gray-300 rounded h-5 w-5 mx-2"
                />
                <label htmlFor="Pickup">
                  Pickup{" "}
                  <span className="text-[#94a3b8]">{`(${data.Pickup})`} </span>{" "}
                </label>
              </div>
            )}
            {data.Coupe > -1 && (
              <div>
                <input
                  type="radio"
                  name="category"
                  id="Coupe"
                  value="Coupe"
                  onChange={handleFilters}
                  className="border-gray-300 rounded h-5 w-5 mx-2"
                />
                <label htmlFor="Coupe">
                  Coupe{" "}
                  <span className="text-[#94a3b8]">{`(${data.Coupe})`} </span>{" "}
                </label>
              </div>
            )}
            {data.Deportivo > -1 && (
              <div>
                <input
                  type="radio"
                  name="category"
                  id="Deportivo"
                  value="Deportivo"
                  onChange={handleFilters}
                  className="border-gray-300 rounded h-5 w-5 mx-2"
                />
                <label htmlFor="Deportivo">
                  Deportivo{" "}
                  <span className="text-[#94a3b8]">
                    {`(${data.Deportivo})`}{" "}
                  </span>{" "}
                </label>
              </div>
            )}
            {data.Minivan > -1 && (
              <div>
                <input
                  type="radio"
                  name="category"
                  id="Minivan"
                  value="Minivan"
                  onChange={handleFilters}
                  className="border-gray-300 rounded h-5 w-5 mx-2"
                />
                <label htmlFor="Minivan">
                  Minivan{" "}
                  <span className="text-[#94a3b8]">{`(${data.Minivan})`} </span>{" "}
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="p-5 bg-white text-[#2E3A46] shadow-xl">
          <label className="font-medium flex justify-start text-[#009A88] ml-2">
            Transmisión:{" "}
          </label>

          <div className="rounded-md  p-3 flex flex-col items-start">
            <div>
              <input
                type="radio"
                name="transmition"
                id="all2"
                value="all"
                onChange={handleFilters}
                className="border-gray-300 rounded h-5 w-5 mx-2"
              />
              <label htmlFor="all2">Todos</label>
            </div>
            <div>
              <input
                type="radio"
                name="transmition"
                id="Manual"
                value="Manual"
                onChange={handleFilters}
                className="border-gray-300 rounded h-5 w-5 mx-2"
              />
              <label htmlFor="Manual">
                Manual{" "}
                <span className="text-[#94a3b8]">{`(${data.Manual})`} </span>{" "}
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="transmition"
                id="Automatico"
                value="Automatico"
                onChange={handleFilters}
                className="border-gray-300 rounded h-5 w-5 mx-2"
              />
              <label htmlFor="Automatico">
                Automático{" "}
                <span className="text-[#94a3b8]">
                  {`(${data.Automatico})`}{" "}
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white text-[#2E3A46] shadow-xl">
          <label className="font-medium flex justify-start text-[#009A88]">
            Características:{" "}
          </label>

          <div className="rounded-md p-3 flex flex-wrap gap-x-2">
            <div>
              <input
                type="checkbox"
                name="AC"
                id="AC"
                value="AC"
                onChange={handleFilters}
                className="border-gray-300 rounded h-5 w-5 mx-2"
              />
              <label htmlFor="AC">
                Aire Acondicionado{" "}
                <span className="text-[#94a3b8]">{`(${data.air})`} </span>{" "}
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                name="seats"
                id="seats"
                value="seats"
                onChange={handleFilters}
                className="border-gray-300 rounded h-5 w-5 mx-2"
              />
              <label htmlFor="seats">
                +4 Asientos{" "}
                <span className="text-[#94a3b8]">{`(${data.seats})`} </span>
              </label>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white text-[#2E3A46] rounded-br-2xl shadow-xl">
          <label className="font-medium flex justify-start text-[#009A88]">
            Marca:{" "}
          </label>

          <div>
            <select
              className=" cursor-default rounded-md bg-[#2E3A46] py-2 pl-3 pr-10 text-white text-left shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
              name="brand"
              onChange={handlerBrand}
              defaultValue="Marca"
            >
              <option value="all">Todas</option>
              {brand &&
                brand.map((el, i) => (
                  <option name="brand" value={el} key={i}>
                    {el}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
