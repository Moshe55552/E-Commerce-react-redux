import React from "react";
import {
  Box,
  TextField,
  Slider,
  Button,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const FilterBar = () => {
  const categories = ["All", "Electronics", "Clothing", "Toys"]; // Placeholder: Dynamic category list
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [priceRange, setPriceRange] = React.useState([0, 100]);
  const [titleSearch, setTitleSearch] = React.useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleTitleSearchChange = (event) => {
    setTitleSearch(event.target.value);
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 100]);
    setTitleSearch("");
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          fullWidth
        >
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={500}
          sx={{ flexGrow: 1 }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Search Title"
          variant="outlined"
          value={titleSearch}
          onChange={handleTitleSearchChange}
          fullWidth
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearFilters}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default FilterBar;
