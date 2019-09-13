import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

const initialState = {
  categories: []
};

function rootReducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case "GET_CATEGORIES_SUCCESS":
      return  { categories: action.categories };
  }
  return state;
}

export default function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
  return store;
}
