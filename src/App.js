import "./App.css";
import Form from "./components/queryForm/Form";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProblemPage from "./components/problemPage/ProblemPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Form></Form>}></Route>
          <Route path="/:id" element={<ProblemPage></ProblemPage>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
