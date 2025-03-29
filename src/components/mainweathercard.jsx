import React from "react";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloudIcon from "@mui/icons-material/Cloud";

const MainWeatherCard = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "Date not available";

  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 23) {
      return <WbSunnyIcon sx={{ ml: 1, fontSize: "3rem", color: "orange" }} />;
    } else if (temperatureCelsius < 10) {
      return <AcUnitIcon sx={{ ml: 1, fontSize: "3rem", color: "blue" }} />;
    } else {
      return <CloudIcon sx={{ ml: 1, fontSize: "3rem", color: "gray" }} />;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#4B5563",
        color: "white",
        borderRadius: "0.5rem",
        p: 3,
        width: { xs: "100%", sm: "250px", md: "300px" }, // Adjust width based on screen size
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Now
      </Typography>

      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: { xs: "28px", sm: "35px" },
          fontWeight: "bold",
        }}
      >
        {temperatureCelsius}°C
        {/* {renderTemperatureIcon()} */}
      </Box>

      {/* Weather Description */}
      <Typography variant="body2" sx={{ mt: 1, fontWeight: 400 }}>
        {weatherDescription}
      </Typography>

      {/* Date & Location */}
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CalendarMonthIcon sx={{ mr: 1 }} />
          <Typography variant="body2">{currentDate}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1 }}>
          <LocationOnIcon sx={{ mr: 1 }} />
          <Typography variant="body2">
            {cityName}, {countryName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MainWeatherCard;
