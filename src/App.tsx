import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ReactGA from "react-ga4";
import netlifyIdentity from "netlify-identity-widget";

// Initialize Google Analytics
ReactGA.initialize([
  {
    trackingId: "G-9GE564L7WG",
  },
]);

netlifyIdentity.init();

// Lazy load components
const Hero = lazy(() => import("./components/hero"));
const Navbar = lazy(() => import("./components/navbar"));
const Footer = lazy(() => import("./components/footer"));
const Milestones = lazy(() => import("./components/timeline"));
const Contact = lazy(() => import("./components/contact"));
const Blog = lazy(() => import("./components/Blog"));
const SinglePost = lazy(() => import("./components/SinglePost"));
const Stats = lazy(() => import("./components/stats"));
const TechStack = lazy(() => import("./components/techStack"));
const Photography = lazy(() => import("./components/Photography"));
const SingleGallery = lazy(() => import("./components/SingleGallery"));
const GithubData = lazy(() => import("./components/GithubData"));

const theme = extendTheme({
  // Your theme configuration goes here
});

const MainRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Update Google Analytics with page view each time the route changes
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <Routes>
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Suspense fallback={<div></div>}><Blog /></Suspense>} />
      <Route path="/blog/:slug" element={<Suspense fallback={<div></div>}><SinglePost /></Suspense>} />
      <Route path="/photography" element={<Suspense fallback={<div></div>}><Photography /></Suspense>} />
      <Route path="/gallery/:slug" element={<Suspense fallback={<div></div>}><SingleGallery /></Suspense>} />
      <Route path="/data" element={<Suspense fallback={<div></div>}><GithubData /></Suspense>} />
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

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Suspense fallback={<div></div>}>
          <Navbar />
          <MainRoutes />
          <Footer />
        </Suspense>
      </Router>
    </ChakraProvider>
  );
}
