import React, { useEffect, useRef, useState } from "react";
import { Button, Select, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import movieAPI from "services/movieAPI";
import theaterAPI from "services/theaterAPI";
import useChangeWidth from "utils/useChangeWidth";
import { getMovieListPagination } from "redux/slices/moviesSlice";

const QuickTicket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    moviesPagination: { currentPage },
  } = useSelector((state) => state.movies);

  const [markPage, setMarkPage] = useState(currentPage);

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [quickBuyState, setQuickBuyState] = useState({
    movieList: [],
    theaterBrands: [],
  });
  const [movie, setMovie] = useState("");
  const [currentBranch, setCurrentBranch] = useState({});
  const [showtime, setShowtime] = useState("");

  const { width, changeWidth } = useChangeWidth();

  const handleSelectMovie = async (value) => {
    setMovie(value);
    setQuickBuyState({ ...quickBuyState, theaterBrands: [] });
    const { heThongRapChieu } = await theaterAPI.getShowtimesByMovieId(value);
    setQuickBuyState({ ...quickBuyState, theaterBrands: [...heThongRapChieu] });
  };

  const handleSelectBranch = (value) => {
    const parseValue = JSON.parse(value);

    setCurrentBranch(parseValue);
  };

  const handleSelectShowtime = (value) => {
    setShowtime(value);
  };

  const handleSearch = (value) => {
    setMarkPage(currentPage);
    if (value) {
      dispatch(getMovieListPagination({ keyword: value }));
    } else {
      dispatch(getMovieListPagination({ page: markPage }));
    }
  };

  useEffect(() => {
    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  useEffect(() => {
    if (isFirstLoad) {
      const fetchMovie = async () => {
        const data = await movieAPI.getMovieList();
        setQuickBuyState({ ...quickBuyState, movieList: [...data] });
      };
      fetchMovie();
      setIsFirstLoad(false);
    }
  }, [movie]);

  return (
    <div
      className={`container mx-auto text-center px-5 md:px-10 lg:px-40 ${
        width === "lg" || width === "xl" || width === "2xl" ? "-mt-5" : "mt-3"
      } z-30 relative`}
    >
      <div className="shadow-lg border border-slate-200 w-full p-1 lg:pt-3 lg:pb-5 px-2 bg-white rounded-lg">
        {width === "lg" || width === "xl" || width === "2xl" ? (
          <div>
            <p className="font-bold text-lg m-0 lg:m-1">Mua vé nhanh</p>
            <div className="flex w-full">
              <div className="lg:w-4/12 h-full text-left">
                <Select
                  className="w-full rounded-md lg:rounded-l-md"
                  defaultValue={"Phim"}
                  showSearch
                  filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                  size={"large"}
                  onSelect={handleSelectMovie}
                >
                  <Select.Option disabled value="Phim">
                    Phim
                  </Select.Option>
                  {quickBuyState.movieList.length &&
                    quickBuyState.movieList.map((movie) => (
                      <Select.Option key={movie.maPhim} value={movie.maPhim} className="font-bold">
                        {movie.tenPhim}
                      </Select.Option>
                    ))}
                </Select>
              </div>
              <div className="lg:w-4/12 h-full text-left">
                <Select
                  className="w-full rounded-md lg:rounded-none"
                  size={"large"}
                  defaultValue={"Rạp"}
                  onSelect={handleSelectBranch}
                >
                  <Select.Option disabled value={"Rạp"}>
                    Rạp
                  </Select.Option>
                  {quickBuyState.theaterBrands.length &&
                    quickBuyState.theaterBrands.map((brand) => {
                      return brand.cumRapChieu.map((branch) => {
                        return (
                          <Select.Option key={branch.maCumRap} value={JSON.stringify(branch)} className="font-bold">
                            {branch.tenCumRap}
                          </Select.Option>
                        );
                      });
                    })}
                </Select>
              </div>
              <div className="lg:w-3/12 h-full text-left">
                <Select
                  className="w-full rounded-md lg:rounded-r-md"
                  size={"large"}
                  defaultValue={"Lịch chiếu"}
                  onSelect={handleSelectShowtime}
                >
                  <Select.Option disabled value={"Lịch chiếu"}>
                    Lịch chiếu
                  </Select.Option>
                  {currentBranch?.lichChieuPhim?.length &&
                    currentBranch.lichChieuPhim?.map((showtime) => (
                      <Select.Option key={showtime.maLichChieu} value={showtime.maLichChieu} className="font-bold">
                        {moment(showtime.ngayChieuGioChieu).format("DD/MM/YYYY - HH:ss")}
                      </Select.Option>
                    ))}
                </Select>
              </div>
              <div className="lg:w-1/12 max-h-full text-left">
                <Button
                  size="small"
                  className="bg-orange-500 w-full lg:py-5 flex items-center text-white rounded-md font-bold border-orange-600 hover:border-orange-700 hover:bg-orange-700"
                  onClick={() => showtime && navigate(`/purchase/${showtime}`)}
                >
                  Mua vé
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-bold text-md m-0 lg:m-1">Tìm kiếm phim</p>
            <Input.Search
              onSearch={handleSearch}
              onPressEnter={(e) => {
                setMarkPage(currentPage);
                if (e.target.value) {
                  dispatch(getMovieListPagination({ keyword: e.target.value }));
                } else {
                  dispatch(getMovieListPagination({ page: markPage }));
                }
              }}
              allowClear
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickTicket;
