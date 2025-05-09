import { CardDetails } from "./api/types";
import visaIcon from "./assets/icons/visa_logo.svg";

export const getRandomCardDetauils = (name: string) => {
  const cardNumber =
    Math.floor(1000 + Math.random() * 9000) +
    " " +
    Math.floor(1000 + Math.random() * 9000) +
    " " +
    Math.floor(1000 + Math.random() * 9000) +
    " " +
    Math.floor(1000 + Math.random() * 9000);

  const validThru =
    Math.floor(1 + Math.random() * 12) +
    "/" +
    (new Date().getFullYear() + 3).toString().substring(2, 4);
  const cvv = Math.floor(100 + Math.random() * 900).toString();

  return {
    cardNumber,
    validThru,
    name,
    cvv,
    issuer: visaIcon,
  } satisfies CardDetails;
};
