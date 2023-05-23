import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import { ACCESS_KEY } from "../config";
import imgnotfound from "../img-notfound.jpg";

const Plant = () => {
  const { id } = useParams(); // Get plant id from the url
  const [plant, setPlant] = useState(null);

  // Runs whenever the plant id changes. 
  // It calls the getData function to fetch plant details.
  useEffect(() => {
    if (id) {
      console.log("Plant id:", id);
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // An async function that uses axios to make a GET request to the API endpoint. 
  // If succesful, set the plant state with the received data.
  const getData = async () => {
    try {
      const response = await axios.get(
        `https://perenual.com/api/species/details/${id}?key=${ACCESS_KEY}` 
        // Get your own access key, when registering into perenual.com
      );
      console.log(response.data)
      setPlant(response.data);
    } catch (error) {
      console.error(error);
    }
  };

// Child component that receives the plant item as a prop and displays the plant details.
const Details = ({ item }) => (
  <Row>
    <Col md={6} className="pb-4">
        {/* If the default_image exists, it is displayed; otherwise, the imgnotfound image is shown. */}
        {item.default_image.medium_url ? (
        <img src={item.default_image.medium_url} alt={item.common_name} className="img-fluid" />
        ) : (
        <img src={imgnotfound} alt="Not Found" className="img-fluid" />
        )}
    </Col>
    <Col md={6} className="pb-4">
      <h4>{item.common_name}</h4>
      <p style={{ fontStyle: "italic" }}>{item.scientific_name}</p>
      <p>{item.description}</p>
    </Col>
  </Row>
  );

  return (
      <Container className="custom-container">
        {/* If the plant state exists, the Details component is rendered with the plant item passed as a prop. */}
        {plant && <Details item={plant} />}
      </Container>
  );

}

export default Plant;
