import axios from "axios";

const api = axios.create({
  baseURL: "https://futuredekho-server.onrender.com", // change when deployed
});

export default api;