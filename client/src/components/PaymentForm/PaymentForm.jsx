import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51LzLEhFe0h06NHhlterICFvudMvQM3gMYk3ovf0tFaq99Duy5IWvFsCBSUP0AJ2ap24m4Fkskh4oW2cSccosfuBG00g1BUYu08"
);

export default function PaymentForm({ visible, onClose }) {
  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };
  if (!visible) return null;
  return (
    <Elements stripe={stripePromise}>
      <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center "
      >
        <div className="bg-white bg-opacity-80 rounded flex flex-col p-6 w-5/12 max-lg:w-screen">
          <button
            onClick={onClose}
            className="self-end w-[25px] bg-[#2E3A46] text-white rounded-full hover:bg-red-600"
          >
            x
          </button>
          <div>
            <CheckOutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}
