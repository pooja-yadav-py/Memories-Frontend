import React, { useEffect,useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import "./searchBar.css";
import { buttonStyles,inputLabelStyles } from './styles';

const SearchBar = ({ setSearchValue, searchValue, fetchMyMemories,fetchMemories }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUrl = window.location.href;
  let c = currentUrl.split("/");
  let d = c[c.length - 1];
  console.log(d);
  console.log(currentUrl.split("/").length);

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchValue({ ...searchValue, [name]: value });
  };

  const handleClear = (fieldName) => {
    setSearchValue({
      ...searchValue,
      [fieldName]: "",
    });
  };

  const handleSearchClick = async () => {
    Object.keys(searchValue).map((key) => {
      searchValue[key] = searchValue[key].trim();
    });
    setSearchValue(searchValue);
    if(d==='usermemories'){
      fetchMyMemories();
    }else{
      fetchMemories();
    }
    
    
  };

  const handleClearAll = () => {
    setSearchValue({
      name: "",
      tag: "",
      title: "",
      description: "",
    });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          "& > :not(style)": {
            marginRight: "10px",
            width: "36ch",
            paddingRight: "0px",
          },
        }}
        noValidate
        autoComplete="off"
        className="search"
      >
        {d !== "usermemories" && (
          <TextField
            id="outlined-basic"
            label="User Name"
            name="name"
            variant="outlined"
            value={searchValue.name}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => handleClear("name")} size="small">
                  <ClearIcon fontSize="small" />
                </IconButton>
              ),
            }}
            InputLabelProps={{
              sx: inputLabelStyles,
            }}
            className="custom-textfield"
          />
        )}

        <TextField
          id="outlined-basic"
          label="Tag"
          name="tag"
          variant="outlined"
          value={searchValue.tag}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => handleClear("tag")} size="small">
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
          InputLabelProps={{
            sx: inputLabelStyles,
          }}
          className="custom-textfield"
        />
        <TextField
          id="outlined-basic"
          label="Title"
          name="title"
          variant="outlined"
          value={searchValue.title}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => handleClear("title")} size="small">
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
          InputLabelProps={{
            sx: inputLabelStyles,
          }}
          className="custom-textfield"
        />
        <TextField
          id="outlined-basic"
          label="Description"
          name="description"
          variant="outlined"
          value={searchValue.description}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => handleClear("description")}
                size="small"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
          InputLabelProps={{
            sx:inputLabelStyles,
          }}
          className="custom-textfield"
        />
      </Box>

      <Button
        variant="contained"
        sx={buttonStyles}
        onClick={handleSearchClick}
      >
        <SearchIcon />
      </Button>
      <Button
        variant="contained"
        sx={buttonStyles}
        onClick={handleClearAll}
      >
        Reset
      </Button>
    </>
  );
};

export default SearchBar;
