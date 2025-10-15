"use client"
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Code, Database, BarChart3, Globe, Award, GraduationCap, Image, ExternalLink as LinkIcon, Briefcase, Calendar, Moon, Sun } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showProjectGallery, setShowProjectGallery] = useState<Project | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Dark Mode Colors - Improved readability
  const darkColors = {
    bg: '#0B0F1F',           // Darker for better contrast
    bgLight: '#1A1F3A',      
    bgLighter: '#252B48',    
    bgCard: '#161B33',       
    bgHover: '#1F2544',      
    text: '#F0F4FF',         // Brighter white for readability
    textMuted: '#B8C1E3',    // Lighter muted text
    primary: '#7C6CE7',      
    secondary: '#00D4FF',    
    accent: '#FF6B9D',       
    blue: '#00D4FF',         
    darkBlue: '#5B4BD6',     
    cyan: '#00F2FE',         
    green: '#00E676',        
    yellow: '#FFB800',       
    orange: '#FF9500',       
    red: '#FF6B9D',          
    purple: '#B48EAD',       
    success: '#00E676',      
    warning: '#FFB800',      
    gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    gradientHero: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  };

  // Light Mode Colors
  const lightColors = {
    bg: '#FFFFFF',           // Pure white
    bgLight: '#F8F9FC',      // Very light gray-blue
    bgLighter: '#EEF1F8',    // Light gray
    bgCard: '#FAFBFF',       // Off-white card
    bgHover: '#E8ECFA',      // Hover state
    text: '#1A1F3A',         // Dark blue-gray for text
    textMuted: '#5E6B8C',    // Muted blue-gray
    primary: '#6C5CE7',      // Keep vibrant purple
    secondary: '#0099CC',    // Darker cyan for contrast
    accent: '#E94B7A',       // Slightly darker pink
    blue: '#0099CC',         
    darkBlue: '#5B4BD6',     
    cyan: '#00A8CC',         
    green: '#00C853',        
    yellow: '#FF9800',       
    orange: '#FF6B00',       
    red: '#E94B7A',          
    purple: '#9C4D97',       
    success: '#00C853',      
    warning: '#FF9800',      
    gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    gradientHero: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  };

  const colors = isDarkMode ? darkColors : lightColors;

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: isDarkMode ? 'rgba(11, 15, 31, 0.95)' : 'rgba(0, 0, 0, 0.75)' }}
      onClick={onClose}
    >
      <div
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ backgroundColor: colors.bgCard, border: `2px solid ${colors.primary}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-3xl font-bold mb-3 gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {project.title}
              </h3>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm px-3 py-1 rounded-lg" style={{ 
                  background: colors.gradient3,
                  color: colors.text,
                  fontFamily: "'JetBrains Mono', monospace"
                }}>
                  {project.period}
                </span>
                <span
                  className="px-4 py-1 rounded-xl text-sm font-medium"
                  style={{
                    background: colors.gradient1,
                    color: colors.text
                  }}
                >
                  {project.status}
                </span>
                <span
                  className="px-3 py-1 rounded-lg text-sm font-medium"
                  style={{
                    background: colors.gradient2,
                    color: colors.text
                  }}
                >
                  {project.category}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-3xl hover:opacity-70 transition-all hover:scale-110 px-3"
              style={{ color: colors.textMuted }}
            >
              ×
            </button>
          </div>

          {/* Project Images */}
          {project.images && project.images.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {project.images.map((image, idx) => (
                <div key={idx} className="aspect-video rounded-xl overflow-hidden border" style={{ borderColor: colors.bgLight }}>
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
              className="p-8 rounded-2xl border mb-6 text-center"
              style={{
                backgroundColor: colors.bg,
                borderColor: colors.bgLight
              }}
            >
              <div className="mb-4" style={{ color: colors.primary }}>
                {project.icon}
              </div>
              <p className="text-sm" style={{ color: colors.textMuted, fontFamily: "'Inter', sans-serif" }}>
                Infrastructure/Hardware Project - No visual interface
              </p>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3" style={{ color: colors.secondary, fontFamily: "'Space Grotesk', sans-serif" }}>
              About This Project
            </h4>
            <p className="leading-relaxed text-lg" style={{ color: colors.textMuted, fontFamily: "'Inter', sans-serif" }}>
              {project.description}
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4" style={{ color: colors.secondary, fontFamily: "'Space Grotesk', sans-serif" }}>
              Key Features
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-center">
                  <div
                    className="w-2 h-2 rounded-full mr-3"
                    style={{ background: colors.gradient1 }}
                  ></div>
                  <span style={{ color: colors.text, fontFamily: "'Inter', sans-serif" }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4" style={{ color: colors.secondary, fontFamily: "'Space Grotesk', sans-serif" }}>
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: colors.bgHover,
                    color: colors.primary,
                    fontFamily: "'JetBrains Mono', monospace"
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
                className="flex items-center gap-2 px-6 py-3 rounded-xl hover:opacity-90 transition-all hover:scale-105 font-medium"
                style={{ background: colors.gradient1, color: colors.text }}
              >
                <Github className="w-5 h-5" />
                View Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                className="flex items-center gap-2 px-6 py-3 rounded-xl hover:opacity-90 transition-all hover:scale-105 font-medium"
                style={{ background: colors.gradient3, color: colors.text }}
              >
                <LinkIcon className="w-5 h-5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg, color: colors.text }}>
      {/* Animated background gradient */}
      <div className="fixed inset-0 pointer-events-none" style={{ opacity: isDarkMode ? 0.2 : 0.1 }}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav
        className="fixed top-0 w-full z-40 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? (isDarkMode ? 'rgba(11, 15, 31, 0.95)' : 'rgba(255, 255, 255, 0.95)') : 'transparent',
          borderBottom: scrolled ? `1px solid ${colors.bgLight}` : 'none',
          backdropFilter: scrolled ? 'blur(20px)' : 'none'
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Pietro Quintavalle
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="transition-all hover:scale-105 relative group"
                  style={{
                    color: activeSection === item.toLowerCase() ? colors.primary : colors.text,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500
                  }}
                >
                  {item}
                  <span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 transition-transform origin-left"
                    style={{
                      background: colors.gradient1,
                      transform: activeSection === item.toLowerCase() ? 'scaleX(1)' : 'scaleX(0)'
                    }}
                  />
                </button>
              ))}
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-xl transition-all hover:scale-110"
                style={{
                  background: colors.gradient1,
                  color: colors.text
                }}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="text-center max-w-4xl mx-auto px-6 relative z-10">
          <div className="mb-8 animate-fadeInUp">
            <h1 className="text-6xl md:text-8xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span style={{ color: colors.text }}>Pietro</span>
              <br />
              <span className="gradient-text">Quintavalle</span>
            </h1>
            <div className="text-xl md:text-3xl mb-8 font-medium" style={{ 
              color: colors.secondary,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.01em'
            }}>
              IT Systems Engineer • Economics Student • Infrastructure Specialist
            </div>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ 
              color: colors.textMuted,
              fontFamily: "'Inter', sans-serif"
            }}>
              Certified IT Support professional with 5+ years of hands-on experience in system administration, 
              virtualization, and network infrastructure. Seeking Junior SysAdmin roles to contribute reliable, 
              scalable solutions in enterprise systems.
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-16">
            <a
              href="https://github.com/Quinta0"
              className="p-4 rounded-xl transition-all hover:scale-110 hover:shadow-2xl group"
              style={{ 
                background: colors.gradient1,
              }}
            >
              <Github className="w-6 h-6" style={{ color: colors.text }} />
            </a>
            <a
              href="https://www.linkedin.com/in/pietro-quintavalle-996b96267/"
              className="p-4 rounded-xl transition-all hover:scale-110 hover:shadow-2xl group"
              style={{ 
                background: colors.gradient3,
              }}
            >
              <Linkedin className="w-6 h-6" style={{ color: colors.text }} />
            </a>
            <a
              href="mailto:0pietroquintavalle0@gmail.com"
              className="p-4 rounded-xl transition-all hover:scale-110 hover:shadow-2xl group"
              style={{ 
                background: colors.gradient2,
              }}
            >
              <Mail className="w-6 h-6" style={{ color: colors.text }} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8" style={{ color: colors.secondary }} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: colors.text, fontFamily: "'Inter', sans-serif" }}>
                I'm an IT Support–certified Economics student with 5+ years of hands-on experience in system 
                administration, virtualization (Proxmox, Hyper-V), and network infrastructure.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: colors.text, fontFamily: "'Inter', sans-serif" }}>
                Skilled in scripting, automation, and server deployment across Windows and Linux environments. 
                I've built and maintained 6-10 production-grade servers with 90%+ uptime using automation tools 
                and Infrastructure as Code (IaC) principles.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: colors.text, fontFamily: "'Inter', sans-serif" }}>
                Currently pursuing Economics at USI while continuing to deliver scalable, secure, and 
                high-availability infrastructure solutions to clients.
              </p>
              <div className="flex flex-wrap gap-3">
                <span
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                  style={{ background: colors.gradient1, color: colors.text }}
                >
                  🇮🇹 Italian (Native)
                </span>
                <span
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                  style={{ background: colors.gradient3, color: colors.text }}
                >
                  🇺🇸 English (Fluent)
                </span>
                <span
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                  style={{ background: colors.gradient2, color: colors.text }}
                >
                  🇩🇪 German (Conversational)
                </span>
                <span
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                  style={{ backgroundColor: colors.success, color: colors.bg }}
                >
                  📍 Switzerland 🇨🇭
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <div
                  key={category}
                  className="p-6 rounded-2xl border transition-all hover:scale-105 hover:shadow-2xl group"
                  style={{
                    backgroundColor: colors.bgCard,
                    borderColor: colors.bgLight,
                    borderWidth: '1px'
                  }}
                >
                  <h3 className="text-xl font-semibold mb-4" style={{ color: colors.secondary, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-lg text-sm transition-all hover:scale-105"
                        style={{
                          backgroundColor: colors.bgHover,
                          color: colors.text,
                          fontFamily: "'JetBrains Mono', monospace"
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
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Professional Experience
          </h2>

          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border mb-8 transition-all hover:scale-[1.02] hover:shadow-2xl group"
                style={{
                  backgroundColor: colors.bgCard,
                  borderColor: colors.primary,
                  borderWidth: '2px'
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center mb-4">
                    <div
                      className="p-4 rounded-xl mr-4 transition-all group-hover:scale-110"
                      style={{ background: colors.gradient1 }}
                    >
                      <Briefcase className="w-7 h-7" style={{ color: colors.text }} />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.text, fontFamily: "'Space Grotesk', sans-serif" }}>
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-lg font-medium" style={{ color: colors.secondary }}>
                          {exp.company}
                        </span>
                        <span className="text-sm" style={{ color: colors.textMuted }}>
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm px-4 py-2 rounded-xl" style={{ 
                    background: colors.gradient3,
                    color: colors.text,
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    <Calendar className="w-4 h-4 mr-2" />
                    {exp.period}
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-6" style={{ color: colors.textMuted, fontFamily: "'Inter', sans-serif" }}>
                  {exp.description}
                </p>

                <div>
                  <h4 className="text-lg font-semibold mb-4" style={{ color: colors.primary, fontFamily: "'Space Grotesk', sans-serif" }}>
                    Key Achievements:
                  </h4>
                  <div className="space-y-3">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start group/item">
                        <div
                          className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0 transition-all group-hover/item:scale-150"
                          style={{ background: colors.gradient2 }}
                        ></div>
                        <span style={{ color: colors.text, fontFamily: "'Inter', sans-serif" }}>{achievement}</span>
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
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border transition-all hover:scale-105 hover:shadow-2xl cursor-pointer group"
                style={{
                  backgroundColor: colors.bgCard,
                  borderColor: colors.bgLight,
                  borderWidth: '1px'
                }}
                onClick={() => setShowProjectGallery(project)}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="p-3 rounded-xl mr-3 transition-all group-hover:scale-110"
                    style={{ background: colors.gradient1 }}
                  >
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold" style={{ color: colors.text, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm" style={{ color: colors.secondary, fontFamily: "'JetBrains Mono', monospace" }}>
                        {project.period}
                      </p>
                      <span
                        className="px-2 py-0.5 rounded-lg text-xs font-medium"
                        style={{
                          background: colors.gradient3,
                          color: colors.bg
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="leading-relaxed mb-4 text-sm" style={{ color: colors.textMuted, fontFamily: "'Inter', sans-serif" }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105"
                      style={{
                        backgroundColor: colors.bgHover,
                        color: colors.secondary,
                        fontFamily: "'JetBrains Mono', monospace"
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span
                      className="px-3 py-1 rounded-lg text-xs"
                      style={{
                        backgroundColor: colors.bgLighter,
                        color: colors.textMuted
                      }}
                    >
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-sm flex items-center gap-2 font-medium"
                    style={{ color: colors.primary }}
                  >
                    <Image className="w-4 h-4" />
                    View Details
                  </span>
                  <span
                    className="px-3 py-1 rounded-lg text-xs font-medium"
                    style={{
                      background: project.status === 'Production' ? colors.gradient3 : 
                                     project.status === 'Live' ? colors.gradient1 : colors.gradient2,
                      color: colors.text
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
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Education & Certifications
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Education Timeline */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 flex items-center" style={{ color: colors.secondary, fontFamily: "'Space Grotesk', sans-serif" }}>
                <GraduationCap className="w-7 h-7 mr-3" />
                Education Timeline
              </h3>

              <div className="relative">
                {/* Timeline Line */}
                <div 
                  className="absolute left-4 top-0 bottom-0 w-0.5" 
                  style={{ background: colors.gradient1 }}
                ></div>
                
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <div key={index} className="relative flex items-start group">
                      {/* Timeline Indicator */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className="w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all group-hover:scale-125"
                          style={{
                            backgroundColor: colors.bgCard,
                            borderColor: index === 0 ? colors.primary : colors.secondary
                          }}
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: index === 0 ? colors.primary : colors.secondary
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Timeline Content */}
                      <div 
                        className="ml-6 p-6 rounded-2xl border flex-1 transition-all hover:scale-105 hover:shadow-2xl"
                        style={{
                          backgroundColor: colors.bgCard,
                          borderColor: colors.bgLight,
                          borderWidth: '1px'
                        }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-semibold mb-2" style={{ color: colors.text, fontFamily: "'Space Grotesk', sans-serif" }}>
                              {edu.degree}
                            </h4>
                            <p className="font-medium" style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif" }}>
                              {edu.institution}
                            </p>
                          </div>
                          <span
                            className="px-3 py-1 rounded-xl text-xs font-medium"
                            style={{ 
                              background: index === 0 ? colors.gradient1 : colors.gradient3,
                              color: colors.text
                            }}
                          >
                            {edu.status}
                          </span>
                        </div>
                        
                        {edu.description && (
                          <p className="text-sm mb-3 leading-relaxed" style={{ color: colors.textMuted, fontFamily: "'Inter', sans-serif" }}>
                            {edu.description}
                          </p>
                        )}
                        
                        <div className="flex items-center text-sm" style={{ color: colors.textMuted, fontFamily: "'JetBrains Mono', monospace" }}>
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
              <h3 className="text-2xl font-semibold mb-8 flex items-center" style={{ color: colors.secondary, fontFamily: "'Space Grotesk', sans-serif" }}>
                <Award className="w-7 h-7 mr-3" />
                Certifications
              </h3>

              <div className="space-y-4">
                {certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl border flex items-center transition-all hover:scale-105 hover:shadow-2xl group"
                    style={{
                      backgroundColor: colors.bgCard,
                      borderColor: colors.bgLight,
                      borderWidth: '1px'
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full mr-4 transition-all group-hover:scale-150"
                      style={{ background: colors.gradient2 }}
                    ></div>
                    <span style={{ color: colors.text, fontFamily: "'Inter', sans-serif" }}>{cert}</span>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 p-6 rounded-2xl border transition-all hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundColor: colors.bgCard,
                  borderColor: colors.bgLight,
                  borderWidth: '1px'
                }}
              >
                <h4 className="text-lg font-semibold mb-4 flex items-center" style={{ color: colors.secondary, fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="mr-2">🎨</span>
                  Self-Learning & Hobbies
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div
                      className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0"
                      style={{ background: colors.gradient1 }}
                    ></div>
                    <div>
                      <p className="font-medium" style={{ color: colors.text, fontFamily: "'Inter', sans-serif" }}>
                        CAD Design & 3D Printing
                      </p>
                      <p className="text-sm mt-1" style={{ color: colors.textMuted, fontFamily: "'Inter', sans-serif" }}>
                        Learning CAD via Fusion 360 for 3D design and printing projects as a creative hobby
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mt-8 p-6 rounded-2xl border transition-all hover:shadow-2xl"
                style={{
                  backgroundColor: colors.bgCard,
                  borderColor: colors.bgLight,
                  borderWidth: '1px'
                }}
              >
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.primary, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Interests & Specialties
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Computer Hardware', 'Economics & Finance', 'Web Development', 'CAD & 3D Design', '3D Printing', 'Literature', 'Photography', 'Virtualization', 'Network Security'].map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-lg text-sm transition-all hover:scale-105"
                      style={{
                        backgroundColor: colors.bgHover,
                        color: colors.text,
                        fontFamily: "'Inter', sans-serif"
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
      <section id="contact" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let's Connect
          </h2>
          <p className="text-xl mb-16 max-w-2xl mx-auto" style={{ color: colors.textMuted, fontFamily: "'Inter', sans-serif" }}>
            I'm always interested in discussing new opportunities, collaborations, or Junior SysAdmin positions. 
            Let's connect and explore how my infrastructure expertise can benefit your organization.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <a
              href="mailto:0pietroquintavalle0@gmail.com"
              className="p-8 rounded-2xl transition-all hover:scale-110 hover:shadow-2xl group"
              style={{ background: colors.gradient2 }}
            >
              <Mail className="w-10 h-10 mx-auto mb-4 transition-all group-hover:scale-110" style={{ color: colors.text }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text, fontFamily: "'Space Grotesk', sans-serif" }}>Email</h3>
              <p className="text-sm" style={{ color: colors.text, fontFamily: "'Inter', sans-serif" }}>Professional inquiries</p>
            </a>

            <a
              href="https://www.linkedin.com/in/pietro-quintavalle-996b96267/"
              className="p-8 rounded-2xl transition-all hover:scale-110 hover:shadow-2xl group"
              style={{ background: colors.gradient3 }}
            >
              <Linkedin className="w-10 h-10 mx-auto mb-4 transition-all group-hover:scale-110" style={{ color: colors.text }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text, fontFamily: "'Space Grotesk', sans-serif" }}>LinkedIn</h3>
              <p className="text-sm" style={{ color: colors.text, fontFamily: "'Inter', sans-serif" }}>Professional network</p>
            </a>

            <a
              href="https://github.com/Quinta0"
              className="p-8 rounded-2xl transition-all hover:scale-110 hover:shadow-2xl group"
              style={{ background: colors.gradient1 }}
            >
              <Github className="w-10 h-10 mx-auto mb-4 transition-all group-hover:scale-110" style={{ color: colors.text }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text, fontFamily: "'Space Grotesk', sans-serif" }}>GitHub</h3>
              <p className="text-sm" style={{ color: colors.text, fontFamily: "'Inter', sans-serif" }}>Code repositories</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ borderColor: colors.bgLight }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6">
            <div className="flex justify-center items-center gap-8 mb-6">
              <a
                href="https://github.com/Quinta0"
                className="text-sm hover:opacity-80 transition-all hover:scale-105"
                style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pietro-quintavalle-996b96267/"
                className="text-sm hover:opacity-80 transition-all hover:scale-105"
                style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                LinkedIn
              </a>
              <a
                href="mailto:0pietroquintavalle0@gmail.com"
                className="text-sm hover:opacity-80 transition-all hover:scale-105"
                style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                Email
              </a>
            </div>
          </div>
          <p className="mb-3" style={{ color: colors.textMuted, fontFamily: "'Inter', sans-serif" }}>
            Built with ⚡ using React & Modern Design • Pietro Quintavalle © 2025
          </p>
          <p className="text-sm" style={{ color: colors.textMuted, fontFamily: "'JetBrains Mono', monospace" }}>
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