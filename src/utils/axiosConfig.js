import axios from "axios";
export const configureAxios = () => {
  axios.interceptors.request.use(
    (config) => {
      const userToken = localStorage.getItem("USER_TOKEN");
      config.baseURL = "https://hooked-social-api.herokuapp.com";
      config.headers.Authorization = `Bearer ${userToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
