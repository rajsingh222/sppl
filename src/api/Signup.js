// /src/api/signup.js
import axios from "axios";

const API_SIGNUP_URL = "https://spplindia.org/api/signup.php";

export const signupUser = async (fullName, email, userName, password, alternateEmail, phoneNumber, address, idProofType, idProofNumber) => {
  console.log("Signing up with data:", {
          fullName,
          email,
          userName,
          password,
          alternateEmail,
          phoneNumber,
          address,
          idProofType,
          idProofNumber,
        });
  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("email", email);
  formData.append("userName", userName);
  formData.append("password", password);
  formData.append("alternateEmail", alternateEmail);
  formData.append("phoneNumber", phoneNumber);
  formData.append("address", address);
  formData.append("idProofType", idProofType);
  formData.append("idProofNumber", idProofNumber);
  console.log("Form Data entries:");
for (let [key, value] of formData.entries()) {
  console.log(`${key}: ${value}`);
}


  try {
    const response = await axios.post(API_SIGNUP_URL, formData);
    return response.data; // Expecting a text or JSON response from your backend
  } catch (error) {
    // If an error response exists, use its data; otherwise, fallback to a generic error message
    if (error.response && error.response.data) {
      throw new Error("Error " + error.response.data);
    }
    throw new Error("An error occurred while signing up.");
  }
};