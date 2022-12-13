import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  deleteFavorite,
  userFavorite,
} from "../../redux/actions/actions";
import addFav from "../../images/fav.png";
import noFav from "../../images/fav1.png";

export const ButtonFav = ({ id }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("UserLogin"));
  const favorite = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(userFavorite());
  }, [dispatch]);

  const verificacion = favorite.length
    ? favorite.find((el) => el.id === id)
    : false;

  const fav = {
    id: id,
    idUser: user.id,
  };

  const handlerClickAdd = () => {
    dispatch(addFavorite(fav));
  };

  const handlerClickDelete = () => {
    console.log("hola");
    console.log(fav);
    dispatch(deleteFavorite(fav));
  };

  return (
    <div>
      {verificacion ? (
        <button onClick={handlerClickDelete} className="w-max">
          <img src={addFav} alt="add" className="w-[30px]" />
        </button>
      ) : (
        <button onClick={handlerClickAdd} className="w-max">
          <img src={noFav} alt="noadd" className="w-[30px]" />
        </button>
      )}
    </div>
  );
};
