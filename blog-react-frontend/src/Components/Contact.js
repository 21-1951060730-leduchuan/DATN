// src/pages/Contact.js
import React from "react";
import { Container, Box, Typography, Grid, Paper } from "@mui/material";
import ContactInfo from "./ContactInfo";
import Header from "./userInterface/Components/Header";
import Footer from "./userInterface/Components/Footer";

const Contact = () => {
  return (
    <>
      <Header />
      <Container sx={{my: 10}}>
        <Box sx={{mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Liên hệ với chúng tôi
          </Typography>
        </Box>
        <Grid container justifyContent="center" textAlign={"center"}>
          <Grid item xs={12} sm={10} md={8}>
            <ContactInfo />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
