import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

function useAxiosSecure() {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("Unauthorized or Forbidden: Logging out the user");
          logOut()
            .then(() => {
              console.log("User logged out successfully");
              navigate('/login');
            })
            .catch((error) => console.log("Error logging out:", error));
        }
        return Promise.reject(error); // Reject the promise after handling the status
      }
    );
  }, [logOut, navigate]); // Add dependencies to avoid stale references
  



  return axiosInstance;
}




export default useAxiosSecure;
