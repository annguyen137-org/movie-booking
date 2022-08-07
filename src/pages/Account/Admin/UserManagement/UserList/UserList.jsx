import React, { useEffect, useState } from "react";
import { notification, Table, Input } from "antd";
import { EditFilled, DeleteFilled, SettingFilled } from "@ant-design/icons";
import PageLoading from "components/Loading/PageLoading";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserList, deleteUser, resetAdminActionStatus } from "redux/slices/adminSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const { userList, isLoading, actionSuccess, actionResponeAPI, error } = useSelector((state) => state.admin);

  // pass state(currenpage at user-list, exp page 5) via location when user hit edit edit-user
  // receive this state at edit-user page. if update success -> redirect back to previous page (exp page5)
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(location?.state ?? 1);

  const handleSearch = (value) => {
    if (value) {
      dispatch(getUserList(value));
    } else {
      dispatch(getUserList());
    }
  };

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  useEffect(() => {
    if (actionSuccess === true && typeof actionResponeAPI === "string") {
      notification["info"]({ message: "Xóa user thành công", duration: 1.5 });
      dispatch(resetAdminActionStatus());
      dispatch(getUserList());
    }
    if (actionSuccess === false) {
      notification["error"]({ message: "Xóa user không thành công", duration: 1.5, description: error });
      dispatch(resetAdminActionStatus());
      dispatch(getUserList());
    }
  }, [actionSuccess, actionResponeAPI]);

  const columns = [
    {
      title: "Tài khoản",
      key: "taiKhoan",
      dataIndex: "taiKhoan",
      align: "left",
      width: 200,
      render: (_, { taiKhoan }) => <span className="font-bold">{taiKhoan}</span>,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      align: "left",
      width: 200,
      render: (_, { email }) => <span className="font-bold">{email}</span>,
    },
    {
      title: "Số DT",
      dataIndex: "soDT",
      key: "soDT",
      align: "left",
      width: 150,
      render: (_, { soDT }) => <span className="font-bold">{soDT}</span>,
    },
    {
      title: "Role",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      align: "left",
      width: 150,

      render: (_, { maLoaiNguoiDung }) => (
        <span className={`p-1 rounded-md font-bold ${maLoaiNguoiDung === "QuanTri" ? "bg-red-500" : "bg-green-500"}`}>
          {maLoaiNguoiDung === "QuanTri" ? "Quản Trị" : "Khách Hàng"}
        </span>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      align: "left",
      key: "hoTen",
      width: 200,
      responsive: ["md"],
      render: (_, { hoTen }) => <span className="font-bold">{hoTen}</span>,
    },

    {
      title: <SettingFilled title="Setting" />,
      dataIndex: "actions",
      key: "actions",
      align: "center",
      width: 100,
      render: (_, { taiKhoan }) => {
        return (
          <div className="justify-center flex flex-col md:flex-row items-center">
            <EditFilled
              title="Sửa user"
              className="text-lg hover:scale-125 transition-all hover:text-blue-500 hover:cursor-pointer mx-2"
              onClick={() => navigate(`/admin/user-management/edit-user/${taiKhoan}`, { state: currentPage })}
            />
            <DeleteFilled
              className="text-lg hover:scale-125 transition-all hover:text-red-500 hover:cursor-pointer mx-2"
              title="Xóa user"
              onClick={() => dispatch(deleteUser(taiKhoan))}
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
        <div className="my-3 text-black flex justify-end">
          <Input.Search
            placeholder="Tìm kiếm user"
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
          rowKey={"taiKhoan"}
          columns={columns}
          dataSource={userList}
          bordered
          pagination={{
            current: currentPage,
            position: "bottom",
            defaultPageSize: 20,
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

export default UserList;
