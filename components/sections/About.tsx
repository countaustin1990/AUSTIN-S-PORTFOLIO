"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="aspect-ratio-square relative rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Augustine Akpokonyan"
                width={600}
                height={600}
                className="object-cover rounded-lg"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary/10 rounded-lg w-64 h-64 -z-10"></div>
          </motion.div>

          <div>
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-2">About Me</h2>
              <div className="w-16 h-1 bg-primary mb-6"></div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg mb-4">
              I am Augustine Akpokonyan, a passionate web developer and digital creator with over 5 years of experience crafting exceptional digital experiences.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg mb-4">
              My journey in tech began with a curiosity about how websites work, which led me to pursue a degree in Computer Science. Since then, I have worked with various technologies and frameworks to build solutions that not only look great but also solve real problems.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg mb-6">
              When I am not coding, you can find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers. I believe in continuous learning and pushing the boundaries of what is possible on the web.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button asChild>
                <a href="#" download>
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}