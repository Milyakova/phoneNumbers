import { createAction, createSlice } from "@reduxjs/toolkit";
import numberService from "../services/number.service";

const numbersSlice = createSlice({
  name: "numbers",
  initialState: {
    entities: [],
    isLoading: true,
  },
  reducers: {
    numbersRequested: (state) => {
      state.isLoading = true;
    },
    numbersReceived: (state, action) => {
      state.entities = action.payload || [];
      state.dataLoaded = true;
      state.isLoading = false;
    },

    numbersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    numberCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    numberRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    },
    numberUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((n) => n._id === action.payload._id)
      ] = action.payload;
    },
  },
});
const { reducer: numbersReducer, actions } = numbersSlice;

const {
  numbersRequested,
  numbersReceived,
  numbersRequestFailed,
  numberCreated,
  numberRemoved,
  numberUpdateSuccessed,
} = actions;

const numberCreateRequested = createAction("numbers/numberCreateRequested");
const createNumberFailed = createAction("numbers/createNumberFailed ");
const removeNumberRequested = createAction("numbers/removeNumberRequested");
const numberUpdateFailed = createAction("numbers/numberUpdateFailed");
const numberUpdateRequested = createAction("numbers/numberUpdateRequested");

export const createNumber = (payload) => async (dispatch) => {
  dispatch(numberCreateRequested());
  try {
    const { content } = await numberService.create(payload);
    dispatch(numberCreated(content));
  } catch (error) {
    dispatch(createNumberFailed(error.message));
  }
};
export const loadNumbersList = () => async (dispatch) => {
  dispatch(numbersRequested());
  try {
    const { content } = await numberService.get();
    dispatch(numbersReceived(content));
  } catch (error) {
    dispatch(numbersRequestFailed(error.message));
  }
};
export const removeNumber = (numberId) => async (dispatch) => {
  dispatch(removeNumberRequested());
  try {
    const { content } = await numberService.remove(numberId);
    if (content === null) {
      dispatch(numberRemoved(numberId));
    }
  } catch (error) {
    dispatch(numbersRequestFailed(error.message));
  }
};
export const updateNumber = (payload) => async (dispatch) => {
  dispatch(numberUpdateRequested());
  try {
    const { content } = await numberService.update(payload);
    dispatch(numberUpdateSuccessed(content));
  } catch (error) {
    dispatch(numberUpdateFailed(error.message));
  }
};

export const getNumbersList = () => (state) => state.numbers.entities;
export const getNumbersLoadingStatus = () => (state) => state.numbers.isLoading;
export default numbersReducer;
