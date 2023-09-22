import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ExpenseTotal = () => {
  const { expenses, currency } = useContext(AppContext);

  // Function to format the total expenses in the selected currency
  const formatCurrency = (amount) => {
    switch (currency) {
      case '$':
        return `$${amount}`;
      case '£':
        return `£${amount}`;
      case '€':
        return `€${amount}`;
      case '₹':
        return `₹${amount}`;
      default:
        return `£${amount}`; // Default to Pound if currency is not recognized
    }
  };

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  return (
    <div className='alert alert-primary'>
      <span>Spent so far: {formatCurrency(totalExpenses)}</span>
        </div>
    );
};
export default ExpenseTotal;
