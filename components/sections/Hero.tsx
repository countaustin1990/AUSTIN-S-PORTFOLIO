"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const demoSteps = [
  {
    title: "Browse Projects",
    description: "Explore my portfolio of web applications and digital solutions.",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Check Skills",
    description: "Review my technical expertise and professional capabilities.",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Get in Touch",
    description: "Reach out through the contact form for collaboration opportunities.",
    image: "https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export default function Hero() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-4 z-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                <span className="text-primary"></span>
                <br />I create exceptional digital experiences
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                A creative developer with a passion for building beautiful, functional, and accessible web applications that solve real problems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" asChild>
                <a href="#projects">View My Work <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">Get In Touch</a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hidden lg:block"
          >
            <Card className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">How to Navigate</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause demo" : "Play demo"}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="relative h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={demoSteps[currentStep].image}
                        alt={demoSteps[currentStep].title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <h4 className="text-xl font-medium mb-2">
                      {demoSteps[currentStep].title}
                    </h4>
                    <p className="text-muted-foreground">
                      {demoSteps[currentStep].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {demoSteps.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      currentStep === index ? "bg-primary" : "bg-muted"
                    }`}
                    onClick={() => {
                      setCurrentStep(index);
                      setIsPlaying(false);
                    }}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20" />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        onClick={scrollToNext}
        aria-label="Scroll to About section"
      >
        <ArrowDown className="h-6 w-6" />
      </Button>
    </section>
  );
}