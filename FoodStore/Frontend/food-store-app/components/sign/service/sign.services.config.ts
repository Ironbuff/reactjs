import axios from "axios";

export const SignUser = async (data:any) => {
  try {
    // Added http:// to the URL and fixed the headers object
    const response = await axios.post('http://localhost:8081/auth/sign', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Return the actual response data so your app can use it
    return response.data; 
    
  } catch (error) {
    // Added basic error handling
    console.error("Error signing user:", error);
    throw error; 
  }
};