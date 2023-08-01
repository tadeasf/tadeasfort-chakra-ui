/** @format */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Navbar from "./components/navbar";
import ReactGA from "react-ga4";
import SmallWithSocial from "./components/footer";

// Initialize Google Analytics
ReactGA.initialize([
  {
    trackingId: "G-9GE564L7WG",
  },
]);

const Footer = React.lazy(() => import("./components/footer"));

const MainRoutes = React.lazy(() => import("./MainRoutes")); // Import the modified MainRoutes component

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Navbar />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainRoutes /> {/* Render the MainRoutes component */}
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <MainRoutes />
              </React.Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <MainRoutes />
              </React.Suspense>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <MainRoutes />
              </React.Suspense>
            }
          />
          <Route
            path="/photography"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <MainRoutes />
              </React.Suspense>
            }
          />
          <Route
            path="/gallery/:slug"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <MainRoutes />
              </React.Suspense>
            }
          />
          <Route
            path="/data"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <MainRoutes />
              </React.Suspense>
            }
          />
        </Routes>
      </React.Suspense>
      <SmallWithSocial />
    </Router>
  </ChakraProvider>
);
