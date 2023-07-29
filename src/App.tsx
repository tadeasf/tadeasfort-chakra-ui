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
import SinglePost from './components/SinglePost'; // import the SinglePost component

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<SinglePost />} /> {/* add this line */}
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
