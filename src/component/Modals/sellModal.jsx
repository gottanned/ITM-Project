import React, { useState } from "react";
import cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";
require("./modal.css");
const SellModal = (e) => {
  const [barcode, setBarcode] = useState("");
  const [amount, setAmount] = useState("");

  const handleOnSubmit = async (e) => {
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
      toast.success("Giftcard was sold successfully!");
      window.location.href = "/dashboard";
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="modal-dialog text-white">
      <Toaster />
      <div className="modal-content mdl">
        <div className="modal-body">
          <form id="loginForm" onSubmit={handleOnSubmit}>
            <div className="form-outline mb-4">
              <label className="display-5 fw-bold" for="loginForm">
                Sell
              </label>
            </div>
            <div className="form-outline mb-4">
              <input
                type="number"
                id="barcode"
                className="form-control"
                placeholder="numbers only..."
                onChange={(e) => setBarcode(e.target.value)}
              />
              <label className="form-label" for="barcode">
                Barcode
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="number"
                id="amount"
                className="form-control"
                placeholder="numbers only..."
                onChange={(e) => setAmount(e.target.value)}
              />
              <label className="form-label" for="amount">
                Amount
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary bg-transparent btn-block mb-4"
              style={{ width: "100%" }}
              handleOnSubmit={handleOnSubmit}
            >
              Proceed
            </button>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellModal;
