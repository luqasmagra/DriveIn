import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCity } from "../../redux/actions/actions";
import "./Vehicles.css";

const Vehicles = () => {
  const dispatch = useDispatch();

  const [vehiclesListLocal, setVehiclesListLocal] = useState([]);

  const city = useSelector((state) => state.city);
  const fun = async () => {
    let list = await axios.get("/vehicles");
    list = list.data.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    const vehicleList = list.map((vehicle) => {
      dispatch(getCity(vehicle.cityId));
      return (
        <div className="Vehicles_Unit" key={vehicle.id}>
          <h1 className="Vehicles_Text1">Carro No. {vehicle.id}</h1>
          <img
            src={vehicle.photo}
            alt="Vehiculo"
            className="Vehicles_photo"
          ></img>
          <p>{city}</p>
          <p className="Vehicles_Text2">Disponibilidad:</p>
          {vehicle.availability ? (
            <p style={{ color: "green" }} className="Vehicles_Text2">
              Disponible
            </p>
          ) : (
            <p style={{ color: "red" }} className="Vehicles_Text2">
              No disponible
            </p>
          )}
          {vehicle.availability ? (
            <button
              className="Vehicles_Button"
              onClick={statusChangeHandler}
              value={[vehicle.availability, vehicle.id]}
            >
              Desabilitar
            </button>
          ) : (
            <button
              className="Vehicles_Button"
              onClick={statusChangeHandler}
              value={[vehicle.availability, vehicle.id]}
            >
              Habilitar
            </button>
          )}
        </div>
      );
    });
    setVehiclesListLocal(vehicleList);
  };

  useEffect(() => {
    fun();
  }, [fun]);

  const statusChangeHandler = async (event) => {
    const state = event.target.value.split(",");
    console.log(state);
    await axios.post(`/vehicles/${state[1]}`, {
      availability: state[0] === "true" ? false : true,
    });
    fun();
  };

  return (
    <div className="Vehicles_Main">
      <div className="Vehicles_Second">
        Lista de vehiculos:
        <div className="Vehicles_Unit_Box">{vehiclesListLocal}</div>
      </div>
    </div>
  );
};

export default Vehicles;
