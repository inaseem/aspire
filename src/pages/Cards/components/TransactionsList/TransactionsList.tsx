import clsx from "clsx";
import { useQuery } from "react-query";
import api from "../../../../api";
import cardIcon from "../../../../assets/icons/card.svg";
import nextIcon from "../../../../assets/icons/next.svg";
import { purposeBgMap, purposeIconMap } from "../../../../constants";
import { GET_TRANSACTIONS } from "../../../../queries";
import styles from "./index.module.scss";

type Purpose = keyof typeof purposeIconMap;

const TransactionsList = () => {
  const { data, isLoading } = useQuery({
    queryKey: GET_TRANSACTIONS,
    queryFn: () => api.getTransactions(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const transactions = data || [];

  return (
    <div>
      <ul className={styles["transactions-list"]}>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <div className="flex gap-3 items-center w-full">
              <div
                className={clsx(
                  "h-12 w-12 grid place-items-center rounded-full",
                  purposeBgMap[transaction.purpose as Purpose]
                )}
              >
                <img
                  src={purposeIconMap[transaction.purpose as Purpose]}
                  className="h-4 w-4"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="text-sm font-semibold text-grey13">
                  {transaction.name}
                </div>
                <div className="text-xsm text-grey67">{transaction.date}</div>
              </div>
              <div className="flex gap-[10.5px] items-center self-start">
                <span
                  className={clsx("text-center text-sm font-bold", {
                    "text-green41": transaction.amount > 0,
                    "text-grey13": transaction.amount <= 0,
                  })}
                >
                  {transaction.amount > 0 ? "+ S$" : "- S$"}{" "}
                  {Math.abs(transaction.amount)}
                </span>
                <img src={nextIcon} alt="" />
              </div>
            </div>
            <div className="mx-14 px-1 flex gap-2 items-center mt-[10px] sm:mt-3">
              <div className="w-6 h-5 grid place-items-center bg-blue44 rounded-full">
                <img src={cardIcon} className="h-[7.86px]" alt="" />
              </div>
              <span className="text-xs text-blue44 font-semibold">
                <span className="capitalize">{transaction.type}</span> on debit
                card
              </span>
            </div>
          </li>
        ))}
      </ul>
      <button className={styles["btn-view-all"]}>
        View all card transactions
      </button>
    </div>
  );
};

export default TransactionsList;
