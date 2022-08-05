import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAPI from "services/adminAPI";
import ticketsAPI from "services/ticketsAPI";

const initialState = {
  movieList: [],
  editMovieData: {},
  isLoaidng: false,
  actionResponeAPI: null,
  actionSuccess: null,
  error: "",
};

export const getMovieList = createAsyncThunk("admin/getMovieList", async (keyword = "") => {
  try {
    const data = await adminAPI.getMovieList(keyword);
    return data;
  } catch (error) {
    throw error;
  }
});

export const addMovie = createAsyncThunk("admin/addMovie", async (FormData) => {
  try {
    const data = await adminAPI.addMovie(FormData);
    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchEditMovieData = createAsyncThunk("movies/fetchEditMovieData", async (movieId) => {
  try {
    const data = await adminAPI.fecthEditMovieData(movieId);
    return data;
  } catch (error) {
    throw error;
  }
});

export const updateMovie = createAsyncThunk("admin/updateMovie", async (FormData) => {
  try {
    const data = await adminAPI.updateMovie(FormData);
    return data;
  } catch (error) {
    throw error;
  }
});

export const deleteMovie = createAsyncThunk("admin/deleteMovie", async (movieId) => {
  try {
    const data = await adminAPI.deleteMovie(movieId);
    return data;
  } catch (error) {
    throw error;
  }
});

export const createShowtime = createAsyncThunk("admin/createShowtime", async (showtime) => {
  try {
    const data = await ticketsAPI.createShowtime(showtime);
    return data;
  } catch (error) {
    throw error;
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    resetAdminActionStatus: (state) => {
      return { ...state, isLoaidng: false, actionSuccess: null, actionResponeAPI: null, error: "" };
    },
  },
  extraReducers: (builder) => {
    // GET MOVIE LIST
    builder.addCase(getMovieList.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getMovieList.fulfilled, (state, action) => {
      return { ...state, isLoading: false, movieList: action.payload };
    });
    builder.addCase(getMovieList.rejected, (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    });
    // ADD
    builder.addCase(addMovie.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(addMovie.fulfilled, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: true, actionResponeAPI: action.payload };
    });
    builder.addCase(addMovie.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
    // EDIT
    builder.addCase(fetchEditMovieData.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(fetchEditMovieData.fulfilled, (state, action) => {
      return { ...state, isLoading: false, editMovieData: action.payload };
    });
    builder.addCase(fetchEditMovieData.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
    // UPDATE
    builder.addCase(updateMovie.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(updateMovie.fulfilled, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: true, actionResponeAPI: action.payload };
    });
    builder.addCase(updateMovie.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
    // DELETE
    builder.addCase(deleteMovie.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(deleteMovie.fulfilled, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: true, actionResponeAPI: action.payload };
    });
    builder.addCase(deleteMovie.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
    // CREATE SHOƯTIME
    builder.addCase(createShowtime.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(createShowtime.fulfilled, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: true, actionResponeAPI: action.payload };
    });
    builder.addCase(createShowtime.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
  },
});

export const { resetAdminActionStatus } = adminSlice.actions;

export default adminSlice.reducer;
