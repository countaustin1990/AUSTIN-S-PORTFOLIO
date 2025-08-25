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
    image: "https://thespineclinics.com/wp-content/uploads/2024/02/Best-Spine-Surgeon-in-Navi-Mumbai.jpg",
    liveUrl: "https://tsc-1990.vercel.app/",
    githubUrl: "https://github.com/countaustin1990/tsc-1990.git",
  },
  {
    title: "AL'apparel",
    description: "A productivity application for managing tasks, deadlines, and team collaboration with real-time updates.",
    image: "https://media.gettyimages.com/id/2091553646/photo/set-of-fashion-collection-with-trendy-fashion-clothes-and-make-up-cosmetic-products-for-women.jpg?s=612x612&w=gi&k=20&c=gIbVOPeXlKkW-wEPclQOvU36IG5mct4f2QlBpq58qUk=",
    tags: ["React", "Context", "Tailwind Css"],
    liveUrl: "https://three-js-balls-nd8y1jqx9-austech-io.vercel.app/",
    githubUrl: "#",
  },
  {
    title: "Jinja Herbal product produced by Multistream Limited",
    description: "Jinja Herbal product produced by Multistream Limited is a herbal product made from natural ingredients designed to promote overall health and well-being.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBhUIBxMVFhUXGBcYGBUXGRsdHhsZGx4ZHR0fIh4gIygsGyYnJxgdIzEjJSkrLi4uHR8zODMvOCgtLisBCgoKDg0OGxAQGjchHyUyLTc3NzUwNS0yNysrKy01LzUvNzcxLTAvMis3NTcvNzAtNzctLy03ODUvNzAtMjUtN//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQcDBAYBAgj/xAA/EAABAwIFAQQHBQYFBQAAAAABAAIDBBEFBhIhMRMiQVFhFCMycXKBoQdCUpHRFTOCscHhFiRTkvBDYnOisv/EABsBAQADAQEBAQAAAAAAAAAAAAAEBQYDAgEH/8QAKhEBAAEDAwIEBgMAAAAAAAAAAAECAwQREjEFIUFRYfATIjJxobEjgeH/2gAMAwEAAhEDEQA/ALxREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAXM5nztTZef6PITJL/ps5HxHhq9zzjsmD4Z0sMa59RLdsYa0ut4usPD+dlT7ss129TUU05JNy4tJJJ5JUzGx6a/mrnSHO5VMR2doPtQmklvFTx6fN5v/ACXS4HnuDEZBBVgwvPGo3afn3fNVBT9h+iQEEcg7EfJbTirOcCzVT2jRQ3OpX7d3TmF+zztp4TNM4Bo7yudqs2DVpo2XHi7b6LgcKxiWtazDKhznAbRjz8PPyU2+kfTG1QxzfeCFj+rXMjFuTbiNI8/NsOlU4+VZi5M6z5eTpKXNBcf8xGP4T+qnqSrZWR64Dfy7wuCjatqnndTv1wOLT4qrsdVuUVfyfNH5Sr+FRP0dpT+O5ngwU9OY6pPwN5+fgoKLPEk0nq4mgeZN1yj8DnlqXzujkkGo3eATf8ls0MQDtPeOR3hWl7Jq27qOGU+Pfm5NNcbe/CwMOzEyqcGTjQfopob7hVi92k7LoMs46RKKKrOx9k+B8F5xs2ap23E2m530l1yIis3YREQE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",
    tags: ["Next.js", "MongoDB", "AWS S3", "Tailwind CSS"],
    liveUrl: "https://jinija-with-dominic-sigma.vercel.app/",
    githubUrl: "https://github.com/countaustin1990/Jinija-With-Dominic.git",
  },
  {
    title: "Medical Study Lecture Platform",
    description: "An analytics dashboard for financial data visualization with interactive charts and data filtering capabilities.",
    image: "https://i.pinimg.com/736x/e2/93/25/e293252fc61eb4ee89736cbee5345747.jpg",
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
                    {project.tags?.map((tag, i) => (
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
