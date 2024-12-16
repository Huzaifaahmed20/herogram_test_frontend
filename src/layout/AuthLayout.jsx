import React from "react";
import { Navigate } from "react-router";
import Login from "../pages/Login";

export default function AuthLayout({ isAuthenticated, loginState }) {
  return !isAuthenticated ? <Login loginState={loginState} /> : <Navigate to="/dashboard" />;
}
