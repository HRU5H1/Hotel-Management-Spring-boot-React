
// src/App.jsx
import React from 'react';
import AddRoom from './components/room/AddRoom';
import ExistingRooms from './components/room/ExistingRooms';
import RoomFilter from './components/common/RoomFilter';
import RoomPaginator from './components/common/RoomPaginator';
import RoomTypeSelector from './components/common/RoomTypeSelector';


export default function App() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Galaxy Hotel</span>
        </div>
      </nav>

      <AddRoom />

      <footer className="footer d-flex align-items-center justify-content-center">
        <small className="text-muted"> {new Date().getFullYear()} Galaxy Hotel</small>
      </footer>
    </div>
  );
}








// import { useState } from 'react';
// import AddRoom from './components/room/AddRoom';

// export default function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <AddRoom />

//       {/* quick sanity UI so you see something even if AddRoom has issues */}
//       <div style={{ padding: 16 }}>
//         <h1>Galaxy Hotel</h1>
//         <button className="btn btn-hotel" onClick={() => setCount(c => c + 1)}>
//           Count is {count}
//         </button>
//       </div>
//     </>
//   );
// }
