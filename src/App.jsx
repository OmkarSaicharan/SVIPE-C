import React, { useEffect } from 'react';
import './styles.css';

const App = () => {
  useEffect(() => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    const handleMobileClick = () => {
      navMenu.classList.toggle('active');
      mobileMenuBtn.innerHTML = navMenu.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    };

    mobileMenuBtn.addEventListener('click', handleMobileClick);

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    const handleNavLinkClick = () => {
      navMenu.classList.remove('active');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    };
    navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));

    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Smooth scrolling for navigation links
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = e => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    };
    anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));

    // Form submission
    const form = document.getElementById('contactForm');
    const handleFormSubmit = e => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#0d9488';
        submitBtn.style.borderColor = '#0d9488';

        setTimeout(() => {
          form.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
        }, 2000);
      }, 1500);
    };
    if (form) form.addEventListener('submit', handleFormSubmit);

    // Modal functionality
    const modalTriggers = document.querySelectorAll('.learn-more-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    const handleTriggerClick = e => {
      const trigger = e.currentTarget;
      const serviceType = trigger.getAttribute('data-service');
      let modalId;
      switch (serviceType) {
        case 'web-design':
          modalId = 'webDesignModal';
          break;
        case 'web-app':
          modalId = 'webAppModal';
          break;
        case 'backend':
          modalId = 'backendModal';
          break;
        default:
          modalId = null;
      }
      if (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
        }
      }
    };

    modalTriggers.forEach(trigger => trigger.addEventListener('click', handleTriggerClick));

    const handleCloseButtonClick = e => {
      const modal = e.currentTarget.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    };
    closeButtons.forEach(button => button.addEventListener('click', handleCloseButtonClick));

    const handleModalClick = e => {
      const modal = e.currentTarget;
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    };
    modals.forEach(modal => modal.addEventListener('click', handleModalClick));

    const handleEsc = e => {
      if (e.key === 'Escape') {
        modals.forEach(modal => {
          if (modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
          }
        });
      }
    };
    document.addEventListener('keydown', handleEsc);

    // Hover effect on service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const handleCardEnter = function () {
      this.style.transform = 'translateY(-8px)';
    };
    const handleCardLeave = function () {
      this.style.transform = 'translateY(0)';
    };
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', handleCardEnter);
      card.addEventListener('mouseleave', handleCardLeave);
    });

    // Intersection observer animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const animatedEls = document.querySelectorAll('.service-card, .portfolio-item, .team-member');
    animatedEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Cleanup
    return () => {
      mobileMenuBtn.removeEventListener('click', handleMobileClick);
      navLinks.forEach(link => link.removeEventListener('click', handleNavLinkClick));
      window.removeEventListener('scroll', handleScroll);
      anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
      if (form) form.removeEventListener('submit', handleFormSubmit);
      modalTriggers.forEach(trigger => trigger.removeEventListener('click', handleTriggerClick));
      closeButtons.forEach(button => button.removeEventListener('click', handleCloseButtonClick));
      modals.forEach(modal => modal.removeEventListener('click', handleModalClick));
      document.removeEventListener('keydown', handleEsc);
      serviceCards.forEach(card => {
        card.removeEventListener('mouseenter', handleCardEnter);
        card.removeEventListener('mouseleave', handleCardLeave);
      });
      animatedEls.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-container">
          <a href="#home" className="logo">
            svipe<span>C</span>
          </a>

          <button className="mobile-menu-btn">
            <i className="fas fa-bars" />
          </button>

          <ul className="nav-menu">
            <li>
              <a href="#home" className="nav-link">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="nav-link">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="nav-link">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#team" className="nav-link">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-container">
            <div className="hero-content">
              <h1>
                Creating Digital Experiences That <span>Inspire</span>
              </h1>
              <p>
                We craft beautiful, functional websites and applications that help businesses connect with their audience. Our focus is on clean design, intuitive interfaces, and seamless user experiences.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#portfolio" className="btn">
                  View Our Work
                  <i className="fas fa-arrow-right" />
                </a>
                <a href="#contact" className="btn btn-outline">
                  Get in Touch
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Developer working on code"
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container">
          <div className="section-title">
            <h2>What We Offer</h2>
            <p>Comprehensive digital solutions tailored to your specific needs and goals.</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-paint-brush" />
              </div>
              <h3>Web Design</h3>
              <p>
                Beautiful, responsive websites designed with your brand in mind. We create engaging digital experiences that capture attention and drive conversions.
              </p>
              <button
                className="btn btn-outline learn-more-btn"
                data-service="web-design"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
              >
                Learn More
              </button>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-code" />
              </div>
              <h3>Web Applications</h3>
              <p>
                Custom web applications built with modern technologies. Scalable solutions that grow with your business and adapt to changing requirements.
              </p>
              <button
                className="btn btn-outline learn-more-btn"
                data-service="web-app"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
              >
                Learn More
              </button>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-server" />
              </div>
              <h3>Backend Development</h3>
              <p>
                Robust backend systems and APIs that power your applications. Secure, scalable infrastructure that ensures reliable performance.
              </p>
              <button
                className="btn btn-outline learn-more-btn"
                data-service="backend"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Web Design Modal */}
      <div id="webDesignModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Web Design Services</h3>
            <button className="close-modal">&times;</button>
          </div>
          <div className="modal-body">
            <div className="service-details">
              <div>
                <h4>Comprehensive Web Design Solutions</h4>
                <p>
                  We create visually stunning, user-friendly websites that effectively communicate your brand message and drive business growth. Our approach combines aesthetic appeal with functional excellence.
                </p>

                <div className="tech-stack">
                  <h4>Our Design Process:</h4>
                  <div className="tech-tags">
                    <span className="tech-tag web-design">Discovery &amp; Strategy</span>
                    <span className="tech-tag web-design">Wireframing</span>
                    <span className="tech-tag web-design">UI/UX Design</span>
                    <span className="tech-tag web-design">Responsive Design</span>
                    <span className="tech-tag web-design">Prototyping</span>
                    <span className="tech-tag web-design">User Testing</span>
                  </div>
                </div>
              </div>

              <div className="service-features">
                <h4>What We Offer:</h4>
                <ul>
                  <li>Responsive &amp; Mobile-First Design</li>
                  <li>User Experience (UX) Optimization</li>
                  <li>Brand Identity Integration</li>
                  <li>Conversion Rate Optimization</li>
                  <li>SEO-Friendly Structure</li>
                  <li>E-commerce Design</li>
                  <li>Landing Page Design</li>
                  <li>Website Redesign</li>
                </ul>
              </div>
            </div>

            <div className="tech-stack">
              <h4>Technologies We Use:</h4>
              <div className="tech-tags">
                <span className="tech-tag web-design">Figma</span>
                <span className="tech-tag web-design">Adobe XD</span>
                <span className="tech-tag web-design">Sketch</span>
                <span className="tech-tag web-design">HTML5</span>
                <span className="tech-tag web-design">CSS3</span>
                <span className="tech-tag web-design">JavaScript</span>
                <span className="tech-tag web-design">React</span>
                <span className="tech-tag web-design">Vue.js</span>
                <span className="tech-tag web-design">Bootstrap</span>
                <span className="tech-tag web-design">Tailwind CSS</span>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a href="#contact" className="btn">
              Start Your Web Design Project
              <i className="fas fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>

      {/* Web App Modal */}
      <div id="webAppModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Web Application Development</h3>
            <button className="close-modal">&times;</button>
          </div>
          <div className="modal-body">
            <div className="service-details">
              <div>
                <h4>Custom Web Applications</h4>
                <p>
                  We build scalable, high-performance web applications that solve complex business problems. From SaaS platforms to enterprise solutions, we deliver applications that users love.
                </p>

                <div className="tech-stack">
                  <h4>Development Approach:</h4>
                  <div className="tech-tags">
                    <span className="tech-tag web-app">Agile Methodology</span>
                    <span className="tech-tag web-app">MVP Development</span>
                    <span className="tech-tag web-app">Progressive Enhancement</span>
                    <span className="tech-tag web-app">Continuous Integration</span>
                    <span className="tech-tag web-app">Code Review</span>
                    <span className="tech-tag web-app">Quality Assurance</span>
                  </div>
                </div>
              </div>

              <div className="service-features">
                <h4>Our Services Include:</h4>
                <ul>
                  <li>Custom SaaS Development</li>
                  <li>Progressive Web Apps (PWA)</li>
                  <li>Real-time Applications</li>
                  <li>API Integration</li>
                  <li>Payment Gateway Integration</li>
                  <li>Dashboard &amp; Analytics Tools</li>
                  <li>CRM &amp; ERP Systems</li>
                  <li>Legacy System Modernization</li>
                </ul>
              </div>
            </div>

            <div className="tech-stack">
              <h4>Technology Stack:</h4>
              <div className="tech-tags">
                <span className="tech-tag web-app">React</span>
                <span className="tech-tag web-app">Vue.js</span>
                <span className="tech-tag web-app">Angular</span>
                <span className="tech-tag web-app">TypeScript</span>
                <span className="tech-tag web-app">Node.js</span>
                <span className="tech-tag web-app">Python/Django</span>
                <span className="tech-tag web-app">Ruby on Rails</span>
                <span className="tech-tag web-app">GraphQL</span>
                <span className="tech-tag web-app">REST APIs</span>
                <span className="tech-tag web-app">WebSocket</span>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a href="#contact" className="btn">
              Build Your Web Application
              <i className="fas fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>

      {/* Backend Modal */}
      <div id="backendModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Backend Development Services</h3>
            <button className="close-modal">&times;</button>
          </div>
          <div className="modal-body">
            <div className="service-details">
              <div>
                <h4>Robust Backend Solutions</h4>
                <p>
                  We develop secure, scalable backend systems that power modern applications. Our focus is on performance, security, and maintainability to ensure your application runs smoothly.
                </p>

                <div className="tech-stack">
                  <h4>Our Development Principles:</h4>
                  <div className="tech-tags">
                    <span className="tech-tag backend">Security First</span>
                    <span className="tech-tag backend">Scalability</span>
                    <span className="tech-tag backend">Performance</span>
                    <span className="tech-tag backend">Reliability</span>
                    <span className="tech-tag backend">Maintainability</span>
                    <span className="tech-tag backend">Documentation</span>
                  </div>
                </div>
              </div>

              <div className="service-features">
                <h4>Backend Services:</h4>
                <ul>
                  <li>API Development &amp; Integration</li>
                  <li>Database Design &amp; Optimization</li>
                  <li>Server Architecture</li>
                  <li>Cloud Infrastructure</li>
                  <li>Microservices Architecture</li>
                  <li>Authentication &amp; Authorization</li>
                  <li>Data Security &amp; Encryption</li>
                  <li>Performance Optimization</li>
                </ul>
              </div>
            </div>

            <div className="tech-stack">
              <h4>Backend Technologies:</h4>
              <div className="tech-tags">
                <span className="tech-tag backend">Node.js</span>
                <span className="tech-tag backend">Python</span>
                <span className="tech-tag backend">Java</span>
                <span className="tech-tag backend">Go</span>
                <span className="tech-tag backend">PostgreSQL</span>
                <span className="tech-tag backend">MongoDB</span>
                <span className="tech-tag backend">Redis</span>
                <span className="tech-tag backend">AWS</span>
                <span className="tech-tag backend">Docker</span>
                <span className="tech-tag backend">Kubernetes</span>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a href="#contact" className="btn">
              Discuss Backend Requirements
              <i className="fas fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <section id="portfolio" className="section portfolio">
        <div className="container">
          <div className="section-title">
            <h2>Our Recent Work</h2>
            <p>See how we've helped businesses transform their digital presence.</p>
          </div>

          <div className="portfolio-grid">
            <div className="portfolio-item">
              <img
                src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="E-commerce Website"
                className="portfolio-img"
              />
              <div className="portfolio-content">
                <h3>INDSHOPSIDE Modern E-commerce Platform</h3>
                <p>A responsive onlineNapCre with intuitive shopping experience and secure payment integration.</p>
                <a
                  href="https://omkarsaicharan.github.io/INDSHOPSIDE/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
                >
                  View Project
                </a>
              </div>
            </div>

            <div className="portfolio-item">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Dashboard Design"
                className="portfolio-img"
              />
              <div className="portfolio-content">
                <h3>Analytics Dashboard</h3>
                <p>Data visualization platform with real-time insights and customizable reporting features.</p>
                <a
                  href="https://omkarsaicharan.github.io/predictiveMmaintenance/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
                >
                  View Project
                </a>
              </div>
            </div>

            <div className="portfolio-item">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
                alt="BookMatte"
                className="portfolio-img"
              />
              <div className="portfolio-content">
                <h3>BookMatte</h3>
                <p>
                  All Booking Platforms. Movies, Flights, Trains, Buses, Cabs, Tours, Visa, Cruise, Forex, Insurance, Concerts, Hotels — all at your fingertips!.
                </p>
                <a
                  href="https://omkarsaicharan.github.io/Bookmatte/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
                >
                  View Project
                </a>
              </div>
            </div>

            <div className="portfolio-item">
              <img
                src="https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80"
                alt="CinemaMom"
                className="portfolio-img"
              />
              <div className="portfolio-content">
                <h3>CinemaMom</h3>
                <p>All Movies Your premium destination for authentic Telugu cinema. Watch classic movies with direct official links.</p>
                <a
                  href="https://omkarsaicharan.github.io/CinemaMom1/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Team</h2>
            <p>Passionate professionals dedicated to creating exceptional digital solutions.</p>
          </div>

          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <i className="fas fa-user" />
              </div>
              <h4></h4>
              <p>Lead Designer</p>
            </div>

            <div className="team-member">
              <div className="member-avatar">
                <i className="fas fa-user" />
              </div>
              <h4></h4>
              <p>Frontend Developer</p>
            </div>

            <div className="team-member">
              <div className="member-avatar">
                <i className="fas fa-user" />
              </div>
              <h4></h4>
              <p>Backend Engineer</p>
            </div>

            <div className="team-member">
              <div className="member-avatar">
                <i className="fas fa-user" />
              </div>
              <h4></h4>
              <p>Project Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <div className="container">
          <div className="section-title">
            <h2>Client Testimonials</h2>
            <p>Hear from businesses that have transformed with our solutions.</p>
          </div>

          <div className="testimonial-slider">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Working with this team was an absolute pleasure. They understood our vision and delivered a website that exceeded our expectations. The attention to detail and communication throughout the
                project was exceptional."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4></h4>
                  <p>CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-title">
            <h2>Start Your Project</h2>
            <p>Ready to bring your ideas to life? Get in touch with us today.</p>
          </div>

          <div className="contact-form">
            <form id="contactForm">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input type="text" id="name" className="form-control" required />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input type="email" id="email" className="form-control" required />
              </div>

              <div className="form-group">
                <label htmlFor="service" className="form-label">
                  Service Interested In
                </label>
                <select id="service" className="form-control" required defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="web-design">Web Design</option>
                  <option value="web-app">Web Applications</option>
                  <option value="backend">Backend Development</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Project Details
                </label>
                <textarea id="message" className="form-control" rows="5" required></textarea>
              </div>

              <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                Send Message
                <i className="fas fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div>
              <div className="footer-logo">
                svipe<span>C</span>
              </div>
              <p>
                Creating digital experiences that inspire and drive results. We help businesses establish a strong online presence with beautiful, functional solutions.
              </p>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/thornala-omkar-saicharan-a913702b7" target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a
                  href="https://www.instagram.com/zl_omkar_sai_charan?igsh=MXBsZGFrbXBwNjBubA=="
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a href="https://github.com/OmkarSaicharan" target="_blank" rel="noreferrer">
                  <i className="fab fa-github" />
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Services</h4>
              <ul>
                <li>
                  <a href="#" className="learn-more-btn" data-service="web-design">
                    Web Design
                  </a>
                </li>
                <li>
                  <a href="#" className="learn-more-btn" data-service="web-app">
                    Web Applications
                  </a>
                </li>
                <li>
                  <a href="#" className="learn-more-btn" data-service="backend">
                    Backend Development
                  </a>
                </li>
                <li>
                  <a href="#services">Software Solutions</a>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#services">Services</a>
                </li>
                <li>
                  <a href="#portfolio">Portfolio</a>
                </li>
                <li>
                  <a href="#team">Our Team</a>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="mailto:omkarsaicharan@gmail.com">omkarsaicharan@gmail.com</a>
                </li>
                <li>
                  <a href="tel:+919392965097">+91 9392965097</a>
                </li>
                <li>Design Street</li>
                <li></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 svipeC All rights reserved. | Designed with care for beautiful digital experiences.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
