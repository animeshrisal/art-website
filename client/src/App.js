import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import PrivateRoute from "./modules/shared/components/PrivateRoute";
import { AuthenticationProvider } from "./modules/shared/context/AuthContext";
import Login from "./modules/auth/pages/Login";
import Dashboard from "./modules/dashboard/Dashboard";
import Register from "./modules/auth/pages/Register";
import ConfirmUser from "./modules/auth/pages/ConfirmUser";
import { SocketProvider } from "./modules/shared/context";
import './App.scss'

const queryClient = new QueryClient();

function App() {

  return (
    <AuthenticationProvider>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route path="/auth/:uid/:token" component={ConfirmUser} />
              <PrivateRoute path="/dashboard/" component={Dashboard} />
            </div>
          </Router>
        </QueryClientProvider>
      </SocketProvider>
    </AuthenticationProvider>
  );
}

export default App;
