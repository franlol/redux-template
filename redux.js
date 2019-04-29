// const redux = require('redux');
const redux = require('redux');

// import { combineReducers } from 'redux'
const combineReducers = require('redux').combineReducers;

// import { applyMiddleware } from 'redux';
const applyMiddleware = require('redux').applyMiddleware;

const createStore = redux.createStore;

const initialState = {
    count: 0
}

// Reducer
const incReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case "INC_COUNT":
            return {
                ...state,
                count: state.count + 1
            };

        case "ADD_COUNT":
            return {
                ...state,
                count: state.count + action.payload
            };

        default:
            break;
    }

    return state;
};

// Reducer
const reducers = combineReducers({
    count: incReducer,
})

// Custom middleware
const customMiddleware = store => next => action => {
    console.log("\nBEFORE:", store.getState())
    next(action);
}

// Middlewares
const middleware = applyMiddleware(customMiddleware);

// Store
const store = createStore(reducers, middleware);
console.log("INIT STORE STATE:", store.getState());

// Subscription
store.subscribe(() => {
    console.log('SUBSCRIPTION:', store.getState(), "\n");
});

// Dispatchers
store.dispatch({ type: 'INC_COUNT' });
store.dispatch({ type: 'ADD_COUNT', payload: 5 });

console.log("FINISH", store.getState());