import React, { useEffect, useRef, useState } from "react";
import { Pagination } from "antd";
import FilmItem from "components/FilmItem/FilmItem";
import { useSelector, useDispatch } from "react-redux";
import { getMovieListPagination } from "redux/slices/moviesSlice";

export const moviesRef = React.createRef();

const MovieShowing = () => {
  const dispatch = useDispatch();

  const {
    data,
    moviesPagination: { currentPage, count, items, totalCount },
    isMoviesLoading,
    error,
  } = useSelector((state) => {
    return state.movies;
  });

  const handleChangePage = (page) => {
    dispatch(getMovieListPagination(page));
    moviesRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  return (
    <div className="container mx-auto text-center px-5 md:px-10 lg:px-40 mt-10 mb-5" ref={moviesRef}>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative`}>
        {items &&
          items.map((movie) => {
            return <FilmItem movie={movie} key={movie.maPhim} isLoading={isMoviesLoading} />;
          })}
      </div>

      <div className="mt-5">
        <Pagination
          responsive={true}
          pageSize={8}
          showSizeChanger={false}
          current={currentPage}
          total={totalCount}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default MovieShowing;
