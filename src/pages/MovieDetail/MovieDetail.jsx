import React, { useEffect, useRef } from "react";
import PageLoading from "components/Loading/PageLoading";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { Button, Tabs, Collapse, Rate } from "antd";
import { getMovieDetail } from "redux/slices/moviesSlice";

const MovieDetail = () => {
  window.scrollTo(0, 0);
  const showTimesRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <div className="container mx-auto h-full w-full text-center px-5 lg:py-10 md:px-10 lg:px-20 2xl:px-40 grow">
        <div className="flex flex-col md:flex-row w-full h-full">
          <div className="md:w-1/2 lg:w-2/5 h-96 p-5 relative">
            <img src={movieDetail.hinhAnh} className="w-full h-full" alt={movieDetail.tenPhim} />
            {movieDetail.hot && (
              <span className="text-white bg-red-600 text-sm mx-2 p-1 absolute top-5 left-5 animate-bounce">HOT</span>
            )}
          </div>

          <div className="md:w-1/2 lg:w-3/5 text-left p-5">
            <p className="lg:text-4xl font-extrabold space-x-2">{movieDetail.tenPhim}</p>
            <p className="lg:text-lg">
              Ngày khởi chiếu:
              <span className="p-1 rounded-md bg-orange-600 font-bold">
                {movieDetail.ngayKhoiChieu && movieDetail.ngayKhoiChieu.split("T")[0].split("-").reverse().join("-")}
              </span>
            </p>
            <div className="lg:mb-10">
              {window.innerWidth >= 768 ? (
                <p>{movieDetail.moTa}</p>
              ) : (
                <Collapse ghost>
                  <Collapse.Panel header="Xem chi tiết">
                    <p>{movieDetail.moTa}</p>
                  </Collapse.Panel>
                </Collapse>
              )}
            </div>
            <div className="hidden md:flex justify-between items-center">
              <div>
                <Button
                  className="rounded-md bg-orange-600 font-semibold focus:text-black hover:text-black hover:border-orange-600 hover:scale-110"
                  size="large"
                  onClick={() => showTimesRef.current.scrollIntoView({ behavior: "smooth", block: "center" })}
                >
                  Mua vé ngay
                </Button>
              </div>
              <div>
                <p className="text-lg font-bold m-0">Đánh giá: </p>
                <Rate allowHalf style={{ fontSize: "30px" }} disabled value={movieDetail.danhGia / 2}></Rate>
              </div>
            </div>
          </div>
        </div>
        <div ref={showTimesRef}>
          <Tabs
            tabPosition={window.innerWidth >= 768 ? "left" : "top"}
            tabBarStyle={
              window.innerWidth >= 768
                ? { height: "500px", overflow: "hidden", borderRight: "1px solid rgb(203 213 225)" }
                : { padding: "10px" }
            }
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
                  <div
                    className="flex flex-col items-start p-2 w-full"
                    style={{ height: "500px", overflowY: "scroll" }}
                  >
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
                                  onClick={() => {
                                    navigate(`/purchase/${showtime.maLichChieu}`);
                                  }}
                                >
                                  <p className="m-0">
                                    <span className="font-bold">
                                      {[...showtime.ngayChieuGioChieu.split("T")[0].split("-")].reverse().join("-")}
                                    </span>
                                  </p>
                                  <p className="m-0 font-bold text-green-700">
                                    {showtime.ngayChieuGioChieu.split("T")[1].slice(0, 5)}
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
