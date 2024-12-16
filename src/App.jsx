import { Route, Routes } from "react-router";
import { useState } from "react";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayput from "./layout/DashboardLayput";
import NotFound from "./pages/NotFound";

function App() {
  const token = localStorage.getItem("token");

  const [isAuthenticated, setIsAuthenticated] = useState(token ?? false);

  const login = () => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthLayout isAuthenticated={isAuthenticated} loginState={login} />
        }
      />
      <Route
        path="/dashboard"
        element={<DashboardLayput isAuthenticated={isAuthenticated} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
