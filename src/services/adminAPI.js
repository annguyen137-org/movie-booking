import axiosClient, { GROUPID } from "./axiosClient";

const adminAPI = {
  getMovieList: (keyword = "") => {
    if (keyword !== "") {
      return axiosClient.get("QuanLyPhim/LayDanhSachPhim", { params: { maNhom: GROUPID, tenPhim: keyword } });
    }
    return axiosClient.get("QuanLyPhim/LayDanhSachPhim", { params: { maNhom: GROUPID } });
  },

  addMovie: (FormData) => {
    return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", FormData);
  },

  fecthEditMovieData: (movieId) => {
    return axiosClient.get("QuanLyPhim/LayThongTinPhim", { params: { maPhim: movieId } });
  },

  updateMovie: (FormData) => {
    return axiosClient.post("QuanLyPhim/CapNhatPhimUpload", FormData);
  },

  deleteMovie: (movieId) => {
    return axiosClient.delete("QuanLyPhim/XoaPhim", { params: { maPhim: movieId } });
  },
};

export default adminAPI;
