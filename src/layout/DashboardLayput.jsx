import React from "react";
import { Navigate } from "react-router";
import Dashboard from "../pages/Dashboard";

export default function DashboardLayput({ isAuthenticated }) {
  return isAuthenticated ? <Dashboard /> : <Navigate to="/" />;
}
