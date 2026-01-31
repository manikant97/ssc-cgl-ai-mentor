import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import Result from "./pages/Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
