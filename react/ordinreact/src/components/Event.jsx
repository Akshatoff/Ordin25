import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCards = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      smooth: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const cards = containerRef.current.querySelectorAll(".card:not(:first-child)");

      gsap.fromTo(
        cards,
        {
          x: window.innerWidth / 2 + 500,
          y: window.innerHeight / 2 + 100,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          stagger: 0.5,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: true,
            start: "top top",
            end: "+=5000",
            invalidateOnRefresh: true,
          },
        }
      );

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="container">
      <h1 className="text" id="event-head">Events</h1>
      <div className="cards">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="card"></div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCards;
