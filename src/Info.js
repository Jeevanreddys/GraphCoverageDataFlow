// import React from 'react';
// import { useHistory } from 'react-router-dom';

// function Info() {
//     const history = useHistory();

//   const goToHome = () => {
//     history.push('/'); // Navigate to the home page
//   };
//   return (
//     <div>
//       <h1>About Us</h1>
//       <div style={{ display: 'flex' }}>
//         <div style={{ flex: 1 }}>
//           <h2>Project</h2>
//           <p>Graph Coverage Data Flow</p>
//         </div>
//         <div style={{ flex: 1 }}>
//           <h2>Description</h2>
//           <p>The project's outcome includes visual CFG representations and indentified 'def-use' chains.</p>
//         </div>
//       <button onClick={goToHome}>Home</button>
//     </div>
//     </div>
//   );
// }

// export default Info;

import React from 'react';
import { Link } from 'react-router-dom';

const Info = () => {
  return (
    <div>
      <h1>About Us</h1>
      <div>
        <h2>Project</h2>
        <p>Graph Coverage Data Flow</p>
      </div>
      <div>
        <h2>Description</h2>
        <p>The project's outcome includes visual CFG representations and indentified 'def-use' chains.</p>
      </div>
      <Link to="/">Home</Link>
      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default Info;