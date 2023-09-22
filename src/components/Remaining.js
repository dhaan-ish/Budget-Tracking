import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Remaining = () => {
  const { expenses, budget, selectedCurrency } = useContext(AppContext);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Update total expenses whenever expenses change
  useEffect(() => {
    const newTotalExpenses = expenses.reduce((total, item) => {
      return total + item.cost;
    }, 0);
    setTotalExpenses(newTotalExpenses);
  }, [expenses]);

  const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';

  return (
    <div className={`alert ${alertType}`}>
      <span>
        Remaining: {selectedCurrency} {budget - totalExpenses}
      </span>
    </div>
  );
};

export default Remaining;
