import axios from "axios";
import store from "redux/store";

export const GROUPID = "GP10";

const axiosClient = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api",
    headers: {
        TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
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
