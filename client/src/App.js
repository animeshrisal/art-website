import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import PrivateRoute from "./modules/shared/components/PrivateRoute";
import { AuthenticationProvider } from "./modules/shared/context/AuthContext";
import Login from "./modules/auth/pages/Login"
import Dashboard from "./modules/dashboard/pages/Dashboard";
import Register from "./modules/auth/pages/Register";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthenticationProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </div>
        </Router>
      </QueryClientProvider>
    </AuthenticationProvider>
  );
}

export default App;