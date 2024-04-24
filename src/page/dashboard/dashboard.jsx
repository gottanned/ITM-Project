import { useEffect, useState } from "react";
import HolderCard from "../../component/holderCard/holderCard";
import SellModal from "../../component/Modals/sellModal";
import EditModal from "../../component/Modals/editModal";
import RemoveModal from "../../component/Modals/removeModal";
import RedeemModal from "../../component/Modals/redeemModal";
import GeneralModal from "../../component/Modals/generalModal";
import TransactionsModal from "../../component/Modals/transactionsModal";

require("./dashboard.css");
const cookies = require("js-cookie");

//nested modal inide card component

const Dashboard = () => {
  const [giftcards, setGiftcards] = useState([]);
  const [selectedGiftcard, setSelectedGiftcard] = useState({});
  useEffect(() => {
    fetch("/.netlify/functions/api/auth/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${cookies.get("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGiftcards(data.reverse());
      });
  }, []);

  return (
    <section className="main">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col flex"> </div>
          <h1 className="col  text-center text-white py-4">Welcome!</h1>
          <div className="col ">
            <div className=" col btn btn-primary ">Sign out</div>
          </div>
        </div>
        <div
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#transactionsModal"
        >
          Transactions Log
        </div>
        <div className="row justify-content-center">
          <div className="col-md-3  ">
            <div
              className="card panel-command bg-transparent border-light text-white"
              data-bs-toggle="modal"
              data-bs-target="#generalModal"
            >
              <h3>Scan</h3>
            </div>
          </div>
        </div>
        <div className="row row-cols row-cols-sm-2 row-cols-lg-4 row-cols-xl-5 ">
          {giftcards.map((holder) => {
            return (
              <div className="col p-4">
                <HolderCard holder={holder} key={holder.barcode} />
              </div>
            );
          })}
        </div>
      </div>

      <TransactionsModal />
      <GeneralModal />
    </section>
  );
};

export default Dashboard;
