import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Import QueryClient & QueryClientProvider from React-Query
import { QueryClientProvider, QueryClient } from "react-query";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { UserContextProvider } from "./Context/UserContext";

import "mapbox-gl/dist/mapbox-gl.css";

// Init Client from QueryClient()
const client = new QueryClient();

ReactDOM.render(
   <React.StrictMode>
      <UserContextProvider>
         <QueryClientProvider client={client}>
            <Router>
               <App />
            </Router>
         </QueryClientProvider>
      </UserContextProvider>
   </React.StrictMode>,
   document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
