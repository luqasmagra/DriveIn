import React, { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Carousel from "../Carousel/Carousel";
import banner from "../../images/banner.jpg";
import Navbar from "../NavBar/Navbar";
import { useDispatch } from "react-redux";
import {
  getCountries,
  getVehicles,
  deleteStates,
} from "../../redux/actions/actions";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deleteStates());
    dispatch(getCountries());
    dispatch(getVehicles());
  }, [dispatch]);
  return (
    <div className="bg-[#D9D9D9] h-full">
      <div>
        <Navbar />
      </div>
      <div className="relative max-md:mt-10">
        <img
          src={banner}
          alt="driveIn banner"
          className="w-[1500.22px] h-[636px] m-auto rounded-3xl max-md:absolute max-md:h-[470px]"
        />
        <div className="absolute left-16 top-16 max-md:relative max-md:left-0 max-md:top-2 ">
          <SearchBar />
        </div>
      </div>
      <div className="mt-8">
        <Carousel />
      </div>
    </div>
  );
}
