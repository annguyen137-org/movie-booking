import axios from "axios";
import store from "redux/store";

export const GROUPID = "GP09";

const axiosClient = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzEiLCJIZXRIYW5TdHJpbmciOiIxMS8xMi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NzA3MTY4MDAwMDAiLCJuYmYiOjE2NDU5ODEyMDAsImV4cCI6MTY3MDg2NDQwMH0.hImF3FD5ezlSpmo_fyOBeTlwLGcUfxyEeZIRIddaRFE",
  },
});

//modify data from cybersoft respone data
axiosClient.interceptors.response.use(
  (response) => {
    return response.data.content;
  },
  (error) => {
    return Promise.reject(error.response?.data.content);
  }
);

axiosClient.interceptors.request.use((config) => {
  // config là thông tin của request sẽ được gửi lên server
  // Kiểm tra xem user đã đăng nhập hay chưa để lấy accessToken gắn vào headers
  if (config.headers) {
    if (store.getState().auth.currentUser) {
      const { accessToken } = store.getState().auth.currentUser;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  }

  return config;
});

export default axiosClient;
