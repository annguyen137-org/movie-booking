import axiosClient, { GROUPID } from "./axiosClient";

const theaterAPI = {
  getTheatersBrandWithShowtime: () => {
    return axiosClient.get("/QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maNhom: GROUPID,
      },
    });
  },

  getTheaterBrands: () => {
    return axiosClient.get("QuanLyRap/LayThongTinHeThongRap");
  },

  getTheaterBranchByBrand: (brandId) => {
    return axiosClient.get("QuanLyRap/LayThongTinCumRapTheoHeThong", { params: { maHeThongRap: brandId } });
  },
};

export default theaterAPI;
