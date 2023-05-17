import React, { useState } from "react";
import { Container, Form, FormControl, InputGroup, Col, Row } from "react-bootstrap";
import axios from "axios";
import { ACCESS_KEY } from "../config";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import imgnotfound from "../img-notfound.jpg"

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[500]),
  backgroundColor: grey[300],
  boxShadow: "none",
  "&:hover": {
    backgroundColor: grey[500],
    color: theme.palette.getContrastText(grey[800]),
    boxShadow: "none",
  },
}));

const Search = () => {
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://perenual.com/api/species-list?page=1&key=${ACCESS_KEY}`,
        {
          params: { q: query },
        }
      );
      console.log("Search query:" ,query)
      console.log("Result:" ,response.data.data);
      setList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };  

  let plantList;
  if (list !== null) {
    if (list.length > 0) {
      plantList = list.map((item) => (
        <Col key={item.id} md={4} className="pb-4 img-column">
          <div className="wrapper">
          {item.default_image.regular_url ? (
            <img src={item.default_image.regular_url} alt={item.common_name} className="img-fluid" />
          ) : (
            <img src={imgnotfound} alt="Not Found" className="img-fluid" />
          )}
            <br/>
            <h4>{item.common_name}</h4>
            <p style={{fontStyle: "italic"}}>{item.scientific_name}</p>
          </div>
        </Col>
      ));
    } else {
      plantList = <p>No plants found.</p>;
    }
  } else {
    plantList = null;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column custom-container">
      <h1>Search plant</h1>
      <Form onSubmit={handleSearchSubmit} className="search-form text-center">
        <InputGroup>
          <span className="input-group-text" id="addon-wrapping">
            <SearchIcon />
          </span>
          <FormControl
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ColorButton variant="contained" type="submit">
            Search
          </ColorButton>
        </InputGroup>
      </Form>
      <Row className="mt-5 plants">
        {plantList}
      </Row>
    </Container>
  );
};

export default Search;
