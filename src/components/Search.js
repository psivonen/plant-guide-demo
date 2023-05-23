import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ACCESS_KEY } from "../config";
import imgnotfound from "../img-notfound.jpg";
import { Container, Form, FormControl, InputGroup, Col, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

// Custom MUI button
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[700]),
  backgroundColor: green[700],
  boxShadow: "none",
  "&:hover": {
    backgroundColor: green[900],
    color: theme.palette.getContrastText(green[700]),
    boxShadow: "none",
  },
}));

// Read more button navigates to detail page of the plant
const ReadMore = (navigate, id) => {
  //console.log(id)
  navigate("/plant/" + id);
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  // Asynchronous function that is called when the search form is submitted.
  // It makes a GET request to the Plant API using axios, passing the query and the ACCESS_KEY as parameters.
  // If succesful, set the plant state with the received data.
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://perenual.com/api/species-list?page=1&key=${ACCESS_KEY}`,
        // Get your own access key, when registering into perenual.com
        {
          params: { q: query },
        }
      );
      console.log("Search query:", query);
      console.log("Result:", response.data.data);
      setList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  let plantList;
  // Based on the list state, the plantList variable is populated.
  // If the list contains items, it maps through each item and renders them in a column.
  if (list !== null) {
    if (list.length > 0) {
      plantList = list.map((item) => (
        <Col key={item.id} md={4} className="pb-4 img-column">
          <div className="wrapper">
            {/* If the default_image exists, it is displayed; otherwise, the imgnotfound image is shown. */}
            {item.default_image.regular_url ? (
              <img
                src={item.default_image.regular_url}
                alt={item.common_name}
                className="img-fluid"
              />
            ) : (
              <img src={imgnotfound} alt="Not Found" className="img-fluid" />
            )}
            <br />
            <h4>{item.common_name}</h4>
            <p style={{ fontStyle: "italic" }}>{item.scientific_name}</p>
            <Button
              variant="outlined"
              onClick={() => ReadMore(navigate, item.id)}
            >
              Read more
            </Button>
          </div>
        </Col>
      ));
    } else {
      // Message will be displayed if the list is empty.
      plantList = <p>No plants found.</p>;
    }
  }

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center flex-column container-fluid custom-container form">
        <h1>Search plant</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          <br/>Praesent molestie ac quam porta cursus. Aliquam id tellus nec orci 
          <br/>pulvinar maximus id dapibus arcu. Ut lobortis felis in dolor gravida venenatis.
        </p>
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
      </Container>
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <Row className="mt-5 plants">{plantList}</Row>
      </Container>
    </>
  );
};

export default Search;
