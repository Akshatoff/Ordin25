import React, { use } from 'react'
import { useState, useEffect, useRef } from 'react'
import * as THREE from "three"
import BlurText from './BlurText';

export default function Halo() {
    const vantaRef = useRef(null);
    const [vantaEffect, setvantaEffect] = useState(null);

    useEffect(() => {
        const loadVanta = async () => {
            const VANTA = await import("vanta/dist/vanta.halo.min");
            if (!vantaEffect) {
                setvantaEffect(
                    VANTA.default({
                        el: vantaRef.current,
                        THREE,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.0,
                        minWidth: 200.0,
                    })
                )
            }
        }
        loadVanta();

        return () => {
            if (vantaEffect) {
                vantaEffect.destroy();
            }
        }
    }, [vantaEffect]);
  return (
    <div ref={vantaRef} className="section" id="home">
        <BlurText
          text="Ordin@trix 25.0"
          delay={150}
          animateBy="words"
          direction="top"
          className="heading"
        />
    </div>
  )
}
