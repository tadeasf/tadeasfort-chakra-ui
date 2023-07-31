/** @format */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Milestones from "./components/timeline";
import Contact from "./components/contact";
import Blog from "./components/Blog";
import SinglePost from "./components/SinglePost";
import Stats from "./components/stats";
import TechStack from "./components/techStack";
import Photography from "./components/Photography";
import SingleGallery from "./components/SingleGallery";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<SinglePost />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/gallery/:slug" element={<SingleGallery />} />
        <Route
          path="/"
          element={
            <>
              <Hero />
              <TechStack />
              <Stats />
              <Milestones />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  </ChakraProvider>
);
