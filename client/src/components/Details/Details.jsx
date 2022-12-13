import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setVehicleDetailsState,
  getComments,
} from "../../redux/actions/actions";
import blind from "../../images/blindaje.png";
import atras from "../../images/flecha-izquierda.png";
import signo from "../../images/signo.png";
import seguro from "../../images/proteger.png";
import Aire from "../../images/aireVerde.png";
import Asientos from "../../images/asientosVerde.png";
import Dinero from "../../images/dineroVerde.png";
import Transmision from "../../images/transmisionVerde.png";
import PaymentForm from "../PaymentForm/PaymentForm";
import NavBar from "../NavBar/Navbar";

export default function Details() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("UserLogin"));
  const navigate = useNavigate();
  const { id } = useParams();
  const vehicleDetailsState = useSelector((state) => state.details);
  const reviews = useSelector((state) => state.comments);
  const comments =
    reviews.length &&
    reviews.map((v) => {
      v.promedio =
        (v.confort +
          v.performance +
          v.security +
          v.priceQuality +
          v.recommended) /
        5;
      return v;
    });

  let promedioTotal = 0;
  comments.length &&
    comments.map((v) => {
      promedioTotal = promedioTotal + v.promedio;
    });
  const handleOpen = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      setOpen(true);
    }
  };

  const handleOnClose = () => setOpen(false);

  const handleBack = () => navigate(-1);

  useEffect(() => {
    dispatch(setVehicleDetailsState(id));
    dispatch(getComments(id));
  }, [dispatch, id]);

  return (
    <div className="bg-[#D9D9D9]">
      <div>
        <NavBar />
      </div>
      {vehicleDetailsState && (
        <div className=" h-full w-[990px] py-10 px-10 m-auto bg-white max-md:w-screen max-md:mt-2">
          <button onClick={handleBack} className="flex flex-row m-4 ml-6">
            <img src={atras} alt="flecha" className="w-6 h-6 mr-2" />
            <span className="text-[#2E3A46] font-semibold hover:text-[#41D3C0]">
              Elegir otro auto
            </span>
          </button>
          <div>
            <div className="flex flex-row justify-between m-auto max-md:block">
              <div className="mb-4 ">
                <img
                  className="rounded-md object-cover h-40 w-80 border-[#41D3C0] border-2 m-auto"
                  src={vehicleDetailsState.photo}
                  alt="brad"
                />
                <h1 className="text-[#2E3A46] text-3xl font-bold my-2">
                  {vehicleDetailsState.brand}
                </h1>
                {promedioTotal > 0 ? (
                  [...Array(Math.round(promedioTotal / comments.length))].map(
                    () => {
                      return (
                        <span className="text-[#F97D67] text-xl font-bold">
                          &#9733;
                        </span>
                      );
                    }
                  )
                ) : (
                  <span className="text-[#F97D67] text-xl font-bold">
                    &#9733;
                  </span>
                )}
              </div>

              <div>
                <div className="bg-slate-100 p-6 rounded-md mb-4 w-[200px] h-[60px] m-auto flex flex-col justify-center">
                  <span className="text-slate-400 text-md">Modelo</span>
                  <h2 className="text-[#F97D67] text-xl font-semibold">
                    {vehicleDetailsState.model}
                  </h2>
                </div>
                <div className="bg-slate-100 p-6 rounded-md mb-4 w-[200px] h-[60px] m-auto flex flex-col justify-center">
                  <span className="text-slate-400 text-md">
                    Tipo de vehículo
                  </span>
                  <h2 className="text-[#F97D67] text-xl font-semibold">
                    {vehicleDetailsState.category}
                  </h2>
                </div>
                <div className="flex justify-around items-center bg-slate-100 p-6 rounded-md mb-4 gap-x-2 w-[200px] h-[60px] m-auto">
                  <div>
                    <img
                      src={Asientos}
                      className="h-10 w-10 text-green-500"
                      alt="asientos"
                    />
                  </div>
                  <div>
                    <span className="text-md text-slate-400">Asientos</span>
                    <h1 className="text-xl font-bold text-[#F97D67]">
                      {vehicleDetailsState.seats}
                    </h1>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center bg-slate-100 p-6 rounded-md mb-4 gap-x-2 m-auto w-[200px] h-[75px]">
                  <div>
                    <img
                      src={Aire}
                      className="h-10 w-10 text-green-500"
                      alt="aire"
                    />
                  </div>
                  {vehicleDetailsState.air && (
                    <div>
                      <span className="text-md text-slate-400">
                        Aire Acondicionado
                      </span>
                      <h1 className="text-xl font-bold text-[#F97D67]">
                        {vehicleDetailsState.air ? "Si" : "No"}
                      </h1>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center bg-slate-100 p-6 rounded-md mb-4 gap-x-2 m-auto w-[200px] h-[75px]">
                  <div>
                    <img
                      src={Transmision}
                      className="h-10 w-10 text-yellow-500"
                      alt="auto"
                    />
                  </div>
                  <div>
                    <span className="text-md text-slate-400">Transmision</span>
                    <h1 className="text-xl font-bold text-[#F97D67]">
                      {vehicleDetailsState.transmition}
                    </h1>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-slate-100 p-6 rounded-md mb-4 gap-x-2 m-auto w-[200px] h-[75px]">
                  <div>
                    <img
                      src={Dinero}
                      className="h-10 w-10 text-yellow-500"
                      alt="auto"
                    />
                  </div>
                  <div>
                    <span className="text-md text-slate-400">
                      Precio por dia
                    </span>
                    <h1 className="text-xl font-bold text-[#F97D67]">{`$USD ${vehicleDetailsState.initialPrice}`}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row border-2 mb-4 w-full border-slate-300">
              <div className="flex flex-col w-1/2 m-auto p-2 mt-4 mb-4 flex-start border-r-2 border-r-slate-300 ">
                <span className="text-lg font-bold flex flex-start ml-2 text-[#2E3A46] max-md:m-auto">
                  Todos los seguros necesarios para circular
                </span>
                <div className="flex flex-row m-[6px]">
                  <img src={blind} alt="blindaje" className="w-6 h-6" />
                  <span className="ml-2 text-[#2E3A46]">
                    Cobertura por daños (con franquicia)
                  </span>
                </div>
                <div className="flex flex-row m-[6px]">
                  <img src={blind} alt="blindaje" className="w-6 h-6" />
                  <span className="ml-2 text-[#2E3A46]">
                    Cobertura por robo (con franquicia)
                  </span>
                </div>
                <div className="flex flex-row m-[6px]">
                  <img src={blind} alt="blindaje" className="w-6 h-6" />
                  <span className="ml-2 text-[#2E3A46]">
                    Responsabilidad civil
                  </span>
                </div>
              </div>
              <div className="w-1/2 p-2 mt-2 max-md:flex max-md:flex-col ">
                <div className="flex flex-row h-8 max-md:mb-6">
                  <span className="flex flex-start mx-[20px] my-2 font-bold text-lg text-[#2E3A46] ">
                    Adicionales a elección
                  </span>
                </div>
                <div className="flex flex-row m-4 mt-2 max-lg:flex-col">
                  <img
                    src={signo}
                    alt="sig"
                    className="w-6 h-6 max-lg:m-auto"
                  />
                  <span className="ml-2 text-[#2E3A46]">Butaca para bebés</span>
                  <span className="ml-4 text-[#2E3A46] font-bold max-lg:ml-0">
                    10 USD / DIA
                  </span>
                </div>
                <div className="flex flex-row m-4 max-lg:flex-col">
                  <img
                    src={signo}
                    alt="sig"
                    className="w-6 h-6 max-lg:m-auto"
                  />
                  <span className="ml-2 text-[#2E3A46]">Butaca para niño</span>
                  <span className="ml-[30px] text-[#2E3A46] font-bold max-lg:ml-0">
                    10 USD / DIA
                  </span>
                </div>
                <div className="flex flex-row m-4 max-lg:flex-col">
                  <img
                    src={signo}
                    alt="sig"
                    className="w-6 h-6 max-lg:m-auto"
                  />
                  <span className="ml-2 text-[#2E3A46]">Portaequipajes</span>
                  <span className="ml-[45px] text-[#2E3A46] font-bold max-lg:ml-0">
                    20 USD / DIA
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full p-2 mt-2 border-2 border-slate-300 mb-4">
              <div className="flex flex-row h-8">
                <img src={seguro} alt="img-seguro" className="" />
                <span className="flex flex-start mx-2 font-bold text-lg text-[#2E3A46]">
                  Seguro incluído (obligatorio)
                </span>
              </div>
              <p className="text-[#2E3A46] text-start tracking-wide text-m ml-2 mt-2">
                Nuestras tarifas incluyen vehículos nuevos en excelentes
                condiciones equipados para la zona. El precio final del seguro
                varia segun las condiciones del vehículo luego de entregarla. Si
                el vehículo sufre daños tales cómo, roturas de luces, rotura de
                vidrios o ralladuras, el precio final de la cobertura puede
                variar entre 300 a 350 USD. La cobertura por robo varia segun el
                modelo del vehiculo, en un estimativo de entre 500 a 700 USD. En
                el precio final de su alquiler se le estará cobrando un 20% del
                seguro minimo como abal, si el vehiculo se entrega en buenas
                condiciones no se le cobrara ningun extra, caso contrario, se le
                debitara de su tarjeta la totalidad del seguro.
              </p>
            </div>
          </div>
          <button
            onClick={handleOpen}
            className="flex-row  flex ring-2 px-8 py-3 rounded-md ring-[#41D3C0] text-[#41D3C0] hover:bg-[#41D3C0] hover:text-indigo-100 transition duration-75 relative m-auto"
          >
            ALQUILAR
          </button>
          <PaymentForm onClose={handleOnClose} visible={open} />
        </div>
      )}
      <div className="mt-5 w-[990px] m-auto ring-1 ring-[#41D3C0] max-md:w-screen">
        {reviews.length ? (
          reviews.map((r) => {
            return (
              <div className="py-2 px-10 m-auto bg-white flex mt-2">
                <img
                  src={r.user.photo}
                  className="w-[50px] rounded-full"
                  alt="perfil"
                />
                <span className="self-center ml-1 font-bold">
                  {r.user.name} {r.user.lastName}
                </span>
                <p className="bg-[#D9D9D9] ml-1 self-center p-2 w-[800px] min-h-full">
                  {r.description}
                </p>
              </div>
            );
          })
        ) : (
          <div className="bg-[#D9D9D9] h-[10px]"></div>
        )}
      </div>
    </div>
  );
}
