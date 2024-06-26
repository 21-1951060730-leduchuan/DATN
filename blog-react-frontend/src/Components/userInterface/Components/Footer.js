import * as React from "react";

import { Grid, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import ListItemText from "@mui/material/ListItemText";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { serverURL } from "../../../Services/FetchNodeServices";

export default function Footer() {
  const [dense, setDense] = React.useState(false);

  return (
    <div className="root">
      <div className="ui-footer-sec">
        <Grid container spacing={2}>
          <Grid item md={4}>
            <img
              src={`${serverURL}/images/boosty-white-logo.png`}
              style={{ width: "30%", marginBottom: "5%", marginLeft: "-3%" }}
            />
            <p style={{ opacity: "70%", fontSize: "17px" }}>
              Boosty là công ty công nghệ cung cấp các giải pháp kỹ thuật số
              tiên tiến cho doanh nghiệp.
            </p>
            <br />
            <div
              style={{
                opacity: "70%",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MailIcon fontSize="small" style={{ marginRight: "4%" }} />
              info@tryboosty.com
            </div>

            <div
              style={{
                opacity: "70%",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                marginTop: "3%",
              }}
            >
              <PhoneIcon fontSize="small" style={{ marginRight: "4%" }} />
              +1 (302) 209-8440
            </div>
          </Grid>

          <Grid item md={2}>
            <Typography style={{ fontWeight: 600, fontFamily: "Inter" }}>
              Dịch vụ
            </Typography>
            <List dense={dense} style={{ marginTop: "2%", opacity: "70%" }}>
              <ListItem style={{ paddingLeft: 0, padding: "0" }}>
                <ListItemText>
                  <span className="listItem">Thanh toán tài khoản</span>
                </ListItemText>
              </ListItem>

              <ListItem style={{ paddingLeft: 0, padding: "0" }}>
                <ListItemText>
                  <span className="listItem">Bán giấy chứng nhạn</span>
                </ListItemText>
              </ListItem>

              <ListItem style={{ paddingLeft: 0, padding: "0" }}>
                <ListItemText>
                  <span className="listItem">Cài đặt website</span>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>

          <Grid item md={2}>
            <Typography style={{ fontWeight: 600, fontFamily: "Inter" }}>
              Thông tin
            </Typography>
            <List dense={dense} style={{ marginTop: "2%", opacity: "70%" }}>
              <ListItem style={{ paddingLeft: 0, padding: "0" }}>
                <ListItemText>
                  <span className="listItem">Bảo mật</span>
                </ListItemText>
              </ListItem>

              <ListItem style={{ paddingLeft: 0, padding: "0" }}>
                <ListItemText>
                  <span className="listItem">Liên hệ</span>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>

          <Grid item md={2}>
            <Typography style={{ fontWeight: 600, fontFamily: "Inter" }}>
              Theo dõi
            </Typography>
            <div style={{ marginTop: "5%" }}>
              <FacebookRoundedIcon
                style={{
                  opacity: "100%",
                  marginRight: "3%",
                  color: "gainsboro",
                }}
              />
              <TwitterIcon
                style={{
                  opacity: "100%",
                  marginRight: "3%",
                  color: "gainsboro",
                }}
              />
              <LinkedInIcon
                style={{
                  opacity: "100%",
                  marginRight: "3%",
                  color: "gainsboro",
                }}
              />
            </div>
          </Grid>
        </Grid>

        <hr style={{ opacity: "40%", margin: "3% 0 0" }} />
      </div>
    </div>
  );
}
