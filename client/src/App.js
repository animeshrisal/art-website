import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import PrivateRoute from "./modules/shared/components/PrivateRoute";
import { AuthenticationProvider } from "./modules/shared/context/AuthContext";
import Login from "./modules/auth/pages/Login"
import Dashboard from "./modules/dashboard/pages/Dashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthenticationProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Router>
      </QueryClientProvider>
    </AuthenticationProvider>
  );
}

export default App;