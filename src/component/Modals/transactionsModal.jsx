import { useEffect, useState } from "react";
import cookies from "js-cookie";

const TransactionsModal = () => {
  const [transactions, setTransactions] = useState([]);

  const convertDate = (date) => {
    return new Date(date).toDateString();
  };
  const getColor = (type) => {
    if (type === "Redeem") {
      return "green";
    } else if (type === "Register") {
      return "#7CB9E8";
    } else {
      return "yellow";
    }
  };
  useEffect(() => {
    fetch("/.netlify/functions/api/user/listTransactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${cookies.get("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTransactions(data.reverse()));
  }, []);
  return (
    <div
      className="modal fade"
      id="transactionsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="transactionsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog text-white">
        <div className="modal-content mdl">
          <div className="modal-body">
            <div className="modal-header border-0">
              <h3 className="modal-title fw-bold" id="exampleModalLabel">
                Transactions
              </h3>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0 m-0">
              <div className="container-fluid" style={{ overflow: "hidden" }}>
                <table className="table table-dark table-striped m-0 p-0">
                  <thead>
                    <tr>
                      <th scope="col">Barcode</th>
                      <th scope="col">Date</th>
                      <th scope="col">Type</th>
                      <th scope="col">Before Amount</th>
                      <th scope="col">After Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr>
                        <td>{transaction.barcode}</td>
                        <td>{convertDate(transaction.createdAt)}</td>
                        <td
                          style={{
                            color: getColor(transaction.transactions_type),
                          }}
                        >
                          {transaction.transactions_type}
                        </td>
                        <td>{transaction.initialAmount}</td>
                        <td>{transaction.afterAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsModal;
