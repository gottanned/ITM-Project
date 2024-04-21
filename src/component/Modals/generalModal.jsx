import { useState } from "react";
import HolderCard from "../holderCard/holderCard";
import { set } from "mongoose";
import { Toaster, toast } from "react-hot-toast";
const cookies = require("js-cookie");

const GernalModal = () => {
  const [barcode, setBarcode] = useState("");
  const [amount, setAmount] = useState("");
  const [unknownGiftcard, setUnknownGiftcard] = useState(false);
  const [selectedGiftcard, setSelectedGiftcard] = useState({
    barcode: "",
    amount: "",
    updatedAt: "",
    createdAt: "",
  });

  const convertDate = (date) => {
    return new Date(date).toDateString();
  };

  const handleOnCheck = async (e) => {
    e.preventDefault();
    //Fetch GET cannot have body - try to add barcode to the URL
    fetch("/.netlify/functions/api/user/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${cookies.get("accessToken")}`,
      },
      body: JSON.stringify({
        barcode: barcode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Gitfcard has not yet registered!") {
          setUnknownGiftcard(true);
          setSelectedGiftcard({
            barcode: "",
            amount: "",
            updatedAt: "",
            createdAt: "",
          });
        } else {
          setUnknownGiftcard(false);
          setSelectedGiftcard({
            barcode: data.barcode,
            amount: data.amount,
            updatedAt: data.updatedAt,
            createdAt: data.createdAt,
          });
        }
      });
  };

  const handleOnRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("/.netlify/functions/api/user/sell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": cookies.get("accessToken"),
      },
      body: JSON.stringify({
        barcode: barcode,
        amount: amount,
      }),
    });
    const data = await response.json();
    if (data.message === "Giftcard registered successfully!") {
      toast.success(data.message);
      window.location.href = "/dashboard";
    } else {
      console.log(data.message);
      toast.error(data.message);
    }
  };

  const handleOnRedeem = async () => {
    console.log("amount", amount);
    fetch("/.netlify/functions/api/user/redeem", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${cookies.get("accessToken")}`,
      },
      body: JSON.stringify({
        barcode: selectedGiftcard.barcode,
        redeemAmount: amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Giftcard redeemed successfully!") {
          toast.success(data.message);
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
        barcode: selectedGiftcard.barcode,
        amount: amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Giftcard updated successfully!") {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  };

  const handleOnRemove = async () => {
    fetch(`/.netlify/functions/api/user/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${cookies.get("accessToken")}`,
      },
      body: JSON.stringify({ barcode: selectedGiftcard.barcode }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    setSelectedGiftcard({
      barcode: "",
      amount: "",
      updatedAt: "",
      createdAt: "",
    });
    setBarcode("");
    setAmount("");
    setUnknownGiftcard(false);
  };

  return (
    <div
      className="modal fade"
      id="generalModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog text-white">
        <div className="modal-content mdl">
          <div className="modal-header">
            <Toaster />
            <h3 className="modal-title fw-bold" id="exampleModalLabel">
              General
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="form-inline">
              <div className="input-group mb-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Barcode"
                  onChange={(e) => setBarcode(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleOnCheck}
              >
                Check
              </button>
            </form>
            {selectedGiftcard.barcode && (
              <div className="m-4">
                <div className="row">
                  <HolderCard holder={selectedGiftcard} />
                </div>
                <div className="row m-2">
                  <h2>Actions</h2>
                </div>

                <div className="input-group mb-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    style={{ marginRight: "10px", borderRadius: "2em" }}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleOnRedeem}
                      style={{ marginRight: "10px", borderRadius: "2em" }}
                    >
                      Redeem Amount
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleOnEdit}
                      style={{ marginRight: "10px", borderRadius: "2em" }}
                    >
                      Edit to Amount
                    </button>
                  </div>
                </div>
              </div>
            )}
            {unknownGiftcard && (
              <div>
                <h3>Giftcard not found! Want to register?</h3>
                <form className="form-inline">
                  <div className="input-group mb-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Amount"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleOnRegister}
                  >
                    Register
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GernalModal;
