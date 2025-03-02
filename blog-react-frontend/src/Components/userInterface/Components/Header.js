import * as React from "react";

import { Grid, Button } from "@mui/material";
import MenuComponent from "./MenuComponent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MobileMenu from "./MobileMenu";
import LOGO from "../../../assets/LOGO.png";

export default function Header(props) {
  var navigate = useNavigate();

  const theme = useTheme();
  const matches_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const matches_md = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogoclick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div
      style={{
        overflowX: "hidden",
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: "pink",
      }}
    >
      {matches_md ? (
        <></>
      ) : (
        <Grid
          container
          spacing={1}
          style={{
            padding: "0.5% 3%",
            background: props.bg,
            color: props.color,
          }}
        >
          <Grid
            item
            md={3}
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <img
              src={LOGO}
              style={{ width: "35%", cursor: "pointer" }}
              onClick={handleLogoclick}
            />
          </Grid>

          <Grid
            item
            md={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MenuComponent />
          </Grid>
        </Grid>
      )}

      {matches_md ? (
        <Grid
          container
          spacing={1}
          style={{
            margin: 0,
            padding: 0,
            background: "white",
            color: "black",
            padding: "2% 5% 4%",
          }}
        >
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              margin: 0,
              padding: 0,
            }}
          >
            <div style={{ width: "100%" }}>
              <img
                src={LOGO}
                style={{ width: "70%", cursor: "pointer", marginLeft: "-10%" }}
                onClick={handleLogoclick}
              />
            </div>
          </Grid>

          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              margin: 0,
              padding: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <MobileMenu />
            </div>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </div>
  );
}
