import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Inicio/Inicio.css";
import Logo from "../../images/LogoVerde.png";
import { useDispatch } from "react-redux";
import { GetAllLists } from "../../redux/actions/actions";

export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllLists());
  }, [dispatch]);

  return (
    <div className="landing">
      <img className="logo" src={Logo} alt="" />
      <Link to="/home" style={{ color: "transparent" }}>
        <button className="button">INGRESAR</button>
      </Link>
    </div>
  );
}
