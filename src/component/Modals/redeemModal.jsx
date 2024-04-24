const RedeemModal = () => {
  return (
    <div className="modal fade">
      <div className="modal-dialog text-white">
        <div className="modal-content mdl">
          <div className="modal-body">
            <form id="loginForm">
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
                />
                <label className="form-label" for="barcode">
                  Barcode to be removed
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary bg-transparent btn-block mb-4"
                style={{ width: "100%" }}
              >
                Proceed
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary mdl-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RedeemModal;

/*
import { useState } from "react";
const RedeemModal = ({ holder }) => {
  console.log(holder);
  const [barcode, setBarcode] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <div
      className="modal fade"
      id="redeemModal"
      tabindex="-1"
      aria-hidden="true"
      aria-labelledby="redeemModal"
      data-backdrop="static"
    >
      <div className="modal-dialog text-white">
        <div className="modal-content mdl">
          <div className="modal-body">
            <form id="loginForm">
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
    </div>
  );
};

export default RedeemModal;
*/
