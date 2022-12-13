import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentsUser,
  getRents,
  userUpdate,
} from "../../redux/actions/actions";
import axios from "axios";
import Navbar from "../NavBar/Navbar";
import Editar from "../../images/editar.png";
import EditForm from "./EditForm";
import Rent from "../ModalRent/Rent";
import swal from "sweetalert";

export default function Perfil() {
  const usuario = JSON.parse(localStorage.getItem("UserLogin"));

  const [input, setInput] = useState({
    name: usuario.name,
    lastName: usuario.lastName,
    phone: usuario.phone,
    password: usuario.password,
    photo: usuario.photo,
  });

  const [panel, setPanel] = useState(false);
  const abrirCerrarModal = () => {
    setPanel(false);
  };

  const [ImageCloud, setImageCloud] = useState("");

  const rents = useSelector((state) => state.rents);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCommentsUser(usuario.id));
    dispatch(getRents(usuario.id));
  }, [dispatch, usuario.id]);

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
      });
  };

  async function handleUserPhoto(e) {
    e.preventDefault();
    dispatch(userUpdate(usuario.id, input));
    swal({
      title: "Felicitaciones!",
      icon: "success",
      text: "Cambiaste la foto. Presiona el botón para volver al Loging",

      button: {
        text: "Ok",
      },
    });
    navigate("/home");
  }

  return (
    <>
      <EditForm open={panel} onClose={abrirCerrarModal} />
      <Navbar />
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="flex flex-col bg-[#2E3A46] text-white rounded p-2">
              <div className="image overflow-hidden self-center w-[100px] h-[100px]">
                <img
                  src={ImageCloud ? ImageCloud : usuario.photo}
                  className="rounded h-full w-full"
                  alt="yo"
                />
              </div>
              <div>
                <form onSubmit={(e) => handleUserPhoto(e)}>
                  <input
                    className="mt-2 h-8"
                    name="photo"
                    type="file"
                    onChange={(e) => imageCloudChangeHandler(e)}
                  ></input>
                  <button
                    type="submit"
                    className="rounded bg-slate-400 p-2 flex flex-initial hover:bg-slate-300 m-auto mt-2"
                  >
                    Cambiar Foto
                  </button>
                </form>
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                Hola, {usuario.name}!
              </h1>
              <ul className="bg-[#e0dfdf] text-[#2E3A46] hover:text-gray-800 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Estado</span>
                  <span className="ml-auto">
                    {usuario.active === true ? (
                      <span className="bg-emerald-600 py-1 px-2 rounded text-white text-sm">
                        Activo
                      </span>
                    ) : (
                      <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                        Inactivo
                      </span>
                    )}
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Miembro desde</span>
                  <span className="ml-auto">
                    {usuario.createdAt.slice(0, 10)}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-9/12 mx-2 h-64 max-md:m-auto max-md:mt-2">
            <div className="  p-3 shadow-sm rounded-sm bg-[#f5f4f4]">
              <div className="bg-[#2E3A46] text-white rounded py-2">
                <div className="flex justify-center space-x-2 font-semibold text-gray-900 leading-8 ">
                  <span clas="text-green-500 ">
                    <svg
                      className="h-5 mt-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide ">Información</span>
                  <div className="flex justify-end relative">
                    <img
                      src={Editar}
                      className="rounded-full bg-[#41D3C0] h-8 hover:bg-slate-300 p-1"
                      onClick={() => setPanel(true)}
                      alt="edit"
                      title="Editar Información"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white ">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold flex items-start bg-slate-100">
                      Nombre
                    </div>
                    <div className="px-4 py-2 flex items-start ">
                      {usuario.name}
                    </div>
                  </div>
                  <div className="grid grid-cols-2  ">
                    <div className="px-4 py-2 font-semibold flex items-start bg-slate-100">
                      Apellido
                    </div>
                    <div className="px-4 py-2 flex items-start">
                      {usuario.lastName}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold flex items-start bg-slate-100">
                      Email
                    </div>
                    <div className="px-4 py-2 flex items-start ">
                      {usuario.email}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold flex items-start bg-slate-100">
                      Teléfono
                    </div>
                    <div className="px-4 py-2 flex items-start ">
                      {usuario.whatsapp}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold flex items-start bg-slate-100">
                      Contraseña
                    </div>
                    <div className="px-4 py-2 flex items-start">
                      {usuario.password ? <h5>******</h5> : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold flex items-start bg-slate-100">
                      {" "}
                    </div>
                    <div className="px-4 py-2 flex items-start "></div>
                  </div>
                </div>
              </div>
              <div className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                Mas Información
              </div>
              {usuario.role === 1 ? (
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="grid">
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span clas="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">Alquilados</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        {rents.length ? (
                          rents.map((e) => {
                            return (
                              <Rent
                                img={e.vehicle.photo}
                                brand={e.vehicle.brand}
                                model={e.vehicle.model}
                                fi={e.dateInit}
                                ff={e.dateFinish}
                                tp={e.totalPrice}
                                city={e.vehicle.city.name}
                                country={e.vehicle.city.country}
                                id={usuario.id}
                                vehicleId={e.vehicle.id}
                              />
                            );
                          })
                        ) : (
                          <div className="text-gray-500 text-xs flex items-start">
                            {" "}
                            No hay autos alquilados
                          </div>
                        )}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"></div>
                      <ul className="list-inside space-y-2"></ul>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink to="/admin">
                  <button className="mx-auto shadow bg-[#009A88] hover:bg-[#41D3C0] focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded">
                    Ir a panel de Administración
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
