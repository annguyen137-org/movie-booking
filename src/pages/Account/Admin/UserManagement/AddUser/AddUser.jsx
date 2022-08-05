import UserForm from "components/AdminFormItem/UserForm";
import React from "react";

const AddUser = () => {
  return (
    <div className="w-full h-full py-5">
      <span className="text-lg p-2 rounded-md bg-orange-300 font-bold">Thêm phim:</span>
      <div className="mt-5">
        <UserForm />
      </div>
    </div>
  );
};

export default AddUser;
