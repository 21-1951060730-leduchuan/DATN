import "../App.css";
import * as React from "react";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CategoryIcon from "@mui/icons-material/Category";
import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { makeStyles } from "@material-ui/core/styles";
import PushPinIcon from "@mui/icons-material/PushPin";
import ListIcon from "@mui/icons-material/List";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "../Components/CreatePost";
import CategoryList from "../Components/CategoryList";
import CreateCategory from "../Components/CreateCategory";
import GridPostList from "../Components/GridPostList";
import AuthorsList from "../Components/AuthorsList";
import Admin from "../Components/Admin";
import Page from "./Page";
import { serverURL } from "../Services/FetchNodeServices";
import CommentList from "./CommentList";

const useStylesTextField = makeStyles((theme) => ({
  roundedTextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 15,
    },
  },
}));

export default function Dashboard() {
  var admin = JSON.parse(localStorage.getItem("Admin"));

  var navigate = useNavigate();
  const classes = useStylesTextField();

  const [selectedItemIndex, setSelectedItemIndex] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("Admin");
      navigate("/login");
    }
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setSelectedItemIndex(0); // 0 is the index of the dashboard item
  }, []);

  const listItems = [
    {
      icon: <DashboardIcon />,
      title: "Dashboard",
      link: "",
    },
    {
      icon: <PushPinIcon />,
      title: "Tạo",
      link: "/dashboard/createpost",
    },
    {
      icon: <ListIcon />,
      title: "Các bài báo",
      link: "/dashboard/posts",
    },
    {
      icon: <CategoryIcon />,
      title: "Thể loại",
      link: "/dashboard/category",
    },
    {
      icon: <DescriptionIcon />,
      title: "Bình luận",
      link: "/dashboard/comments",
    },
    // {
    //     icon: <DescriptionIcon />,
    //     title: 'Trang',
    //     link: '/dashboard/pages'
    // },
    {
      icon: <PeopleAltIcon />,
      title: "Tác giả",
      link: "/dashboard/authors",
    },
    {
      icon: <OpenInNewIcon />,
      title: "Xem trang thông tin",
      link: "/",
    },
  ];

  if (!admin) {
    navigate("/login");
    return null;
  }

  return (
    <div className="root">
      <div className="box">
        <Grid container spacing={3} style={{ width: "100%", margin: 0 }}>
          <Grid
            item
            xs={2}
            style={{
              background: "#1C2536",
              padding: "3% 2%",
              color: "white",
              borderRight: "1px solid gainsboro",
              height: "100vh",
              position: "sticky",
              top: 0,
            }}
          >
            <Grid
              style={{
                background: "#3f4757",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                padding: "5%",
              }}
            >
              <img
                src={`${serverURL}/images/${admin[0]?.picture}` || ""}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  marginRight: "6%",
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {admin[0]?.name}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    opacity: "70%",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {admin[0]?.email}
                </div>
              </div>
            </Grid>

            <Grid style={{ marginTop: "20%" }}>
              <List sx={{ width: "100%", maxWidth: 360 }} component="nav">
                {listItems.map((item, i) => {
                  var handleListItem = (i) => {
                    navigate(item.link);
                    setSelectedItemIndex(i);
                  };

                  return (
                    <ListItemButton
                      key={i}
                      onClick={() => handleListItem(i)}
                      style={{
                        margin: "1% 0",
                        backgroundColor:
                          selectedItemIndex === i ? "#0069ff" : "transparent",
                        borderRadius: selectedItemIndex === i ? "4px" : "0",
                      }}
                    >
                      <ListItemIcon
                        style={{
                          color: "white",
                          opacity: "75%",
                          fontSize: "15px",
                          opacity: selectedItemIndex === i ? "100%" : "75%",
                        }}
                      >
                        {item?.icon}
                      </ListItemIcon>
                      <p
                        style={{
                          opacity: "75%",
                          fontSize: "15px",
                          opacity: selectedItemIndex === i ? "100%" : "75%",
                        }}
                      >
                        {item?.title}
                      </p>
                    </ListItemButton>
                  );
                })}
              </List>
            </Grid>
          </Grid>

          <Grid
            item
            xs={10}
            style={{ padding: "2% 1% 3%", height: "100%", background: "white" }}
          >
            <Grid
              container
              spacing={2}
              style={{ background: "white", zIndex: 99 }}
            >
              <Grid item md={10}>
                <h3
                  style={{
                    fontWeight: "600",
                    fontSize: "25px",
                    textAlign: "left",
                    marginLeft: "3%",
                  }}
                >
                  Xin chào, Chào mừng quay lại {admin[0]?.name} 👋
                </h3>
              </Grid>
              <Grid
                item
                md={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose2}
                  onClick={handleClose2}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 7px rgba(0,0,0,0.25))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => navigate("/dashboard/admin")}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    Tài khoản của tôi
                  </MenuItem>
                  <Divider />
                  <MenuItem 
                  onClick={handleClose} 
                  style={{ color: "#ff5028" }}>
                    <ListItemIcon>
                      <Logout fontSize="small" style={{ color: "#ff5028" }} />
                    </ListItemIcon>
                    Đăng xuất
                  </MenuItem>
                </Menu>
                <img
                  className="profileImg"
                  src={`${serverURL}/images/${admin[0]?.picture}` || ""}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                  onClick={handleClick}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                height: "100%",
                width: "100%",
                marginTop: "3%",
              }}
            >
              <Grid
                item
                xs={12}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <Routes>
                  <Route element={<CreatePost />} path="/createpost" />
                  <Route element={<GridPostList />} path="/posts" />
                  <Route element={<CreateCategory />} path="/createcategory" />
                  <Route element={<CategoryList />} path="/category" />
                  <Route element={<AuthorsList />} path="/authors" />
                  <Route element={<Admin />} path="/admin" />
                  <Route element={<CommentList />} path="/comments" />
                  <Route element={<Page />} path="/pages" />
                </Routes>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
