import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [displayedText1, setDisplayedText1] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");
  const [displayedText3, setDisplayedText3] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const fullText1 = "I'm a Software Engineer and Cloud Specialist currently pursuing my Master's in Computer Software Engineering at Northeastern University. My passion lies in building resilient, scalable infrastructure and automating complex systems in the cloud.";
  const fullText2 = "Through my experience at Calix, Elanco, and Bosch, I've specialized in Site Reliability Engineering (SRE), cloud infrastructure automation, and DevOps practices. I work extensively with AWS, GCP, Kubernetes, Terraform, and CI/CD pipelines to design systems that are both reliable and efficient.";
  const fullText3 = "What excites me most is solving infrastructure challenges—whether it's automating database deployments, hardening CI/CD pipelines, or designing monitoring systems that prevent incidents before they happen. I'm always exploring new cloud technologies and contributing to infrastructure-as-code projects that make systems more maintainable and scalable.";

  const typeText = (text: string, setText: (text: string) => void, onComplete: () => void) => {
    let currentIndex = 0;
    const typingSpeed = 15; // milliseconds per character

    const type = () => {
      if (currentIndex < text.length) {
        setText(text.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(type, typingSpeed);
      } else {
        onComplete();
      }
    };

    type();
  };

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

      // Typing animation trigger
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 75%",
        onEnter: () => {
          if (!isTyping) {
            setIsTyping(true);
            typeText(fullText1, setDisplayedText1, () => {
              setTimeout(() => {
                typeText(fullText2, setDisplayedText2, () => {
                  setTimeout(() => {
                    typeText(fullText3, setDisplayedText3, () => {});
                  }, 300);
                });
              }, 300);
            });
          }
        },
        once: true
      });
    });

    return () => ctx.revert(); 
  }, [isTyping]);

  return (
    <section
      id="about"
      className="py-16 sm:py-20 md:py-24 relative"
      ref={sectionRef}
    >
      <div className="section-container">
        <h2 ref={headingRef} className="section-title">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div ref={contentRef} className="order-2 md:order-1 min-h-[400px] sm:min-h-[450px]">
            <p className="text-body mb-6 min-h-[3rem] sm:min-h-[3.5rem]">
              {displayedText1}
              {displayedText1.length < fullText1.length && (
                <span 
                  className="inline-block w-2 h-5 bg-black ml-1 align-middle"
                  style={{ animation: 'blink 1s infinite' }}
                />
              )}
            </p>

            <p className="text-body mb-6 min-h-[3rem] sm:min-h-[3.5rem]">
              {displayedText2}
              {displayedText2.length < fullText2.length && displayedText1.length === fullText1.length && (
                <span 
                  className="inline-block w-2 h-5 bg-black ml-1 align-middle"
                  style={{ animation: 'blink 1s infinite' }}
                />
              )}
            </p>

            <p className="text-body min-h-[3rem] sm:min-h-[3.5rem]">
              {displayedText3}
              {displayedText2.length === fullText2.length && displayedText1.length === fullText1.length && (
                <span 
                  className="inline-block w-2 h-5 bg-black ml-1 align-middle"
                  style={{ animation: 'blink 1s infinite' }}
                />
              )}
            </p>
          </div>

          <div ref={imageRef} className="flex justify-center order-1 md:order-2 sticky top-20">
            <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 overflow-hidden border-2 border-black rounded-full">
              <img
                src="/images/profile/profile-pic.jpg"
                alt="Suhas Reddy - Software Engineer & Cloud Specialist"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
