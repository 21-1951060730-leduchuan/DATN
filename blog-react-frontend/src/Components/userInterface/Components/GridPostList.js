import { Grid, TextField, Button, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
  postData,
  getData,
  serverURL,
} from "../../../Services/FetchNodeServices";
import React, { useRef } from "react";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { addDataLocal, deleteDataByPostId, getDataLocal } from "../../database";

export default function GridPostList(props) {
  var navigate = useNavigate();
  const [liked, setLiked] = useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const sortedPostList = props.post.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const handlePostClick = (item) => {
    navigate("/post", { state: { post: item } });
    window.scrollTo(0, 0);
  };

  const handleLike = async (postId) => {
    const checkLiked =
      liked.filter((liked) => liked.postId === postId).length > 0;
    if (!checkLiked) {
      postData(`blog/add-like`, { postId }, "add");
      addDataLocal({ postId: postId });
    } else {
      deleteDataByPostId(postId);
      postData(`blog/add-like`, { postId }, "remove");
    }
    const myLike = await getDataLocal();
    setLiked(myLike);
  };

  useEffect(() => {
    const fetchData = async () => {
      const myLike = await getDataLocal();
      setLiked(myLike);
    };

    fetchData();
  }, []);

  const gridPostList = () => {
    return (
      <Grid
        container
        spacing={1}
        style={{ padding: "0 1% 3%", margin: 0, height: "100%", width: "100%" }}
      >
        {sortedPostList.map((item, index) => {
          var date = new Date(item.date);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();

          var body = item.body;

          const removeHtmlTags = (input) => {
            return input.replace(/<[^>]*>/g, "");
          };
          const plainText = removeHtmlTags(body);

          return (
            <Grid item md={6} className="ui-post-card-grid">
              <div
                key={index}
                className="ui-post-card"
                style={{ cursor: "pointer" }}
              >
                <div className="ui-like-div">
                  <Checkbox
                    {...label}
                    icon={
                      <FavoriteBorder style={{ color: "rgb(220, 122, 122" }} />
                    }
                    checkedIcon={
                      <Favorite style={{ color: "rgb(255, 122, 122" }} />
                    }
                    onClick={() => handleLike(item._id)}
                    checked={
                      liked.filter((liked) => liked.postId === item._id)
                        .length > 0
                    }
                  />
                </div>
                <div onClick={() => handlePostClick(item)}>
                  <CardMedia
                    className="ui-post-img"
                    component="img"
                    height="250"
                    image={`${serverURL}/images/${item.poster}`}
                    alt={item.title}
                  />
                  <h3 className="ui-post-heading">{item.title}</h3>
                  <div className="ui-post-meta">
                    <span className="highlight">{`${
                      months[month - 1]
                    } ${day}, ${year}`}</span>{" "}
                    Trong
                    <span className="highlight"> {item.category} </span> bởi
                    <span className="highlight">
                      {item.authorData[0].name}{" "}
                    </span>
                  </div>
                  <Typography className="ui-post-meta-para">
                    {/* {parse(body.substring(0, 170))} */}
                    {plainText.substring(0, 170)}...
                  </Typography>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <div className="root" style={{ height: "100%", width: "100%" }}>
      {gridPostList()}
    </div>
  );
}
