import uuid from "uuid";
import database from "../firebase/firebase";


//component calls action generator
//action generator returns object
//component dispatched object
//redux store changes

//WITH THUNK  & FIREBASE
//component calls action generator c
//action generator returns function
//component dispatches function (?)
//functions runs (has ability to dispatch actions or whatever)


// ADD_EXPENSE
export const addExpense = expense => ({
  // {} = empty object, default
  type: "ADD_EXPENSE",
  expense
});

//creating asynchronous actions
//firebase data call
//dispatch to change to redux store
export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData; 

    const expense = { description, note, amount, createdAt };

   return database
      .ref("expenses")
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});
