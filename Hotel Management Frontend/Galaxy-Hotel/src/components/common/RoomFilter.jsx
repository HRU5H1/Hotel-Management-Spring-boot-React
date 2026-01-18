
import React, { useState, useMemo } from "react";

const RoomFilter = ({ data = [], setFilteredData }) => {
  const [filter, setFilter] = useState("");

  // Compute unique room types from data
  const roomTypes = useMemo(() => {
    const types = Array.from(new Set(data.map((r) => r.roomType || ""))).sort();
    return ["", ...types]; // "" will represent "All"
  }, [data]);

  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);

    if (!selectedRoomType) {
      setFilteredData(data); // show all
      return;
    }

    const filteredRooms = data.filter((room) =>
      String(room.roomType || "")
        .toLowerCase()
        .includes(selectedRoomType.toLowerCase())
    );
    setFilteredData(filteredRooms);
  };

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor="roomType">
        <strong>Filter Rooms by Type</strong>
      </label>
      <br />
      <select
        id="roomType"
        value={filter}
        onChange={handleSelectChange}
        style={{ padding: 8, marginTop: 8, minWidth: 240 }}
      >
        {roomTypes.map((type, index) => (
          <option key={`${type}-${index}`} value={type}>
            {type ? String(type) : "All"}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={clearFilter}
        style={{ marginLeft: 12, padding: "8px 12px" }}
      >
        Clear Filter
      </button>
    </div>
  );
};

export default RoomFilter;




// import React, { useState } from 'react'

// const RoomFilter = (data, setFilteredData) => {

//     const [filter, setFilter] = useState("")

//     const handleSelectChange = (e) => {
//         const selectedRoomType = e.target.value
//         setFilter(selectedRoomType)
//         const filteredRooms = data.filter((room) =>
//             room.roomType
//                 .toLowerCase()
//                 .includes(selectedRoomType.toLowerCase()))

//         setFilteredData(filteredRooms)
//     }

//     const clearFilter = () => {
//         setFilter("")
//         setFilteredData(data)
//     }

//     const roomTypes = ["", ...new set(data.map((room) => room.roomType))]

//     return (
//         <div className='input-group mb-3'>
//             <span className='input-group-text' id='room-Type-filter'>
//                 Filter Rooms by Types
//             </span>
//             <section
//                 className='form-select'
//                 aria-label='room type filter'
//                 value={filter}
//                 onChange={handleSelectChange}>
//                 <option value="">Slect a room type to filter...</option>
//                 {roomTypes.map((type, index) => (
//                     <option key={index} value={String(type)}>
//                         {String(type)}
//                     </option>
//                 ))}
//             </section>
//             <button className='btn btn-hotel' type="buttton" onClick={clearFilter}>
//                 Clear Filter
//             </button>
//         </div>
//     )
// }

// export default RoomFilter