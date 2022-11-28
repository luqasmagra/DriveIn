import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRents, userUpdate } from "../../redux/actions/actions";
import axios from "axios";

import swal from "sweetalert";

export default function EditForm({ name, lastName, phone, open, onClose }) {
  const usuario = JSON.parse(localStorage.getItem("UserLogin"));
  // const usuario = useSelector((state) => state.user);

  // const [user, setUser] = useState(usuario);
  const [ImageCloud, setImageCloud] = useState("");
  const [input, setInput] = useState({
    name: usuario.name,
    lastName: usuario.lastName,
    phone: usuario.phone,
    password: usuario.password,
    photo: usuario.photo,
  });
  console.log(usuario.photo);

  const [panel, setPanel] = useState(false);
  const abrirCerrarModal = () => {
    setPanel(true);
  };

  const { id } = useParams();

  //   const handleOpen = (e) => {
  //     e.preventDefault();
  //     if (!usuario) {
  //       navigate("/login");
  //     } else {
  //       setOpen(true);
  //     }
  //   };

  const rents = useSelector((state) => state.rents);
  console.log(rents);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRents(usuario.id));
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(userUpdate(usuario.id));
  // }, [dispatch]);

  const imageCloudChangeHandler = (event) => {
    const imageData = new FormData();
    imageData.append("file", event.target.files[0]);
    imageData.append("upload_preset", "DriveIn_upload");
    axios
      .post("https://api.cloudinary.com/v1_1/dcr28dyuq/upload", imageData)
      .then((response) => {
        setInput({
          ...input,
          [event.target.name]: response.data.secure_url,
        });
        setImageCloud(response.data.secure_url);
        // return response.data.secure_url;
      });
  };

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  async function handlePhotoChange(e) {
    e.preventDefault();
    const url = await imageCloudChangeHandler(e);
    setInput({
      ...input,
      [e.target.name]: url,
    });
  }

  console.log("SOY EL INPUT", input);

  async function handleUserData(e) {
    e.preventDefault();
    // await axios.get(`http://localhost:3001/user?id=${usuario.id}`);
    dispatch(userUpdate(usuario.id, input));
    swal({
      title: "Felicitaciones!",
      icon: "success",
      text: "Cambiaste tus datos personales. Presiona el botón para volver al Loging",

      button: {
        text: "Ok, ir a Login",
        value: navigate("/login"),
      },
    });
    // alert("Cambios realizados con éxito");
    //navigate("/login");
  }
  async function handleUserPhoto(e) {
    e.preventDefault();
    // await axios.get(`http://localhost:3001/user?id=${usuario.id}`);
    dispatch(userUpdate(usuario.id, input));
    alert("Foto cambiada con éxito");
    // navigate("/login");
  }

  if(!open) return null;

  return (
    <>
      {open && (
        <div className="z-30 bg-[#2E3A46] bg-opacity-30 w-full  absolute p-0 m-0">
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
                  for="name"
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