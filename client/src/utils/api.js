import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3030/api/v1",
});

export const setAuthToken = (token) => {
  token
    ? (API.defaults.headers.common["Authorization"] = `Bearer ${token}`)
    : delete API.defaults.headers.common["Authorization"];
};
