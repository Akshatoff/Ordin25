import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (!swiper) {
      console.error("Swiper not initialized yet.");
      return;
    }

    const totalSlides = swiper.slides.length;
    const scrollDuration = totalSlides * 1000; // Increase for slower effect

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollDuration}`,
      scrub: 5, // High scrub value for ultra-smooth transition
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        if (!swiper.slides) return;
        const progress = self.progress * (totalSlides - 1);
        gsap.to(swiper, {
          duration: 1.5, // Controls smoothness of animation
          ease: "power3.out", // Eases movement
          onUpdate: () => {
            swiper.translateTo(-progress * swiper.width, false);
          },
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div className="section" id="team" ref={containerRef}>
      <h1 className="text" id="heading">Meet The Team</h1>

      <Swiper
        ref={swiperRef}
        spaceBetween={50}
        slidesPerView={1.5}
        centeredSlides={true}
        loop={false}
        allowTouchMove={false} // Prevent manual dragging
        speed={800} // Slower transition speed
        onSwiper={(swiper) => (swiperRef.current = { swiper })}
      >
        {[...Array(9)].map((_, index) => (
          <SwiperSlide key={index}>
            <div className="card-team"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Team;
