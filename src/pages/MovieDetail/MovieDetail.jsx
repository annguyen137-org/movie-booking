import React, { useEffect } from "react";
import PageLoading from "components/Loading/PageLoading";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Tabs } from "antd";
import { getMovieDetail } from "redux/slices/moviesSlice";

const MovieDetail = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const { movieId } = useParams();

  const { movieDetail, isDetailLoading, error } = useSelector((state) => {
    return state.movies;
  });

  useEffect(() => {
    dispatch(getMovieDetail(movieId));
  }, []);

  if (isDetailLoading) {
    return <PageLoading />;
  }

  return (
    <div className="movie-detail bg-slate-300">
      <div className="container mx-auto h-full w-full text-center px-5 py-10 md:px-10 lg:px-20 2xl:px-40 grow">
        <div className="flex flex-col md:flex-row w-full h-full">
          <div className="w-1/3 p-5">
            <img src={movieDetail.hinhAnh} className="w-60" alt="" />
          </div>

          <div className="w-2/3 text-left p-5">
            <h1 className="text-3xl">{movieDetail.tenPhim}</h1>
            <p>{movieDetail.moTa}</p>
          </div>
        </div>
        <div>
          <Tabs
            tabPosition="left"
            tabBarStyle={{ height: "500px", overflow: "hidden", borderRight: "1px solid rgb(203 213 225)" }}
            className="bg-white rounded-sm border border-slate-400"
          >
            {(movieDetail.heThongRapChieu ?? []).map((brand) => {
              return (
                <Tabs.TabPane
                  tab={
                    <div>
                      <img src={brand.logo} width={40} height={40} alt={brand.tenHeThongRap} />
                    </div>
                  }
                  key={brand.maHeThongRap}
                >
                  <div className="flex flex-col items-start p-2 w-full" style={{ height: "500px", overflowY: "scroll" }}>
                    {brand.cumRapChieu.map((theater) => {
                      return (
                        <div key={theater.maCumRap} className="py-3 border-b border-slate-300 text-left">
                          <p className="text-lg text-green-600 font-bold">{theater.tenCumRap}</p>
                          <div className="flex flex-wrap">
                            {theater.lichChieuPhim.map((showtime) => {
                              return (
                                <div
                                  key={showtime.maLichChieu}
                                  className="mb-3 mx-2 p-1 bg-slate-300 rounded-md hover:bg-orange-500 hover:cursor-pointer"
                                >
                                  <p className="m-0">
                                    Ngày:{" "}
                                    <span className="font-bold">
                                      {[...showtime.ngayChieuGioChieu.split("T")[0].split("-")].reverse().join("-")}
                                    </span>
                                  </p>
                                  <p className="m-0">
                                    Giờ: <span className="font-bold">{showtime.ngayChieuGioChieu.split("T")[1].slice(0, 5)}</span>
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
