import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, currency, dispatch, expenses } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    // Function to format the budget in the selected currency
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

    const handleBudgetChange = (event) => {
        const enteredBudget = parseInt(event.target.value);

        // Ensure the entered budget is not lower than the amount spent so far
        const totalExpenses = expenses.reduce((total, item) => {
            return (total += item.cost);
        }, 0);
        
        if (enteredBudget < totalExpenses) {
            alert(`Budget cannot be lower than the amount spent so far.`);
            return;
        }

        // Set the maximum limit to 20,000
        if (enteredBudget > 20000) {
            alert(`Budget cannot exceed 20,000.`);
            return;
        }

        // Dispatch the 'SET_BUDGET' action to update the budget in the context
        dispatch({ type: 'SET_BUDGET', payload: enteredBudget });

        // Update the local state
        setNewBudget(enteredBudget);
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget : {currency} </span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
                // Ensure the minimum is the amount spent so far
                max={20000} // Set the maximum limit to 20,000
            ></input>
        </div>
    );
};

export default Budget;
