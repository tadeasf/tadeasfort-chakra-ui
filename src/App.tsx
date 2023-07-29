import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Milestones from "./components/timeline";
import Contact from "./components/contact";
import Blog from './components/Blog';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/" element={
          <>
            <Hero />
            <Milestones />
          </>
        }/>
      </Routes>
      <Footer />
    </Router>
  </ChakraProvider>
);
