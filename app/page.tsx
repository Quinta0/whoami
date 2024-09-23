"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {JSX, SVGProps, useState} from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {Github, Linkedin, MenuIcon} from "lucide-react";
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const skills = [
    "IT Support", "Data Analysis", "Python", "R", "SQL", "Network Architecture",
    "Network Security", "Cloud Computing", "Data Visualization", "Machine Learning",
    "Statistical Analysis", "Database Management", "Linux", "Git", "Agile Methodologies",
    "Project Management", "Business Analysis", "Critical Thinking"
  ];

  const certifications = [
    {
      name: "Google IT Support Professional Certificate",
      issuer: "Google",
      image: "/certificates/Coursera_RZ1V4RU6JP2D.png"
    },
    {
      name: "Google Data Analytics Professional Certificate",
      issuer: "Google",
      image: "/certificates/Coursera_EN181NFH7VYT.png"
    },
    {
      name: "IBM Python for Data Science, AI & Development",
      issuer: "IBM",
      image: "/certificates/Coursera_QT9WT5VCHJNU.png"
    }
  ];
  return (
      <div className="bg-[#00004d] text-white font-['Segoe UI', 'FiraCode'] min-h-screen">
        <header className="py-4 px-6 flex items-center justify-between border-b border-[#4d4dff]">
          <div className="flex items-center gap-4">
            <TerminalIcon className="w-8 h-8" aria-hidden="true" />
            <h1 className="text-2xl font-semibold">Pietro Quintavalle</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {["About", "Skills", "Portfolio", "Certifications"].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#4d4dff] transition-colors p-2">
                  {item}
                </Link>
            ))}
          </nav>
          <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </header>

        {/* Mobile menu */}
        {mobileMenuOpen && (
            <div className="md:hidden bg-[#0000b3] py-2">
              {["About", "Skills", "Certifications", "Portfolio"].map((item) => (
                  <Link
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block py-2 px-4 text-white hover:bg-[#4d4dff] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
              ))}
            </div>
        )}
        <main className="px-6 py-12">
          <section id="about" className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">About Me</h2>
            <div className="prose prose-invert max-w-3xl">
              <p>
                Hello! I&apos;m Pietro Quintavalle, a dedicated IT hobbyist with a strong foundation in IT support and
                data analytics who&apos;s currently pursuing a bachelor in Economics.
                My passion lies in leveraging technology to solve complex problems and derive meaningful insights from
                data.
                With a combination of technical skills and analytical thinking, I&apos;m equipped to tackle challenges
                in both IT infrastructure and data-driven decision-making.
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <Link href="https://github.com/Quinta0" passHref>
                <a aria-label="GitHub Profile">
                  <Button variant="outline" size="icon" className="p-2">
                    <Github className="h-6 w-6" aria-hidden="true"/>
                  </Button>
                </a>
              </Link>
              <Link href="https://linkedin.com/in/pietro-quintavalle-996b96267" passHref>
                <a aria-label="LinkedIn Profile">
                  <Button variant="outline" size="icon" className="p-2">
                    <Linkedin className="h-6 w-6" aria-hidden="true"/>
                  </Button>
                </a>
              </Link>
            </div>
          </section>
          <section id="skills" className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Skills</h2>
            <div className="relative overflow-hidden h-16">
              <div className="absolute flex animate-marquee">
                {[...skills, ...skills].map((skill, index) => (
                    <Badge key={index} variant="secondary" className="mx-2 text-md text-center py-1 px-3">
                      {skill}
                    </Badge>
                ))}
              </div>
            </div>
          </section>
          <section id="portfolio" className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "password-generator",
                  description: "A unique and interactive password generator built with Next.js and React. ",
                  technologies: ["Nextjs", "Encryption", "Typescript"],
                  githubLink: "https://github.com/Quinta0/password-generator"
                },
                {
                  title: "Valgo",
                  description: "A website for visualizing sorting algorithms for the visual learners out there.",
                  technologies: ["Typescript", "React", "Algorithms"],
                  githubLink: "https://github.com/Quinta0/valgo"
                },
                {
                  title: "Gravity",
                  description: "3D Gravity Simulator is a C++ program that visualizes the gravitational interactions between celestial bodies",
                  technologies: ["C++", "OpenGL", "Physics", "3D", "Simulation", "Cmake", "VCPKG"],
                  githubLink: "https://github.com/Quinta0/gravity"
                },
                {
                  title: "Boston Housing Price Prediction",
                  description: "A simulation of the Boston Housing Price Prediction project that involves building a machine learning model to predict housing prices. ",
                  technologies: ["Python", "Machine Learning", "Data Analysis", "Data Visualization", "Jupyter Notebook", "Probability", "Statistics"],
                  githubLink: "https://github.com/Quinta0/BostonHousing"
                },
                {
                  title: "Forest Fire Simulation",
                  description: "An assignment for the Probability & Statistics course at USI that aims to model the spread of forest fires over a grid representing a forest landscape.",
                  technologies: ["Statistics", "Python", "Jupyter Notebook", "Simulation", "Probability"],
                  githubLink: "https://github.com/Quinta0/ForestFire"
                },
                {
                  title: "Network Monitoring Tool",
                  description: "A tool for monitoring and analyzing network traffic, demonstrating networking skills and data visualization.",
                  technologies: ["Python", "Scapy", "Matplotlib"],
                  githubLink: "#"
                }
              ].map((project, index) => (
                  <div key={index} className="bg-[#0000b3] rounded-md p-4">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="mb-4">{project.description}</p>
                    <div className="mb-4">
                      {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex}
                                className="inline-block bg-[#4d4dff] text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                      {tech}
                    </span>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <Link
                          href={project.githubLink}
                          className="inline-flex items-center rounded-md bg-[#4d4dff] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#3b3bd9] focus:outline-none focus:ring-2 focus:ring-[#4d4dff] focus:ring-offset-2"
                          aria-label={`View ${project.title} on GitHub`}
                      >
                        View on GitHub
                      </Link>
                    </div>
                  </div>
              ))}
            </div>
          </section>
          <section id="certifications" className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">Certifications</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, index) => (
                  <Card key={index} className="overflow-hidden bg-[#0000b3] text-white">
                    <Image src={cert.image} alt={cert.name} width={400} height={300}
                           className="w-full object-contain"/>
                    <CardHeader>
                      <CardTitle>{cert.name}</CardTitle>
                      <CardDescription className="text-gray-300">{cert.issuer}</CardDescription>
                    </CardHeader>
                  </Card>
              ))}
            </div>
          </section>
        </main>
        <footer className="bg-[#0000b3] py-6 px-6 text-center text-sm">
          <p>&copy; 2024 Pietro Quintavalle. All rights reserved.</p>
        </footer>
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </div>
  )
}

function TerminalIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <polyline points="4 17 10 11 4 5"/>
        <line x1="12" x2="20" y1="19" y2="19"/>
      </svg>
  )
}