import { createSlice } from "@reduxjs/toolkit";
import countryCodesService from "../services/countryCodes.service";

const countryCodesSlice = createSlice({
  name: "countryCodes",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    countryCodesRequested: (state) => {
      state.isLoading = true;
    },
    countryCodesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    countryCodesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: countryCodesReducer, actions } = countryCodesSlice;
const { countryCodesRequested, countryCodesReceved, countryCodesRequestFiled } =
  actions;

export const loadcountryCodesList = () => async (dispatch) => {
  dispatch(countryCodesRequested());
  try {
    const { content } = await countryCodesService.get();
    dispatch(countryCodesReceved(content));
  } catch (error) {
    dispatch(countryCodesRequestFiled(error.message));
  }
};
export const getCountryCodes = () => (state) => state.countryCodes.entities;
export const getCountryCodesLoadingStatus = () => (state) =>
  state.countryCodes.isLoading;

export const getcountryCodeById = (id) => (state) => {
  if (state.countryCodes.entities) {
    return state.countryCodes.entities.find((c) => c._id === id);
  }
};

export const getCountryCodesByIdLoadingStatus = () => (state) =>
  state.countryCodes.isLoading;

export default countryCodesReducer;
