import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://172.16.1.138:9040/";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// request middleware
api.interceptors.request.use(
  function (config) {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  {
    function(error) {
      return Promise.reject(error);
    },
  }
);

// response middleware
api.interceptors.response.use(
  function (response) {
    // range of status codes 200 trigger this function
    return response;
  },
  function (error) {
    // range of status codes out of 200 trigger this function
    if (error.response && error.response.status === 401) {
      // location.assign('/login')
    }
    return Promise.reject(error);
  }
);

export { api };
