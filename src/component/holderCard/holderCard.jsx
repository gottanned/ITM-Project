import { useState, useEffect } from "react";
import cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";
require("./holderCard.css");

const HolderCard = ({ holder }) => {
  const [giftcard, setGiftcards] = useState({
    barcode: holder.barcode,
    amount: holder.amount,
    updatedAt: holder.updatedAt,
    createdAt: holder.createdAt,
  });

  const [amount, setAmount] = useState("");
  const convertDate = (date) => {
    return new Date(date).toDateString();
  };

  const handleOnRedeem = async () => {
    fetch("/.netlify/functions/api/user/redeem", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${cookies.get("accessToken")}`,
      },
      body: JSON.stringify({
        barcode: giftcard.barcode,
        redeemAmount: amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Giftcard redeemed successfully!") {
          toast.success(data.message);
          fetch("/.netlify/functions/api/user/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${cookies.get("accessToken")}`,
            },
            body: JSON.stringify({
              barcode: giftcard.barcode,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              setGiftcards({
                barcode: data.barcode,
                amount: data.amount,
                updatedAt: data.updatedAt,
                createdAt: data.createdAt,
              });
            });
        } else {
          toast.error(data.message);
        }
      });
  };

  const handleOnEdit = async () => {
    fetch(`/.netlify/functions/api/user/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${cookies.get("accessToken")}`,
      },
      body: JSON.stringify({
        barcode: giftcard.barcode,
        amount: amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Giftcard updated successfully!") {
          toast.success(data.message);
          fetch("/.netlify/functions/api/user/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${cookies.get("accessToken")}`,
            },
            body: JSON.stringify({
              barcode: giftcard.barcode,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              setGiftcards({
                barcode: data.barcode,
                amount: data.amount,
                updatedAt: data.updatedAt,
                createdAt: data.createdAt,
              });
            });
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div className="card holder bg-dark bg-transparent text-white border-light">
      <Toaster />
      <h4 className="card-header border-light text-center">
        {holder.barcode ? holder.barcode : "None"}
      </h4>

      <div className="card-body">
        <h5 className="card-title">
          {giftcard.amount ? giftcard.amount : "Not yet updated"}
        </h5>
        <h6>
          Updated at:{" "}
          {giftcard.updatedAt
            ? convertDate(holder.updatedAt)
            : "Unknown date updated"}
        </h6>

        <p className="card-text">
          Created at:{" "}
          {giftcard.createdAt
            ? convertDate(giftcard.createdAt)
            : "Unknown date added"}
        </p>

        <div className="input-group py-1" id="quickActions">
          <input
            type="number"
            className="form-control mx-1"
            placeholder="barcode"
            aria-label="barcode"
            aria-describedby="basic-addon2"
            id="actionsOnCard"
            style={{
              background: "transparent",
              borderRadius: "2em",
              color: "white",
            }}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              style={{
                borderColor: "#006A4E",
                borderRadius: "2em",
                color: "#32de84",
              }}
              onClick={handleOnRedeem}
            >
              Redeem
            </button>
            <button
              className="btn btn-outline-secondary mx-1"
              type="button"
              style={{
                borderColor: "white",
                borderRadius: "2em",
                color: "white",
              }}
              onClick={handleOnEdit}
            >
              Set to
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolderCard;
