import React, { useState } from 'react';

const TestCaseGeneration = () => {
  const defUseChains = [
    { id: 1, name: 'Chain 1' },
    { id: 2, name: 'Chain 2' },
    // Add more chains as needed
  ];

  const [selectedChains, setSelectedChains] = useState([]);
  const [generatedTestCases, setGeneratedTestCases] = useState([]);

  const handleCheckboxChange = (chainId) => {
    setSelectedChains((prevSelectedChains) =>
      prevSelectedChains.includes(chainId)
        ? prevSelectedChains.filter((id) => id !== chainId)
        : [...prevSelectedChains, chainId]
    );
  };

  const generateTestCases = () => {
    // Placeholder for test case generation logic
    // For demonstration, just list the selected chains
    setGeneratedTestCases(selectedChains.map((id) => `Test Case for Chain ${id}`));
  };

  return (
    <div>
      <h1>Test Case Generation</h1>
      <div>
        {defUseChains.map((chain) => (
          <div key={chain.id}>
            <input
              type="checkbox"
              id={`chain-${chain.id}`}
              checked={selectedChains.includes(chain.id)}
              onChange={() => handleCheckboxChange(chain.id)}
            />
            <label htmlFor={`chain-${chain.id}`}>{chain.name}</label>
          </div>
        ))}
      </div>
      <button onClick={generateTestCases}>Generate Test Cases</button>
      <h2>Generated Test Cases</h2>
      <ul>
        {generatedTestCases.map((testCase, index) => (
          <li key={index}>{testCase}</li>
        ))}
        {/* Navigation Buttons */}
      <button onClick={() => window.location.href = '/'}>Home</button>
      <button onClick={() => window.history.back()}>Back</button>
      </ul>
    </div>
  );
};

export default TestCaseGeneration;