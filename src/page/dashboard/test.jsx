import React, { useState, useEffect, useRef } from "react";

const MyComponent = () => {
  const [modalValue, setModalValue] = useState("");
  const inputRef = useRef(null);

  const handleButtonClick = (value) => {
    setModalValue(value);
    const modal = document.getElementById("exampleModal");
    if (modal) {
      modal.classList.add("show");
      modal.style.display = "block";
      inputRef.current.focus();
    }
  };

  const handleCloseModal = () => {
    const modal = document.getElementById("exampleModal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      setModalValue("");
    }
  };

  useEffect(() => {
    const modal = document.getElementById("exampleModal");
    if (modal) {
      modal.addEventListener("shown.bs.modal", () => {
        inputRef.current.focus();
      });
      modal.addEventListener("hidden.bs.modal", handleCloseModal);
    }
    return () => {
      if (modal) {
        modal.removeEventListener("shown.bs.modal", () => {
          inputRef.current.focus();
        });
        modal.removeEventListener("hidden.bs.modal", handleCloseModal);
      }
    };
  }, []);

  return (
    <div>
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => handleButtonClick("Hello World!")}
      >
        Open Modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal Title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                ref={inputRef}
                type="text"
                className="form-control"
                placeholder="Enter something..."
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
