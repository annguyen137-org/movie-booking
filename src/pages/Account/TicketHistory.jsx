import React from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import PageLoading from "components/Loading/PageLoading";

import { currencyVNDFormat } from "utils/currencyFormat";

const TicketHistory = () => {
  const { bookedTickets, isLoading } = useSelector((state) => state.account);

  const columns = [
    {
      title: "Mã vé",
      key: "maVe",
      dataIndex: "maVe",
      align: "left",
      width: 80,
    },
    {
      title: "Tên phim",
      key: "tenPhim",
      dataIndex: "tenPhim",
      width: 100,
      render: (_, { tenPhim }) => <span className="font-bold">{tenPhim}</span>,
    },
    {
      title: "Ngày đặt",
      key: "ngayDat",
      dataIndex: "ngayDat",
      width: 100,
      render: (_, { ngayDat }) => {
        return (
          <>
            <p className="font-bold bg-green-300 rounded-md p-1">
              {ngayDat.split("T")[0].split("-").reverse().join("-")}
            </p>
            <p className="p-1 bg-orange-300 rounded-md font-bold m-0">
              {ngayDat.split("T")[1].split("-").reverse().join("-").slice(0, 5)}
            </p>
          </>
        );
      },
    },
    {
      title: "Giá vé",
      dataIndex: "giaVe",
      key: "giaVe",
      width: 80,
      render: (_, { giaVe }) => <span>{currencyVNDFormat.format(giaVe)} vnd</span>,
    },
    {
      title: "Thời lượng",
      dataIndex: "thoiLuongPhim",
      key: "thoiLuongPhim",
      width: 80,
      render: (_, { thoiLuongPhim }) => <span>{thoiLuongPhim} phút</span>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: 150,
      render: (_, { hinhAnh, tenPhim }) => <img src={hinhAnh} alt={tenPhim} title={tenPhim} />,
    },
    {
      title: "Danh sách ghế (theo hệ thống rạp)",
      dataIndex: "danhSachGhe",
      key: "danhSachGhe",

      render: (_, { danhSachGhe }) => {
        return (
          <div>
            <div className="bg-slate-300 m-1 rounded-md p-1 flex justify-around items-center">
              <span className="m-0 text-lg font-bold text-black">{danhSachGhe[0].maHeThongRap}</span>
              <span className="m-0 text-green-600 font-semibold">{danhSachGhe[0].tenHeThongRap}</span>
              <span className="m-0 text-red-600 font-semibold">{danhSachGhe[0].tenCumRap}</span>
            </div>
            <div>
              <p className="m-0 font-bold mx-1">Ghế: </p>
              {danhSachGhe.map((seat, index) => (
                <span
                  key={index}
                  className="p-1 w-10 text-center bg-orange-500 m-1 inline-block text-black font-semibold rounded-md"
                >
                  {seat.tenGhe}
                </span>
              ))}
            </div>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <PageLoading classname={"min-h-full"} />;
  }

  return (
    <div className="w-full h-full text-gray-100">
      <div className="h-full max-h-full">
        <Table
          size="middle"
          rowKey={"maVe"}
          dataSource={bookedTickets}
          columns={columns}
          bordered
          pagination={{
            position: "bottom",
            pageSize: 5,
            onChange: () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
          }}
          // scroll={{ scrollToFirstRowOnChange: true, y: 500 }}
        />
      </div>
    </div>
  );
};

export default TicketHistory;
