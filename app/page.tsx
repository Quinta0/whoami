import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"

export default function Home() {
  return (
      <div className="bg-[#00004d] text-white font-['Segoe UI', 'FiraCode'] min-h-screen">
        <header className="py-4 px-6 flex items-center justify-between border-b border-[#4d4dff]">
          <div className="flex items-center gap-4">
            <TerminalIcon className="w-8 h-8"/>
            <h1 className="text-2xl font-semibold">Pietro Quintavalle</h1>
          </div>
          <nav className="flex items-center gap-6">
            {["About", "Skills", "Certifications", "Portfolio", "Contact"].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#4d4dff] transition-colors">
                  {item}
                </Link>
            ))}
          </nav>
        </header>
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
                in
                both IT infrastructure and data-driven decision-making.
              </p>
            </div>
          </section>
          <section id="skills" className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "IT & Networking",
                  skills: [
                    "IT Support", "Troubleshooting", "Computer Networking",
                    "Network Architecture", "Network Model", "Computer Architecture",
                    "Network Security", "Cloud Computing"
                  ]
                },
                {
                  title: "Data Science & Analytics",
                  skills: [
                    "Data Analysis", "Data Visualization", "Data Management",
                    "General Statistics", "Data Science", "Business Analysis"
                  ]
                },
                {
                  title: "Programming & Software",
                  skills: [
                    "Python Programming", "R Programming", "SQL",
                    "Computer Programming", "Numpy", "Pandas",
                    "Spreadsheet Software"
                  ]
                },
                {
                  title: "Business & Communication",
                  skills: [
                    "Business Communication", "Accounting",
                    "Leadership and Management", "Critical Thinking",
                    "Human Computer Interaction"
                  ]
                },
                {
                  title: "Tools & Platforms",
                  skills: [
                    "Tableau", "Git", "Linux", "Microsoft Office Suite"
                  ]
                },
                {
                  title: "Methodologies",
                  skills: [
                    "Data-Driven Decision Making", "Agile",
                    "IT Service Management", "Project Management"
                  ]
                },
              ].map((category, index) => (
                  <div key={index} className="bg-[#0000b3] rounded-md p-4">
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <ul className="list-disc pl-4 space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                          <li key={skillIndex}>{skill}</li>
                      ))}
                    </ul>
                  </div>
              ))}
            </div>
          </section>
          <section id="certifications" className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0000b3] rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Google IT Support Professional Certificate</h3>
                <iframe
                    src="/certificates/Coursera_RZ1V4RU6JP2D.png"
                    className="w-full h-96 border-none"
                    title="Google IT Support Professional Certificate"
                ></iframe>
              </div>
              <div className="bg-[#0000b3] rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Google Data Analytics Professional Certificate</h3>
                <iframe
                    src="/certificates/Coursera_EN181NFH7VYT.png"
                    className="w-full h-96 border-none"
                    title="Google Data Analytics Professional Certificate"
                ></iframe>
              </div>
              <div className="bg-[#0000b3] rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">IBM Python for Data Science, AI & Development</h3>
                <iframe
                    src="/certificates/Coursera_QT9WT5VCHJNU.png"
                    className="w-full h-96 border-none"
                    title="IBM Python for Data Science, AI & Development"
                ></iframe>
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
                  githubLink: "#"
                },
                {
                  title: "Valgo",
                  description: "A website for visualizing sorting algorithms for the visual learners out there.",
                  technologies: ["Typescript", "React", "Algorithms"],
                  githubLink: "#"
                },
                {
                  title: "Gravity",
                  description: "3D Gravity Simulator is a C++ program that visualizes the gravitational interactions between celestial bodies",
                  technologies: ["C++", "OpenGL", "Physics", "3D", "Simulation", "Cmake", "VCPKG"],
                  githubLink: "#"
                },
                {
                  title: "Boston Housing Price Prediction",
                  description: "A simulation of the Boston Housing Price Prediction project that involves building a machine learning model to predict housing prices. ",
                  technologies: ["Python", "Machine Learning", "Data Analysis", "Data Visualization", "Jupyter Notebook", "Probability", "Statistics"],
                  githubLink: "#"
                },
                {
                  title: "Forest Fire Simulation",
                  description: "An assignment for the Probability & Statistics course at USI that aims to model the spread of forest fires over a grid representing a forest landscape.",
                  technologies: ["Statistics", "Python", "Jupyter Notebook", "Simulation", "Probability"],
                  githubLink: "#"
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
                      >
                        View on GitHub
                      </Link>
                    </div>
                  </div>
              ))}
            </div>
          </section>
          <section id="contact" className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Contact Me</h2>
            <form className="max-w-xl mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name</label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="bg-[#0000b3] border-[#4d4dff] focus:border-[#7f7fff] focus:ring-[#7f7fff]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email</label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="bg-[#0000b3] border-[#4d4dff] focus:border-[#7f7fff] focus:ring-[#7f7fff]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2">Message</label>
                <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Enter your message"
                    className="bg-[#0000b3] border-[#4d4dff] focus:border-[#7f7fff] focus:ring-[#7f7fff]"
                />
              </div>
              <div className="flex justify-end">
                <Button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-[#4d4dff] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#3b3bd9] focus:outline-none focus:ring-2 focus:ring-[#4d4dff] focus:ring-offset-2"
                >
                  Submit
                </Button>
              </div>
            </form>
          </section>
        </main>
        <footer className="bg-[#0000b3] py-6 px-6 text-center text-sm">
          <p>&copy; 2024 Pietro Quintavalle. All rights reserved.</p>
        </footer>
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