import React, { useEffect, useState } from "react";
import { notification, Table, Input } from "antd";
import { EditFilled, DeleteFilled, SettingFilled, DiffFilled } from "@ant-design/icons";
import PageLoading from "components/Loading/PageLoading";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getMovieList, deleteMovie, resetAdminActionStatus } from "redux/slices/adminSlice";

const FilmList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const { movieList, isLoading, actionSuccess, actionResponeAPI, error } = useSelector((state) => state.admin);

  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(location?.state ?? 1);

  const handleSearch = (value) => {
    if (value) {
      dispatch(getMovieList(value));
    } else {
      dispatch(getMovieList());
    }
  };

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
      responsive: ["md"],
      render: (_, { ngayKhoiChieu }) => {
        return (
          <>
            <span className="md:font-bold md:bg-green-300 rounded-md p-1">
              {ngayKhoiChieu.split("T")[0].split("-").reverse().join("-")}
            </span>
            <span className="p-1 bg-orange-300 rounded-md hidden md:block md:font-bold m-0">
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
      responsive: ["md"],
      render: (_, { danhGia }) => <span>{danhGia}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      align: "left",
      key: "moTa",
      width: 400,
      responsive: ["md"],
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
      width: 50,
      render: (_, { maPhim }) => {
        return (
          <div className="justify-between flex flex-col md:flex-row items-center">
            <EditFilled
              title="Sửa phim"
              className="text-lg hover:scale-125 transition-all hover:text-blue-500 hover:cursor-pointer mx-1"
              onClick={() => navigate(`/admin/films/edit-film/${maPhim}`, { state: currentPage })}
            />
            <DeleteFilled
              className="text-lg hover:scale-125 transition-all hover:text-red-500 hover:cursor-pointer mx-1"
              title="Xóa phim"
              onClick={() => dispatch(deleteMovie(maPhim))}
            />
            <DiffFilled
              title="Thêm lịch chiếu"
              className="text-lg hover:scale-125 transition-all hover:text-green-500 hover:cursor-pointer mx-1"
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

  // console.log(location);

  return (
    <div className="w-full h-full text-gray-100">
      <div className="h-full max-h-full">
        <div className="my-3 text-black flex justify-end">
          <Input.Search
            placeholder="Tìm kiếm phim"
            allowClear={true}
            value={keyword}
            style={{ width: "50%" }}
            onPressEnter={(e) => handleSearch(e.target.value)}
            enterButton
            onChange={(e) => setKeyword(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
        <Table
          size="middle"
          rowKey={"maPhim"}
          columns={columns}
          dataSource={movieList}
          bordered
          pagination={{
            current: currentPage,
            position: "bottom",
            defaultPageSize: 5,
            showSizeChanger: false,
            showQuickJumper: true,
            onChange: (page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
          }}
        />
      </div>
    </div>
  );
};

export default FilmList;
