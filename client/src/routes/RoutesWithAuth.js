import React from "react";
import { AuthProvider } from "../middlewares/authContext";
import ThemeRoutes from "./Router";

const RoutesWithAuth = () => (
  <AuthProvider>
    <ThemeRoutes />
  </AuthProvider>
);

export default RoutesWithAuth;
