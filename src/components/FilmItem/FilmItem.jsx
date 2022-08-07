import React from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CardLoading from "components/Loading/CardLoading";

import styles from "./FilmItem.module.css";

const FilmItem = ({ movie, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <CardLoading />;
  }

  return (
    <div
      className={`${styles["card"]} flex flex-col rounded-md justify-between bg-white overflow-hidden border-r-blue-700 min-h-full h-80 relative shadow-xl transition-all duration-500`}
    >
      <div className={`${styles["card-img"]} overflow-hidden w-full h-3/5`}>
        <Link to={`/detail/${movie.maPhim}`}>
          <img
            className="transition-all duration-500 w-full h-full hover:cursor-pointer"
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            title={`Tới trang chi tiết phim`}
          />
        </Link>
      </div>
      <div className="card-body flex flex-col grow">
        <div className="card-heading flex flex-col justify-between p-2 grow">
          <div className="flex items-start ">
            <p className="p-0.5 m-0 bg-orange-600 mr-1 rounded-tl-lg rounded-br-lg">{movie.maPhim}</p>
            <h4 className="text-md text-slate-900 uppercase">{movie.tenPhim}</h4>
          </div>
          <p className="truncate m-0 ">{movie.moTa}</p>
        </div>
        <div className="card-button">
          <Link to={`/detail/${movie.maPhim}`}>
            <Button
              className="bg-orange-600 py-5 rounded-md font-bold flex items-center justify-center hover:text-black border-orange-600 hover:bg-orange-700"
              type="primary"
              block
            >
              Đặt vé
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilmItem;
