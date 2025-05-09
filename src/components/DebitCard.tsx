import clsx from "clsx";
import { CardDetails } from "../api/types";
import aspireLogo from "../assets/icons/aspire_logo.svg";
import styles from "./debit-card.module.scss";

type DebitCardProps = CardDetails & {
  isDetailsVisible?: boolean;
};

const MaskedCardNumbers = () => {
  const mask = Array.from(new Array(4)).map((_, index) => (
    <span
      key={index}
      className="w-2 h-2 sm:w-[9px] sm:h-[9px] bg-white rounded-full"
    ></span>
  ));
  return (
    <div className="flex gap-[6px] sm:gap-[6.7px] items-center">{mask}</div>
  );
};

const DebitCard = ({
  name,
  cardNumber,
  validThru,
  cvv,
  issuer,
  isDetailsVisible = false,
  isFrozen = false,
}: DebitCardProps) => {
  const digitsGroup = cardNumber.split(" ");

  return (
    <div
      className={clsx(
        "bg-green41 rounded-xl p-6 sm:p-7 flex flex-col leading-[0.58px] transition-all",
        { [styles["frozen"]]: isFrozen }
      )}
    >
      <img
        src={aspireLogo}
        className="self-end h-[21px] sm:h-[23.7px]"
        alt=""
      />
      <div
        className="mt-6 sm:mt-7 font-bold text-[22px] sm:text-2xl leading-none tracking-[0.58px]"
        aria-label="Cardholder Name"
      >
        {name}
      </div>
      <div className="mt-6 sm:mt-7 flex gap-6 sm:gap-7 items-center">
        {isDetailsVisible ? (
          <>
            <span className="text-sm font-bold tracking-[3.46px]">
              {digitsGroup[0]}
            </span>
            <span className="text-sm font-bold tracking-[3.46px]">
              {digitsGroup[1]}
            </span>
            <span className="text-sm font-bold tracking-[3.46px]">
              {digitsGroup[2]}
            </span>
          </>
        ) : (
          <>
            <MaskedCardNumbers />
            <MaskedCardNumbers />
            <MaskedCardNumbers />
          </>
        )}
        <span className="text-sm font-bold tracking-[3.46px]">
          {digitsGroup[3]}
        </span>
      </div>
      <div className="mt-[13px] sm:mt-4 flex gap-[30px] sm:gap-9 items-center min-h-[22.57px] font-bold">
        <div className="text-xsm">
          <span className="tracking-[0.31px]">Thru:</span>
          <span className="tracking-[1.56px]" aria-label="Valid Thru">
            {validThru}
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <span className="tracking-[0.31px] text-xsm">CVV:</span>
          {isDetailsVisible ? (
            <span className="tracking-[1.56px] text-xsm" aria-label="CVV">
              {cvv}
            </span>
          ) : (
            <span
              className="leading-none text-2xl tracking-[2.88px] h-[19px] transition-none"
              aria-label="CVV"
            >
              ***
            </span>
          )}
        </div>
      </div>
      <img
        src={issuer}
        className="mt-1 self-end h-5 sm:h-[22.57px]"
        alt="Issuer Logo"
      />
    </div>
  );
};

export default DebitCard;
