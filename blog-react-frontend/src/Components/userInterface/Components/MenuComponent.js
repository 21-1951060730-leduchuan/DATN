import React, { useRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getData, serverURL } from "../../../Services/FetchNodeServices";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

export default function MenuComponent(props) {
  const theme = useTheme();
  const navigation = useNavigate();
  const matches_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const matches_md = useMediaQuery(theme.breakpoints.down("md"));
  const [category, setCategory] = useState([]);
  const user = JSON.parse(localStorage.getItem("Admin"));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => {
    if (window.confirm("Are you sure you want to close?")) {
      localStorage.removeItem("Admin");
      // setAnchorEl(null);
      window.location.reload();
    }
  };
const handleClose2 = () => {
      setAnchorEl(null);
}
  const fetchCategory = async () => {
    var response = await getData("blog/fetch-category");
    setCategory(response.categoryData);
  };

  useEffect(function () {
    fetchCategory();
  }, []);

  const servicesContent = () => {
    return (
      <div>
        <Grid container spacing={1} style={{ padding: "3% 5%" }}>
          <CloseIcon
            onClick={handleClose2}
            fontSize="large"
            style={{
              position: "absolute",
              top: "6%",
              right: "4%",
              cursor: "pointer",
              color: "gray",
              zIndex: 2,
            }}
          />
          <Grid item md={4} style={{ padding: "1%" }}>
            {category.slice(0, 3).map((item, i) => {
              return (
                <Link
                  to={`/filter/${item.categoryname}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10% 0",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={`${serverURL}/images/${item.poster}`}
                    style={{
                      marginRight: "3%",
                      height: 70,
                      width: 70,
                      borderRadius: "50%",
                    }}
                  />
                  <p style={{ fontWeight: 500, color: "black", fontSize: 19 }}>
                    {item.categoryname}
                  </p>
                </Link>
              );
            })}
          </Grid>
        </Grid>
      </div>
    );
  };

  const menuItems = [
    {
      title: "Trang chủ",
      link: "/",
    },
    {
      title: "Thể loại",
      content: servicesContent(),
    },
  ];

  const showMenuItems = () => {
    return menuItems.map((item, index) => {
      return (
        <div>
          <Button
            key={index}
            style={{
              color: "black",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: 17,
              textTransform: "capitalize",
              padding: "1% 0",
              width: 100,
            }}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(event) => {
              item.link ? navigation(item.link) : handleClick(event, item);
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ fontSize: 18, margin: 0 }}>{item.title}</p>
              {item.content ? <KeyboardArrowDownIcon /> : <></>}
            </div>
          </Button>
        </div>
      );
    });
  };

  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const staticMenuItems = [
    {
      title: "Về chúng tôi",
      link: "/about",
    },
    {
      title: "Liên hệ",
      link: "/contact",
    },
    {
      title: "Đăng ký",
      link: "/register",
    },
    {
      title: "Đăng nhập",
      link: "/login",
    },
  ];

  const loginMenuItems = [
    {
      title: "Về chúng tôi",
      link: "/about",
    },
    {
      title: "Liên hệ",
      link: "/contact",
    },
  ];

  const showStaticMenuItems = () => {
    return staticMenuItems.map((item, i) => {
      return (
        <div>
          <Button
            style={{
              color: "black",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: 17,
              textTransform: "capitalize",
              padding: "1% 0",
              width: 130,
            }}
            onClick={() => navigation(item.link)}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ fontSize: 18, margin: 0 }}>{item.title}</p>
            </div>
          </Button>
        </div>
      );
    });
  };

  const showStaticLoginMenuItems = () => {
    return loginMenuItems.map((item, i) => {
      return (
        <div>
          <Button
            style={{
              color: "black",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: 17,
              textTransform: "capitalize",
              padding: "1% 0",
              width: 130,
            }}
            onClick={() => navigation(item.link)}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ fontSize: 18, margin: 0 }}>{item.title}</p>
            </div>
          </Button>
        </div>
      );
    });
  };

  return (
    <div style={{ position: "sticky", top: "11%", zIndex: 999 }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          {matches_md ? (
            <></>
          ) : (
            <AppBar
              position="static"
              style={{ background: "transparent", boxShadow: "none" }}
            >
              <Toolbar
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "7%",
                }}
              >
                {showMenuItems()}
                {user ? showStaticLoginMenuItems() : showStaticMenuItems()}
                <Typography
                  style={{
                    color: "black",
                    fontSize: "20px",
                  }}
                >
                  {user?.name}
                </Typography>
                {user && (
                  <div
                    onClick={handleClose2}
                    style={{
                      color: "black",
                      fontSize: "18px",
                      minWidth: "100px",
                      fontWeight: 500,
                    }}
                  >
                    Đăng xuất
                  </div>
                )}

                <Menu
                  PaperProps={{
                    style: {
                      width: "55%",
                      boxShadow: "none",
                      borderRadius: 15,
                      // border: '1px solid gray',
                      background:
                        selectedItem && selectedItem.content
                          ? "white"
                          : "transparent",
                      position: "relative",
                      transform: "translateX(-30%) translateY(2%)",
                    },
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose2}
                  MenuListProps={{ "aria-labelledby": "basic-button" }}
                >
                  {selectedItem ? selectedItem.content : <>:</>}
                </Menu>
              </Toolbar>
            </AppBar>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
