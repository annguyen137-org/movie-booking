import React, { useEffect, useRef, useState } from "react";
import { Button, Select } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import movieAPI from "services/movieAPI";
import theaterAPI from "services/theaterAPI";

const QuickTicket = () => {
  
  const navigate = useNavigate();

  const [currentBranch, setCurrentBranch] = useState({});
  const [showtime, setShowtime] = useState("");

  const [quickBuyState, setQuickBuyState] = useState({
    movieList: [],
    theaterBrands: [],
  });

  const handleSelectMovie = async (value) => {
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

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await movieAPI.getMovieList();
      setQuickBuyState({ ...quickBuyState, movieList: [...data] });
    };
    fetchMovie();
  }, []);

  return (
    <div className="container mx-auto text-center px-5 md:px-10 lg:px-40 mb-5 -mt-5 z-30 relative">
      <div className="shadow-lg border border-slate-200 w-full p-1 lg:pt-3 lg:pb-5 px-2 bg-white rounded-lg">
        <p className="font-bold text-lg m-0 lg:m-1">Mua vé nhanh</p>
        <div className="flex flex-col lg:flex-row w-full">
          <div className="lg:w-4/12 text-left">
            <Select
              className="w-full border-2 border-slate-400 rounded-md lg:rounded-l-md"
              defaultValue={"Phim"}
              showSearch
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              size={window.innerWidth > 1024 ? "large" : "middle"}
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
          <div className="lg:w-4/12 text-left">
            <Select
              className="w-full border-2 border-slate-400 rounded-md lg:rounded-none"
              size={window.innerWidth > 1024 ? "large" : "middle"}
              defaultValue={"Rạp"}
              onSelect={handleSelectBranch}
            >
              <Select.Option disabled value="Rạp">
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
          <div className="lg:w-3/12 text-left">
            <Select
              className="w-full border-2 border-slate-400 rounded-md lg:rounded-r-md"
              size={window.innerWidth > 1024 ? "large" : "middle"}
              defaultValue={"Lịch chiếu"}
              onSelect={handleSelectShowtime}
            >
              <Select.Option disabled value="Lịch chiếu">
                Lịch chiếu
              </Select.Option>
              {currentBranch.lichChieuPhim?.length &&
                currentBranch.lichChieuPhim?.map((showtime) => (
                  <Select.Option key={showtime.maLichChieu} value={showtime.maLichChieu} className="font-bold">
                    {moment(showtime.ngayChieuGioChieu).format("DD/MM/YYYY - HH:ss")}
                  </Select.Option>
                ))}
            </Select>
          </div>
          <div className="w-1/12 text-left mt-3 lg:mt-0">
            <Button
              size="small"
              className="bg-orange-500 lg:py-5 flex items-center text-white rounded-md font-bold hover:text-black border-orange-600 hover:border-orange-700 hover:bg-orange-700"
              onClick={() => navigate(`/purchase/${showtime}`)}
            >
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickTicket;
