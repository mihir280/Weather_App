import React from "react";
import { Box, Typography } from "@mui/material";

const HighlightBox = ({ title, value, Icon }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#374151",
        color: "white",
        p: 2,
        borderRadius: "0.5rem",
        minWidth: "150px",
        width: { xs: "100%", sm: "180px" }, 
        height: "90px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body1" sx={{ fontSize: "18px", fontWeight: "bold" }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Icon sx={{ fontSize: "30px" }} />
        <Typography variant="h6" sx={{ fontSize: "28px" }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default HighlightBox;
