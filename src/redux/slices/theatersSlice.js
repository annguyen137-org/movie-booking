import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import theaterAPI from "services/theaterAPI";

const initialState = {
  theatersBrand: [],
  isTheatersLoading: false,
  error: "",
};

export const getTheatersBrand = createAsyncThunk("theaters/getTheatersBrand", async () => {
  try {
    const data = theaterAPI.getTheatersBrand();
    return data;
  } catch (error) {
    throw error;
  }
});

const theatersSlice = createSlice({
  name: "theaters",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTheatersBrand.pending, (state, action) => {
      return { ...state, error: "", isTheatersLoading: true };
    });

    builder.addCase(getTheatersBrand.fulfilled, (state, action) => {
      return { ...state, isTheatersLoading: false, theatersBrand: action.payload, error: "" };
    });
    builder.addCase(getTheatersBrand.rejected, (state, action) => {
      return { ...state, isTheatersLoading: false, error: action.error.message };
    });
  },
});

export default theatersSlice.reducer;
