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

const register = async (url, body, type) => {
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

const getData = async (url, params) => {
  try {
    var response = await axios.get(`${serverURL}/${url}`, { params: params });
    var data = response.data;
    return data;
  } catch (e) {
    return null;
  }
};

const searchBlog = async (keyword) => {
  try {
    const response = await axios.get(
      `${serverURL}/blog/search-blog?keyword=${keyword}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { serverURL, postData, getData, register, searchBlog };
