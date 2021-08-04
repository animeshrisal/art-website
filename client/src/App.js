import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import NavBar from "./shared/components/NavBar";

import { AuthenticationProvider } from "./modules/shared/context/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthenticationProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavBar />
        </Router>
      </QueryClientProvider>
    </AuthenticationProvider>
  );
}

export default App;