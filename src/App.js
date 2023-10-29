import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Search from "./pages/Search";
import Menu from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Plant from "./pages/Plant";
import { Footer } from "./components/Footer";

const App = () => {

  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/plant/:id" element={<Plant />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
