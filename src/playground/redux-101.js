import { createStore } from "redux";

const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy //same as incrementBy: incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({
    type: 'RESET',
});

const setCount = ({ count }) => ({
    type: 'SET COUNT',
    count
});

//Reducers
//1. Reducers are pure fucntions (a fuction that does not interact with tings outside of its scope)
//2. Never change the state or action
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
          count: state.count - action.decrementBy
      };
    case 'RESET':
      return {
          count: 0
      };
    case 'SET COUNT':
      return {
          count: action.count
      };
    default:
      return state;
  }
};


const store = createStore(countReducer);

store.subscribe(() => { //put "const unsubscribe = " before and call it where needed to to unsubscribe
    console.log(store.getState());
});


store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy: 3}));

store.dispatch(setCount({count: 100}))


//more destructuring possibilities

const add = ({a,b},c) => {
    return a + b + c;
}

console.log(add({a: 1, b: 12}, 100));