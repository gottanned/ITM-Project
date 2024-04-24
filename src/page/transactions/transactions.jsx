import { useState } from "react";

const Transactions = (transactions) => {
  const [transactionData, setTransactionData] = useState();

  return (
    <div>
      <h1>Transactions</h1>
      <div>
        {transactionData.map((transaction, index) => {
          return (
            <div key={index}>
              <p>{transaction.amount}</p>
              <p>{transaction.createdAt}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Transactions;
