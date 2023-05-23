import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Search from './components/Search';
import Menu from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Plant from './components/Plant';

const App = () => {
  return (
    <>
        <Router>
          <Menu/>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/plant/:id" element={<Plant />} />
          </Routes>
        </Router>
    </>
  );
};

export default App;
