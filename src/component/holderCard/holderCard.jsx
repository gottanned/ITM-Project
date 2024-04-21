import RedeemModal from "../Modals/redeemModal";
import { useState, useEffect } from "react";
require("./holderCard.css");

const HolderCard = ({ holder }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  const convertDate = (date) => {
    return new Date(date).toDateString();
  };
  return (
    <>
      <div className="card holder bg-dark bg-transparent text-white border-light">
        <h4 className="card-header border-light text-center">
          {holder.barcode ? holder.barcode : "None"}
        </h4>
        <div className="card-body">
          <h5 className="card-title">
            {holder.amount ? holder.amount : "Not yet updated"}
          </h5>
          <h6>
            Updated at:{" "}
            {holder.updatedAt
              ? convertDate(holder.updatedAt)
              : "Unknown date updated"}
          </h6>
          <p className="card-text">
            Created at:{" "}
            {holder.createdAt
              ? convertDate(holder.createdAt)
              : "Unknown date added"}
          </p>
        </div>
      </div>
      {showModal && <RedeemModal holder={holder} handleClose={handleClose} />}
    </>
  );
};

export default HolderCard;
