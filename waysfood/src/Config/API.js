import axios from "axios";

export const API = axios.create({
   baseURL: "http://localhost:5000/api/v1/",
});

export const setAuthToken = (token) => {
   token
      ? (API.defaults.headers.common["Authorization"] = `Bearer ${token}`)
      : delete API.defaults.headers.common["Authorization"];
};

// const executeAPI = async (endPoint, config) => {
//    const response = await fetch(baseURL + endPoint, config);
//    const data = await response.json();
//    return data;
// };
// return {
//    get: executeAPI,
//    post: executeAPI,
//    patch: executeAPI,
//    delete: executeAPI,
// };
