import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WindPowerIcon from "@mui/icons-material/WindPower";

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { wind, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi;

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#4B5563",
        color: "white",
        borderRadius: "0.5rem",
        p: 3,
        width: { xs: "95%", sm: "85%", md: "70%" },
        mx: "auto",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Today's Highlights
      </Typography>

      <Grid container spacing={2}>
        {/* Air Quality */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              backgroundColor: "#374151",
              p: 2,
              borderRadius: "0.5rem",
            }}
          >
            <Typography variant="h6">Air Quality Index</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography
                sx={{
                  backgroundColor: "green",
                  px: 1,
                  py: 0.5,
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {renderAirQualityDescription(airQualityIndex)}
              </Typography>
              <AirIcon sx={{ fontSize: "35px" }} />
            </Box>
          </Box>
        </Grid>

        {/* Sunrise & Sunset */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              backgroundColor: "#374151",
              p: 2,
              borderRadius: "0.5rem",
            }}
          >
            <Typography variant="h6">Sunrise And Sunset</Typography>
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Grid item>
                <WbSunnyIcon sx={{ fontSize: "40px", color: "yellow" }} />
                <Typography fontSize="20px">
                  {new Date(sys.sunrise * 1000).toLocaleTimeString()}
                </Typography>
              </Grid>
              <Grid item>
                <NightsStayIcon sx={{ fontSize: "40px", color: "blue" }} />
                <Typography fontSize="20px">
                  {new Date(sys.sunset * 1000).toLocaleTimeString()}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Wind Speed */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              backgroundColor: "#374151",
              p: 2,
              borderRadius: "0.5rem",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">Wind Speed</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
              <WindPowerIcon sx={{ fontSize: "35px", mr: 1 }} />
              <Typography fontSize="20px">{wind.speed} km/h</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TodayHighlights;
