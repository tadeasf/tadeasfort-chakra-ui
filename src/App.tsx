import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Hero from "./components/hero"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import BlogCards from "./components/blogCards"
import MissionSection from "./components/missionSection"
import Milestones from "./components/timeline"
import Contact from "./components/contact"

export const App = () => (
  <ChakraProvider theme={theme}>
<Navbar />
<Hero />
<Milestones />
<BlogCards />
<Footer />
  </ChakraProvider>
)
