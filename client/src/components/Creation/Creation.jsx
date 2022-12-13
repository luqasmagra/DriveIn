import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getCities } from "../../redux/actions/actions";
import "./Creation.css";
import swal from "sweetalert";
import Logo from "../../images/LogoVerde.png";

const Creation = (props) => {
  const dispatch = useDispatch();

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2000);
  const [color, setColor] = useState("");
  const [transmition, setTrasmition] = useState("Manual");
  const [air, setAir] = useState("true");
  const [seats, setSeats] = useState(2);
  const [category, setCategory] = useState("");
  const [ImageCloud, setImageCloud] = useState("");
  const [price, setPrice] = useState("1.00");
  const [isPending, setIsPending] = useState(false); //estado para desabilitar el boton

  const countryChangeHandler = (event) => {
    setCountry(event.target.value);
    dispatch(getCities(event.target.value));
  };
  const cityChangeHandler = (event) => {
    setCity(event.target.value);
  };
  const brandChangeHandler = (event) => {
    setBrand(event.target.value);
  };
  const modelChangeHandler = (event) => {
    setModel(event.target.value);
  };
  const yearChangeHandler = (event) => {
    setYear(event.target.value);
  };
  const colorChangeHandler = (event) => {
    setColor(event.target.value);
  };
  const transmitionChangeHandler = (event) => {
    setTrasmition(event.target.value);
  };
  const airChangeHandler = (event) => {
    setAir(event.target.value);
  };
  const seatsChangeHandler = (event) => {
    setSeats(event.target.value);
  };
  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };
  const imageCloudChangeHandler = (event) => {
    const imageData = new FormData();
    imageData.append("file", event.target.files[0]);
    imageData.append("upload_preset", "drivein_uploader");
    axios
      .post("https://api.cloudinary.com/v1_1/dbmhbouib/upload", imageData)
      .then((response) => {
        setImageCloud(response.data.secure_url);
      });
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  //-------------------------Function to obtain countries-------------------------
  const countriesList = useSelector((state) => state.countries);
  const citiesList = useSelector((state) => state.cities);
  useEffect(() => {
    dispatch(getCountries());
  }, [country, dispatch]);
  //-------------------------Function to obtain countries-------------------------
  //---------------------validation real time-------------------------------------
  //--------------Brand---------------------------------
  const [brandValidation, setBrandValidation] = useState([]);
  useEffect(() => {
    var letters = /^[A-Za-z\s]*$/;
    if (brand === "") {
      setBrandValidation([]);
    } else if (!brand.match(letters)) {
      setBrandValidation([
        <p key="brand_validation" style={{ color: "red" }}>
          Marca no puede contener<br></br>numeros o simbolos.
        </p>,
      ]);
      return;
    }
    setBrandValidation([]);
  }, [brand]);
  //--------------Price---------------------------------
  const [priceValidation, setPriceValidation] = useState([]);
  useEffect(() => {
    var numbers = /^\d+\.\d{2,2}$/;
    if (price === "") {
      setPriceValidation([]);
    } else if (!price.match(numbers)) {
      setPriceValidation([
        <p key="price_validation" style={{ color: "red" }}>
          Precio tiene que ser mayor<br></br>a 0 y tiene que contener<br></br>2
          decimales.
        </p>,
      ]);
      return;
    }
    setPriceValidation([]);
  }, [price]);
  //---------------------validation real time-------------------------------------
  //-------------------------------Submit form-------------------------------------
  const submitHandler = (event) => {
    event.preventDefault(); //Prevent the page to refresh and remove the info typed in

    let cityIdValue = 0;
    citiesList.forEach((cityArray) => {
      if (cityArray.name === city) cityIdValue = cityArray.id;
    });

    //Validation----------------------

    //Country
    if (country === "") {
      swal({ text: "País no puede estar vacío!" });
      return false;
    }
    //city
    if (city === "") {
      swal({ text: "Ciudad no puede estar vacío!" });
      return false;
    }
    //Brand
    if (brand === "") {
      swal({ text: "Marca no puede estar vacío!" });
      return false;
    }
    let splitedBrand = brand.split("");
    let letterBrand = splitedBrand.shift().toUpperCase();
    const finalBrand = letterBrand + splitedBrand.join("");

    //Model
    if (model === "") {
      swal({ text: "Modelo no puede estar vacío!" });
      return false;
    }
    //Color
    if (color === "") {
      swal({ text: "Color no puede estar vacío!" });
      return false;
    }
    let splitedColor = color.split("");
    let letterColor = splitedColor.shift().toUpperCase();
    const finalColor = letterColor + splitedColor.join("");
    //Category
    if (category === "") {
      swal({ text: "Asigna una categoria al vehiculo!" });
      return false;
    }
    //Image
    if (ImageCloud === "") {
      swal({ text: "Ponle una foto al vehiculo!" });
      return false;
    }
    //Price
    if (parseInt(price) <= 0) {
      swal({ text: "Precio no puede ser menor a 1!" });
      return false;
    }

    //Validation---------------------------------

    const vehicleCreation = {
      brand: finalBrand,
      model: model,
      year: year,
      color: finalColor,
      transmition: transmition,
      air: air,
      seats: seats,
      category: category,
      photo: ImageCloud,
      initialPrice: price,
      cityId: cityIdValue,
    };
    console.log(vehicleCreation);
    axios
      .post("/vehicles", vehicleCreation)
      .then(function (response) {
        console.log(response.data); //console log de lo que recibe la api
        swal("Bien!", "El vehiculo fue creado!", "success");
        setIsPending(false);
      })
      .catch(function (error) {
        swal(error, "El vehiculo no se pudo crear!", "error");
        setIsPending(false);
      });
    console.log("entra aqui");
    //reset de inputs
    setCountry("");
    setCity("");
    setBrand("");
    setModel("");
    setYear(200);
    setColor("");
    setTrasmition("Manual");
    setAir("true");
    setSeats(2);
    setCategory("");
    setPrice("1.00");
    setImageCloud("");
  };
  //-------------------------------Submit form-------------------------------------
  return (
    <div className="Creation_Main">
      <div className="Creation_Second">
        <div>
          <img src={Logo} style={{ height: "100px" }} alt="creation"></img>
          <h1 className="Creation_Title">Creacion del vehiculo:</h1>
        </div>
        <form onSubmit={submitHandler} className="Creation_Form">
          <div className="Creation_Form_Sections">
            <div>
              <div className="Creation_Image_Box">
                <p>Foto:</p>
                <img
                  alt="imagecloud"
                  src={
                    ImageCloud
                      ? ImageCloud
                      : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                  }
                  className="Creation_Image"
                ></img>
                <input
                  type="file"
                  onChange={imageCloudChangeHandler}
                  className="Creation_Image_input"
                ></input>
              </div>
            </div>
            <div className="Creation_Form_Column">
              <div className="Creation_Form_Column">
                <label htmlFor="countries">País: </label>
                <select
                  name="countries"
                  onChange={countryChangeHandler}
                  value={country}
                  className="Creation_input"
                >
                  <option key="empty" value=""></option>
                  {countriesList &&
                    countriesList.map((c, index) => {
                      return (
                        <option key={index} value={c}>
                          {c}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="Creation_Form_Column">
                <label htmlFor="cities">Ciudad: </label>
                <select
                  name="cities"
                  onChange={cityChangeHandler}
                  value={city}
                  className="Creation_input"
                >
                  <option key="empty" value=""></option>
                  {citiesList &&
                    citiesList.map((city) => {
                      return <option key={city.id}>{city.name}</option>;
                    })}
                </select>
              </div>
              <div className="Creation_Form_Column">
                <label htmlFor="brand">Marca:</label>
                <input
                  type="text"
                  key="brand"
                  onChange={brandChangeHandler}
                  value={brand}
                  className="Creation_input"
                ></input>
                {brandValidation}
              </div>
              <div className="Creation_Form_Column">
                <label htmlFor="model">Modelo:</label>
                <input
                  type="text"
                  key="model"
                  onChange={modelChangeHandler}
                  value={model}
                  className="Creation_input"
                ></input>
              </div>
              <div className="Creation_Form_Column">
                <label htmlFor="year">Año:</label>
                <input
                  type="number"
                  key="year"
                  onChange={yearChangeHandler}
                  value={year}
                  className="Creation_input"
                ></input>
              </div>
              <div className="Creation_Form_Column">
                <label htmlFor="color">Color:</label>
                <input
                  type="text"
                  key="color"
                  onChange={colorChangeHandler}
                  value={color}
                  className="Creation_input"
                ></input>
              </div>
            </div>
            <div className="Creation_Form_Column">
              <div className="Creation_Form_Column">
                <label htmlFor="transmition">Transmision: </label>
                <select
                  name="transmition"
                  onChange={transmitionChangeHandler}
                  value={transmition}
                  className="Creation_input"
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatico">Automatico</option>
                </select>
              </div>
              <div className="Creation_Form_Column">
                <label htmlFor="air">Aire acondicionado: </label>
                <select
                  name="air"
                  onChange={airChangeHandler}
                  value={air}
                  className="Creation_input"
                >
                  <option value="true">Equipado</option>
                  <option value="false">No equipado</option>
                </select>
              </div>
              <div className="Creation_Form_Column">
                <label htmlFor="seats">Asientos:</label>
                <select
                  name="seats"
                  onChange={seatsChangeHandler}
                  value={seats}
                  className="Creation_input"
                >
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">+7</option>
                </select>
              </div>
              <div className="Creation_Form_Column">
                <label htmlFor="category">Tipo de vehiculo:</label>
                <select
                  name="category"
                  onChange={categoryChangeHandler}
                  value={category}
                  className="Creation_input"
                >
                  <option value=""></option>
                  <option value="Micro">Micro</option>
                  <option value="Sedan">Sedan</option>
                  <option value="CUV">CUV</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Cabriolet">Cabriolet</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Deportivo">Deportivo</option>
                  <option value="Minivan">Minivan</option>
                </select>
              </div>
              <div className="Creation_Form_Column">
                <label htmlFor="price">Precio:</label>
                <input
                  type="text"
                  key="price"
                  onChange={priceChangeHandler}
                  value={price}
                  className="Creation_input"
                ></input>
                {priceValidation}
              </div>
            </div>
          </div>

          {ImageCloud === "" ? (
            <button
              disabled
              className="Creation_button"
              style={{ opacity: "0.5" }}
            >
              Create
            </button>
          ) : (
            <button className="Creation_button">Create</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Creation;
