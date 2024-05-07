import { useState, useRef, useEffect } from "react";
import HolderCard from "../holderCard/holderCard";
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
  const inputRef = useRef(null);

  const convertDate = (date) => {
    return new Date(date).toDateString();
  };

  const handleOnCheck = async (e) => {
    e.preventDefault();
    //Fetch GET cannot have body - try to add barcode to the URL
    if (!barcode) {
      toast.error("Barcode is required!");
      return;
    }
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
    if (!barcode) {
      toast.error("Barcode is required!");
      return;
    }
    if (!amount) {
      toast.error("Amount is required!");
      return;
    }
    if (amount <= 0) {
      toast.error("Amount must be greater than 0!");
      return;
    }

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
    if (amount <= 0) {
      toast.error("Amount must be greater than 0!");
      return;
    }

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
          fetch("/.netlify/functions/api/user/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${cookies.get("accessToken")}`,
            },
            body: JSON.stringify({
              barcode: selectedGiftcard.barcode,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              setSelectedGiftcard({
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
    if (amount <= 0) {
      toast.error("Amount must be greater than 0!");
      return;
    }

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
          fetch("/.netlify/functions/api/user/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${cookies.get("accessToken")}`,
            },
            body: JSON.stringify({
              barcode: selectedGiftcard.barcode,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              setSelectedGiftcard({
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

  useEffect(() => {
    const modalElement = document.getElementById("generalModal");
    modalElement.addEventListener("hidden.bs.modal", () => {
      setSelectedGiftcard({
        barcode: "",
        amount: "",
        updatedAt: "",
        createdAt: "",
      });
      setBarcode("");
      setAmount("");
      setUnknownGiftcard(false);
      inputRef.current.value = "";
    });
    return () => {
      modalElement.removeEventListener("hidden.bs.modal", () => {
        setSelectedGiftcard({
          barcode: "",
          amount: "",
          updatedAt: "",
          createdAt: "",
        });
        setBarcode("");
        setAmount("");
        setUnknownGiftcard(false);
        inputRef.current.value = "";
      });
    };
  }, []);

  useEffect(() => {
    const handleModalShown = () => {
      inputRef.current.focus();
    };

    const modalElement = document.getElementById("generalModal"); // Replace 'myModal' with the ID of your modal
    modalElement.addEventListener("shown.bs.modal", handleModalShown);
    return () => {
      modalElement.removeEventListener("shown.bs.modal", handleModalShown);
    };
  }, []);

  return (
    <div
      className="modal fade"
      id="generalModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered text-white">
        <div className="modal-content mdl">
          <div className="modal-header">
            <h3 className="modal-title fw-bold" id="exampleModalLabel">
              General
            </h3>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="form-inline">
              <div className="input-group mb-4">
                <input
                  type="number"
                  className="form-control "
                  placeholder="Barcode"
                  ref={inputRef}
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
                <h2>Giftcard found!</h2>
                <div className="row">
                  <HolderCard holder={selectedGiftcard} />
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
