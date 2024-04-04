// // import React, { useState } from 'react';

// // const GenerateCFG = () => {
// //   const [pythonCode, setPythonCode] = useState('');
// //   const [generatedCFG, setGeneratedCFG] = useState('');

// //   const handleCodeChange = (e) => {
// //     setPythonCode(e.target.value);
// //   };

// //   const generateCFG = () => {
// //     // Logic to generate CFG from the input Python code
// //     // This is a placeholder and should be replaced with actual implementation
// //     setGeneratedCFG('Generated CFG will be displayed here');
// //   };

// //   return (
// //     <div>
// //       <h1>Control Flow Graph Generator</h1>
// //       <div>
// //         <label htmlFor="pythonCode">Enter Python Code:</label>
// //         <textarea id="pythonCode" value={pythonCode} onChange={handleCodeChange} rows="10" cols="50" />
// //       </div>
// //       <button onClick={generateCFG}>Generate CFG</button>
// //       <h2>Generated CFG</h2>
// //       <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px' }}>
// //         {generatedCFG}
// //       </div>
// //     </div>
// //   );
// // };

// // export default GenerateCFG;
import React, { useState } from 'react';
import axios from 'axios';

const GenerateCFG = () => {
  const [pythonCode, setPythonCode] = useState('');
  const [generatedCFG, setGeneratedCFG] = useState('');

  const handleCodeChange = (e) => {
    setPythonCode(e.target.value);
  };

  const generateCFG = async () => {
    try {
      const response = await axios.post('/generate-cfg', { pythonCode });
      setGeneratedCFG(response.data);
    } catch (error) {
      console.error('Error generating CFG:', error);
      setGeneratedCFG('Error generating CFG. Please check the console for details.');
    }
  };

  return (
    <div>
      <h1>Control Flow Graph Generator</h1>
      <div>
        <label htmlFor="pythonCode">Enter Python Code:</label>
        <textarea id="pythonCode" value={pythonCode} onChange={handleCodeChange} rows="10" cols="50" />
      </div>
      <button onClick={generateCFG}>Generate CFG</button>
      <h2>Generated CFG</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px' }}>
        {generatedCFG}
      </div>
    </div>
  );
};

export default GenerateCFG;

// import React, { useState } from 'react';
// import axios from 'axios';

// const GenerateCFG = () => {
//   const [pythonScript, setPythonScript] = useState('');
//   const [cfgImage, setCfgImage] = useState(null);

//   const handlePythonScriptChange = (event) => {
//     setPythonScript(event.target.value);
//   };

//   const generateCFG = async () => {
//     try {
//       const response = await axios.post('/generate-cfg', { pythonScript });
//       setCfgImage(response.data.cfgImage);
//     } catch (error) {
//       console.error('Error generating CFG:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Control Flow Graph Generator</h1>
//       <div>
//         <label htmlFor="python-script">Enter Python script:</label>
//         <textarea
//           id="python-script"
//           value={pythonScript}
//           onChange={handlePythonScriptChange}
//           rows={10}
//           cols={50}
//         />
//       </div>
//       <button onClick={generateCFG}>Generate CFG</button>
//       {cfgImage && (
//         <div>
//           <h2>Generated Control Flow Graph:</h2>
//           <img src={`data:image/png;base64,${cfgImage}`} alt="Control Flow Graph" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default GenerateCFG;