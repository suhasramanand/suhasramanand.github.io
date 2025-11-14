import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation for the heading
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Reveal animation for the content
      gsap.from(contentRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Reveal animation for the image
      gsap.from(imageRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert(); 
  }, []);

  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="section-container">
        <h2 ref={headingRef} className="section-title text-center">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center mt-12">
          <div ref={contentRef} className="apple-card">
            <p className="text-lg text-gray-700 mb-6">
              I'm a passionate Software Engineer with a focus on building
              scalable, user-friendly applications. Currently pursuing my
              Master's in Computer Software Engineering at Northeastern
              University, I blend strong technical skills with a keen eye for
              design and user experience.
            </p>

            <p className="text-lg text-gray-700 mb-6">
              With industry experience at Elanco and Bosch Global Software
              Technologies, I've developed full-stack applications using modern
              technologies like React, Node.js, and cloud platforms.
            </p>

            <p className="text-lg text-gray-700">
              I enjoy tackling complex problems and am particularly interested
              in cloud architecture, infrastructure automation, and building
              systems that scale. When I'm not coding, you'll find me exploring
              new technologies and contributing to open-source projects.
            </p>
          </div>

          <div ref={imageRef} className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl relative bg-gradient-to-br from-groww-purple/30 to-groww-purple-light/30">
              {/* Profile image */}
              <img
                src="/profile-pic.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
