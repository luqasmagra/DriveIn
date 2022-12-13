import * as React from "react";
import { AppBar } from "react-admin";
import { NavLink, Link } from "react-router-dom";

import DriveIn from "../../images/logoblanco.png";
const MyAppBar = () => (
  <AppBar>
    <NavLink to="/">
      <img src={DriveIn} alt="" className="h-12 mr-1 " />
    </NavLink>
    <Link to="/home">
      <button> Volver </button>
    </Link>
  </AppBar>
);

export default MyAppBar;
