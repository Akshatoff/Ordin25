import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import BlurText from "./components/BlurText";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Event from "./components/Event";
import Team from "./components/Team";
import "./index.css";
import Halo from "./components/Halo";



gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return; // Ensure lenis is defined before accessing properties

    const onScroll = () => {
      ScrollTrigger.update(); // Sync ScrollTrigger with Lenis scrolling
    };

    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return (
    <ReactLenis root>
      <Halo></Halo>
      <Event />
      <Team />
     
    </ReactLenis>
  );
}

export default App;
