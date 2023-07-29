import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import BlogCards from "./components/blogCards";
import MissionSection from "./components/missionSection";
import Milestones from "./components/timeline";
import Contact from "./components/contact";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={
          <>
            <Hero />
            <Milestones />
            <BlogCards />
          </>
        }/>
      </Routes>
      <Footer />
    </Router>
  </ChakraProvider>
);
