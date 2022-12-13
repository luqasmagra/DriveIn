import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRents, getUser, userUpdate } from "../../redux/actions/actions";
import swal from "sweetalert";

export default function EditForm({ name, lastName, phone, open, onClose }) {
  const usuario = JSON.parse(localStorage.getItem("UserLogin"));
  const [input, setInput] = useState({
    name: usuario.name,
    lastName: usuario.lastName,
    phone: usuario.phone,
    password: usuario.password,
    photo: usuario.photo,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRents(usuario.id));
    dispatch(getUser(usuario.email));
  }, [dispatch, usuario.id, usuario.email]);

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  async function handleUserData(e) {
    e.preventDefault();
    dispatch(userUpdate(usuario.id, input));
    dispatch(getUser(usuario.email));
    swal({
      title: "Felicitaciones!",
      icon: "success",
      text: "Cambiaste tus datos personales correctamente",
      button: {
        text: "Ok",
      },
    });
    navigate("/home");
  }

  if (!open) return null;

  return (
    <>
      {open && (
        <div className="z-30 bg-[#2E3A46] bg-opacity-30 w-full min-h-full  absolute p-0 m-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white hover:bg-slate-200 flex-none w-14 h-14 relative m-5"
          >
            x
          </button>
          <form
            onSubmit={(e) => {
              handleUserData(e);
            }}
          >
            <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg  justify-center items-center h-screen ">
              <div className="relative py-8 px-5 md:px-10 bg-white  shadow-emerald-500 shadow-2xl rounded border-4 border-[#009A88] mt-10 z-20 ">
                <div className="w-full flex justify-start text-gray-600 mb-3"></div>
                <div className="bg-[#009A88] rounded ">
                  <h1 className="text-[#ffffff] bg-[#009A88] font-lg font-normal tracking-normal leading-tight mb-4 p-4 rounded-2">
                    Modificar Datos Personales
                  </h1>
                </div>
                <label
                  htmlFor="name"
                  className="text-[#009A88] text-sm font-normal leading-tight tracking-normal"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder=" nuevo nombre"
                  value={input.name}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="mb-5 mt-2 text-[#cbd5e1] focus:outline-none focus:border focus:border-[#41D3C0] font-normal w-full h-10 flex items-center pl-3 text-sm border-[#009A88] rounded border"
                />
                <label
                  for="name"
                  className="text-[#009A88] text-sm font-normal leading-tight tracking-normal"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder=" nuevo apellido"
                  value={input.lastName}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="mb-5 mt-2 text-[#cbd5e1] focus:outline-none focus:border focus:border-[#41D3C0] font-normal w-full h-10 flex items-center pl-3 text-sm border-[#009A88] rounded border"
                />

                <label
                  for="expiry"
                  className="text-[#009A88] text-sm font-normal leading-tight tracking-normal"
                >
                  Teléfono
                </label>
                <div className="relative mb-5 mt-2">
                  <div className="absolute right-0 text-[#41D3C0] flex items-center pr-3 h-full cursor-pointer"></div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="nuevo telefono"
                    value={input.phone}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="text-[#cbd5e1] focus:outline-none focus:border focus:border-[#41D3C0] font-normal w-full h-10 flex items-center pl-3 text-sm border-[#009A88] rounded border"
                  />
                </div>
                <label
                  for="cvc"
                  className="text-[#009A88] text-sm font-normal leading-tight tracking-normal"
                >
                  Contraseña
                </label>
                <div className="relative mb-5 mt-2">
                  <div className="absolute right-0 text-[#41D3C0] flex items-center pr-3 h-full cursor-pointer"></div>
                  <input
                    type="text"
                    name="password"
                    placeholder="nuevo password"
                    value={input.password}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="mb-8 text-[#cbd5e1] focus:outline-none focus:border focus:border-[#41D3C0] font-normal w-full h-10 flex items-center pl-3 text-sm border-[#009A88] rounded border"
                  />
                </div>
                <div className="flex items-center justify-start w-full">
                  <button
                    type="submit"
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#41D3C0] transition duration-150 ease-in-out hover:bg-[#41D3C0] bg-[#009A88] rounded text-white px-8 py-2 text-sm"
                  >
                    Submit
                  </button>
                  <button
                    onClick={onClose}
                    type="button"
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 text-white border-[#F97D67] border-2 focus:ring-gray-400 ml-3 bg-[#F97D67] transition duration-150 text-gray-600 ease-in-out hover:border-[#f89786] hover:bg-[#f89786]  rounded px-8 py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
