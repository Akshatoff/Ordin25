
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)
    // gsap code here!
   });

   gsap.fromTo(
    ".card:not(:first-child)",
    {
        x: () => window.innerWidth / 2 + 500,
        y: () => window.innerHeight / 2 + 100,
        opacity: 0,


    },
    {
        x: 0,
        y: 0,
        stagger: 0.5,
        opacity: 1,
        scrollTrigger: {
            pin: ".container",
            scrub: true,
            start: "top top",
            end: "+=5000",
            invalidateOnRefresh: true,
            
        }
    }
   )

//    Team


// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);
