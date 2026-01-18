
import React, { useState } from 'react';
import { addRoom } from '../utils/ApiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector';


const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: '',
    roomPrice: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === 'roomPrice') {
      // allow only digits; keep as string for controlled input
      if (value !== '' && !/^[0-9]+$/.test(value)) {
        return; // ignore invalid keystroke
      }
    }

    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files?.[0];
    if (!selectedImage) return;
    setNewRoom((prev) => ({ ...prev, photo: selectedImage }));
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const priceNumber = newRoom.roomPrice === '' ? 0 : Number(newRoom.roomPrice);
      const success = await addRoom(newRoom.photo, newRoom.roomType, priceNumber);
      if (success === true) {
        setSuccessMessage('A new room added to the database');
        setNewRoom({ photo: null, roomType: '', roomPrice: '' });
        setImagePreview('');
      } else {
        setErrorMessage('Error adding room');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Unexpected error');
    }
    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h2 className="mb-0">Add a New Room</h2>
          {successMessage && (
            <div className='alert alert-success fade show'>{successMessage}</div>
          )}

          {errorMessage && (
            <div className='alert alert-danger fade show'>{errorMessage}</div>
          )}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Room Type</label>
              <RoomTypeSelector
                newRoom={newRoom}
                handleRoomInputChange={handleRoomInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Room Price</label>
              <input
                type="text"
                name="roomPrice"
                className="form-control"
                placeholder="e.g., 2500"
                value={newRoom.roomPrice}
                onChange={handleRoomInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Room Photo</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview Room Photo"
                    className="img-fluid rounded"
                    style={{ maxHeight: 200, objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-hotel">Save Room</button>
            </div>
          </form>

          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger mt-3">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddRoom;









// import React, { useState } from 'react'
// import { addRoom } from '../utils/ApiFunctions'
// import RoomTypeSelector from '../common/RoomTypeSelector'

// const AddRoom =() =>{
//     const[newRoom, setNewRoom] = useState({
//         photo : null, 
//         roomType : "",
//         roomPrice :" "
//     })

//     const[imagePreview, setImagePreview] = useState("")
//     const[successMessage, setSuccessMessage] = useState("")
//     const[errorMessage, setErrorMessage] = useState("")


//     const handleRoomInputChange= (e)=>{
//         const name = e.target.name
//         let value = e.target.value

//         if(name==="roomPrice"){
//             if(!isNaN(value)){
//                 value.parseInt(value)     
//             }else{
//             value=""
//             }
//         }

//         setNewRoom({...newRoom, [name]: value})
//     }


//     const handleImageChange = (e)=>{
//         const selectedImage = e.target.files[0]
//         setNewRoom({...newRoom, photo: selectedImage})
//         setImagePreview(URL.createObjectURL(selectedImage))

//     }

//     const handleSubmit = async(e)=>{
//         e.preventDefault()
//         try{
//             const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
//             if(success != undefined){
//                 setSuccessMessage("A new room added to the database")
//                 setNewRoom({photo:null, roomType:"", roomPrice:""})
//                 setImagePreview("")
//                 setErrorMessage("")

//             }else{
//                 setErrorMessage("Error adding room")
//             }

//         }catch(error){
//             setErrorMessage(error.message)
//         }
//     }


//     return (
//     <>
//         <section className="container, mt-5 mb-5">
//             <div className="roe justify-content-center">
//                 <div className="col-md-8 col-lg-6">
//                     <h2 className="mt-5 mb-2">Add a New Room</h2>
//                     <form onSubmit={handleSubmit}> 
//                         <div className="mb-3">
//                             <label htmlFor="RoomType" className="form-label">
//                                 Room Type
//                             </label>
//                             <div>
//                                 <RoomTypeSelector handleRoomInputChange = {handleRoomInputChange}
//                                  newRoom= {newRoom}/>
//                             </div>
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="RoomPrice" className="form-label">
//                                 Room Price
//                             </label>
//                             <input className="form-control" 
//                             required
//                             id ="roomPrice"
//                             type="number"
//                             name="roomPrice"
//                             value={newRoom.roomPrice}
//                             onChange={handleRoomInputChange}
//                             />    
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="photo" className="form-label">
//                                 Room Photo
//                             </label>
//                             <input
//                             id="photo"
//                             name="photo"
//                             type="file"
//                             className="form-control"
//                             onChange={handleImageChange}
//                             />
//                             {imagePreview && (
//                                 <img src={imagePreview}
//                                 alt="Preview Room Photo"
//                                 style={{maxWidth: "400px", maxHeight:"400px"}}
//                                 className="mb-3" />
//                             ) }


//                         </div>
                        
//                         <div className="d-grid d-md-flex mt-2">
//                             <button className="btn btn-outline-primary ml-5">
//                                 Save Room
//                             </button>
//                         </div>

//                     </form>
//                 </div>
//             </div>
//         </section>
//     </>


//     )
// }

// export default AddRoom
