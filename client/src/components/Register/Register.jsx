import React, { useState, useEffect } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  statusLogin,
  postMails,
} from "../../redux/actions/actions";
import swal from "sweetalert";
import Navbar from "../NavBar/Navbar";

function validate(input) {
  let errors = {};

  if (input.name) {
    if (!/^[a-z A-Z]+$/.test(input.name)) {
      errors.name = "Solo se aceptan letras";
    }
  }
  if (input.email) {
    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(input.email)
    ) {
      errors.email = "El email es inválido";
    }
  }
  if (input.lastName) {
    if (!/^[a-z A-Z]+$/.test(input.lastName)) {
      errors.lastName = "Solo se aceptan letras";
    }
  }
  if (input.password) {
    if (!/^.{4,12}$/.test(input.password)) {
      errors.password = "Se requiere 4 a 12 digitos";
    }
  }
  if (input.password2) {
    if (input.password2 !== input.password) {
      errors.password2 = "Las contraseñas no coinciden";
    }
  }
  if (input.whatsapp) {
    if (!/^.{7,16}$/.test(input.whatsapp)) {
      errors.whatsapp = "Se requiere 7 a 16 digitos";
    } else if (!/[^a-z]$/.test(input.whatsapp)) {
      errors.whatsapp = "Solo ingresar numeros";
    }
  }
  return errors;
}

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateLogin = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    whatsapp: "",
  });
  console.log(input);

  useEffect(() => {
    dispatch(statusLogin());
  }, [stateLogin, dispatch]);

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
  function handleSubmit(e) {
    const post = {
      name: input.name,
      lastName: input.lastName,
      email: input.email,
      password: input.password,
      whatsapp: input.whatsapp,
    };

    const mailRegistro = {
      to: input.email,
      subject: "Registro de Usuario",
      content: `<b>Bienvenido ${input.name}, se ha registrado correctamente a nuestra plataforma!!!</b>`,
    };
    dispatch(registerUser(post));
    dispatch(postMails(mailRegistro));
    swal({
      title: "Bienvenido a DriveIn",
      text: "Se ha registrado correctamente",
      icon: "success",
    });
    navigate("/login");
  }

  return (
    <>
      <div className="h-screen container-reg">
        <Navbar />
        <div className="h-screen flex justify-center items-center">
          <div className="bg-slate-900 flex w-[600px] h-[500px] flex-col rounded-lg shadow-[0_35px_60px_-15px_#009A88] container-data">
            <h2>Crear una cuenta</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row w-full justify-around">
                <div className="flex flex-col w-2/5">
                  <div className="c-input">
                    <div className="data">
                      <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                        className=""
                        required
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name}</p>
                      )}
                      <span className="">Nombre</span>
                    </div>
                  </div>
                  <div className="c-input mt-2">
                    <div className="data">
                      <input
                        type="text"
                        value={input.email}
                        name="email"
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
                <div className="flex flex-col w-2/5">
                  <div className="c-input">
                    <div className="data">
                      <input
                        type="text"
                        value={input.lastName}
                        name="lastName"
                        onChange={(e) => handleChange(e)}
                        className=""
                        required
                      />
                      {errors.lastName && (
                        <p className="text-red-500">{errors.lastName}</p>
                      )}
                      <span className="">Apellido</span>
                    </div>
                  </div>

                  <div className="c-input mt-2">
                    <div className="data">
                      <input
                        type="text"
                        value={input.whatsapp}
                        name="whatsapp"
                        onChange={(e) => handleChange(e)}
                        className=""
                        required
                      />
                      {errors.whatsapp && (
                        <p className="text-red-500">{errors.whatsapp}</p>
                      )}
                      <span className="">Celular</span>
                    </div>
                  </div>
                  <div className="c-input mt-2">
                    <div className="data">
                      <input
                        type="password"
                        value={input.password2}
                        name="password2"
                        onChange={(e) => handleChange(e)}
                        className=""
                        required
                      />
                      {errors.password2 && (
                        <p className="text-red-500">{errors.password2}</p>
                      )}
                      <span className="">Repetir Contraseña</span>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="flex flex-col justify-around m-auto items-center w-[300px] ">
                <button
                  className="w-full h-[40px] rounded-lg px-8 py-2 text-white bg-[#41D3C0] rounded focus:outline-none disabled:opacity-70 text-white font-semibold"
                  type="submit"
                  disabled={
                    errors.name ||
                    !input.name ||
                    !input.lastName ||
                    !input.email ||
                    !input.password ||
                    !input.password2 ||
                    !input.whatsapp ||
                    errors.lastName ||
                    errors.email ||
                    errors.password ||
                    errors.password2 ||
                    errors.whatsapp
                  }
                >
                  Registrarme
                </button>
                <span className="text-white mt-6">
                  Ya tienes una cuenta?{" "}
                  <Link to="/login" className="text-[#F97D67]">
                    Inicia sesión
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
