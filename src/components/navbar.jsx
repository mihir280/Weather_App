import React, { useState } from "react";
import { AppBar, Toolbar, Typography, TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterDramaTwoToneIcon from '@mui/icons-material/FilterDramaTwoTone';

const Navbar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterDramaTwoToneIcon />
          Weather
        </Typography>
        <div style={{ display: 'flex', gap: '8px' }}>
          <TextField
            variant="outlined"
            placeholder="Search city 'Delhi'"
            size="small"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: { xs: '100%', sm: '22rem' },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearchClick}
            sx={{ borderRadius: "4px", backgroundColor: '#4B5550' }}
          >
            Search
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
