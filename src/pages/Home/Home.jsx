import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner/Banner";
import MovieShowing from "./MovieShowing/MovieShowing";
import TheaterTabs from "./TheaterTabs/TheaterTabs";

import { getTheatersBrand } from "redux/slices/theatersSlice";
import { getMovieList, getMovieListPagination } from "redux/slices/moviesSlice";
import { getMovieBanner } from "redux/slices/moviesSlice";
import PageLoading from "components/Loading/PageLoading";

const Home = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const [showLoading, setShowLoading] = useState(false);

  const { isTheatersLoading } = useSelector((state) => {
    return state.theaters;
  });

  useEffect(() => {
    dispatch(getMovieBanner());
    dispatch(getMovieListPagination(1));
    dispatch(getTheatersBrand());
    setShowLoading(true);
  }, []);

  setTimeout(() => {
    setShowLoading(false);
  }, 1000);

  if (showLoading || isTheatersLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <Banner />
      <MovieShowing />
      <TheaterTabs />
    </>
  );
};

export default Home;
