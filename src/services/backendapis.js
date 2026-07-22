import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.31.196:8000", // change when deployed
});

export default api;