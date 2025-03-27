import { Navigate } from "react-router-dom";

export const protect = (element) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/sign-in" />;
};
