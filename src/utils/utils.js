import { Navigate } from "react-router-dom";

export const handleLogout = () =>{
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
}


export const handleLoginError = (error, setOpenSnack, setSnackData) => {
    console.error("Login error:", error.response?.data || error.message);
  
    const errors = error.response?.data;
    let errorMessage = "An error occurred.";
  
    // Check if errors exist and format the message
    if (errors) {
      errorMessage = Object.entries(errors)
        .map(([key, messages]) => `${key}: ${messages.join(', ')}`)
        .join('\n'); // Join with line breaks for better readability
    } else {
      errorMessage = error.message; // Fallback to a generic error message
    }
  
    setOpenSnack(true);
    setSnackData({
      type: "error",
      message: errorMessage,
    });
  };




const ProtectedRoute = ({ children }) => {
  const access_token = localStorage.getItem("access_token");

  if (!access_token) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child components
  return children;
};

export default ProtectedRoute;
