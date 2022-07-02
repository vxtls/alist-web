import axios from "axios";
import { api } from "./base_url";

const instance = axios.create({
  baseURL: api + "/api",
  // timeout: 5000
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    // 'Authorization': localStorage.getItem("admin-token") || "",
  },
  withCredentials: false,
});

instance.interceptors.request.use(
  (config) => {
    // do something before request is sent
    return config;
  },
  (error) => {
    // do something with request error
    console.log("Error: " + error.message); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  (response) => {
    // const res = response.data
    return response;
  },
  (error) => {
    // response error
    console.log(error); // for debug
    if (!error.response || error.response.data.meta == undefined) {
      return Promise.reject(error);
    }
    // return Promise.reject(error)
    return error.response.data;
  }
);

instance.defaults.headers.common["Authorization"] =
  localStorage.getItem("token") || "";

export const changeToken = (token: string) => {
  instance.defaults.headers.common["Authorization"] = token;
  localStorage.setItem("token", token);
};

export {
  instance as r,
};