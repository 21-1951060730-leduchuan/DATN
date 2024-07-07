import { Grid, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import {
  postData,
  getData,
  serverURL,
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

export default function Sidebar(props) {
  const classes = useStyles();
  const [getPostList, setPostList] = useState([]);
  const [getDatabaseCategory, setDatabaseCategory] = useState([]);
  const [getSubscriberName, setSubscriberName] = useState([]);
  const [getSubscriberEmail, setSubscriberEmail] = useState([]);
  const [getErrors, setErrors] = useState("");

  const handleError = (error, label) => {
    setErrors((prev) => ({ ...prev, [label]: error }));
  };

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

  const fetchPostList = async () => {
    var response = await getData("blog/display-post-list");
    setPostList(response.postListData);
  };

  useEffect(function () {
    fetchPostList();
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

  const tagsArrayFunc = () => {
    var tagsArray = [];
    getPostList.forEach((item, i) => {
      var tagArray = item.tags.split(",");
      tagsArray.push(...tagArray);
    });
    const subsetOfTags = tagsArray.slice(0, 13);
    const uniqueTags = [];

    subsetOfTags.forEach((item) => {
      if (!uniqueTags.includes(item)) {
        uniqueTags.push(item);
      }
    });
    return uniqueTags.map((item, i) => {
      return (
        <div className="ui-sidebar-category" key={i}>
          {item}
        </div>
      );
    });
  };

  const sidebar = () => {
    return (
      <div>
        <div style={{ width: "100%", height: "auto", marginTop: "5%" }}>
          <h3
            style={{
              fontWeight: 600,
              textAlign: "center",
              fontSize: "25px",
              width: "70%",
              margin: "auto",
            }}
          >
            Điều bạn thích đọc?
          </h3>
          <p
            style={{
              textAlign: "center",
              fontSize: "17px",
              width: "60%",
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
