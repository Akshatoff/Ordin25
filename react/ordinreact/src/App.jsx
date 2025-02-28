import { useEffect } from "react";
import "./App.css";
import CircularText from "./components/CircularText";
import BlurText from "./components/BlurText";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Event from "./components/Event";
import Team from "./components/Team";
import "./index.css";

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
      <div className="section" id="home">
        <BlurText
          text="Ordin@trix 25.0"
          delay={150}
          animateBy="words"
          direction="top"
          className="heading"
        />
      </div>

      <Event />
      <Team />
      <Event />
    </ReactLenis>
  );
}

export default App;
