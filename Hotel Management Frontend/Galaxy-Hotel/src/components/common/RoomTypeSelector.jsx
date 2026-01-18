

import React, { useEffect, useState } from 'react';
import { getRoomTypes } from '../utils/ApiFunctions';


const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState('');

  useEffect(() => {
    (async () => {
      const types = await getRoomTypes();
      setRoomTypes(types);
    })();
  }, []);

  const handleAddNewRoomType = () => {
    const trimmed = newRoomType.trim();
    if (trimmed !== '') {
      setRoomTypes(prev => [...prev, trimmed]);
      // also set the selected value in parent form
      handleRoomInputChange({ target: { name: 'roomType', value: trimmed } });
      setNewRoomType('');
      setShowNewRoomTypeInput(false);
    }
  };

  return (
    <>
      <select
        className="form-select"
        name="roomType"
        value={newRoom.roomType || ''}
        onChange={(e) => {
          if (e.target.value === '__ADD_NEW__') {
            setShowNewRoomTypeInput(true);
          } else {
            handleRoomInputChange(e);
          }
        }}
      >
        <option value="" disabled>Select a room type</option>
        {roomTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
        <option value="__ADD_NEW__">Add New</option>
      </select>

      {showNewRoomTypeInput && (
        <div className="mt-2 d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new room type"
            value={newRoomType}
            onChange={(e) => setNewRoomType(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleAddNewRoomType}
          >
            Add
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowNewRoomTypeInput(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;







// import React, { useEffect, useState } from 'react'

// const RoomTypeSelector =(handleRoomInputChange, newRoom) =>{
//     const[roomTypes, setRoomTypes]= useState([" "])
//     const[showNewRoomTypeInput, setShowNewRoomTypeInput]= useState(false)
//     const[newRoomType, setNewRoomType]= useState("")

//     useEffect(()=>{
//         getRoomTypes().then((data)=>{
//             setRoomTypes(data)
//         })

//     }, [])

//     const handleNewRoomTypeInputChange = (e)=>{
//         setNewRoomType(e.target.value);
//     }

//     const handleAddNewRoomType =() =>{
//         if(newRoomType !== ""){
//             setRoomTypes({...roomTypes, newRoomType})
//             setNewRoomType("")
//             setShowNewRoomTypeInput(false)
//         }
//     }

//     return(
//         <>

//         {roomTypes.length> 0 &&(
//             <div>
//                 <select
//                 id='roomType'
//                 name='roomType'
//                 value={newRoom.roomType}
//                 onChange={(e)=>{
//                     if(e.target.value==="Add New"){
//                         setShowNewRoomTypeInput(true)
//                     }else{
//                         handleRoomInputChange(e)
//                     }
//                 }} 
//                 >
//                     <option value={""}>Select a room type</option>
//                     <option value={"Add New"}> Add New</option>

//                     {roomTypes.map((type, index)=>(
//                         <option key={index} value={type}>
//                             {type}
//                         </option>
//                     ))}
//                 </select>

//                 {showNewRoomTypeInput && (
//                     <div className='input-group'>
//                         <input
//                         className='form-control'
//                         type='text'
//                         placeholder='Enter a new room type'
//                         onChange={handleNewRoomTypeInputChange}
//                         />
//                         <button className='btn btn-hotel' type='button' onClick={handleAddRoomType}>
//                             Add    
//                         </button>      
//                     </div>
//                 )}
//             </div>
//         )}
//         </>
//     )
// }

// export default RoomTypeSelector