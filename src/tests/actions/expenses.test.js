import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  startRemoveExpense,
  removeExpense,
  setExpenses,
  startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk"; //mock store needs the same middleware
import database from "../../firebase/firebase.js";

const uid = "testUser";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]); //creating the configuration so that test cases run the same mock store

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should remove an expense from firebase", done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value"); //returning promise so it can be chained on
    })
    .then(snapshot => {
      //when you use snapshot.val on a item that doesn't exist, you get NULL back
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should set up edit expense action object", () => {
  const action = editExpense("123abc", { description: "rent" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      description: "rent"
    }
  });
});

test("should edit an expense from firebase", done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  const updates = {
    description: "AMEX"
  };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value"); //returning promise so it can be chained on
    })
    .then(snapshot => {
      //when you use snapshot.val on a item that doesn't exist, you get NULL back
      expect(snapshot.val().description).toBe("AMEX");
      done();
    });
});

test("should set up add expense action object with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("should add expense to database and store", done => {
  //this makes sure that the asynchronous functions are all complete before test is done
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: "Mouse",
    amount: "3000",
    note: "This one is better",
    createdAt: 1000
  };

  //when testing asynchronous functions, we must let jest know
  //otherwise it just waits for the function to return, if no error - success
  //this code does not run until it's parent function has returned (parent function of this test case), it is asynchronous
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions(); //returns array of all of the actions
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done(); //making sure the test wait until done is called, forcing hest to wait
    });
});

test("should add expense with defaults database and store", done => {
  const store = createMockStore(defaultAuthState);
  const expenseDefaults = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0
  };

  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      });

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should fetch the expenses from firebase", done => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});

// test("should set up add expense action object with default values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: 0
//     }
//   });
// });
