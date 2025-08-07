"use client"
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Code, Database, BarChart3, Globe, Award, GraduationCap, Image, ExternalLink as LinkIcon, Server, Shield, Settings, Briefcase, Calendar } from 'lucide-react';
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showProjectGallery, setShowProjectGallery] = useState<Project | null>(null);

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
    'System Administration': ['Linux/Windows Server', 'Active Directory', 'Group Policy', 'Office 365', 'PowerShell', 'Bash Scripting'],
    'Virtualization & Cloud': ['Proxmox VE', 'Hyper-V', 'Docker', 'LXC', 'Infrastructure as Code', 'NGINX'],
    'Networking & Security': ['VLAN Configuration', 'Firewall Management', 'VPN (Tailscale)', 'Network Troubleshooting', 'DDNS'],
    'Development & Analytics': ['Python', 'JavaScript', 'React', 'Next.js', 'SQL', 'Data Analysis'],
    'Monitoring & Tools': ['Grafana', 'Prometheus', 'Git', 'Backup & Recovery', 'RAID Systems']
  };

  const experience = [
    {
      title: 'Systems Engineering Consultant',
      company: 'Freelance',
      period: 'January 2020 - Present',
      location: 'Ticino, Switzerland',
      description: 'Delivered end-to-end IT infrastructure and systems engineering services to multiple clients, with a focus on server deployment, virtualization platforms, and network architecture.',
      achievements: [
        'Built and maintained 6-10 production-grade servers with 90%+ uptime',
        'Designed VLAN-based network topologies and firewall policies',
        'Implemented secure remote access via VPN (Tailscale)',
        'Created automation scripts for routine maintenance and monitoring',
        'Managed Windows Server environments with Active Directory integration'
      ]
    }
  ];

  const projects = [
    {
      title: 'Enterprise Proxmox Infrastructure',
      period: 'Professional Client Project',
      description: 'Deployed a full single-node virtualization environment using Proxmox VE, with structured rack cabling, DDNS, and NGINX reverse proxy for secure service exposure. Integrated Tailscale VPN for remote management. Configured Docker containers and LXC instances to run Nextcloud, Jellyfin, and TrueNAS. Enabled centralized infrastructure visibility using Grafana, Prometheus, and a Homarr dashboard.',
      tech: ['Proxmox VE', 'NGINX', 'Docker', 'LXC', 'Grafana', 'Tailscale', 'DDNS', 'TrueNAS', 'Linux'],
      icon: <Code className="w-6 h-6" />,
      status: 'Production',
      images: [],
      features: ['Centralized infrastructure visibility using Grafana', 'Docker containers and LXC instances', 'Nextcloud, Jellyfin, and TrueNAS integration', 'Secure remote access via VPN'],
      category: 'Infrastructure'
    },
    {
      title: 'Multi-User NAS Solution',
      period: 'Professional Client Project',
      description: 'Designed and deployed a RAID 10-based NAS system supporting 9 users as a self-hosted cloud storage alternative to Google/iCloud. Configured SMB/NFS shares, access control lists (ACLs), and failover mechanisms. Automated snapshotting and rsync-based backups for a reliable, high-availability storage solution.',
      tech: ['RAID', 'TrueNAS', 'rsync', 'SMB/NFS', 'systemd timers', 'ACLs', 'Linux'],
      icon: <Database className="w-6 h-6" />,
      status: 'Production',
      images: [],
      features: ['Automated snapshotting and rsync-based backups', 'High-availability storage solution', 'Multi-user access control', 'Failover mechanisms'],
      category: 'Storage'
    },
    {
      title: 'Custom Gaming Systems',
      period: 'Professional Client Project',
      description: 'Engineered and delivered 12+ custom PC builds, including high-performance gaming rigs and workstation-grade machines. Focused on component compatibility analysis, PSU sizing, airflow and thermal management, and BIOS/driver optimization for performance tuning.',
      tech: ['Hardware Engineering', 'BIOS Configuration', 'Thermal Management', 'Performance Tuning'],
      icon: <Code className="w-6 h-6" />,
      status: 'Delivered',
      images: [],
      features: ['Component compatibility analysis', 'PSU sizing and airflow optimization', 'BIOS/driver optimization', 'System benchmarking'],
      category: 'Hardware'
    },
    {
      title: 'Personal Homelab Infrastructure',
      period: 'Personal Project',
      description: 'Replicated enterprise-level infrastructure architecture in a personal homelab, using Proxmox, Docker, and LXC. Focused on Infrastructure as Code (IaC) principles, virtual machine provisioning, monitoring, and container orchestration. Demonstrated ability to standardize and document reproducible deployment procedures.',
      tech: ['Proxmox VE', 'Docker', 'LXC', 'Bash', 'Tailscale', 'Grafana', 'IaC'],
      icon: <Code className="w-6 h-6" />,
      status: 'Ongoing',
      images: [],
      features: ['Infrastructure as Code (IaC) principles', 'Virtual machine provisioning', 'Monitoring and container orchestration', 'Standardized deployment procedures'],
      category: 'Infrastructure'
    },
    {
      title: 'Valgo - Algorithm Visualizer',
      period: 'Jun 2024 - Present',
      description: 'Interactive web application designed to help users understand and visualize various sorting algorithms. Built with Next.js and React to make learning algorithms more engaging and intuitive.',
      tech: ['Next.js', 'React', 'JavaScript', 'Algorithm Visualization'],
      icon: <Globe className="w-6 h-6" />,
      status: 'Live',
      images: [
        'valgo.png',
      ],
      features: ['Real-time algorithm visualization', 'Multiple sorting algorithms', 'Step-by-step breakdown', 'Performance comparison'],
      github: 'https://github.com/Quinta0/valgo',
      demo: 'https://quinta0.github.io/valgo/',
      category: 'Development'
    },
    {
      title: 'Boston Housing Price Prediction',
      period: 'May 2024 - Present',
      description: 'Machine learning model to predict housing prices in the Boston area based on various features such as crime rate, average number of rooms per dwelling, and accessibility to radial highways.',
      tech: ['Python', 'Machine Learning', 'Data Analysis', 'Statistical Modeling'],
      icon: <BarChart3 className="w-6 h-6" />,
      status: 'Academic Project',
      images: [
        'Housing.jpeg',
      ],
      features: ['Predictive modeling', 'Feature engineering', 'Data visualization', 'Statistical analysis'],
      github: 'https://github.com/Quinta0/BostonHousing',
      category: 'Data Science'
    },
    {
      title: 'Forest Fire Simulation',
      period: 'Mar 2024 - Present',
      description: 'Probability & Statistics course project modeling the spread of forest fires over a grid. Accounts for vegetation types, terrain elevation, wind patterns, humidity levels, and spontaneous ignition.',
      tech: ['Python', 'Statistical Modeling', 'Simulation', 'Data Science'],
      icon: <Database className="w-6 h-6" />,
      status: 'Academic Project',
      images: [
        'forestfire.jpg',
      ],
      features: ['Monte Carlo simulation', 'Environmental factors modeling', 'Statistical analysis', 'Visualization tools'],
      github: 'https://github.com/Quinta0/ForestFire',
      category: 'Data Science'
    },
    {
      title: 'Finance Tracker Application',
      period: 'In Development',
      description: 'Designing a simple and intuitive personal finance app built with Django (Python) and SQLite, focused on clarity, control, and peace of mind. Features category-based expense tracking, budget summaries, and clear data visualizations.',
      tech: ['Django', 'Python', 'SQLite', 'Chart.js', 'HTML/CSS', 'JavaScript'],
      icon: <BarChart3 className="w-6 h-6" />,
      status: 'In Development',
      images: [],
      features: ['Category-based expense tracking', 'Budget summaries', 'Data visualizations', '50/30/20 budgeting framework'],
      category: 'Development'
    }
  ];

  const education = [
    {
      id: 1,
      institution: 'USI Università della Svizzera italiana, Lugano',
      degree: "Bachelor's Degree in Economics (English Stream)",
      period: 'September 2024 - Present',
      status: 'Current',
      description: 'Pursuing coursework in microeconomics, macroeconomics, statistics, accounting, and quantitative methods with particular interest in finance.'
    },
    {
      id: 2,
      institution: 'USI Università della Svizzera italiana, Lugano',
      degree: 'Bachelor of Science in Informatics (English Stream)',
      period: 'September 2022 - June 2024',
      status: '2 years completed',
      description: 'Completed comprehensive coursework in software engineering, AGILE methodologies, data structures and algorithms, and database systems.'
    },
    {
      id: 3,
      institution: 'Scuola cantonale di commercio, Bellinzona',
      degree: 'Maturità Cantonale & AFC Economics',
      period: 'September 2018 - June 2022',
      status: '4.5/6 (Maturità), 5/6 (AFC)',
      description: 'Completed secondary education with focus on economics and business administration.'
    }
  ];

  const certificates = [
    'Google Data Analytics Professional Certificate',
    'Google IT Support Professional Certificate'
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  type Project = typeof projects[number];
  interface ProjectGalleryProps {
    project: Project;
    onClose: () => void;
  }
  
  const ProjectGallery: React.FC<ProjectGalleryProps> = ({ project, onClose }) => (
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
                <span
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    backgroundColor: nordColors.accent,
                    color: nordColors.bg
                  }}
                >
                  {project.category}
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
          {project.images && project.images.length > 0 ? (
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
          ) : (
            <div 
              className="p-8 rounded-lg border mb-6 text-center"
              style={{
                backgroundColor: nordColors.bg,
                borderColor: nordColors.bgLighter
              }}
            >
              <div className="mb-4" style={{ color: nordColors.blue }}>
                {project.icon}
              </div>
              <p className="text-sm" style={{ color: nordColors.textMuted }}>
                Infrastructure/Hardware Project - No visual interface
              </p>
            </div>
          )}

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
              {['Home', 'About', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
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
              IT Systems Engineer • Economics Student • Infrastructure Specialist
            </div>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: nordColors.textMuted }}>
              Certified IT Support professional with 5+ years of hands-on experience in system administration, 
              virtualization, and network infrastructure. Seeking Junior SysAdmin roles to contribute reliable, 
              scalable solutions in enterprise systems.
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
                I'm an IT Support–certified Economics student with 5+ years of hands-on experience in system 
                administration, virtualization (Proxmox, Hyper-V), and network infrastructure.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ color: nordColors.text }}>
                Skilled in scripting, automation, and server deployment across Windows and Linux environments. 
                I've built and maintained 6-10 production-grade servers with 90%+ uptime using automation tools 
                and Infrastructure as Code (IaC) principles.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ color: nordColors.text }}>
                Currently pursuing Economics at USI while continuing to deliver scalable, secure, and 
                high-availability infrastructure solutions to clients.
              </p>
              <div className="flex flex-wrap gap-3">
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: nordColors.darkBlue, color: nordColors.text }}
                >
                  🇮🇹 Italian (Native)
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: nordColors.darkBlue, color: nordColors.text }}
                >
                  🇺🇸 English (Fluent)
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: nordColors.darkBlue, color: nordColors.text }}
                >
                  🇩🇪 German (Conversational)
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: nordColors.green, color: nordColors.bg }}
                >
                  📍 Switzerland 🇨🇭
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

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: nordColors.accent }}>
            Professional Experience
          </h2>

          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="p-8 rounded-lg border mb-8"
                style={{
                  backgroundColor: nordColors.bgLight,
                  borderColor: nordColors.bgLighter
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center mb-4">
                    <div
                      className="p-3 rounded-lg mr-4"
                      style={{ backgroundColor: nordColors.darkBlue }}
                    >
                      <Briefcase className="w-6 h-6" style={{ color: nordColors.text }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: nordColors.text }}>
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-lg" style={{ color: nordColors.blue }}>
                          {exp.company}
                        </span>
                        <span className="text-sm" style={{ color: nordColors.textMuted }}>
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm" style={{ color: nordColors.blue }}>
                    <Calendar className="w-4 h-4 mr-2" />
                    {exp.period}
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-6" style={{ color: nordColors.textMuted }}>
                  {exp.description}
                </p>

                <div>
                  <h4 className="text-lg font-semibold mb-3" style={{ color: nordColors.blue }}>
                    Key Achievements:
                  </h4>
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start">
                        <div
                          className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: nordColors.accent }}
                        ></div>
                        <span style={{ color: nordColors.text }}>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20" style={{ backgroundColor: 'rgba(59, 66, 82, 0.3)' }}>
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
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold" style={{ color: nordColors.text }}>
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm" style={{ color: nordColors.blue }}>
                        {project.period}
                      </p>
                      <span
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: nordColors.accent,
                          color: nordColors.bg
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="leading-relaxed mb-4 text-sm" style={{ color: nordColors.textMuted }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
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
                  {project.tech.length > 3 && (
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: nordColors.bgLighter,
                        color: nordColors.textMuted
                      }}
                    >
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-sm flex items-center gap-2"
                    style={{ color: nordColors.blue }}
                  >
                    <Image className="w-4 h-4" />
                    View Details
                  </span>
                  <span
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: project.status === 'Production' ? nordColors.green : 
                                     project.status === 'Live' ? nordColors.blue : nordColors.yellow,
                      color: nordColors.bg
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
      <section id="education" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: nordColors.accent }}>
            Education & Certifications
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Education Timeline */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 flex items-center" style={{ color: nordColors.blue }}>
                <GraduationCap className="w-6 h-6 mr-2" />
                Education Timeline
              </h3>

              <div className="relative">
                {/* Timeline Line */}
                <div 
                  className="absolute left-4 top-0 bottom-0 w-0.5" 
                  style={{ backgroundColor: nordColors.bgLighter }}
                ></div>
                
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <div key={index} className="relative flex items-start">
                      {/* Timeline Indicator */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className="w-8 h-8 rounded-full border-4 flex items-center justify-center"
                          style={{
                            backgroundColor: nordColors.bg,
                            borderColor: index === 0 ? nordColors.accent : nordColors.blue
                          }}
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: index === 0 ? nordColors.accent : nordColors.blue
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Timeline Content */}
                      <div 
                        className="ml-6 p-6 rounded-lg border flex-1"
                        style={{
                          backgroundColor: nordColors.bg,
                          borderColor: nordColors.bgLight
                        }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-semibold mb-1" style={{ color: nordColors.text }}>
                              {edu.degree}
                            </h4>
                            <p className="font-medium" style={{ color: nordColors.blue }}>
                              {edu.institution}
                            </p>
                          </div>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: index === 0 ? nordColors.accent : nordColors.darkBlue, 
                              color: index === 0 ? nordColors.bg : nordColors.text 
                            }}
                          >
                            {edu.status}
                          </span>
                        </div>
                        
                        {edu.description && (
                          <p className="text-sm mb-3 leading-relaxed" style={{ color: nordColors.textMuted }}>
                            {edu.description}
                          </p>
                        )}
                        
                        <div className="flex items-center text-sm" style={{ color: nordColors.textMuted }}>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {edu.period}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  Interests & Specialties
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Computer Hardware', 'Economics & Finance', 'Web Development', 'Literature', 'Photography', 'Virtualization', 'Network Security'].map((interest) => (
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
      <section id="contact" className="py-20" style={{ backgroundColor: 'rgba(59, 66, 82, 0.3)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8" style={{ color: nordColors.accent }}>
            Let's Connect
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto" style={{ color: nordColors.textMuted }}>
            I'm always interested in discussing new opportunities, collaborations, or Junior SysAdmin positions. 
            Let's connect and explore how my infrastructure expertise can benefit your organization.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a
              href="mailto:0pietroquintavalle0@gmail.com"
              className="p-6 rounded-lg transition-colors hover:opacity-80 group"
              style={{ backgroundColor: nordColors.bgLight }}
            >
              <Mail className="w-8 h-8 mx-auto mb-4" style={{ color: nordColors.blue }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: nordColors.text }}>Email</h3>
              <p className="text-sm" style={{ color: nordColors.textMuted }}>Professional inquiries</p>
            </a>

            <a
              href="https://www.linkedin.com/in/pietro-quintavalle-996b96267/"
              className="p-6 rounded-lg transition-colors hover:opacity-80 group"
              style={{ backgroundColor: nordColors.bgLight }}
            >
              <Linkedin className="w-8 h-8 mx-auto mb-4" style={{ color: nordColors.blue }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: nordColors.text }}>LinkedIn</h3>
              <p className="text-sm" style={{ color: nordColors.textMuted }}>Professional network</p>
            </a>

            <a
              href="https://github.com/Quinta0"
              className="p-6 rounded-lg transition-colors hover:opacity-80 group"
              style={{ backgroundColor: nordColors.bgLight }}
            >
              <Github className="w-8 h-8 mx-auto mb-4" style={{ color: nordColors.blue }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: nordColors.text }}>GitHub</h3>
              <p className="text-sm" style={{ color: nordColors.textMuted }}>Code repositories</p>
            </a>
          </div>

          {/* Download CV Button */}
          <div className="mb-8">
            <button
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90"
              style={{ 
                backgroundColor: nordColors.accent, 
                color: nordColors.bg 
              }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t" style={{ borderColor: nordColors.bgLight }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-4">
            <div className="flex justify-center items-center gap-6 mb-4">
              <a
                href="https://github.com/Quinta0"
                className="text-sm hover:opacity-80"
                style={{ color: nordColors.blue }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pietro-quintavalle-996b96267/"
                className="text-sm hover:opacity-80"
                style={{ color: nordColors.blue }}
              >
                LinkedIn
              </a>
              <a
                href="mailto:0pietroquintavalle0@gmail.com"
                className="text-sm hover:opacity-80"
                style={{ color: nordColors.blue }}
              >
                Email
              </a>
            </div>
          </div>
          <p style={{ color: nordColors.textMuted }}>
            Built with ❄️ using React & Nord theme • Pietro Quintavalle © 2025
          </p>
          <p className="text-sm mt-2" style={{ color: nordColors.textMuted }}>
            IT Support Professional | Systems Engineer | Economics Student
          </p>
        </div>
      </footer>

      {/* Project Gallery Modal */}
      {showProjectGallery && (
        <ProjectGallery
          project={showProjectGallery}
          onClose={() => setShowProjectGallery(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;