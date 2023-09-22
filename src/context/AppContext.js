import React, { createContext, useReducer } from 'react';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
  let total_budget = 0;
  total_budget = state.expenses.reduce((previousExp, currentExp) => {
    return previousExp + currentExp.cost;
  }, 0);
  total_budget = total_budget + action.payload.cost;
  action.type = "DONE";

  if (action.payload.cost < 0) {
    // Decreasing allocation, no need to check budget limit
    state.expenses.map((currentExp) => {
      if (currentExp.name === action.payload.name) {
        currentExp.cost = action.payload.cost + currentExp.cost;
      }
      return currentExp;
    });
  } else if (total_budget <= state.budget) {
    // Increasing allocation within budget limit
    total_budget = 0;
    state.expenses.map((currentExp) => {
      if (currentExp.name === action.payload.name) {
        currentExp.cost = action.payload.cost + currentExp.cost;
      }
      return currentExp;
    });

    // Subtract the expense from the budget
    state.budget -= action.payload.cost;
  } else {
    alert("Cannot increase the allocation! Out of funds");
  }

  return {
    ...state,
  };

    case 'RED_EXPENSE':
      const red_expenses = state.expenses.map((currentExp) => {
        if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
          currentExp.cost = currentExp.cost - action.payload.cost;
          state.budget = state.budget + action.payload.cost;
        }
        return currentExp;
      });
      action.type = "DONE";
      return {
        ...state,
        expenses: [...red_expenses],
      };
      case 'DELETE_EXPENSE':
        action.type = "DONE";
        const updatedExpenses = state.expenses.map((currentExp) => {
          if (currentExp.name === action.payload) {
            state.budget = state.budget + currentExp.cost;
            currentExp.cost = 0;
          }
          return currentExp;
        });
        const updatedTotalExpenses = updatedExpenses.reduce((total, item) => {
          return (total += item.cost);
        }, 0);
      
        return {
          ...state,
          expenses: updatedExpenses,
          totalExpenses: updatedTotalExpenses, // Update totalExpenses
        };
    case 'SET_BUDGET':
      action.type = "DONE";
      state.budget = action.payload;
      return {
        ...state,
      };
    case 'CHG_CURRENCY':
      action.type = "DONE";
      state.currency = action.payload;
      return {
        ...state,
      };
      
    default:
      return state;
  }
};

// 1. Sets the initial state when the app loads
const initialState = {
  budget: 0,
  expenses: [
    { id: "Marketing", name: 'Marketing', cost: 0 },
    { id: "Finance", name: 'Finance', cost: 0 },
    { id: "Sales", name: 'Sales', cost: 0 },
    { id: "Human Resource", name: 'Human Resource', cost: 0 },
    { id: "IT", name: 'IT', cost: 0 },
    { id: "HR", name: 'HR', cost: 0 },
  ],
  currency: '£',
};

export const AppContext = createContext();

// 2. Creates the context this is the thing our components import and use to get the state
export const AppProvider = (props) => {
  // 4. Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // 6. Calculate remaining budget
  const totalExpenses = state.expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);
  const remaining = state.budget - totalExpenses;

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        budget: state.budget,
        remaining: remaining,
        dispatch,
        currency: state.currency,
        selectedCurrency: state.currency,
        totalExpenses: totalExpenses, // Include selectedCurrency
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
