import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.name, // Pass the name as payload to match with the reducer logic
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });
    }

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10, // Decrease by 10
        };

        dispatch({
            type: 'RED_EXPENSE',
            payload: expense,
        });
    }

    // Function to format the cost in the selected currency
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

    return (
        <tr>
            <td>{props.name}</td>
            <td>{formatCurrency(props.cost)}</td>
            <td>
                <button onClick={event => increaseAllocation(props.name)}>+</button> 
            </td>
            <td><button onClick={event => decreaseAllocation(props.name)}>-</button></td>
            <td><TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};

export default ExpenseItem;
