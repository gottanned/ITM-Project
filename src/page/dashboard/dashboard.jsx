import { useEffect, useState } from "react";
import HolderCard from "../../component/holderCard/holderCard";
import SellModal from "../../component/Modals/sellModal";
import EditModal from "../../component/Modals/editModal";
import RemoveModal from "../../component/Modals/removeModal";
require("./dashboard.css");
const cookies = require("js-cookie");

const Dashboard = () => {
  const [giftcards, setGiftcards] = useState([]);
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
        setGiftcards(data);
      });
  }, []);
  return (
    <section className="main">
      <div className="container-fluid">
        <h1 className="text-center text-white py-4">Dashboard</h1>
        <div className="row row-cols-3 justify-content-center">
          <div className="col-md-3 py-4 px-4  d-flex justify-content-center">
            <div
              className="card panel-command bg-transparent border-light text-white"
              data-bs-toggle="modal"
              data-bs-target="#removeModal"
            >
              <h3>Remove</h3>
            </div>
          </div>
          <div className="col-md-3 py-4 px-4 d-flex justify-content-center">
            <div
              className="card panel-command bg-transparent border-light text-white"
              data-bs-toggle="modal"
              data-bs-target="#sellModal"
            >
              <h3>Register</h3>
            </div>
          </div>
          <div className="col-md-3 py-4 px-4 d-flex justify-content-center">
            <div
              className="card panel-command bg-transparent border-light text-white"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
            >
              <h3>Edit</h3>
            </div>
          </div>
        </div>
        <div className="row row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 ">
          {giftcards.map((holder) => {
            return (
              <div className="col p-4">
                <HolderCard holder={holder} />
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="modal fade"
        id="sellModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <SellModal />
      </div>
      <div
        className="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <EditModal />
      </div>
      <div
        className="modal fade"
        id="removeModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <RemoveModal />
      </div>
    </section>
  );
};

export default Dashboard;
