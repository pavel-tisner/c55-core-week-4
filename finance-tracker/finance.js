import chalk from 'chalk';

// Return a new array to avoid mutating the original transactions list
function addTransaction(transactions, transaction) {
  return [...transactions, transaction];
}

function getTotalIncome(transactions) {
  let total = 0;
  for (const transaction of transactions) {
    const { type, amount } = transaction;
    if (type === 'income') {
      total += amount;
    }
  }
  return total;
}

function getTotalExpenses(transactions) {
  let total = 0;
  for (const transaction of transactions) {
    const { type, amount } = transaction;
    if (type === 'expense') {
      total += amount;
    }
  }
  return total;
}

function getBalance(transactions) {
  const totalIncome = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  return totalIncome - totalExpenses;
}

function getTransactionsByCategory(transactions, category) {
  const result = [];
  for (const transaction of transactions) {
    if (transaction.category === category) {
      result.push(transaction);
    }
  }
  return result;
}

function getLargestExpense(transactions) {
  let largestExpense = 0;
  for (const transaction of transactions) {
    const { type, amount } = transaction;
    if (type === 'expense' && amount > largestExpense) {
      largestExpense = amount;
    }
  }
  return largestExpense;
}

// Uses getLargestExpense, so the array is iterated more than once
function getLargestExpenseDescription(transactions) {
  let largestExpenseDescription = '';
  for (const transaction of transactions) {
    const { type, amount, description } = transaction;
    if (type === 'expense' && amount === getLargestExpense(transactions)) {
      largestExpenseDescription = description;
    }
  }
  return largestExpenseDescription;
}

function printAllTransactions(transactions) {
  let result = '';
  for (const transaction of transactions) {
    const { id, type, category, amount, description } = transaction;
    const coloredCategory = chalk.yellow(category);
    const coloredAmount =
      type === 'income' ? chalk.green(amount) : chalk.red(amount);
    result += `${id}. [${type.toUpperCase()}] ${coloredCategory[0].toUpperCase() + coloredCategory.slice(1)} - €${coloredAmount} (${description.toLowerCase()})
`;
  }
  return result;
}

// Calculations are delegated to helper functions; this function handles formatting only
function printSummary(transactions) {
  const totalIncome = chalk.bold.green(getTotalIncome(transactions));
  const totalExpenses = chalk.bold.red(getTotalExpenses(transactions));
  const balance =
    getBalance(transactions) >= 0
      ? chalk.bold.cyan(getBalance(transactions))
      : chalk.bold.red(getBalance(transactions));
  const largestExpense = chalk.red(getLargestExpense(transactions));
  const largestExpenseDescription = getLargestExpenseDescription(transactions);
  const AllTransactions = printAllTransactions(transactions);
  const transactionCount = transactions.length;
  return `
💰 PERSONAL FINANCE TRACKER 💰
  
All Transactions:
${AllTransactions}
  
📊 FINANCIAL SUMMARY 📊
Total Income: €${totalIncome}
Total Expenses: €${totalExpenses}
Current Balance: €${balance}
  
Largest Expense: ${largestExpenseDescription} (${largestExpense})
Total Transactions: ${transactionCount}
`;
}

export {
  addTransaction,
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getTransactionsByCategory,
  getLargestExpense,
  getLargestExpenseDescription,
  printAllTransactions,
  printSummary,
};
