import { cards, transactions } from '../constants';
import { CardDetails, Transaction } from './types';

export default {
  getCards: async () => {
    return await new Promise<CardDetails[]>((resolve) => {
      setTimeout(() => resolve(cards), 0);
    });
  },
  getTransactions: async () => {
    return await new Promise<Transaction[]>((resolve) => {
      setTimeout(() => resolve(transactions), 0);
    });
  },
};
