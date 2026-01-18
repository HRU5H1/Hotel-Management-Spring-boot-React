
// src/utils/ApiFunctions.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:9192',
});



export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append('photo', photo);
  formData.append('roomType', roomType);
  formData.append('roomPrice', roomPrice);

  try {
    const response = await api.post('/rooms/add/new-room', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Treat any 2xx as success
    const ok = response.status >= 200 && response.status < 300;

    // Try to pull a friendly message from backend
    const serverMessage =
      response.data?.message ||
      response.data?.msg ||
      response.statusText ||
      'Room added successfully';

    return { ok, message: serverMessage, data: response.data };
  } catch (error) {
    // Extract readable error
    const serverError =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Error adding room';
    // Re-throw so UI can show it
    throw new Error(serverError);
  }
}



/** Function to add a new room in the DB */
// export async function addRoom(photo, roomType, roomPrice) {
//   const formData = new FormData();
//   formData.append('photo', photo);
//   formData.append('roomType', roomType); // fixed key
//   formData.append('roomPrice', roomPrice);

//   try {
//     const response = await api.post('/rooms/add/new-room', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return response.status === 201;
//   } catch (error) {
//     // Propagate a readable message
//     throw new Error(error.response?.data?.message || 'Error adding room');
//   }
// }

/** Function to get all room types from DB */
export async function getRoomTypes() {
  try {
    const response = await api.get('/rooms/room-types');
    return Array.isArray(response.data) ? response.data : [];
  } catch {
    // Fallback so UI still renders even if backend is off
    return ['Single', 'Double', 'Deluxe'];
  }
}


/** Function to get all rooms from DB */
export async function getAllRooms(){
  try{
    const result = await api.get("rooms/all-rooms")
    return result.data

  }catch(error){
    throw new Error("Error Fecting room")
  }
}





// import axios from 'axios'

// export const api =axios.create({
//     baseURL : "http://localhost:9192"
// })

// /*Function to add new room in to the DB */
// export async function addRoom(photo, roomType, roomPrice) {
//     const formData = new FormData()
//     formData.append("photo", photo)
//     formData.append("roomType", roomType)
//     formData.append("roomPrice", roomPrice)

//     const response= await api.post("/rooms/add/new-room", formData)
//     if(response.status===201){
//         return true
//     }
//     else{
//         return false
//     }
    
// }

// /* Function to get all romm types from DB */
// export async function getRoomTypes(){
//     try{
//         const response = await api.get("/rooms/room-types")
//         return response.data
//     }catch(error){
//         throw new Error("Error fetching room types")
//     }
// }