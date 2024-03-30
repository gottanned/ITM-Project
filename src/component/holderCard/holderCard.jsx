require("./holderCard.css");

const HolderCard = ({ holder }) => {
  const convertDate = (date) => {
    return new Date(date).toDateString();
  };
  return (
    <div
      onClick={() => {
        console.log(holder);
      }}
      className="card holder bg-dark bg-transparent text-white border-light"
      style={{ borderRadius: "2em" }}
    >
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
        <a
          href="#"
          className="btn btn-light bg-transparent text-white"
          data-mdb-ripple-init
          style={{ borderRadius: "2em" }}
        >
          Redeem
        </a>
      </div>
    </div>
  );
};

export default HolderCard;