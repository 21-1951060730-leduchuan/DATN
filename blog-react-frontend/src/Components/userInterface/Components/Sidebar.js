import { Grid, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import {
  postData,
  getData,
  serverURL,
  searchBlog,
} from "../../../Services/FetchNodeServices";
import React, { useRef } from "react";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

const useStyles = makeStyles((theme) => ({
  roundedTextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 30,
      border: "0.2px solid #eeeee",
    },
  },
  roundedTextFieldSearch: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 30,
      border: "none",
      color: "white",
      background: "rgba(255, 255, 255, 0.20)",
    },
  },
}));

export default function Sidebar({ setBlogs }) {
  const classes = useStyles();
  const [getDatabaseCategory, setDatabaseCategory] = useState([]);
  const [getSubscriberName, setSubscriberName] = useState([]);
  const [getSubscriberEmail, setSubscriberEmail] = useState([]);
  const [getErrors, setErrors] = useState("");
  const [search, setSearch] = useState("");
  const handleError = (error, label) => {
    setErrors((prev) => ({ ...prev, [label]: error }));
  };

  const user = JSON.parse(localStorage.getItem("Admin"));

  const validation = () => {
    var error = false;
    if (getSubscriberEmail.length === 0) {
      error = true;
      handleError("Please enter email", "getSubscriberEmail");
    }
    return error;
  };

  const fetchCategory = async () => {
    var response = await getData("blog/fetch-category");
    setDatabaseCategory(response.categoryData);
  };

  useEffect(function () {
    fetchCategory();
  }, []);

  const handleAddSubscriber = async () => {
    var error = validation();
    if (error === false) {
      var body = { name: getSubscriberName, email: getSubscriberEmail };
      var response = await postData("blog/add-subscribers", body);
      if (response.status === true) {
        Swal.fire({
          icon: "success",
          title: "Cảm ơn đã đăng ký!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Không thể đăng ký!",
        });
      }
    }
  };

  const handleSearchBlog = async (e) => {
    e.preventDefault();
    try {
      const data = await searchBlog(search);
      console.log(data?.results);
      setBlogs(data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const sidebar = () => {
    return (
      <div>
        <div style={{ width: "100%", height: "auto", marginTop: "" }}>
          <form onSubmit={handleSearchBlog}>
            <div
              style={{
                display: "flex",
                boxShadow: "10px 10px 25px gainsboro",
                height: 55,
                padding: "0 30px",
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <TextField
                onChange={(event) => setSearch(event.target.value)}
                className={classes.roundedTextField}
                placeholder="Tìm kiếm bài viết..."
                variant="standard"
                fullWidth
                style={{ margin: "5% 0" }}
              />
            </div>
            <div
              style={{
                margin: "10px auto",
                textAlign: "center",
                width: "100%",
              }}
            >
              <Button type="submit" variant="contained">
                Tìm kiếm
              </Button>
            </div>
          </form>
          {user && (
            <div>
              <h3
                style={{
                  fontWeight: 600,
                  textAlign: "center",
                  fontSize: "25px",
                  width: "100%",
                  margin: "10% auto",
                }}
              >
                Điều bạn thích đọc?
              </h3>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "17px",
                  width: "100%",
                  margin: "auto",
                  opacity: "70%",
                }}
              >
                Đăng ký để nhận thông báo khi có bài báo mới.
              </p>
              <div
                style={{
                  display: "flex",
                  boxShadow: "10px 10px 25px gainsboro",
                  height: 55,
                  padding: "0 30px",
                  borderRadius: 5,
                  alignItems: "center",
                  margin: "10% auto",
                }}
              >
                <TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={(event) => setSubscriberName(event.target.value)}
                  className={classes.roundedTextField}
                  label="Tên"
                  variant="standard"
                  fullWidth
                  style={{ margin: "5% 0" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  boxShadow: "10px 10px 25px gainsboro",
                  height: 55,
                  padding: "0 30px",
                  borderRadius: 5,
                  alignItems: "center",
                  margin: "10% auto",
                }}
              >
                <TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  error={getErrors.getSubscriberEmail}
                  helperText={getErrors.getSubscriberEmail}
                  onFocus={() => handleError("", "getSubscriberEmail")}
                  onChange={(event) => setSubscriberEmail(event.target.value)}
                  className={classes.roundedTextField}
                  label="Email"
                  variant="standard"
                  fullWidth
                />
              </div>
              <center>
                <Button
                  onClick={handleAddSubscriber}
                  variant="contained"
                  className="ui-global-btn"
                  endIcon={<ArrowRightAltIcon style={{ color: "white" }} />}
                >
                  Đăng ký
                </Button>
              </center>
            </div>
          )}
        </div>

        <div className="ui-category-div">
          <h3 style={{ fontWeight: 600, fontSize: "23px" }}>Thể loại</h3>
          <br />
          {getDatabaseCategory.map((item, i) => {
            return (
              <div className="ui-sidebar-category">{item.categoryname}</div>
            );
          })}
        </div>

        <div className="ui-social-sec">
          <h5 style={{ fontWeight: 600, fontSize: "23px" }}>Theo dõi</h5>
          <div className="ui-social-div">
            <FacebookIcon
              style={{
                color: "#0A66C2",
                marginRight: "3%",
                width: 30,
                height: 30,
              }}
            />
            Theo dõi tại Facebook
          </div>
          <div className="ui-social-div">
            <TwitterIcon
              style={{
                color: "#03A9F4",
                marginRight: "3%",
                width: 30,
                height: 30,
              }}
            />
            Theo dõi tại Twitter
          </div>
          <div className="ui-social-div">
            <LinkedInIcon
              style={{
                color: "#3b5998",
                marginRight: "3%",
                width: 30,
                height: 30,
              }}
            />
            Theo dõi tại Linked
          </div>
          <div className="ui-social-div">
            <YouTubeIcon
              style={{
                color: "#FF0000",
                marginRight: "3%",
                width: 30,
                height: 30,
              }}
            />
            Theo dõi tại YouTube
          </div>
        </div>
      </div>
    );
  };

  return <div style={{ height: "100%", width: "100%" }}>{sidebar()}</div>;
}
