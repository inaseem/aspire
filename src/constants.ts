import card from "./assets/icons/card.svg";
import credit from "./assets/icons/credit.svg";
import home from "./assets/icons/home.svg";
import payments from "./assets/icons/payments.svg";
import visaIcon from "./assets/icons/visa_logo.svg";

import fileStorageIcon from "./assets/icons/file_storage.svg";
import flightsIcon from "./assets/icons/flights.svg";
import megaphoneIcon from "./assets/icons/megaphone.svg";

export const transactions = [
  {
    name: "Hamleys",
    date: "20 May 2020",
    amount: 150,
    type: "refund",
    purpose: "bill",
  },
  {
    name: "Hamleys",
    date: "20 May 2020",
    amount: -150,
    type: "charge",
    purpose: "flights",
  },
  {
    name: "Hamleys",
    date: "20 May 2020",
    amount: -150,
    type: "charge",
    purpose: "promotions",
  },
  {
    name: "Hamleys",
    date: "20 May 2020",
    amount: -150,
    type: "charge",
    purpose: "bill",
  },
];

export const cards = [
  {
    name: "Mark Henry",
    cardNumber: "1234 5678 9012 3456",
    validThru: "12/24",
    cvv: "123",
    issuer: visaIcon,
  },
  {
    name: "John Doe",
    cardNumber: "9876 5432 1098 7654",
    validThru: "06/23",
    cvv: "456",
    issuer: visaIcon,
  },
  {
    name: "Jane Smith",
    cardNumber: "5678 9012 3456 7890",
    validThru: "09/25",
    cvv: "789",
    issuer: visaIcon,
  },
];

export const sidebarItems = [
  { icon: home, title: "Home", href: "/" },
  { icon: card, title: "Cards", href: "/cards" },
  { icon: payments, title: "Payments", href: "/payments" },
  { icon: credit, title: "Credit", href: "/credit" },
];

export const purposeIconMap = {
  bill: fileStorageIcon,
  flights: flightsIcon,
  promotions: megaphoneIcon,
};

export const purposeBgMap = {
  bill: "bg-blue50",
  flights: "bg-green42",
  promotions: "bg-red63",
};
