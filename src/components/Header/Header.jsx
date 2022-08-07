import React, { useEffect, useRef } from "react";
import { Button, Layout, Dropdown, Space, Menu } from "antd";
import { UserOutlined, LogoutOutlined, RightSquareOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { moviesRef } from "../../pages/Home/MovieShowing/MovieShowing";
import { theatersRef } from "../../pages/Home/TheaterTabs/TheaterTabs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/slices/authSlice";
import { resetAccountReducer } from "redux/slices/accountSlice";
import { resetTicketsReducer } from "redux/slices/ticketsSlice";
import { resetAdminReducer } from "redux/slices/adminSlice";

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
          <img src="../icon-tixjpg.jpg" width={30} alt="logo" />
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
            <div title="Tài khoản">
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu
                    theme="light"
                    className="mt-4 border border-slate-400 shadow-xl"
                    items={[
                      {
                        key: "1",

                        className: "font-bold text-lg",
                        label: currentUser.taiKhoan,
                      },
                      {
                        key: "2",
                        label: (
                          <Link to={currentUser.maLoaiNguoiDung === "KhachHang" ? "/user/profile" : "/admin/profile"}>
                            Trang cá nhân
                          </Link>
                        ),
                        icon: <RightSquareOutlined />,
                      },
                      {
                        key: "3",
                        label: (
                          <Button
                            onClick={() => {
                              dispatch(logout());
                              dispatch(resetAccountReducer());
                              dispatch(resetTicketsReducer());
                              dispatch(resetAdminReducer());
                            }}
                          >
                            Đăng xuất
                          </Button>
                        ),
                      },
                    ]}
                  />
                }
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <UserOutlined className="p-3 rounded-full border-2 bg-slate-300 text-black hover:border-slate-500 transition-colors duration-500" />
                  </Space>
                </a>
              </Dropdown>
              {/* <p className="m-0 p-2 bg-orange-200 rounded-md hover:cursor-pointer">{currentUser.taiKhoan}</p> */}
            </div>
            <Button
              title="Đăng xuất"
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

        <Button className="md:hidden border-orange-600 hover:text-orange-600 text-orange-600 focus:text-orange-600">
          =
        </Button>
      </div>
    </Layout.Header>
  );
};

export default Header;
