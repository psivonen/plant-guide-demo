import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//import Header from "./components/Header.js";
import Container from "react-bootstrap/Container";
import Search from './components/Search';
import Menu from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Container className='search-images'>
        <Router>
          <Menu/>
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
};

export default App;
