import { useState } from "react";
import cookies from "js-cookie";
import "./modal.css";
import { Toaster, toast } from "react-hot-toast";
const RemoveModal = (e) => {
  const [barcode, setBarcode] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/.netlify/functions/api/user/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": cookies.get("accessToken"),
      },
      body: JSON.stringify({
        barcode: barcode,
      }),
    });
    const data = await response.json();
    if (data.message === "Giftcard deleted successfully!") {
      toast.success(data.message);
      window.location.href = "/dashboard";
    } else {
      console.log(data.message);
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
              <label
                className="display-5 fw-bold "
                for="loginForm"
                style={{ color: "hsla(0, 100%, 65%, 0.606)" }}
              >
                Remove
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
                Barcode to be removed
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
            className="btn btn-secondary mdl-btn"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;
