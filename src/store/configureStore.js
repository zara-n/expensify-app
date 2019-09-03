import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose; //allows us to use redux devtools

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    //applyMiddleware(thunk)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
//store creation
