"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, 
  PenTool, 
  Database, 
  Layers, 
  Settings, 
  Workflow 
} from "lucide-react";

const skills = [
  {
    category: "Frontend Development",
    icon: <Code />,
    items: ["React.js", "Next.js", "TypeScript", "HTML/CSS", "Tailwind CSS", "Redux"],
  },
  {
    category: "UI/UX Design",
    icon: <PenTool />,
    items: ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"],
  },
  {
    category: "Backend Development",
    icon: <Database />,
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "RESTful APIs", "GraphQL"],
  },
  {
    category: "DevOps & Tools",
    icon: <Settings />,
    items: ["Git", "Docker", "CI/CD", "AWS", "Vercel", "Netlify"],
  },
  {
    category: "Project Management",
    icon: <Workflow />,
    items: ["Agile", "Scrum", "Jira", "Trello", "Client Communication"],
  },
  {
    category: "Other Skills",
    icon: <Layers />,
    items: ["Responsive Design", "Progressive Web Apps", "SEO Optimization", "Accessibility"],
  },
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">My Skills & Expertise</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's a comprehensive overview of my technical skills and areas of expertise that I've developed over years of professional experience.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 bg-primary/10 p-3 rounded-full text-primary">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <span
                        key={i}
                        className="bg-secondary text-secondary-foreground text-sm rounded-full px-3 py-1"
                      >
                        {item}
                      </span>
                    ))}
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