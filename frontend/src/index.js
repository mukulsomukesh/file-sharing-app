import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import './index.css';
import { Provider } from 'react-redux';
import { store } from "./redux/store"
const root = ReactDOM.createRoot(document.getElementById('root'));


const colors = {
  primary: {
    50: '#fafdfd',
    100: '#ecf9f8',
    200: '#c9e6e7',
    300: "#77cfd2",
    400: '#00a6ab',
    500: '#275556',
  },
  secondry: {
    50: '#415570',
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
