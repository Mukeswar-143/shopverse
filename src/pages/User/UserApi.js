import axios from "axios";

const BASE_URL = "https://productcatlog-1.onrender.com/customer"
// const BASE_URL = "https://productcatlog.onrender.com/customer";

const userAPI = {
    register: (userData) => axios.post(`${BASE_URL}/register`, userData),
    login: (credentials) => axios.post(`${BASE_URL}/login`, credentials),
    dashboard: () =>
        axios.get(`${BASE_URL}/dashboard`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        }),
};

export default userAPI;
