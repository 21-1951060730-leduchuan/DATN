// src/components/ContactInfo.js
import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FaxIcon from '@mui/icons-material/Print';
import { styled } from '@mui/system';

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
});

const ContactInfo = () => {
    return (
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Thông tin liên hệ
        </Typography>
        <IconWrapper>
          <LocationOnIcon sx={{ marginRight: '0.5rem' }} />
          <Typography variant="body1">
            123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
          </Typography>
        </IconWrapper>
        <IconWrapper>
          <PhoneIcon sx={{ marginRight: '0.5rem' }} />
          <Typography variant="body1">
            Điện thoại: (0123) 456-789
          </Typography>
        </IconWrapper>
        <IconWrapper>
          <FaxIcon sx={{ marginRight: '0.5rem' }} />
          <Typography variant="body1">
            Fax: (0123) 456-780
          </Typography>
        </IconWrapper>
        <IconWrapper>
          <EmailIcon sx={{ marginRight: '0.5rem' }} />
          <Typography variant="body1">
            Email: <a href="mailto:info@blogbongda.com">info@blogbongda.com</a>
          </Typography>
        </IconWrapper>
      </Paper>
    );
  };

export default ContactInfo;
