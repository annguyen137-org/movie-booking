import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import movies from "./slices/moviesSlice";
import theaters from "./slices/theatersSlice";

const store = configureStore({
  reducer: {
    movies: movies,
    theaters: theaters,
    auth: authSlice,
  },
});

export default store;
