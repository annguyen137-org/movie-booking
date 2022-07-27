import React from "react";
import { Carousel } from "antd";
import { useSelector } from "react-redux";

import styles from "./Banner.module.css";

const Banner = () => {
  const { banners } = useSelector((state) => {
    return state.movies;
  });

  return (
    <div className="movie-banner">
      <Carousel draggable dots autoplay autoplaySpeed={5000} sty>
        {banners.map((carousel) => {
          return (
            <div key={carousel.maBanner}>
              <div className={`${styles["banner-img"]} h-80`}>
                <img src={carousel.hinhAnh} alt={carousel.maPhim} className="w-full h-full object-fill" />
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
