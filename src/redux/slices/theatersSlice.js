import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import theaterAPI from "services/theaterAPI";

const initialState = {
  theatersBrandWithShowtime: [],
  isTheatersLoading: false,
  error: "",
};

export const getTheatersBrandWithShowtime = createAsyncThunk("theaters/getTheatersBrandWithShowtime", async () => {
  try {
    const data = theaterAPI.getTheatersBrandWithShowtime();
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
    builder.addCase(getTheatersBrandWithShowtime.pending, (state, action) => {
      return { ...state, error: "", isTheatersLoading: true };
    });

    builder.addCase(getTheatersBrandWithShowtime.fulfilled, (state, action) => {
      return { ...state, isTheatersLoading: false, theatersBrandWithShowtime: action.payload, error: "" };
    });
    builder.addCase(getTheatersBrandWithShowtime.rejected, (state, action) => {
      return { ...state, isTheatersLoading: false, error: action.error.message };
    });
  },
});

export default theatersSlice.reducer;
