
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from "./theme";
import { AuthProvider } from "./components/AuthContext"; // ensure correct path
import ErrorBoundary from "./components/ErrorBoundary";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

