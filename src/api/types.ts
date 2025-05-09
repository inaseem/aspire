export type Transaction = {
  name: string;
  date: string;
  amount: number;
  type: string;
  purpose: string;
};

export type CardDetails = {
  name: string;
  cardNumber: string;
  validThru: string;
  cvv: string;
  issuer: string;
  isFrozen?: boolean;
};
