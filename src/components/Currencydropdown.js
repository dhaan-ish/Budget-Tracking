import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './currency.css';

function CurrencyDropdown() {
  const { currency, dispatch } = useContext(AppContext);

  const handleCurrencyChange = (newCurrency) => {
    dispatch({ type: 'CHG_CURRENCY', payload: newCurrency });
  };

  return (
    <div>
      <label>
        
        <select
          value={currency}
          onChange={(e) => handleCurrencyChange(e.target.value)}
          className={`alert alert-success`}
          style={{ width: '18rem' }}
        >
          <option value="$">$ Dollar</option>
          <option value="£">£ Pound</option>
          <option value="€">€ Euro</option>
          <option value="₹">₹ Rupee</option>
        </select>
      </label>
    </div>
  );
}

export default CurrencyDropdown;
