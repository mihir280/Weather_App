import React, { useState, useEffect } from "react";
import Navbar from "../src/components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Delhi");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = "26ba6f7ffe9bdbc4109f1bdb8807803d";
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      setWeatherData(weatherResponse.data);
      fetchAirQualityData(weatherResponse.data.coord.lat, weatherResponse.data.coord.lon);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setFiveDayForecast(forecastResponse.data);

      // Update search history (store only last 5 searches)
      setSearchHistory((prev) => {
        const updatedHistory = [city, ...prev.filter((c) => c !== city)].slice(0, 5);
        return updatedHistory;
      });
    } catch (err) {
      setError("City not found or API error. Please try again.");
    }
    setLoading(false);
  };

  const fetchAirQualityData = async (lat, lon) => {
    try {
      const API_KEY = "26ba6f7ffe9bdbc4109f1bdb8807803d";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setAirQualityData(response.data.list[0]);
    } catch (error) {
      console.error("Error fetching air quality data:", error);
    }
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <Box sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh", paddingBottom: "30px" }}>
      <Navbar onSearch={handleSearch} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
          <CircularProgress size={50} />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography color="error" variant="h6">
            {error}
          </Typography>
          <Button variant="contained" onClick={() => fetchWeatherData(city)} sx={{ mt: 2 }}>
            Retry
          </Button>
        </Box>
      ) : (
        weatherData && airQualityData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, padding: "40px", gap: "30px", justifyContent: "center" }}>
              <Box sx={{ flex: "1", maxWidth: "600px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <MainWeatherCard weatherData={weatherData} />
                <Typography variant="h5" sx={{ fontWeight: "700", marginTop: "10px" }}>5 Days Forecast</Typography>
                {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
              </Box>
              <Box sx={{ flex: "1", maxWidth: "600px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
              </Box>
            </Box>
            {/* Recent Search History */}
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="h6">Recent Searches</Typography>
              {searchHistory.map((city, index) => (
                <Button key={index} onClick={() => setCity(city)} sx={{ mx: 1 }}>
                  {city}
                </Button>
              ))}
            </Box>
          </motion.div>
        )
      )}
    </Box>
  );
};

export default App;