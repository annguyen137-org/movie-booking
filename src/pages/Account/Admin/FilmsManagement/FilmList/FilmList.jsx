import React, { useEffect } from "react";
import { notification, Table } from "antd";
import { EditFilled, DeleteFilled, SettingFilled, DiffFilled } from "@ant-design/icons";
import PageLoading from "components/Loading/PageLoading";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMovieList, deleteMovie, resetAdminActionStatus } from "redux/slices/adminSlice";

const FilmList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieList, isLoading, actionSuccess, actionResponeAPI, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getMovieList());
  }, []);

  useEffect(() => {
    if (actionSuccess && typeof actionResponeAPI === "string") {
      notification["info"]({ message: "Xóa phim thành công", duration: 2 });
      dispatch(resetAdminActionStatus());
      dispatch(getMovieList());
    }
  }, [actionSuccess, actionResponeAPI]);

  const columns = [
    {
      title: "Mã Phim",
      key: "maPhim",
      dataIndex: "maPhim",
      align: "left",
      width: 80,
    },
    {
      title: "Tên phim",
      key: "tenPhim",
      dataIndex: "tenPhim",
      align: "left",
      width: 150,
      render: (tenPhim) => <span className="font-bold">{tenPhim}</span>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      align: "left",
      key: "hinhAnh",
      width: 150,
      render: (_, { tenPhim, hinhAnh }) => <img src={hinhAnh} alt={tenPhim} title={tenPhim} width={150} />,
    },
    {
      title: "Ngày khởi chiếu",
      key: "ngayKhoiChieu",
      dataIndex: "ngayKhoiChieu",
      align: "left",
      width: 150,
      render: (_, { ngayKhoiChieu }) => {
        return (
          <>
            <span className="font-bold bg-green-300 rounded-md p-1">
              {ngayKhoiChieu.split("T")[0].split("-").reverse().join("-")}
            </span>
            <span className="p-1 bg-orange-300 rounded-md font-bold m-0">
              {ngayKhoiChieu.split("T")[1].split("-").reverse().join("-").slice(0, 5)}
            </span>
          </>
        );
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "danhGia",
      align: "left",
      key: "danhGia",
      width: 80,
      render: (_, { danhGia }) => <span>{danhGia}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      align: "left",
      key: "moTa",
      width: 400,
      render: (_, { moTa }) => (
        <div className="w-full">
          <p className="max-w-full">{moTa}</p>
        </div>
      ),
    },

    {
      title: <SettingFilled title="Setting" />,
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (_, { maPhim }) => {
        return (
          <div className="justify-between flex items-center">
            <EditFilled
              title="Sửa phim"
              className="text-lg hover:scale-125 transition-all hover:text-blue-500 hover:cursor-pointer"
              onClick={() => navigate(`/admin/films/edit-film/${maPhim}`)}
            />
            <DeleteFilled
              className="text-lg hover:scale-125 transition-all hover:text-red-500 hover:cursor-pointer"
              title="Xóa phim"
              onClick={() => dispatch(deleteMovie(maPhim))}
            />
            <DiffFilled
              title="Thêm lịch chiếu"
              className="text-lg hover:scale-125 transition-all hover:text-green-500 hover:cursor-pointer"
              onClick={() => navigate(`/admin/films/add-showtime/${maPhim}`)}
            />
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
          rowKey={"maPhim"}
          columns={columns}
          dataSource={movieList}
          bordered
          pagination={{
            position: "bottom",
            defaultPageSize: 5,
            showSizeChanger: false,
            showQuickJumper: true,
            onChange: () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
          }}
        />
      </div>
    </div>
  );
};

export default FilmList;
