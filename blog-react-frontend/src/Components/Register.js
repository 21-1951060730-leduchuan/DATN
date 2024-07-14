import "../App.css";

import * as React from "react";
import { Typography } from "@material-ui/core";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import {
  postData,
  getData,
  serverURL,
  register,
} from "../Services/FetchNodeServices";

const useStyles = makeStyles((theme) => ({
  roundedTextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
    },
  },
}));

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getErrors, setErrors] = useState("");

  const handleError = (error, label) => {
    setErrors((prev) => ({ ...prev, [label]: error }));
  };

  const validation = () => {
    var error = false;
    if (email.length === 0) {
      error = true;
      handleError("Vui lòng nhập email", "email");
    }
    if (password.length === 0) {
      error = true;
      handleError("Vui lòng nhập mật khẩu", "password");
    }
    return error;
  };

  const handleRegister = async () => {
    var error = validation();
    if (error === false) {
      var body = { email: email, password: password, name: name };
      var response = await register("users/register", body);

      if (response.status === true) {
        localStorage.setItem("Admin", JSON.stringify(response.results));
        Swal.fire({
          icon: "success",
          title: "Đăng ký  thành công!",
          confirmButtonText: "Vào trang Dashboard",
          denyButtonText: `Không lưu`,
        });
        if (response?.results?.isAdmin === true) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Thông tin không chính xác!",
        });
      }
    }
  };

  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const adminFormGrid = {
    backgroundColor: "#F2F5F9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
  };

  const loginForm = {
    width: "38%",
    margin: "auto",
    padding: "6% 3%",
    borderRadius: "15px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    boxShadow:
      "rgba(159, 162, 191, 0.18) 0px 9px 16px, rgba(159, 162, 191, 0.32) 0px 0px",
  };

  return (
    <div className="root" style={{ height: "100vh" }}>
      <Grid spacing={5} style={adminFormGrid}>
        <Grid item md={9} style={adminFormGrid}>
          <Grid container spacing={3} style={loginForm}>
            <Grid item md={12} style={{ padding: 0 }}>
              <Typography
                style={{
                  fontSize: "26px",
                  fontWeight: "600",
                  marginBottom: "0",
                  textAlign: "center",
                }}
              >
                Đăng ký
              </Typography>
              <p
                style={{
                  marginBottom: "4%",
                  textAlign: "center",
                  opacity: "70%",
                }}
              >
                Điền đầy đủ thông tin để đăng k vòa hệ thống.
              </p>
              <br />
            </Grid>
            <Grid item md={12} style={{ padding: 0, marginTop: "5%" }}>
              <TextField
                error={getErrors.email}
                helperText={getErrors.email}
                onFocus={() => handleError("", "name")}
                label="Name"
                variant="outlined"
                fullWidth
                className={classes.roundedTextField}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item md={12} style={{ padding: 0, marginTop: "5%" }}>
              <TextField
                error={getErrors.email}
                helperText={getErrors.email}
                onFocus={() => handleError("", "email")}
                label="Email"
                variant="outlined"
                fullWidth
                className={classes.roundedTextField}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item md={12} style={{ padding: 0, marginTop: "5%" }}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.roundedTextField}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Mật khẩu
                </InputLabel>
                <OutlinedInput
                  error={getErrors.password}
                  onFocus={() => handleError("", "password")}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Mật khẩu"
                />
              </FormControl>
              <p
                style={{
                  color: "#FF0000",
                  fontSize: "12.3px",
                  marginLeft: "15px",
                  marginTop: "0",
                }}
              >
                {getErrors.password}
              </p>
            </Grid>
            <Grid item md={8} style={{ padding: 0, marginTop: "3%" }}>
              <Checkbox {...label} defaultChecked style={{ paddingLeft: 0 }} />
              <font style={{ fontSize: "15px", opacity: "80%" }}>
                Tôi đồng ý với{" "}
                <font style={{ color: "#004cef" }}>các điều khoản.</font>
              </font>
            </Grid>
            <Grid
              item
              md={12}
              variant="contained"
              style={{ padding: 0, marginTop: "4%" }}
            >
              <Button
                onClick={handleRegister}
                fullWidth
                style={{
                  background: "#0069ff",
                  color: "white",
                  borderRadius: "15px",
                  padding: "2% 0",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                Đăng ký
              </Button>
            </Grid>
            {/* <Grid item md={8} style={{ padding: 0, marginTop: '6%', fontWeight: '600' }}>
                            <font style={{ fontSize: '15px', opacity: '80%' }}>Don't have an account <font style={{ color: '#004cef' }}>sign up here</font></font>
                        </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
