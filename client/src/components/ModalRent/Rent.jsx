import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CommentsForm from "../CommentsForm/CommentsForm";

const Rent = ({
  img,
  brand,
  model,
  fi,
  ff,
  tp,
  city,
  country,
  id,
  vehicleId,
}) => {
  const validate = useSelector((state) => state.commentsUser);
  const exist =
    validate &&
    validate.filter((r) => r.vehicleId === vehicleId && r.userId === id);

  const [open, setOpen] = useState(false);
  const handleOnClose = () => {
    setOpen(false);
  };

  const handleReview = () => {
    setOpen(true);
  };

  return (
    <div className="w-8/12 h-[60px] flex flex-row justify-around items-center border-4 border-[#e0dfdf] max-md:flex-col max-md:m-auto max-md:h-fit">
      <div className="w-[80px]">
        <img src={img} alt="rent" className="w-full" />
      </div>
      <div className="w-[100px] text-gray-900">
        <span className="text-gray-900 font-semibold text-sm">
          {brand}, {model}
        </span>
      </div>
      <div className="w-[180px] flex flex-col">
        <span className="font-semibold text-sm">Destino:</span>
        <span className="text-sm">
          {city}, {country}
        </span>
      </div>
      <div className="w-[100px] flex flex-col">
        <span className="font-semibold text-sm">Desde:</span>
        <span className="text-sm">{fi}</span>
      </div>
      <div className="w-[100px] flex flex-col">
        <span className="font-semibold text-sm">Hasta:</span>
        <span className="text-sm">{ff}</span>
      </div>
      <div className="w-[100px] flex flex-col">
        <span className="font-semibold text-sm">Total:</span>
        <span className="text-sm">{tp} USD</span>
      </div>
      <div className="mr-2">
        <button
          onClick={() => handleReview()}
          className="w-[90px] h-[38px] rounded-lg bg-slate-700 text-white font-bold text-xs hover:bg-[#f97d67]"
        >
          Déjanos tu comentario
        </button>
      </div>
      <CommentsForm
        exist={exist.length}
        id={id}
        vehicleId={vehicleId}
        onClose={handleOnClose}
        visible={open}
      />
    </div>
  );
};

export default Rent;
