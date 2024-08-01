import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from './context/user.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Router>
    </UserProvider>
  </React.StrictMode>,
)
