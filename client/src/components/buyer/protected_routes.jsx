import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means loading

  useEffect(() => {
    // Check if the user is authenticated by calling the backend /istoken
    const checkAuth = async () => {
      const response = await fetch('http://localhost:4000/api/buyer/istoken', 
        {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent along with the request
      });
      const data = await response.json();
      console.log(data)
      if (data === 'No') {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  // While checking the auth state, you can show a loading spinner or placeholder
  if (isAuthenticated === null) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (protected component)
  return children;
};

export default ProtectedRoute;
