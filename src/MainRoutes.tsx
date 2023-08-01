/** @format */

import { Route, Routes, useLocation } from "react-router-dom";
import * as React from "react";
import Hero from "./components/hero";
import TechStack from "./components/techStack";
import Stats from "./components/stats";
import Milestones from "./components/timeline";
import Contact from "./components/contact";
import Blog from "./components/Blog";
import SinglePost from "./components/SinglePost";
import Photography from "./components/Photography";
import SingleGallery from "./components/SingleGallery";
import GithubData from "./components/GithubData";
import ReactGA from "react-ga4";

const MainRoutes = () => {
  const location = useLocation();

  React.useEffect(() => {
    // Update Google Analytics with page view each time the route changes
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <Routes>
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<SinglePost />} />
      <Route path="/photography" element={<Photography />} />
      <Route path="/gallery/:slug" element={<SingleGallery />} />
      <Route path="/data" element={<GithubData />} />
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
  );
};

export default MainRoutes; // Don't forget to export the MainRoutes component
