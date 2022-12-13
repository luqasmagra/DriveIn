import axios from "axios";
import swal from "sweetalert";
export const FILTER = "FILTER";
export const FILTER_PRICE = "FILTER_PRICE";
export const USER_FAVORITES = "USER_FAVORITES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_CITIES = "GET_CITIES";
export const GET_CITIES_FEATURED = "GET_CITIES_FEATURED";
export const GET_CITY = "GET_CITY";
export const GET_VEHICLES = "GET_VEHICLES";
export const GET_COMMENTS = "GET_COMMENTS";
export const REMOVE_FAVORITES = "REMOVE_FAVORITES";
export const POST_MAIL = "POST_MAIL";
export const GET_PAYMENT = "GET_PAYMENT";
export const ADD_USER = "ADD_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const STATUS_LOGIN = "STATUS_LOGIN";
export const LOGIN_USER = "LOGIN_USER";
export const EXIT_SESION = "EXIT_SESION";
export const LOGIN_USER_AUTH0 = "LOGIN_USER_AUTH0";
export const REFRESH_AUTH = "REFRESH_AUTH";
export const VEHICLE_FAVORITE = "VEHICLE_FAVORITE";
export const DELETE_STATES = "DELETE_STATES";
export const GET_RENTS = "GET_RENTS";
export const EDIT_USER = "EDIT_USER";

export const GET_COMMENTS_USER = "GET_COMMENTS_USER";

export const REFRESH_USER = "REFRESH_USER";

export const deleteStates = () => {
  return {
    type: DELETE_STATES,
  };
};

export const filter = (payload) => {
  return {
    type: FILTER,
    payload,
  };
};

export const filterPrice = (payload) => {
  return {
    type: FILTER_PRICE,
    payload,
  };
};

export const removeFavorites = (id) => {
  const deleteFromFavorites = localStorage.getItem("favoriteItems")
    ? JSON.parse(localStorage.getItem("favoriteItems"))
    : [];

  const updateFavorites = deleteFromFavorites.filter(
    (items) => items.id !== id
  );

  localStorage.setItem("favoriteItems", JSON.stringify(updateFavorites));

  return { type: REMOVE_FAVORITES, payload: id };
};

export function setVehicleDetailsState(id) {
  return function (dispatch) {
    axios.get(`/vehicles/${id}`).then(
      (response) => {
        return dispatch({ type: GET_DETAILS, payload: response.data });
      },
      (error) => {
        return error;
      }
    );
  };
}

export const getCountries = () => {
  return function (dispatch) {
    axios.get("/country").then(
      (response) => {
        dispatch({ type: GET_COUNTRIES, payload: response.data });
      },
      (error) => {
        return error;
      }
    );
  };
};

export const getCities = (country) => {
  return function (dispatch) {
    axios.get(`/cities?country=${country}`).then(
      (response) => {
        dispatch({ type: GET_CITIES, payload: response.data });
      },
      (error) => {
        return error;
      }
    );
  };
};

export const getRents = (userId) => {
  return function (dispatch) {
    axios.get(`/rent?userId=${userId}`).then(
      (response) => {
        dispatch({ type: GET_RENTS, payload: response.data });
      },
      (error) => {
        return error;
      }
    );
  };
};

export const getCitiesFeatured = () => {
  return function (dispatch) {
    axios.get("/cities/destacadas").then(
      (response) => {
        dispatch({ type: GET_CITIES_FEATURED, payload: response.data });
      },
      (error) => {
        return error;
      }
    );
  };
};

export const getCity = (id) => {
  return function (dispatch) {
    axios.get(`/cities/${id}`).then(
      (response) => {
        dispatch({ type: GET_CITY, payload: response.data });
      },
      (error) => {
        return error;
      }
    );
  };
};

export const getVehicles = () => {
  return function (dispatch) {
    axios.get("/vehicles").then(
      (response) => {
        dispatch({ type: GET_VEHICLES, payload: response.data });
      },
      (error) => {
        return error;
      }
    );
  };
};

export const getComments = (id) => {
  return function (dispatch) {
    axios.get(`/comments/vehicle/${id}`).then(
      (response) => {
        dispatch({ type: GET_COMMENTS, payload: response.data });
      },
      (error) => {
        dispatch({ type: GET_COMMENTS, payload: error.message });
      }
    );
  };
};

export const getCommentsUser = (id) => {
  return function (dispatch) {
    axios.get(`/comments/user/${id}`).then(
      (response) => {
        dispatch({ type: GET_COMMENTS_USER, payload: response.data });
      },
      (error) => {
        dispatch({ type: GET_COMMENTS_USER, payload: error.message });
      }
    );
  };
};

export const postComment = (payload) => {
  return function () {
    axios.post("/comments", payload).then(
      (response) => {
        return response.data;
      },
      (error) => {
        return error;
      }
    );
  };
};

export const postMails = (payload) => {
  return async function (dispatch) {
    try {
      let respuesta = await axios.post("/mails", payload);
      dispatch({ type: POST_MAIL, payload: respuesta.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const registerUser = (payload) => async (dispatch) => {
  try {
    await axios.post("/user/register", payload);
    return dispatch({
      type: ADD_USER,
    });
  } catch (error) {
    return swal({
      title: "Ese usuario ya existe",
      text: "Utiliza un mail distinto para registrarte",
      icon: "error",
    });
  }
};

export const getUser = (email) => {
  return async function () {
    const response = await axios.get(`/user/info/${email}`);
    localStorage.setItem("UserLogin", JSON.stringify(response.data));
  };
};

export const loginUser = (payload, navigate) => async (dispatch) => {
  try {
    const user = await axios.post("/user/login", payload);
    swal({
      title: "Sesión iniciada",
      timer: 2000,
      icon: "success",
      buttons: false,
    });
    await localStorage.setItem("UserLogin", JSON.stringify(user.data));
    navigate("/home");
    return dispatch({
      type: LOGIN_USER,
      payload: "USUARIO LOGUEADO",
    });
  } catch (error) {
    if (error.response.data === "No existe el usuario con esos datos") {
      localStorage.removeItem("UserLogin");
      return swal({
        title: "Email o contraseña incorrecto",
        text: `Intenta nuevamente`,
        icon: "error",
      });
    }
    if (error.response.data === "Usuario deshabilitado") {
      localStorage.removeItem("UserLogin");
      return swal({
        title: "Usuario deshabilitado",
        text: `Ponte en contacto con un administrador`,
        icon: "error",
      });
    }
  }
};

export const loginUserAuth = (payload) => async (dispatch) => {
  try {
    const userAuth = await axios.post("/user/login/auth0", payload);
    localStorage.setItem("UserLogin", JSON.stringify(userAuth.data));
    return dispatch({
      type: LOGIN_USER_AUTH0,
      payload: "USUARIO AUTH0 LOGUEADO",
    });
  } catch (error) {
    console.log(error);
  }
};

export const exitSesion = () => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("UserLogin"));
    const favoritos = JSON.parse(localStorage.getItem("favoriteItems")).map(
      (item) => item.id
    );
    const data = {
      vehicles: favoritos,
      idUser: user.id,
    };
    await axios.put("/user/addFavorites", data);
    localStorage.removeItem("UserLogin");
    localStorage.removeItem("favoriteItems");

    return dispatch({
      type: EXIT_SESION,
      payload: null,
    });
  } catch (error) {
    console.log(error);
  }
};

export const statusLogin = () => {
  const userLogin = JSON.parse(localStorage.getItem("UserLogin"));
  if (!userLogin) {
    return {
      type: STATUS_LOGIN,
      payload: "No Logueado",
    };
  } else {
    return {
      type: STATUS_LOGIN,
      payload: "Logueado",
    };
  }
};

export const refreshAuthUser = () => {
  const userLogin = JSON.parse(localStorage.getItem("UserLogin"));
  return {
    type: REFRESH_AUTH,
    payload: userLogin ? userLogin : null,
  };
};

export const refreshUser = () => {
  const userLogin = JSON.parse(localStorage.getItem("UserLogin"));
  return {
    type: REFRESH_USER,
    payload: userLogin ? userLogin : null,
  };
};

export const getPayment = (payload) => {
  return async function (dispatch) {
    axios.post("/payment", payload).then(
      (response) => {
        dispatch({ type: GET_PAYMENT, payload: response.data });
        swal({
          title: "Pago aceptado",
          text: "Dirígite a tu perfil para mas informacion",
          icon: "success",
        });
      },
      (error) => {
        dispatch({ type: GET_PAYMENT, payload: error.response.data });
        swal({
          title: "Pago rechazado",
          text: `${error.response.data.raw.message}`,
          icon: "error",
        });
      }
    );
  };
};

export const addFavorite = (payload) => async (dispatch) => {
  try {
    await axios.put("/user/addfavorite", payload);
    const user = JSON.parse(localStorage.getItem("UserLogin"));
    const dataUser = await axios.get(`/user/info/${user.email}`);
    return dispatch({
      type: VEHICLE_FAVORITE,
      payload: dataUser.data.vehicles,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userFavorite = () => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("UserLogin"));
    const favorites = await axios.get(`/user/info/${user.email}`);
    return dispatch({
      type: USER_FAVORITES,
      payload: favorites.data.vehicles,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFavorite = (payload) => async (dispatch) => {
  try {
    await axios.delete(
      `/user/addFavorite?id=${payload.id}&idUser=${payload.idUser}`
    );
    const user = JSON.parse(localStorage.getItem("UserLogin"));
    const favorites = await axios.get(`/user/info/${user.email}`);
    return dispatch({
      type: REMOVE_FAVORITES,
      payload: favorites.data.vehicles,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userUpdate = (payload, body) => async (dispatch) => {
  try {
    const cualquiera = await axios.put(`/user?id=${payload}`, body);
    console.log("SOY EL USER DE ACTIONS", cualquiera);
    // const edit = await axios.get(`/user/${user}`);
    // console.log("SOY EL edit DE ACTIONS", edit);
    return dispatch({
      type: EDIT_USER,
      payload: cualquiera.data,
    });
  } catch (error) {
    console.log({ error: payload });
  }
};

export const GetAllLists = () => async (dispatch) => {
  try {
    await axios.get("/country");
    await axios.get("/cities");
    await axios.get("/vehicles");
    await axios.get("/user");
    await axios.get("/rent");
    await axios.get("/comments");
  } catch (error) {
    console.log({ error: error.message });
  }
};
