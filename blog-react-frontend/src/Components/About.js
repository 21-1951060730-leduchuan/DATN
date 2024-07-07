// src/pages/About.js
import React from "react";
import { Typography, Grid, Box, Container } from "@mui/material";
import Footer from "./userInterface/Components/Footer";
import Header from "./userInterface/Components/Header";

const About = () => {
  return (
    <>
      <Header />
      <Container sx={{ mb: 20 }}>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Giới thiệu về chúng tôi
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Chào mừng bạn đến với Blog Bóng Đá! Chúng tôi là đội ngũ đam mê bóng
            đá, với sứ mệnh mang đến cho bạn những tin tức nóng hổi, phân tích
            chuyên sâu và bình luận sắc bén về bóng đá.
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Liên hệ
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Để biết thêm chi tiết hoặc liên hệ với chúng tôi, vui lòng gửi email
            đến <a href="mailto:info@blogbongda.com">info@blogbongda.com</a>.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default About;
