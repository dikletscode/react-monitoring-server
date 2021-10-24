import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api/",
});

API.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    if (err.response && err.response!.status === 403) {
      localStorage.removeItem("user");
      window.location.reload();
    } else if (err.response && err.response!.status === 500) {
      window.location.replace("/error");
    } else {
      return Promise.reject(err);
    }
  }
);

export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
