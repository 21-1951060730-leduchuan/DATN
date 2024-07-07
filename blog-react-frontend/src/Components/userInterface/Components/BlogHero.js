import { Grid, Button } from "@mui/material";
import React, { useRef } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function BlogHero(props) {
  const blogHero = () => {
    return (
      <Grid container spacing={3} className="ui-blog-hero">
        <Grid item md={12}>
          <h2 className="ui-blog-heading">
            Đây là không gian dành cho những người đam mê và say mê trái bóng
            tròn. <br />
            Hãy cùng nhau khám phá và trải nghiệm những điều thú vị về thế giới
            bóng đá.
          </h2>
        </Grid>
      </Grid>
    );
  };

  return (
    <div className="root" style={{ height: "100%", width: "100%" }}>
      {blogHero()}
    </div>
  );
}
