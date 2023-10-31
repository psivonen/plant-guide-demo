import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import { ACCESS_KEY } from "../config";
import imgnotfound from "../images/img-notfound.jpg";
import { EmojiFrown, ArrowLeft } from "react-bootstrap-icons";
import { ColorButton } from "../components/Styled";

const Plant = () => {
  const { id } = useParams(); // Get plant id from the url
  const [plant, setPlant] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const Search = () => {
    navigate("/plant-guide-demo");
  };

  // Runs whenever the plant id changes. 
  // It calls the getData function to fetch plant details.
  useEffect(() => {
    if (id) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // An async function that uses axios to make a GET request to the API endpoint. 
  // If succesful, set the plant state with the received data.
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://perenual.com/api/species/details/${id}?key=${ACCESS_KEY}` 
        // Get your own access key, when registering into perenual.com
      );
      setPlant(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage('Sorry, data is not available.');
      setIsLoading(false);
    }
  };
  
// Child component that receives the plant item as a prop and displays the plant details.
const Details = ({ item }) => (
  <Container className="custom-container flex-wrap w-100">
    <Container className="d-flex flex-wrap align-items-baseline pb-4 ps-0">
      <h3 className="pe-3 mb-0" style={{textTransform: 'capitalize'}}>{item.common_name}</h3> 
      <h4 className="pe-3 mt-0" style={{ fontStyle: "italic", fontWeight: 'normal' }}>{item.scientific_name}</h4>
    </Container>
    <Row>
    <Col md={6} className="pb-4">
        {/* If the default_image exists, it is displayed; otherwise, the imgnotfound image is shown. */}
        {item.default_image && item.default_image.regular_url ? (
        <img src={item.default_image.regular_url} alt={item.common_name} className="img-fluid" />
        ) : (
        <img src={imgnotfound} alt="Not Found" className="img-fluid" />
        )}
    </Col>
    <Col md={6} className="pb-4">
      <h5>Description</h5>
      <p>{item.description}</p>
      <p>
        <b>Sunlight:</b> {item.sunlight.join(', ')}<br/>
        <b>Watering:</b> {item.watering}<br/>
        <b>Soil:</b> {item.soil.map(soil => soil.trim()).join(', ')}<br />
        <b>Propagation:</b> {item.propagation.join(', ')}
      </p>
    </Col>
  </Row>
  </Container>
  );

  return (
    <>
      {/* If the plant state exists, the Details component is rendered with the plant item passed as a prop. */}
      {/* If the data isn't available, error message is shown instead. */}
      <Container className="d-flex align-content-center justify-content-center align-items-center flex-col mb-5">
        {isLoading ? <span className="loader" style={{marginTop: '100px'}}></span> :
          <>
          {plant ? (
            <Details item={plant} />
          ) : (
            <Container className="d-flex justify-content-center align-items-center flex-column gap-md-3" style={{marginTop: '100px'}}>
              <div className="d-flex flex-row align-items-center"><p className="error-message mb-0 me-2">{errorMessage}</p> <EmojiFrown size={25}/></div>
              <ColorButton onClick={() => Search()}><ArrowLeft className="me-2"/> Back to search</ColorButton>
            </Container>
          )}
          </>
          }
      </Container>
    </>
  );

}

export default Plant;