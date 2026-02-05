import { transactions } from './data.js';
import { addTransaction, printSummary } from './finance.js';

const initFn = (transactions) => {
  addTransaction(transactions, {
    id: 6,
    type: 'income',
    category: 'salary',
    amount: 3000,
    description: 'Monthly salary',
    date: '2025-02-15',
  });
  return printSummary(transactions);
};
console.log(initFn(transactions));
