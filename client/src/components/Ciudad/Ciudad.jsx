import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCity } from "../../redux/actions/actions";
import AllCards from "../AllCards/AllCards";
import NavBar from "../NavBar/Navbar";
import Filters from "../Filters/Filters";

export default function Ciudad() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const city = useSelector((state) => state.city);
  const [change, setChange] = useState();

  useEffect(() => {
    dispatch(getCity(id));
  }, [dispatch, id]);

  return (
    <div className="bg-[#D9D9D9] min-h-screen">
      <div>
        <NavBar />
      </div>
      <div className="flex max-md:block max-md:mt-2">
        <div className="w-fit bg-[#D9D9D9] mr-1 max-md:w-fit max-md:m-auto ">
          <Filters setChange={setChange} />
        </div>
        <div className="w-10/12  h-full flex flex-col max-md:mx-auto ">
          <div className="relative max-h-50 rounded-bl-3xl rounded-br-3xl m-auto w-[600px] max-lg:hidden">
            <h1 className="absolute bottom-0 bg-slate-200 bg-opacity-50 p-2 rounded-bl-3xl rounded-tr-3xl font-bold text-3xl text-white">
              {city[0] && city[0].name}
            </h1>
            <img
              alt={city[0] && city[0].name}
              src={city[0] && city[0].photo}
              className="rounded-b-3xl w-full max-h-40 shadow-xl"
            />
          </div>
          <AllCards />
        </div>
      </div>
    </div>
  );
}
