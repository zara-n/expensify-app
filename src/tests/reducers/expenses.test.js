import expensesReducers from "../../reducers/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducers(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id
  };
  const state = expensesReducers(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expenses if ID not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "7"
  };
  const state = expensesReducers(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const expense = {
    id: "4",
    description: "headphones",
    note: "",
    amount: 6700,
    createdAt: moment()
  };
  const action = {
    type: "ADD_EXPENSE",
    expense
  };

  const state = expensesReducers(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

//should edit an expense
test("should edit an expense", () => {
  const id = expenses[0].id;
  const updates = {
    description: "Gold's Gym",
    note: "Personal Trainer"
  };
  const action = {
    type: "EDIT_EXPENSE",
    id,
    updates
  };

  const state = expensesReducers(expenses, action);
  expect(state[0].note).toBe(updates.note);
  expect(state[0].description).toBe(updates.description);
});

//should not edit expens if expense not found
test("should NOT edit an expense if id not found", ()=>{
    const id = 109;
    const updates = {
        amount: 670
    };
    const action = {
        type: "EDIT_EXPENSE",
        id,
        updates
    }
    const state = expensesReducers(expenses, action);
    expect(state).toEqual(expenses);
});

test("should set expenses", ()=>{
  const expensesNew = {};
  const action = {
    type: "SET_EXPENSES",
    expenses: expensesNew
  };
  //expect all expenses passed in to be inside of state
  const state = expensesReducers(expenses, action);
  expect(state).toEqual(expensesNew)
});