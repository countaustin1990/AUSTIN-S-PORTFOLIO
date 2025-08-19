"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "The Spine Clinic",
    description: "An Orthopedic and Spine Care",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FTheSpineClinics%2F&psig=AOvVaw0PaQUT-PiciTVjMUq_sSmd&ust=1755693311305000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJj0nsXxlo8DFQAAAAAdAAAAABAK",
    tags: ["Vite.js", "React", "Tailwind CSS", "Firebase"],
    liveUrl: "https://tsc-1990.vercel.app/",
    githubUrl: "https://github.com/countaustin1990/tsc-1990.git",
  },
  {
    title: "AL'apparel",
    description: "A productivity application for managing tasks, deadlines, and team collaboration with real-time updates.",
    image: "https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["React", "Context", "Tailwind Css"],
    liveUrl: "https://three-js-balls.vercel.app/Home",
    githubUrl: "#",
  },
  {
    title: "Jinja Herbal product produced by Multistream Limited",
    description: "Jinja Herbal product produced by Multistream Limited is a herbal product made from natural ingredients designed to promote overall health and well-being.",
    image: "https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Next.js", "MongoDB", "AWS S3", "Tailwind CSS"],
    liveUrl: "https://jinija-with-dominic-sigma.vercel.app/",
    githubUrl: "https://github.com/countaustin1990/Jinija-With-Dominic.git",
  },
  {
    title: "Medical Study Lecture Platform",
    description: "An analytics dashboard for financial data visualization with interactive charts and data filtering capabilities.",
    image: "https://images.pexels.com/photos/7567460/pexels-photo-7567460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["React", "D3.js", "TypeScript", "Styled Components"],
    liveUrl: "https://medical-study-lecture-platform.vercel.app/",
    githubUrl: "https://github.com/countaustin1990/Medical-Study-Lecture-Platform.git",    
  },
];

export default function Projects() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore some of my recent work that demonstrates my capabilities and approach to solving complex problems.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden h-full border-transparent transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Button variant="default" size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}