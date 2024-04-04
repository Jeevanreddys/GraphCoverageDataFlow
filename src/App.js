import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Info from './Info';
import GenerateCFG from './GenerateCFG';
import Dataflowanalysis from './Dataflowanalysis';
import TestCaseGeneration from './Testcasegeneration';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/info">Info</Link></li>
            <li><Link to="/generate-cfg">Generate CFG</Link></li>
            <li><Link to="/data-flow-analysis">Data Flow Analysis</Link></li>
            <li><Link to="/test-case-generation">Test Case Generation</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/info" element={<Info />} />
          <Route path="/generate-cfg" element={<GenerateCFG />} />
          <Route path="/data-flow-analysis" element={<Dataflowanalysis />} />
          <Route path="/test-case-generation" element={<TestCaseGeneration />} />
          <Route path="/" element={<h1>Welcome to the GCDF</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
