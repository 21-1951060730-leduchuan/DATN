import axios from "axios";

const serverURL = "http://localhost:3500";

const postData = async (url, body, type) => {
  try {
    var response = await axios.post(`${serverURL}/${url}`, body, {
      params: { type },
    });
    var data = response.data;
    return data;
  } catch (e) {
    return null;
  }
};

const getData = async (url, query) => {
  try {
    var response = await axios.get(`${serverURL}/${url}`, { params: query });
    var data = response.data;
    return data;
  } catch (e) {
    return null;
  }
};

export { serverURL, postData, getData };
