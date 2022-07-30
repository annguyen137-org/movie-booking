import PageLoading from "components/Loading/PageLoading";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, NavLink, useParams } from "react-router-dom";
import SeatItem from "./SeatItem";

import { resetTickets, ticketsByShowtime, bookSelectedTickets } from "redux/slices/ticketsSlice";
import { Button, notification } from "antd";
import PopupModal from "components/Modal/PopupModal";
import useModalHook from "components/Modal/useModalHook";

const Purchase = () => {
  const dispatch = useDispatch();
  const { showtimeId } = useParams();

  const { visible, showModal, closeModal } = useModalHook();

  const currencyFormat = new Intl.NumberFormat("vn-VN");

  const { ticketsData, selectedSeats, isLoading, bookedSuccess, error } = useSelector((state) => {
    return state.tickets;
  });

  const { currentUser } = useSelector((state) => {
    return state.auth;
  });

  let total = selectedSeats?.reduce((total, seat, index) => {
    return total + seat.giaVe;
  }, 0);

  const handleSubmit = () => {
    if (!Object.keys(currentUser).length) {
      showModal();
    } else {
      dispatch(bookSelectedTickets(showtimeId));
    }
  };

  useEffect(() => {
    dispatch(ticketsByShowtime(showtimeId));
  }, []);

  // useEffect(() => {
  //   dispatch(resetTickets());
  // }, [showtimeId]);

  useEffect(() => {
    if (bookedSuccess) {
      notification["success"]({ message: "Đặt vé thành công", description: "Sang trang chi tiết vé đã đặt" });
    }
  }, [bookedSuccess]);

  if (isLoading) {
    return <PageLoading />;
  }
  return (
    <div className="container mx-auto my-2 w-full">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-4/5 mx-2">
          <div className="text-center bg-slate-500 text-gray-200 shadow-2xl mb-5 p-2">SCREEN</div>
          <p className="m-1">16 ghế trên 1 hàng</p>
          <div className="w-full grid grid-cols-8 lg:grid-cols-16 gap-1 lg:gap-2">
            {(ticketsData.danhSachGhe ?? []).map((seat) => {
              return <SeatItem key={seat.maGhe} seat={seat} />;
            })}
          </div>
          <div className="flex justify-around mt-5 shadow-lg">
            <div className="text-center">
              <p className="bg-red-600 px-5 py-2 border border-black my-2 rounded-md">X</p>
              <p>Đã đặt</p>
            </div>
            <div className="text-center">
              <p className="bg-orange-600 px-5 py-2 border border-black my-2 rounded-md">...</p>
              <p>Ghế vip</p>
            </div>
            <div className="text-center">
              <p className="bg-slate-300 px-5 py-2 border border-black my-2 rounded-md">...</p>
              <p>Chưa đặt</p>
            </div>
            <div className="text-center">
              <p className="bg-green-600 px-5 py-2 border border-black my-2 rounded-md">...</p>
              <p>Đang chọn</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/5 mx-1 mt-3 lg:mt-0">
          <div className="text-center border border-slate-400 shadow-lg bg-white px-2">
            <p className="text-xl border-b font-bold">Thông tin vé</p>
            <p className="text-2xl text-green-500 font-extrabold bg-orange-200 rounded-md">
              {total && currencyFormat.format(total)}
              <span className="mx-2 text-xl">VND</span>
            </p>
            <div className="flex flex-col justify-start text-left">
              <div>
                <p className=" border-slate-600 border-b  font-bold pb-1">
                  Cụm rạp: <span className="text-green-600 text-lg">{ticketsData.thongTinPhim?.tenCumRap}</span>
                </p>
                <p className=" border-slate-600 border-b font-bold pb-1">
                  Địa chỉ: <span className="text-green-600 text-md">{ticketsData.thongTinPhim?.diaChi}</span>
                </p>
                <p className=" border-slate-600 border-b  font-bold pb-1">
                  Rạp: <span className="text-green-600 text-lg bg-orange-300 rounded-md p-1">{ticketsData.thongTinPhim?.tenRap}</span>
                </p>
              </div>
              <div>
                <p className=" border-slate-600 border-b font-bold pb-1">
                  Ngày giờ chiếu:
                  <span className="text-green-600 text-lg">{ticketsData.thongTinPhim?.ngayChieu}</span> -
                  <span className="text-red-600 text-lg">{ticketsData.thongTinPhim?.gioChieu}</span>
                </p>
                <p className=" border-slate-600 border-b font-bold pb-1">
                  Tên phim: <span className="text-green-600 text-lg">{ticketsData.thongTinPhim?.tenPhim}</span>
                </p>
                <p className=" border-slate-600 border-b  font-bold pb-1">
                  Ghế chọn:
                  <span className="text-green-600 text-lg">
                    {selectedSeats
                      ?.map((ticket) => {
                        return ticket.tenGhe;
                      })
                      .join(", ")}
                  </span>
                </p>
              </div>
              <div className="my-3">
                <Button
                  disabled={!selectedSeats.length}
                  onClick={handleSubmit}
                  size="large"
                  className="bg-orange-600 w-full round-md text-black hover:text-black font-bold border-orange-600 hover:border-orange-500 hover:bg-orange-500 hover:scale-y-125"
                >
                  Đặt vé
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {}
      <PopupModal visible={visible} onCancel={closeModal}>
        {
          <div>
            <p className="text-red-500 font-bold text-2xl">Bạn chưa đăng nhập!</p>
            <p>Đăng nhập tài khoản để mua vé. Bạn có muốn đăng nhập không</p>
            <div className="flex justify-center">
              <div className="mx-5">
                <Link to="/login">
                  <Button type="primary" size="large" className="w-32">
                    Đăng nhập
                  </Button>
                </Link>
              </div>
              <div className="mx-5">
                <Button type="danger" size="large" className="w-32" onClick={closeModal}>
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        }
      </PopupModal>
    </div>
  );
};

export default Purchase;
