// /src/api/login.js
import axios from "axios";

const API_URL = "https://spplindia.org/api/login.php";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      API_URL, 
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data; // Expecting a JSON response with a structure like { success, message, ... }
  } catch (error) {
    console.error("Error in loginUser:", error);
    // Rethrow the error to let the calling component handle it accordingly.
    throw error;
  }
};