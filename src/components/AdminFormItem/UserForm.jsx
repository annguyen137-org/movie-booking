import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Select,
  Switch,
  TimePicker,
  Upload,
} from "antd";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GROUPID } from "services/axiosClient";
import { useDispatch } from "react-redux";

const UserForm = ({ editFilm }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState({});
  const [imgSrc, setImgSrc] = useState(editFilm?.hinhAnh ?? "");

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imgSrc);
    };
  }, [imgSrc]);

  useEffect(() => {
    return () => {
      notification.destroy();
    };
  }, []);

  const filmItemSchema = yup.object().shape({
    tenPhim: yup
      .string()
      .required("Tên phim không được trống")
      .default(editFilm?.tenPhim ?? ""),
    trailer: yup
      .string()
      .required("Nhập link trailer")
      .default(editFilm?.trailer ?? ""),
    moTa: yup
      .string()
      .required("Nhập mô tả")
      .default(editFilm?.moTa ?? ""),
    maNhom: yup.string().required().default(GROUPID),
    ngayKhoiChieu: yup
      .string()
      .required("Chọn ngày khởi chiếu")
      .default(editFilm?.ngayKhoiChieu ?? ""),
    sapChieu: yup
      .boolean()
      .required()
      .default(editFilm?.sapChieu ?? false),
    dangChieu: yup
      .boolean()
      .required()
      .default(editFilm?.dangChieu ?? false),
    Hot: yup
      .boolean()
      .required()
      .default(editFilm?.Hot ?? false),
    danhGia: yup
      .number()
      .required("Nhập số ★ đánh giá")
      .min(1)
      .max(10)
      .default(editFilm?.danhGia ?? 1),
    hinhAnh: yup.mixed().test("Hình không được trống", "Chọn hình", (file) => {
      return file && file.length;
    }),
  });

  const {
    register,
    control,
    handleSubmit,
    clearErrors,
    resetField,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(filmItemSchema),
    defaultValues: {
      tenPhim: editFilm?.tenPhim ?? "",
      trailer: editFilm?.trailer ?? "",
      moTa: editFilm?.moTa ?? "",
      maNhom: GROUPID,
      ngayKhoiChieu: editFilm?.ngayKhoiChieu ?? "",
      sapChieu: editFilm?.sapChieu ?? false,
      dangChieu: editFilm?.dangChieu ?? false,
      Hot: editFilm?.Hot ?? false,
      danhGia: editFilm?.danhGia ?? 1,
      hinhAnh: editFilm?.danhGia ?? {},
    },
  });

  const onSubmit = (values) => {
    // console.log(moment(new Date(values.ngayKhoiChieu)).format("DD/MM/YYYY"));
    let formData = new FormData();

    for (let key in values) {
      if (key !== "hinhAnh") {
        if (key === "ngayKhoiChieu") {
          formData.append(key, moment(new Date(values.key)).format("DD/MM/YYYY"));
        }
        formData.append(key, values[key]);
      } else {
        formData.append("File", values.hinhAnh[0], values.hinhAnh[0].name);
      }
    }

    // console.log(formData.get("File"));
  };
  const onError = () => {
    notification["error"]({ message: "Thêm phim thất bại", description: "Kiểm tra lại các trường thông tin" });
  };

  return (
    <>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"
        className="border rounded-md py-5 bg-white"
        onFinish={handleSubmit(onSubmit, onError)}
      >
        <div className="flex w-full">
          <div className="w-2/3">
            <Form.Item
              label="Tên phim"
              required
              hasFeedback
              validateStatus={errors.tenPhim ? "error" : isValid ? "success" : ""}
              help={errors.tenPhim?.message}
            >
              <Controller
                control={control}
                name="tenPhim"
                defaultValue={editFilm?.tenPhim ?? ""}
                render={({ field }) => <Input {...field} placeholder="Nhập tên phim" allowClear />}
              />
            </Form.Item>
            <Form.Item
              label="Trailer"
              required
              hasFeedback
              validateStatus={errors.trailer ? "error" : isValid ? "success" : ""}
              help={errors.trailer?.message}
            >
              <Controller
                control={control}
                name="trailer"
                defaultValue={editFilm?.trailer ?? ""}
                render={({ field }) => <Input {...field} allowClear />}
              />
            </Form.Item>
            <Form.Item
              label="Mô tả phim"
              required
              hasFeedback
              validateStatus={errors.moTa ? "error" : isValid ? "success" : ""}
              help={errors.moTa?.message}
            >
              <Controller control={control} name="moTa" render={({ field }) => <Input {...field} allowClear />} />
            </Form.Item>
            <Form.Item
              label="Ngày khởi chiếu"
              required
              hasFeedback
              validateStatus={errors.ngayKhoiChieu ? "error" : isValid ? "success" : ""}
              help={errors.ngayKhoiChieu?.message}
            >
              <Controller
                control={control}
                name="ngayKhoiChieu"
                defaultValue={editFilm?.ngayKhoiChieu ?? ""}
                render={({ field }) => <DatePicker {...field} format={"DD/MM/YYYY"} allowClear />}
              />
            </Form.Item>

            <Form.Item
              label="Đang chiếu"
              valuePropName="checked"
              validateStatus={errors.dangChieu ? "error" : ""}
              help={errors.dangChieu?.message}
            >
              <Controller
                control={control}
                name="dangChieu"
                defaultValue={editFilm?.dangChieu ?? false}
                render={({ field }) => <Switch onChange={field.onChange} checked={field.value} />}
              />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
              <Controller
                control={control}
                name="sapChieu"
                defaultValue={editFilm?.sapChieu ?? false}
                render={({ field }) => <Switch onChange={field.onChange} checked={field.value} />}
              />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
              <Controller
                control={control}
                name="Hot"
                defaultValue={editFilm?.Hot ?? false}
                render={({ field }) => <Switch onChange={field.onChange} checked={field.value} />}
              />
            </Form.Item>
            <Form.Item label="★ Đánh giá">
              <Controller
                control={control}
                name="danhGia"
                defaultValue={editFilm?.danhGia ?? 1}
                render={({ field }) => <InputNumber {...field} max={10} min={1} defaultValue={1} />}
              />
            </Form.Item>

            <Form.Item
              label="Hình phim"
              required
              hasFeedback
              validateStatus={errors.hinhAnh ? "error" : isValid ? "success" : ""}
              help={errors.hinhAnh?.message}
            >
              <div className="flex items-center">
                <input
                  name="hinhAnh"
                  {...register("hinhAnh", {
                    onChange: (e) => {
                      clearErrors("hinhAnh");
                      if (e.target.files.length !== 0) {
                        // console.log(e.target.files);
                        let uploadFile = e.target.files[0];
                        let preview = URL.createObjectURL(uploadFile);
                        setImgSrc(preview);
                        setFile(uploadFile);
                      } else {
                        setImgSrc("");
                        setFile({});
                      }
                    },
                  })}
                  type="file"
                />
                <Button
                  size="small"
                  type="danger"
                  onClick={() => {
                    setImgSrc("");
                    setFile({});
                    resetField("hinhAnh");
                  }}
                >
                  Xóa
                </Button>
              </div>
            </Form.Item>
          </div>
          <div className="w-1/3 px-10">
            {editFilm?.hinhAnh ?? imgSrc ? (
              <div>
                <p>Hình phim</p>
                <img src={imgSrc} alt="hinh-phim" className="w-full h-80" />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <Form.Item className="mx-20 mt-5">
          <Button type="primary" htmlType="submit">
            Thêm phim
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserForm;
