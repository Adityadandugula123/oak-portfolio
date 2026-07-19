/*
 * =========================================================================
 *  Aditya Dandugula - Professional Frontend Developer Portfolio Script
 *  Built using Modular Vanilla ES6+ JavaScript
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  
  /* -------------------------------------------------------------------------
     1. Preloader Logic
     ------------------------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Fade out preloader when page assets are fully loaded, or fallback after 1.5s
    const dismissPreloader = () => {
      preloader.classList.add('loaded');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    };

    window.addEventListener('load', dismissPreloader);
    // Fallback timer
    setTimeout(dismissPreloader, 1500);
  }

  /* -------------------------------------------------------------------------
     2. Custom Cursor (Disabled)
     ------------------------------------------------------------------------- */
  // Custom cursor has been disabled to use the standard system cursor.

  /* -------------------------------------------------------------------------
     3. Scroll Indicators (Sticky Header & Scroll Progress)
     ------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = documentHeight > 0 ? (scrollY / documentHeight) * 100 : 0;

    // Sticky Header class
    if (header) {
      if (scrollY > 50) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }

    // Scroll progress bar width
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercentage}%`;
    }

    // Back to top floating button display
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initial validation on load

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* -------------------------------------------------------------------------
     3b. Smooth Scrolling with Sticky Header Offset
     ------------------------------------------------------------------------- */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Ignore empty hashes or non-anchor values
      if (targetId === '#' || targetId === '#!') return;
      
      // If navigating to Home/Hero section, scroll to the absolute top
      if (targetId === '#home') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Dynamically compute sticky header height
        // Standard non-sticky padding is 24px top/bottom, sticky is 14px top/bottom
        const headerHeight = header ? header.offsetHeight : 80;
        const extraBuffer = 20; // Extra breathing room to beautifully frame the section title
        const totalOffset = headerHeight + extraBuffer;
        
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - totalOffset;
        
        window.scrollTo({
          top: offsetPosition >= 0 ? offsetPosition : 0,
          behavior: 'smooth'
        });
      }
    });
  });

  /* -------------------------------------------------------------------------
     4. Dark & Light Theme Toggle
     ------------------------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve previous state or default to dark
  const storedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  /* -------------------------------------------------------------------------
     5. Hamburger & Mobile Sidebar Drawer
     ------------------------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const closeSidebar = document.getElementById('close-sidebar');
  const mobileSidebar = document.getElementById('mobile-menu-sidebar');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  const openDrawer = () => {
    if (hamburger && mobileSidebar && mobileOverlay) {
      hamburger.setAttribute('aria-expanded', 'true');
      mobileSidebar.classList.add('show');
      mobileOverlay.classList.add('show');
      document.body.classList.add('modal-open');
    }
  };

  const closeDrawer = () => {
    if (hamburger && mobileSidebar && mobileOverlay) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileSidebar.classList.remove('show');
      mobileOverlay.classList.remove('show');
      document.body.classList.remove('modal-open');
    }
  };

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (closeSidebar) closeSidebar.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  sidebarLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  /* -------------------------------------------------------------------------
     6. Typing Animation (Hero Section)
     ------------------------------------------------------------------------- */
  const typingTextElement = document.getElementById('typing-text');
  if (typingTextElement) {
    const words = [
      "Frontend Developer",
      "Problem Solver",
      "Java Programmer",
      "Web Developer",
      "Continuous Learner"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeAnimation = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        // Erasing
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Erase faster
      } else {
        // Typing
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 120; // Natural typing pacing
      }

      // Word sequence completions
      if (!isDeleting && charIndex === currentWord.length) {
        // Hold on completed word before deleting
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Proceed to next phrase index
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400; // Pause before typing new word
      }

      setTimeout(typeAnimation, typingSpeed);
    };

    // Initialize Typing Loop
    setTimeout(typeAnimation, 1000);
  }

  /* -------------------------------------------------------------------------
     7. Mouse Parallax Effect
     ------------------------------------------------------------------------- */
  const heroGraphic = document.getElementById('hero-graphic-parallax');
  const bgCircles = document.querySelectorAll('.floating-circle');

  document.addEventListener('mousemove', (e) => {
    const xOffset = (window.innerWidth / 2 - e.clientX) / 50;
    const yOffset = (window.innerHeight / 2 - e.clientY) / 50;

    // Parallax on Hero central card frame
    if (heroGraphic) {
      heroGraphic.style.transform = `translate3d(${xOffset * 0.8}px, ${yOffset * 0.8}px, 0)`;
    }

    // Parallax on background blur coordinates
    bgCircles.forEach((circle) => {
      const speed = parseFloat(circle.getAttribute('data-parallax-speed')) || 0.05;
      const xTranslate = (window.innerWidth / 2 - e.clientX) * speed;
      const yTranslate = (window.innerHeight / 2 - e.clientY) * speed;
      circle.style.transform = `translate3d(${xTranslate}px, ${yTranslate}px, 0)`;
    });
  });

  /* -------------------------------------------------------------------------
     8. Section Active Scroll Spy
     ------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const sidebarLinksList = document.querySelectorAll('.sidebar-link');

  const scrollSpy = () => {
    let currentActiveId = '';
    const scrollPosition = window.scrollY + 200; // Offset checking threshold

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute('id');
      }
    });

    // Update Desktop Nav Links active class
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActiveId}`) {
        link.classList.add('active');
      }
    });

    // Update Mobile Sidebar Drawer Links active class
    sidebarLinksList.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActiveId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // Initial call

  /* -------------------------------------------------------------------------
     9. Intersection Observer Animations (Scroll Reveal, Stats, Skills)
     ------------------------------------------------------------------------- */
  
  // Register basic Scroll Reveal classes
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-reveal');
        // Unobserve after showing to retain visible state
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px 150px 0px' });

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  const addReveal = (el, className) => {
    if (el) {
      el.classList.add(className);
      revealObserver.observe(el);
    }
  };

  // Robust fallback: Automatically trigger reveal after 1 second if elements are not revealed
  setTimeout(() => {
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom').forEach((el) => {
      if (!el.classList.contains('active-reveal')) {
        el.classList.add('active-reveal');
      }
    });
  }, 1000);

  // Assign reveal states directly to major sections
  const assignRevealHooks = () => {
    // Header anims
    addReveal(document.getElementById('about-header-anim'), 'reveal-up');
    addReveal(document.getElementById('skills-header-anim'), 'reveal-up');
    addReveal(document.getElementById('projects-header-anim'), 'reveal-up');
    addReveal(document.getElementById('education-header-anim'), 'reveal-up');
    addReveal(document.getElementById('certs-header-anim'), 'reveal-up');
    addReveal(document.getElementById('platforms-header-anim'), 'reveal-up');
    addReveal(document.getElementById('contact-header-anim'), 'reveal-up');

    // Layout elements
    addReveal(document.getElementById('about-info-anim'), 'reveal-left');
    addReveal(document.getElementById('about-stats-anim'), 'reveal-right');

    addReveal(document.getElementById('skill-cat-1'), 'reveal-up');
    addReveal(document.getElementById('skill-cat-2'), 'reveal-up');
    addReveal(document.getElementById('skill-cat-3'), 'reveal-up');
    addReveal(document.getElementById('skill-cat-4'), 'reveal-up');

    // Timeline elements
    addReveal(document.getElementById('edu-item-1'), 'reveal-right');
    addReveal(document.getElementById('edu-item-2'), 'reveal-left');
    addReveal(document.getElementById('edu-item-3'), 'reveal-right');

    // Cert / Ach layout columns
    addReveal(document.getElementById('certs-column-anim'), 'reveal-left');
    addReveal(document.getElementById('achievements-column-anim'), 'reveal-right');

    // Contact elements
    addReveal(document.getElementById('contact-info-anim'), 'reveal-left');
    addReveal(document.getElementById('contact-form-anim'), 'reveal-right');

    // Projects stagger reveal hooks
    addReveal(document.getElementById('project-card-1'), 'reveal-up');
    addReveal(document.getElementById('project-card-2'), 'reveal-up');
    addReveal(document.getElementById('project-card-3'), 'reveal-up');
    addReveal(document.getElementById('project-card-4'), 'reveal-up');
  };
  
  assignRevealHooks();

  // Animated Statistics Counter Trigger
  const statsSection = document.getElementById('stats-section');
  const statNumbers = document.querySelectorAll('.stat-number');
  let counterAnimated = false;

  const animateCounters = () => {
    statNumbers.forEach((num) => {
      const target = parseFloat(num.getAttribute('data-target'));
      const decimals = parseInt(num.getAttribute('data-decimals')) || 0;
      let currentVal = 0;
      const duration = 1500; // Counter timing in milliseconds
      const increment = target / (duration / 16); // ~60fps calculations

      const updateCounter = () => {
        currentVal += increment;
        if (currentVal >= target) {
          num.textContent = target.toFixed(decimals) + (target === 150 ? '+' : target === 5 ? '+' : target === 4 ? '' : '');
        } else {
          num.textContent = currentVal.toFixed(decimals);
          requestAnimationFrame(updateCounter);
        }
      };
      updateCounter();
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counterAnimated) {
        animateCounters();
        counterAnimated = true;
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  if (statsSection) statsObserver.observe(statsSection);

  // Skill progress bars filling up and percentage counters
  const skillsListContainer = document.getElementById('skills-list-container');
  const progressBars = document.querySelectorAll('.progress-bar');
  const skillPercentages = document.querySelectorAll('.skill-percentage');
  let skillsAnimated = false;

  const animateSkills = () => {
    // Fill the bars widths
    progressBars.forEach((bar) => {
      const pct = bar.getAttribute('data-percentage');
      bar.style.width = `${pct}%`;
    });

    // Count up the text values
    skillPercentages.forEach((pctText) => {
      const targetVal = parseInt(pctText.getAttribute('data-val'));
      let currentVal = 0;
      const duration = 1200;
      const increment = targetVal / (duration / 16);

      const updateSkillPct = () => {
        currentVal += increment;
        if (currentVal >= targetVal) {
          pctText.textContent = `${targetVal}%`;
        } else {
          pctText.textContent = `${Math.floor(currentVal)}%`;
          requestAnimationFrame(updateSkillPct);
        }
      };
      updateSkillPct();
    });
  };

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !skillsAnimated) {
        animateSkills();
        skillsAnimated = true;
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  if (skillsListContainer) skillsObserver.observe(skillsListContainer);

  /* -------------------------------------------------------------------------
     10. Filterable Projects Gallery
     ------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle button active states
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        
        // Hide/Show cards with smooth scale transitioning
        if (filterVal === 'all' || cardCat === filterVal) {
          card.classList.remove('filtered-out');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.classList.add('filtered-out');
          }, 300);
        }
      });
    });
  });

  /* -------------------------------------------------------------------------
     11. Interactive Detailed Project Modal (Content Store & Core Actions)
     ------------------------------------------------------------------------- */
  const projectData = {
    'bus-system': {
      title: "Bus Management System",
      category: "Desktop App / Systems Engineering",
      image: "/assets/images/project_bus_1784474545786.jpg",
      desc: "Designed and engineered a powerful, administrative Java application engineered to coordinate public transit booking systems, transaction auditing logs, and staff shifts scheduling.",
      features: [
        "Advanced relational schema storing passenger booking records, transaction invoices, and schedules",
        "Interactive desktop UI built cleanly with custom Java Swing controls and visual components",
        "Automated PDF ticket compilation and local receipt export utilities for fast administrative workflows",
        "Optimized JDBC MySQL pooling routines maximizing database connection persistence efficiency"
      ],
      tech: ["Java JDK 17", "MySQL Database", "Swing UI Kit", "JDBC Connectors", "Jasper Reports"],
      github: "https://github.com/Adityadandugula123",
      demo: ""
    },
    'raksha': {
      title: "Raksha Women's Safety App",
      category: "Responsive Web Application",
      image: "/assets/images/project_raksha_1784474559254.jpg",
      desc: "Developed 'Raksha', an advanced frontend-driven emergency response web utility designed for modern safety monitoring. Created custom geolocation routing and SOS modules.",
      features: [
        "Real-time geolocation extraction tracking precise coordinate arrays for instant SOS geoshare",
        "Dynamic background shaking gesture trigger initializing a silent security broadcast",
        "Pre-configured mock incoming phone call simulations designed to aid immediate threat detours",
        "Offline storage of emergency family contact structures inside secure local clients"
      ],
      tech: ["HTML5 Canvas", "CSS3 Grid/Flexbox", "JavaScript (ES6+)", "Geolocation API", "Speech Synthesis API"],
      github: "https://github.com/Adityadandugula123",
      demo: "https://fluffy-alpaca-4dca2d.netlify.app/"
    },
    'interior': {
      title: "Interior Quotation System",
      category: "Business Billing Utility",
      image: "/assets/images/project_interior_1784474574005.jpg",
      desc: "Architected a custom invoice and estimator billing software for architecture and design studios, reducing calculation errors by automated pricing structures.",
      features: [
        "Interactive canvas layout mapping square footage dimensions alongside custom design materials",
        "Automatic PDF generation rendering professional business quotes with custom company branding",
        "Advanced dynamic filter panels querying materials lists by price tiers or specific layout designs",
        "Session persistence allowing draft estimates to carry over securely between browser loads"
      ],
      tech: ["Vanilla JavaScript", "Custom CSS Grid", "Local Storage API", "jsPDF Generator", "HTML-to-Canvas"],
      github: "https://github.com/Adityadandugula123",
      demo: "https://svs-interiors-quotation-system-836837675190.asia-southeast1.run.app/"
    },
    'portfolio': {
      title: "Aditya Dandugula's Premium Portfolio",
      category: "Creative Interactive Portfolio",
      image: "https://picsum.photos/seed/portfolio/800/600",
      desc: "The digital product you are currently navigating! Designed to be lightweight, high contrast, visually compelling, and extremely robust.",
      features: [
        "Micro-animations written natively in vanilla CSS preventing high frame rendering drops",
        "Custom, responsive fluid mouse-parallax floating layout panels on structural coordinates",
        "Intersection Observer triggers managing counters rendering speeds and loading percentages",
        "Dark-theme persistent states and clean responsive hamburger sidebars for mobile viewers"
      ],
      tech: ["Semantic HTML5", "Modern CSS Variables", "Vanilla JavaScript (ES6+)", "Vite Bundler", "Lucide SVG Pack"],
      github: "https://github.com/Adityadandugula123",
      demo: "https://ais-pre-n64ydvmiimqzi723p6jpgt-33554624158.asia-east1.run.app"
    }
  };

  const projectModal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');

  // Modal UI placeholders
  const modalImg = document.getElementById('modal-img');
  const modalCat = document.getElementById('modal-tag-category');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc-full');
  const modalFeaturesList = document.getElementById('modal-features-list');
  const modalTechStack = document.getElementById('modal-tech-stack');

  const openProjectModal = (projId) => {
    const data = projectData[projId];
    if (!data) return;

    // Populate modal components
    if (modalImg) modalImg.src = data.image;
    if (modalCat) modalCat.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;

    // Compile features bullet list
    if (modalFeaturesList) {
      modalFeaturesList.innerHTML = '';
      data.features.forEach((feature) => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeaturesList.appendChild(li);
      });
    }

    // Compile tech stack badges
    if (modalTechStack) {
      modalTechStack.innerHTML = '';
      data.tech.forEach((t) => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = t;
        modalTechStack.appendChild(span);
      });
    }

    // Dynamic external links inside modal footer
    const modalBtnGithub = document.getElementById('modal-btn-github');
    const modalBtnDemo = document.getElementById('modal-btn-demo');

    if (modalBtnGithub) {
      modalBtnGithub.href = data.github || "https://github.com/Adityadandugula123";
    }
    if (modalBtnDemo) {
      if (data.demo) {
        modalBtnDemo.href = data.demo;
        modalBtnDemo.style.display = 'inline-flex';
      } else {
        modalBtnDemo.style.display = 'none';
      }
    }

    // Show modal
    if (projectModal) {
      projectModal.classList.add('show');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }
  };

  const closeProjectModal = () => {
    if (projectModal) {
      projectModal.classList.remove('show');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
  };

  openModalButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project-id');
      openProjectModal(projId);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
  
  // Close modal on click-outside
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Keyboard accessibility: Escape close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeCertModal();
    }
  });

  /* -------------------------------------------------------------------------
     12. Certification Verification Zoom Modal
     ------------------------------------------------------------------------- */
  const certModal = document.getElementById('cert-modal');
  const closeCertModalBtn = document.getElementById('close-cert-modal');
  const certButtons = document.querySelectorAll('.view-cert-mock');
  
  const zoomCertTitle = document.getElementById('zoom-cert-title');
  const zoomCertOrg = document.getElementById('zoom-cert-org');
  const zoomCertDate = document.getElementById('zoom-cert-date');

  const openCertModal = (title, org, date) => {
    if (zoomCertTitle) zoomCertTitle.textContent = title;
    if (zoomCertOrg) zoomCertOrg.textContent = org;
    if (zoomCertDate) zoomCertDate.textContent = date;

    if (certModal) {
      certModal.classList.add('show');
      certModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }
  };

  const closeCertModal = () => {
    if (certModal) {
      certModal.classList.remove('show');
      certModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
  };

  certButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const org = btn.getAttribute('data-org');
      const date = btn.getAttribute('data-date');
      openCertModal(title, org, date);
    });
  });

  if (closeCertModalBtn) closeCertModalBtn.addEventListener('click', closeCertModal);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeCertModal();
      }
    });
  }

  /* -------------------------------------------------------------------------
     13. Contact Form Validation & Animated Success Overlay
     ------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const successOverlay = document.getElementById('form-success-overlay');
  const dismissSuccessBtn = document.getElementById('dismiss-success');

  // Input fields
  const inputName = document.getElementById('contact-name');
  const inputEmail = document.getElementById('contact-email');
  const inputSubject = document.getElementById('contact-subject');
  const inputMessage = document.getElementById('contact-message');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (input, errorElId, validationFn) => {
    const parentGroup = input.closest('.input-field-group');
    const isValid = validationFn(input.value.trim());

    if (isValid) {
      if (parentGroup) parentGroup.classList.remove('error-active');
      return true;
    } else {
      if (parentGroup) parentGroup.classList.add('error-active');
      return false;
    }
  };

  if (contactForm) {
    // Add real-time input error dismissal on user typing
    const inputs = [inputName, inputEmail, inputSubject, inputMessage];
    inputs.forEach((input) => {
      if (!input) return;
      input.addEventListener('input', () => {
        const parentGroup = input.closest('.input-field-group');
        if (parentGroup && parentGroup.classList.contains('error-active')) {
          parentGroup.classList.remove('error-active');
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Individual validations
      const isNameValid = validateField(inputName, 'error-name', (val) => val.length > 0);
      const isEmailValid = validateField(inputEmail, 'error-email', (val) => emailRegex.test(val));
      const isSubjectValid = validateField(inputSubject, 'error-subject', (val) => val.length > 0);
      const isMessageValid = validateField(inputMessage, 'error-message', (val) => val.length > 0);

      const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

      if (isFormValid) {
        // Mock server dispatching delay
        const submitBtn = document.getElementById('submit-btn');
        const submitBtnSpan = submitBtn.querySelector('span');
        
        if (submitBtn && submitBtnSpan) {
          submitBtn.style.pointerEvents = 'none';
          submitBtnSpan.textContent = "Encrypting Message...";
        }

        setTimeout(() => {
          // Reset button text
          if (submitBtn && submitBtnSpan) {
            submitBtn.style.pointerEvents = 'auto';
            submitBtnSpan.textContent = "Send Secure Message";
          }

          // Open glassmorphism success animation overlay
          if (successOverlay) {
            successOverlay.classList.add('active');
          }
          
          // Clear inputs
          contactForm.reset();
        }, 1200);
      }
    });
  }

  // Dismiss success panel button
  if (dismissSuccessBtn && successOverlay) {
    dismissSuccessBtn.addEventListener('click', () => {
      successOverlay.classList.remove('active');
    });
  }

  /* -------------------------------------------------------------------------
     14. Ripple Effect on Buttons
     ------------------------------------------------------------------------- */
  const rippleButtons = document.querySelectorAll('.ripple-effect');

  rippleButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-element';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      // Clean up after completion of animation
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  });

  // Dynamically compile icons after injection
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
