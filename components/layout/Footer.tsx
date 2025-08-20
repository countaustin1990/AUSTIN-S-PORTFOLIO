"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Augustine Akpokonyan</h3>
            <p className="text-muted-foreground mb-4">
              Building digital experiences that make a difference.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="GitHub"
              >
                <a href="https://github.com/countaustin1990" target="_blank" rel="noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="LinkedIn"
              >
                <a href="https://ng.linkedin.com/in/akpokonyan-augustine-b5b423155" target="_blank" rel="noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="Twitter"
              >
                <a href="https://x.com/AAkpokonyan" target="_blank" rel="noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="Email"
              >
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=augustineakpokonyan@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
                

              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Get In Touch</h3>
            <p className="text-muted-foreground mb-2">
              Interested in working together? Feel free to reach out.
            </p>
            <p className="text-muted-foreground">
              Email: <a href="mailto:augustineakpokonyan@gmail.com" className="text-primary hover:underline">contact@example.com</a>
            </p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Augustine Akpokonyan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
