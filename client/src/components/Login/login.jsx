import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGoogle } from "../ButtonGoogle/ButtonGoogle";
import { loginUser, statusLogin } from "../../redux/actions/actions";
import Navbar from "../NavBar/Navbar";

function validate(input) {
  let errors = {};
  if (input.email) {
    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(input.email)
    ) {
      errors.email = "El email es inválido";
    }
  }
  if (!input.password) {
    errors.password = "Se requiere contraseña";
  }

  return errors;
}

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateUser = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(statusLogin());
  }, [stateUser, dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(input, navigate));
    setInput({
      email: "",
      password: "",
    });
  };

  return (
    <div className="h-screen container-reg">
      <Navbar />
      <div className="h-screen flex justify-center items-center">
        <div className="bg-slate-900 flex w-[400px] h-[500px] flex-col rounded-lg shadow-[0_35px_60px_-15px_#009A88] login">
          <h2 className="text-2xl text-[#faebd7] mt-8">Inicio de sesion</h2>
          <form
            className="flex flex-col w-full justify-center items-center mt-8"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="flex flex-col w-[400px] justify-center items-center">
                <div className="c-input">
                  <div className="data">
                    <input
                      type="text"
                      value={input.email}
                      name="email"
                      placerholder="Nombre..."
                      onChange={(e) => handleChange(e)}
                      className=""
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                    <span className="">E-mail</span>
                  </div>
                </div>

                <div className="c-input mt-2">
                  <div className="data">
                    <input
                      type="password"
                      value={input.password}
                      name="password"
                      placerholder="Contraseña..."
                      onChange={(e) => handleChange(e)}
                      className=""
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password}</p>
                    )}
                    <span className="">Contraseña</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-around items-center w-[300px] m-auto mt-12">
              <button
                className="w-full h-[40px] rounded-lg px-8 py-2 text-white bg-[#41D3C0] rounded focus:outline-none disabled:opacity-70 bg-[#009A88] text-white font-semibold"
                type="submit"
                disabled={
                  !input.email ||
                  !input.password ||
                  errors.email ||
                  errors.password
                }
              >
                Iniciar sesion
              </button>
              <ButtonGoogle />
              <span className="text-white mt-6">
                No tienes una cuenta?{" "}
                <Link to="/register" className="text-[#F97D67]">
                  Registrate
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
