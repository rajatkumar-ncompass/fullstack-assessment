import axios from "axios";
import { fetchLocalStorageItem } from "./Lib";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const apiCall = async (method, url, body) => {
  const token = fetchLocalStorageItem("token");
  if (method === "POST" || method === "DELETE") {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const apiResponse = await axios({
    method: method,
    url: BASE_URL + url,
    data: body,
  });

  return apiResponse.data;
};
export default apiCall;
