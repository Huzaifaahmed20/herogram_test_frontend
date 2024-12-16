import axios from "axios";

const BASE_URL = "http://159.223.19.203:8080";

export const apiInstance = axios.create({
  baseURL: BASE_URL,
});

