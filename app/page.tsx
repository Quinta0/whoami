"use client"
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Code, Database, BarChart3, Globe, Award, GraduationCap, Image, ExternalLink as LinkIcon } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showProjectGallery, setShowProjectGallery] = useState(false);

  // Nord Color Palette
  const nordColors = {
    bg: '#2E3440',
    bgLight: '#3B4252',
    bgLighter: '#434C5E',
    bgLightest: '#4C566A',
    text: '#D8DEE9',
    textMuted: 'rgba(216, 222, 233, 0.6)',
    accent: '#88C0D0',
    blue: '#81A1C1',
    darkBlue: '#5E81AC',
    cyan: '#8FBCBB',
    green: '#A3BE8C',
    yellow: '#EBCB8B',
    orange: '#D08770',
    red: '#BF616A',
    purple: '#B48EAD'
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = {
    'Data & Analytics': ['Python', 'R', 'SQL', 'Statistical Analysis', 'Data Visualization', 'Business Intelligence'],
    'Web Development': ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
    'Backend & Tools': ['Flask', 'Express', 'MongoDB', 'SQLite', 'Git', 'Linux'],
    'Other': ['Java', 'LaTeX', 'Project Planning', 'Financial Analysis']
  };

  const projects = [
    {
      title: 'Valgo - Algorithm Visualizer',
      period: 'Jun 2024 - Present',
      description: 'Interactive web application designed to help users understand and visualize various sorting algorithms. Built with Next.js and React to make learning algorithms more engaging and intuitive.',
      tech: ['Next.js', 'React', 'JavaScript', 'Algorithm Visualization'],
      icon: <Code className="w-6 h-6" />,
      status: 'Live',
      images: [
        'https://via.placeholder.com/600x400/81A1C1/2E3440?text=Algorithm+Visualizer',
        'https://via.placeholder.com/600x400/88C0D0/2E3440?text=Sorting+Demo',
        'https://via.placeholder.com/600x400/5E81AC/2E3440?text=Interactive+UI'
      ],
      features: ['Real-time algorithm visualization', 'Multiple sorting algorithms', 'Step-by-step breakdown', 'Performance comparison'],
      github: 'https://github.com/Quinta0/valgo',
      demo: 'https://valgo-demo.vercel.app'
    },
    {
      title: 'Boston Housing Price Prediction',
      period: 'May 2024 - Present',
      description: 'Machine learning model to predict housing prices in the Boston area based on various features such as crime rate, average number of rooms per dwelling, and accessibility to radial highways.',
      tech: ['Python', 'Machine Learning', 'Data Analysis', 'Statistical Modeling'],
      icon: <BarChart3 className="w-6 h-6" />,
      status: 'In Progress',
      images: [
        'https://via.placeholder.com/600x400/A3BE8C/2E3440?text=Data+Visualization',
        'https://via.placeholder.com/600x400/EBCB8B/2E3440?text=ML+Model',
        'https://via.placeholder.com/600x400/D08770/2E3440?text=Results+Analysis'
      ],
      features: ['Predictive modeling', 'Feature engineering', 'Data visualization', 'Statistical analysis'],
      github: 'https://github.com/Quinta0/boston-housing'
    },
    {
      title: 'Forest Fire Simulation',
      period: 'Mar 2024 - Present',
      description: 'Probability & Statistics course project modeling the spread of forest fires over a grid. Accounts for vegetation types, terrain elevation, wind patterns, humidity levels, and spontaneous ignition.',
      tech: ['Python', 'Statistical Modeling', 'Simulation', 'Data Science'],
      icon: <Database className="w-6 h-6" />,
      status: 'Academic Project',
      images: [
        'https://via.placeholder.com/600x400/BF616A/2E3440?text=Fire+Simulation',
        'https://via.placeholder.com/600x400/B48EAD/2E3440?text=Statistical+Model',
        'https://via.placeholder.com/600x400/8FBCBB/2E3440?text=Data+Analysis'
      ],
      features: ['Monte Carlo simulation', 'Environmental factors modeling', 'Statistical analysis', 'Visualization tools'],
      github: 'https://github.com/Quinta0/forest-fire-sim'
    }
  ];

  const education = [
    {
      institution: 'USI Università della Svizzera italiana',
      degree: "Bachelor's degree Economics",
      period: 'Sep 2024 - Jun 2027',
      status: 'Current'
    },
    {
      institution: 'USI Università della Svizzera italiana',
      degree: 'Bachelor of Science - BS Informatics',
      period: 'Jan 2022 - Jan 2024',
      status: 'Completed'
    },
    {
      institution: 'Scuola cantonale di commercio',
      degree: 'Maturità Cantonale e AFC Economics',
      period: 'Sep 2017 - Jun 2021',
      status: 'GPA: 4.5/5'
    }
  ];

  const certificates = [
    'Google Data Analytics Professional Certificate',
    'Google IT Support Professional Certificate',
    'IT Security: Defense against the digital dark arts',
    'Python for Data Science, AI & Development'
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  const ProjectGallery = ({ project, onClose }) => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(46, 52, 64, 0.95)' }}
      onClick={onClose}
    >
      <div
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg"
        style={{ backgroundColor: nordColors.bgLight }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: nordColors.text }}>
                {project.title}
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-sm" style={{ color: nordColors.blue }}>
                  {project.period}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: nordColors.darkBlue,
                    color: nordColors.text
                  }}
                >
                  {project.status}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-2xl hover:opacity-70"
              style={{ color: nordColors.textMuted }}
            >
              ×
            </button>
          </div>

          {/* Project Images */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {project.images.map((image, idx) => (
              <div key={idx} className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3" style={{ color: nordColors.blue }}>
              About This Project
            </h4>
            <p className="leading-relaxed" style={{ color: nordColors.textMuted }}>
              {project.description}
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3" style={{ color: nordColors.blue }}>
              Key Features
            </h4>
            <div className="grid md:grid-cols-2 gap-2">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-center">
                  <div
                    className="w-2 h-2 rounded-full mr-3"
                    style={{ backgroundColor: nordColors.accent }}
                  ></div>
                  <span style={{ color: nordColors.text }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3" style={{ color: nordColors.blue }}>
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded text-sm"
                  style={{
                    backgroundColor: nordColors.bg,
                    color: nordColors.accent
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                className="flex items-center gap-2 px-4 py-2 rounded hover:opacity-80 transition-opacity"
                style={{ backgroundColor: nordColors.bgLighter, color: nordColors.text }}
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                className="flex items-center gap-2 px-4 py-2 rounded hover:opacity-80 transition-opacity"
                style={{ backgroundColor: nordColors.darkBlue, color: nordColors.text }}
              >
                <LinkIcon className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: nordColors.bg, color: nordColors.text }}>
      {/* Navigation */}
      <nav
        className="fixed top-0 w-full z-40 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(46, 52, 64, 0.95)' : 'transparent',
          borderBottom: scrolled ? `1px solid ${nordColors.bgLight}` : 'none',
          backdropFilter: scrolled ? 'blur(10px)' : 'none'
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold" style={{ color: nordColors.accent }}>
              Pietro Quintavalle
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="transition-colors hover:opacity-80"
                  style={{
                    color: activeSection === item.toLowerCase() ? nordColors.accent : nordColors.text
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="text-center max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span style={{ color: nordColors.text }}>Pietro</span>
              <span className="ml-4" style={{ color: nordColors.accent }}>Quintavalle</span>
            </h1>
            <div className="text-xl md:text-2xl mb-6" style={{ color: nordColors.blue }}>
              Economics Student • Data Analytics • Web Development
            </div>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: nordColors.textMuted }}>
              Passionate about the intersection of economics and technology, exploring how data and code can solve real-world problems.
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="https://github.com/Quinta0"
              className="p-3 rounded-full transition-colors hover:opacity-80"
              style={{ backgroundColor: nordColors.bgLight }}
            >
              <Github className="w-6 h-6" style={{ color: nordColors.text }} />
            </a>
            <a
              href="https://www.linkedin.com/in/pietro-quintavalle-996b96267/"
              className="p-3 rounded-full transition-colors hover:opacity-80"
              style={{ backgroundColor: nordColors.bgLight }}
            >
              <Linkedin className="w-6 h-6" style={{ color: nordColors.text }} />
            </a>
            <a
              href="mailto:0pietroquintavalle0@gmail.com"
              className="p-3 rounded-full transition-colors hover:opacity-80"
              style={{ backgroundColor: nordColors.bgLight }}
            >
              <Mail className="w-6 h-6" style={{ color: nordColors.text }} />
            </a>
            <a
              href="https://quinta0.github.io/whoami/"
              className="p-3 rounded-full transition-colors hover:opacity-80"
              style={{ backgroundColor: nordColors.bgLight }}
            >
              <Globe className="w-6 h-6" style={{ color: nordColors.text }} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6" style={{ color: nordColors.blue }} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20" style={{ backgroundColor: 'rgba(59, 66, 82, 0.3)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: nordColors.accent }}>
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg leading-relaxed mb-6" style={{ color: nordColors.text }}>
                I'm an Economics student at USI with extensive experience in data analytics and web development.
                My journey combines analytical thinking with technical skills to create meaningful solutions.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ color: nordColors.text }}>
                Google-certified in Data Analytics and IT Support, I bring proven expertise in Python, R, SQL,
                and modern web technologies like Next.js and React.
              </p>
              <div className="flex flex-wrap gap-3">
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: nordColors.darkBlue, color: nordColors.text }}
                >
                  Italian (Native)
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: nordColors.darkBlue, color: nordColors.text }}
                >
                  English (C2)
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: nordColors.darkBlue, color: nordColors.text }}
                >
                  Switzerland 🇨🇭
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <div
                  key={category}
                  className="p-6 rounded-lg border"
                  style={{
                    backgroundColor: nordColors.bg,
                    borderColor: nordColors.bgLight
                  }}
                >
                  <h3 className="text-xl font-semibold mb-3" style={{ color: nordColors.blue }}>
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded text-sm"
                        style={{
                          backgroundColor: nordColors.bgLighter,
                          color: nordColors.text
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: nordColors.accent }}>
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border transition-colors hover:opacity-90 cursor-pointer"
                style={{
                  backgroundColor: nordColors.bgLight,
                  borderColor: nordColors.bgLighter
                }}
                onClick={() => setShowProjectGallery(project)}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="p-2 rounded-lg mr-3"
                    style={{ backgroundColor: nordColors.darkBlue }}
                  >
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: nordColors.text }}>
                      {project.title}
                    </h3>
                    <p className="text-sm" style={{ color: nordColors.blue }}>
                      {project.period}
                    </p>
                  </div>
                </div>

                <p className="leading-relaxed mb-4" style={{ color: nordColors.textMuted }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: nordColors.bg,
                        color: nordColors.accent
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-sm flex items-center gap-2"
                    style={{ color: nordColors.blue }}
                  >
                    <Image className="w-4 h-4" />
                    View Gallery
                  </span>
                  <span
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: nordColors.darkBlue,
                      color: nordColors.text
                    }}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certificates Section */}
      <section id="education" className="py-20" style={{ backgroundColor: 'rgba(59, 66, 82, 0.3)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: nordColors.accent }}>
            Education & Certifications
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 flex items-center" style={{ color: nordColors.blue }}>
                <GraduationCap className="w-6 h-6 mr-2" />
                Education
              </h3>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-lg border"
                    style={{
                      backgroundColor: nordColors.bg,
                      borderColor: nordColors.bgLight
                    }}
                  >
                    <h4 className="text-lg font-semibold mb-2" style={{ color: nordColors.text }}>
                      {edu.degree}
                    </h4>
                    <p className="mb-2" style={{ color: nordColors.blue }}>
                      {edu.institution}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: nordColors.textMuted }}>
                        {edu.period}
                      </span>
                      <span
                        className="px-2 py-1 rounded text-xs"
                        style={{ backgroundColor: nordColors.darkBlue, color: nordColors.text }}
                      >
                        {edu.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 flex items-center" style={{ color: nordColors.blue }}>
                <Award className="w-6 h-6 mr-2" />
                Certifications
              </h3>

              <div className="space-y-4">
                {certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border flex items-center"
                    style={{
                      backgroundColor: nordColors.bg,
                      borderColor: nordColors.bgLight
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full mr-4"
                      style={{ backgroundColor: nordColors.accent }}
                    ></div>
                    <span style={{ color: nordColors.text }}>{cert}</span>
                  </div>
                ))}
              </div>

              <div
                className="mt-8 p-6 rounded-lg border"
                style={{
                  backgroundColor: nordColors.bg,
                  borderColor: nordColors.bgLight
                }}
              >
                <h4 className="text-lg font-semibold mb-3" style={{ color: nordColors.blue }}>
                  Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Computer Hardware', 'Web Development', 'Finance', 'Economics', 'Literature'].map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded text-sm"
                      style={{
                        backgroundColor: nordColors.bgLighter,
                        color: nordColors.text
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8" style={{ color: nordColors.accent }}>
            Let's Connect
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto" style={{ color: nordColors.textMuted }}>
            I'm always interested in discussing new opportunities, collaborations, or just having a chat about technology and economics.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a
              href="mailto:0pietroquintavalle0@gmail.com"
              className="p-6 rounded-lg transition-colors hover:opacity-80 group"
              style={{ backgroundColor: nordColors.bgLight }}
            >
              <Mail className="w-8 h-8 mx-auto mb-4" style={{ color: nordColors.blue }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: nordColors.text }}>Email</h3>
              <p className="text-sm" style={{ color: nordColors.textMuted }}>Drop me a line</p>
            </a>

            <a
              href="https://www.linkedin.com/in/pietro-quintavalle-996b96267/"
              className="p-6 rounded-lg transition-colors hover:opacity-80 group"
              style={{ backgroundColor: nordColors.bgLight }}
            >
              <Linkedin className="w-8 h-8 mx-auto mb-4" style={{ color: nordColors.blue }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: nordColors.text }}>LinkedIn</h3>
              <p className="text-sm" style={{ color: nordColors.textMuted }}>Let's connect professionally</p>
            </a>

            <a
              href="https://github.com/Quinta0"
              className="p-6 rounded-lg transition-colors hover:opacity-80 group"
              style={{ backgroundColor: nordColors.bgLight }}
            >
              <Github className="w-8 h-8 mx-auto mb-4" style={{ color: nordColors.blue }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: nordColors.text }}>GitHub</h3>
              <p className="text-sm" style={{ color: nordColors.textMuted }}>Check out my code</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t" style={{ borderColor: nordColors.bgLight }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p style={{ color: nordColors.textMuted }}>
            Built with ❄️ using React & Nord theme • Pietro Quintavalle © 2025
          </p>
        </div>
      </footer>

      {/* Project Gallery Modal */}
      {showProjectGallery && (
        <ProjectGallery
          project={showProjectGallery}
          onClose={() => setShowProjectGallery(false)}
        />
      )}
    </div>
  );
};

export default Portfolio;
