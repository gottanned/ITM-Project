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
  const handleLogout = () => {
    cookies.remove("accessToken");
    window.location.href = "/";
  };

  useEffect(() => {
    if (!cookies.get("accessToken")) {
      window.location.href = "/";
    }

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
      <div className="container-fluid m-2">
        <h1 className="text-white text-center mt-3">
          Welcome, {cookies.get("username")}!
        </h1>
        <div className="row justify-content-center">
          <div
            className="card panel-command bg-transparent border-light text-white m-2"
            data-bs-toggle="modal"
            data-bs-target="#generalModal"
            style={{
              maxWidth: "25rem",
            }}
          >
            <h3>Scan</h3>
          </div>
        </div>
        <div className="row justify-content-center m-0">
          <div
            className="col btn btn-primary m-2"
            data-bs-toggle="modal"
            data-bs-target="#transactionsModal"
            style={{ maxWidth: "10rem" }}
          >
            Transactions Log
          </div>
          <div
            className="col btn btn-warning m-2 "
            onClick={handleLogout}
            style={{ maxWidth: "10rem" }}
          >
            Sign out
          </div>
        </div>
        <div className="row row-cols row-cols-md-2 row-cols-lg-3 row-cols-xl-5 ">
          {giftcards.map((holder) => {
            return (
              <div className="col-xs-6 col-sm-8 p-4 ">
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
