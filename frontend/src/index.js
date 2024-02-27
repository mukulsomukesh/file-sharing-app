import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import { store } from "./redux/store"
const root = ReactDOM.createRoot(document.getElementById('root'));


const colors = {
  primary: {
    50: '#b8c6fa',
    100: '#88a0f6',
    200: '#597af3',
    300: '#2954ef',
  },
  secondry: {
    50: '#f5f6fa',
    50: '#e6eaf3',
  }
}

const theme = extendTheme({ colors })

root.render(
  <Provider store={store} >
    <BrowserRouter>
      <ChakraProvider theme={theme} >
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
