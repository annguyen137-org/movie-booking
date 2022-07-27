import React, { useEffect, useRef } from "react";
import { Button, Layout } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

import { moviesRef } from "../../pages/Home/MovieShowing/MovieShowing";
import { theatersRef } from "../../pages/Home/TheaterTabs/TheaterTabs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => {
    return state.auth;
  });

  return (
    <Layout.Header className="fixed top-0 w-full z-50 bg-white shadow-sm shadow-slate-400">
      <div className="container h-full w-full flex justify-between items-center p-4 text-lg">
        <NavLink
          to="/"
          onClick={() => {
            window.scrollTo({ behavior: "smooth", top: 0 });
          }}
        >
          <img src="icon-tixjpg.jpg" width={30} alt="logo" />
        </NavLink>
        <ul className="m-0 hidden lg:flex text-orange-600">
          <li>
            <NavLink
              to="/"
              className=" px-4 hover:text-orange-600 text-black -mb-1 border-b-2 dark:border-transparent"
              onClick={() => {
                moviesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Lịch chiếu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="px-4 hover:text-orange-600 text-black border-b-2 dark:border-transparent"
              onClick={() => {
                theatersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Cụm Rạp
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="px-4 hover:text-orange-600 text-black border-b-2 dark:border-transparent">
              Tin Tức
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="px-4 hover:text-orange-600 text-black border-b-2 dark:border-transparent">
              Ứng dụng
            </NavLink>
          </li>
        </ul>
        {Object.keys(currentUser).length ? (
          <div className="items-center hidden flex-shrink-0 md:flex">
            <div>
              <p className="m-0 p-2 bg-orange-200 rounded-md hover:cursor-pointer">{currentUser.taiKhoan}</p>
            </div>
            <Button
              className="flex items-center border-orange-600 hover:bg-orange-600 hover:text-white mx-1 text-lg rounded-md focus:text-orange-600"
              onClick={() => dispatch(logout())}
            >
              <LogoutOutlined />
            </Button>
          </div>
        ) : (
          <div className="items-center hidden flex-shrink-0 md:flex">
            <Button
              className="flex items-center bg-orange-50 border-orange-600 hover:text-orange-600 mx-1 text-lg rounded-md focus:text-orange-600"
              onClick={() => navigate("/login")}
            >
              <UserOutlined />
              Đăng nhập
            </Button>
            <Button
              className="flex items-center bg-orange-50 border-orange-600 hover:text-orange-600 mx-1 text-lg rounded-md focus:text-orange-600"
              onClick={() => navigate("/register")}
            >
              <UserOutlined />
              Đăng ký
            </Button>
          </div>
        )}

        <Button className="md:hidden border-orange-600 hover:text-orange-600 text-orange-600 focus:text-orange-600">=</Button>
      </div>
    </Layout.Header>
  );
};

export default Header;
