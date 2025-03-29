import React from "react";
import { Box, Typography } from "@mui/material";

const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#4B5563",
        color: "white",
        borderRadius: "0.5rem",
        padding: "15px",
        width: { xs: "100%", sm: "300px", md: "350px" }, 
      }}
    >
      {forecastData.list.slice(0, 5).map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
            padding: "8px",
            backgroundColor: "#374151",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "16px" }}>
            {Math.round(item.main.temp)}°C
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: "bold" }}>
            {formatDate(item.dt_txt)}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "14px" }}>
            {item.weather[0].description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default FiveDayForecast;
