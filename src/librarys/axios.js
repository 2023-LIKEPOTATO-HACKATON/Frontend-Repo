import axios from "axios";

export function getSpringAxios(token = null) {
  const options = {
    baseURL: "http://223.130.128.169:8080/",
    timeout: 10000,
  };

  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return axios.create(options);
}
