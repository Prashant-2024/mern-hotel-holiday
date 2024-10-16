import { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  // make a POST request to the server
  // we made API_BASE_URL a global variable in the .env file in case we need to change the URL in the future or we deploy the app to a different server
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      // tells the server that the request body is in JSON format
      "Content-Type": "application/json",
    },
    // convert the formData object to a JSON string
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  // if the response status code is not 200, throw an error
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
