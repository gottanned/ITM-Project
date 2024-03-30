import { useState } from "react";
const EditModal = (e) => {
  const [barcode, setBarcode] = useState("");
  const [amount, setAmount] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(barcode, amount);
  };
  return (
    <div className="modal-dialog text-white">
      <div className="modal-content mdl">
        <div className="modal-body">
          <form id="loginForm" onSubmit={handleOnSubmit}>
            <div className="form-outline mb-4">
              <label className="display-5 fw-bold" for="loginForm">
                Edit
              </label>
            </div>
            <div className="row-cols-2">
              <div className="row-cols-2">
                <div className="form-outline mb-4">
                  <input
                    type="number"
                    id="barcode"
                    className="form-control"
                    placeholder="numbers only..."
                    onChange={(e) => setBarcode(e.target.value)}
                  />
                  <label className="form-label" for="barcode">
                    Current Barcode
                  </label>
                </div>
                <div className="row-cols-2 btn btn-primary">Check</div>
              </div>
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
                New Amount
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

export default EditModal;
