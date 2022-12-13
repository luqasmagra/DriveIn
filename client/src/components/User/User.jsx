import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { refreshAuthUser } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./user.css";
import swal from "sweetalert";

export const User = ({ img, name }) => {
  const { isAuthenticated, logout, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(refreshAuthUser());
  }, [isLoading, dispatch]);

  const handlerExitSession = (e) => {
    if (isAuthenticated) {
      localStorage.removeItem("UserLogin");
      logout();
    } else {
      localStorage.removeItem("UserLogin");
      swal({
        title: "Has cerrado sesión.",
        icon: "success",
      });
      navigate("/home");
    }
  };

  return (
    <nav className="w-[200px] h-[50px] bg-[#2E3A46] rounded-xl header max-lg:max-w-fit max-lg:m-auto ">
      <div className="w-full flex flex-row justify-around max-lg:px-2 ">
        <figure className="w-[40px] h-[40px] ml-4 mt-[4px] m-auto max-lg:m-1 ">
          <img src={img} alt="user" className=" w-full h-full rounded-full" />
        </figure>
        <span className="text-white font-bold align-center m-auto">{name}</span>
      </div>
      <ul className="-mt-[2px] ml-16 hidden duration-500 absolute w-[130px] bg-[#2E3A46] list rounded max-lg:ml-0 max-lg:-mt-[2px] ">
        <li>
          <Link to="/user">
            <button className="w-full text-white border-none rounded hover:bg-[#34d399]">
              Mi Perfil
            </button>
          </Link>
        </li>
        <li className="list__item">
          <button
            onClick={() => handlerExitSession()}
            className="w-full text-white border-none rounded hover:bg-[#34d399]"
          >
            Salir
          </button>
        </li>
      </ul>
    </nav>
  );
};
