import React, { useReducer } from "react";
import {produce} from "immer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_MORE = "addMore";
const ADD_VALUE_TO_COUNT_SUBMIT = "addValueToCount";

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      state.count = state.count + 1;
      return;
      // return { ...state, count: state.count + 1 };
    case DECREMENT:
      state.count = state.count - 1;
      return;
      // return { ...state, count: state.count - 1 };
    case ADD_VALUE_TO_COUNT_SUBMIT:
      state.count = state.count + state.valueToAdd;
      state.valueToAdd = 0;
      return;
      // return {...state, valueToAdd: action.payload};
    case ADD_MORE:
      state.valueToAdd = action.payload;
      return;
      // return {...state, count: state.count + state.valueToAdd, valueToAdd: 0 };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(produce(reducer), { count: 0, valueToAdd: 0 });

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    dispatch({type: ADD_MORE, payload: value});
  };

  const handleSubmit = () => {
    dispatch({type: ADD_VALUE_TO_COUNT_SUBMIT});
  };

  return (
    <div className="container">
      <div class="input-group mt-3">COUNTER: {state.count}</div>
      <div class="input-group mt-4">
        <div class="col-auto ms-2">
          <button
            className=" btn btn-success form-label"
            onClick={() => dispatch({ type: INCREMENT })}
          >
            INCREMENT
          </button>
        </div>
        <div class="col-auto ms-2">
          <button
            className=" btn btn-danger form-label"
            onClick={() => dispatch({ type: DECREMENT })}
          >
            DECREMENT
          </button>
        </div>
      </div>
      <div class="input-group mt-2">
        <div class="col-auto ms-2">
          <label for="Custom" class="form-label">
            ADD A LOT..
          </label>
          <input
            type="number"
            class="form-control"
            id="custom"
            placeholder="Enter more..."
            value={state.valueToAdd}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="container-fluid">
        <div className="btn btn-primary mt-2" onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
}

export default App;
