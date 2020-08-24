import React, { useState } from "react";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

// ***************************
// *** SearchBar Component ***
// ***************************

const SearchBar = ({ handleSearch }) => {
  const [inputText, setInput] = useState("");

  handleSearch(inputText.length >= 3 ? inputText.toLowerCase() : "");

  return (
    <Grid container>
      <TextField
        id="search"
        value={inputText}
        onChange={(e) => setInput(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
        label="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default SearchBar;
