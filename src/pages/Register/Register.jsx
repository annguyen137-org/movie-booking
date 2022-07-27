import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Button, Input, Form, Checkbox, Statistic } from "antd";
import { register } from "redux/slices/authSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, useController } from "react-hook-form";

const Register = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isRegisterLoading, isRegisterSuccess, error } = useSelector((state) => {
    return state.auth;
  });

  const registationSchema = yup.object().shape({
    taiKhoan: yup.string().required("Tài khoản không được trống!").default(""),
    matKhau: yup
      .string()
      .required("Mật khẩu không được trống!")
      .default("")
      .min(6, "Mật khẩu ít nhất 6 ký tự")
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/, "Mật khẩu yếu!"),
    confirmPassword: yup
      .string()
      .required("Vui lòng xác nhận lại mật khẩu!")
      .default("")
      .oneOf([yup.ref("matKhau")], "Mật khẩu không khớp"),
    email: yup.string().email("Email không đúng định dạng").required("Email không được trống!").default(""),
    soDt: yup
      .string()
      .required("Số DT không được trống")
      .matches(/^[0-9]+$/, "Số DT không đúng định dạng")
      .default(""),
    hoTen: yup
      .string()
      .required("Họ tên không được trống")
      .matches(
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
        "Tên chỉ gồm ký tự từ a->z"
      )
      .default(""),
    acceptTerms: yup
      .boolean()
      .required("Vui lòng chấp nhận điều khoản dịch vụ!")
      .oneOf([true], "Vui lòng chấp nhận điều khoản dịch vụ!")
      .default(false),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid },
    reset,
    getFieldState,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(registationSchema),
  });

  const onSubmit = (values) => {
    dispatch(register(values));
    if (isValid) {
      reset();
    }

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  if (Object.keys(currentUser).length) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-slate-300 min-h-full">
      <div className="w-full mx-auto md:w-2/3 lg:w-1/3">
        <div className="flex flex-col px-10 rounded-md bg-white dark:text-gray-100">
          <div className="text-center">
            <h1 className="my-3 text-4xl font-bold">Đăng ký</h1>
            <p className="text-sm dark:text-gray-400">...</p>
          </div>
          <Form autoComplete="off" onFinish={handleSubmit(onSubmit)} layout="vertical">
            <Form.Item
              label="Tài khoản"
              required
              hasFeedback
              validateStatus={errors.taiKhoan ? "error" : getFieldState("taiKhoan").invalid ? "success" : ""}
              help={errors.taiKhoan?.message}
            >
              <Controller
                control={control}
                name="taiKhoan"
                render={({ field }) => <Input {...field} className="w-full px-3 py-2 border rounded-md" placeholder="Enter Username" />}
              />
            </Form.Item>
            <Form.Item label="Mật khẩu" required hasFeedback validateStatus={errors.matKhau ? "error" : ""} help={errors.matKhau?.message}>
              <Controller
                control={control}
                name="matKhau"
                render={({ field }) => (
                  <Input.Password {...field} className="w-full px-3 py-2 border rounded-md" placeholder="Enter Password" />
                )}
              />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu"
              required
              hasFeedback
              validateStatus={errors.confirmPassword ? "error" : ""}
              help={errors.confirmPassword?.message}
            >
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <Input.Password className="w-full px-3 py-2 border rounded-md" placeholder="Enter Password" {...field} />
                )}
              />
            </Form.Item>
            <Form.Item label="Email" required hasFeedback validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input autoComplete="email" className="w-full px-3 py-2 border rounded-md" placeholder="Enter Password" {...field} />
                )}
              />
            </Form.Item>
            <Form.Item label="Số ĐT" required hasFeedback validateStatus={errors.soDt ? "error" : ""} help={errors.soDt?.message}>
              <Controller
                control={control}
                name="soDt"
                render={({ field }) => <Input className="w-full px-3 py-2 border rounded-md" placeholder="Enter Password" {...field} />}
              />
            </Form.Item>
            <Form.Item label="Họ Tên" required hasFeedback validateStatus={errors.hoTen ? "error" : ""} help={errors.hoTen?.message}>
              <Controller
                control={control}
                name="hoTen"
                render={({ field }) => <Input className="w-full px-3 py-2 border rounded-md" placeholder="Enter Password" {...field} />}
              />
            </Form.Item>
            <Form.Item required hasFeedback>
              <Controller
                control={control}
                name="acceptTerms"
                render={({ field: { name, onChange, ref } }) => (
                  <Checkbox name={name} onChange={onChange} ref={ref} className="mt-3">
                    <p className={errors.acceptTerms && "text-red-500"}>Chấp nhận các điều khoản</p>
                  </Checkbox>
                )}
              />
            </Form.Item>
            {isRegisterLoading && (
              <div className="flex justify-center">
                <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin dark:border-orange-600"></div>
              </div>
            )}
            {isRegisterSuccess && isSubmitSuccessful && (
              <p className="text-blue-400">
                Đăng ký thành công! Tự động chuyển sang trang đăng nhập sau{" "}
                {
                  <span>
                    <Statistic.Countdown style={{ display: "inline-block", padding: "0 5px" }} format="ss" value={Date.now() + 1000 * 5} />
                  </span>
                }
                s
              </p>
            )}

            <div className="pt-5">
              <Button
                disabled={!isValid}
                htmlType="submit"
                className="w-full px-8 flex justify-center items-center py-6 font-semibold rounded-md bg-orange-600 text-white transition-colors border-orange-600 hover:bg-orange-700"
              >
                Đăng ký ngay!
              </Button>

              <p className="mt-3 px-6 text-sm text-center dark:text-gray-400">
                Đã có tài khoản?
                <NavLink to="/login" className="ml-1 hover:underline text-orange-600">
                  Đăng nhập
                </NavLink>
                .
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
