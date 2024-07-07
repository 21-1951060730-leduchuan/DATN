import { Grid, TextField, Button, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { getData } from "../../../Services/FetchNodeServices";
import React, { useRef } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ShareIcon from "@mui/icons-material/Share";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { useNavigate, useParams } from "react-router-dom";
import GridPostList from "./GridPostList";
import Sidebar from "./Sidebar";
import BlogHero from "./BlogHero";
import Header from "./Header";
import Footer from "./Footer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "15px",
  padding: "3%",
};

export default function FilterBlogs(props) {
  const [getPostList, setPostList] = useState([]);
  const { category } = useParams();

  const fetchPostList = async () => {
    var response = await getData("blog/display-post-list", {
      category,
    });
    setPostList(response.postListData);
  };

  useEffect(function () {
    fetchPostList();
  }, []);

  const sortedPostList = getPostList.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <>
      <Header />
      <div className="root" style={{ height: "100%" }}>
        <Grid container spacing={0} style={{ position: "relative" }}>
          <Grid container spacing={0} className="ui-post-grid">
            <Grid item md={8} style={{ width: "100%" }}>
              <GridPostList post={sortedPostList} />
            </Grid>

            <Grid item md={4} className="ui-blog-sidebar">
              <Sidebar />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
}
