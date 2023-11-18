import axios from "axios";

export const instance = axios.create({
  baseURL: "http://223.130.128.169:8080/",
  timeout: 10000,
});
