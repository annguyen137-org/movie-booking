import axiosClient, { GROUPID } from "./axiosClient";

const theaterAPI = {
  getTheatersBrand: () => {
    return axiosClient.get("/QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maNhom: GROUPID,
      },
    });
  },
};

export default theaterAPI;
