/**
 * ARIN JAIN — PERSONAL DEVELOPER PORTFOLIO
 * Theme: Vintage Digital Magazine & Creative Developer Scrapbook
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     01. VINTAGE LOADING SCREEN SIMULATION
     ========================================================================== */
  const vintageLoader = document.getElementById('vintageLoader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderStatus = document.getElementById('loaderStatus');

  const loadingSteps = [
    { progress: 20, text: 'Setting typographic lead and woodblocks...' },
    { progress: 45, text: 'Mixing sepia ink & warming vacuum tubes...' },
    { progress: 75, text: 'Mounting photographic plates...' },
    { progress: 95, text: 'Calibrating editorial gazette...' },
    { progress: 100, text: 'Dispatch ready!' }
  ];

  let currentStep = 0;
  const loadInterval = setInterval(() => {
    if (currentStep < loadingSteps.length) {
      const step = loadingSteps[currentStep];
      if (loaderBar) loaderBar.style.width = `${step.progress}%`;
      if (loaderStatus) loaderStatus.textContent = step.text;
      currentStep++;
    } else {
      clearInterval(loadInterval);
      setTimeout(() => {
        if (vintageLoader) {
          vintageLoader.classList.add('loaded');
          // Play subtle typewriter bell chime if sound enabled
          playAudioChime();
        }
      }, 400);
    }
  }, 220);

  /* ==========================================================================
     02. AUDIO SYNTHESIZER (Web Audio API - Zero External Dependencies)
     ========================================================================== */
  let soundEnabled = true;
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Tactile vintage mechanical click
  function playClickSound() {
    if (!soundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Soft mechanical bell chime for loading or achievements
  function playAudioChime() {
    if (!soundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.08); // A5

      gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {}
  }

  // Sound Toggle Button
  const soundToggle = document.getElementById('soundToggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      const soundText = soundToggle.querySelector('.sound-text');
      const soundIcon = soundToggle.querySelector('i');
      
      if (soundEnabled) {
        if (soundText) soundText.textContent = 'SFX: ON';
        if (soundIcon) soundIcon.className = 'fa-solid fa-volume-high';
        playClickSound();
      } else {
        if (soundText) soundText.textContent = 'SFX: OFF';
        if (soundIcon) soundIcon.className = 'fa-solid fa-volume-xmark';
      }
    });
  }

  // Attach tactile audio to all buttons and links
  document.querySelectorAll('a, button, input, textarea, select').forEach(el => {
    el.addEventListener('click', () => {
      playClickSound();
    });
  });

  /* ==========================================================================
     03. CUSTOM DESKTOP MOUSE CURSOR
     ========================================================================== */
  const customCursor = document.getElementById('customCursor');
  if (customCursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth trailing ring lerp
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.22;
      cursorY += (mouseY - cursorY) * 0.22;

      customCursor.style.left = `${cursorX}px`;
      customCursor.style.top = `${cursorY}px`;

      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Expand cursor ring on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-pill, .profile-card, .scrap-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => customCursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'));
    });
  }

  /* ==========================================================================
     04. PROMINENT CATEGORY NAVIGATION & ACTIVE HIGHLIGHT
     ========================================================================== */
  const categoryButtons = document.querySelectorAll('.category-btn');
  const sections = document.querySelectorAll('section[id], header[id]');
  const menuToggle = document.getElementById('menuToggle');
  const categoryMenu = document.getElementById('categoryMenu');
  const floatingMenuBtn = document.getElementById('floatingMenuBtn');
  const backToTopBtn = document.getElementById('backToTop');

  // Category button click handling with smooth scroll
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Close mobile menu if open
        if (categoryMenu && categoryMenu.classList.contains('mobile-open')) {
          categoryMenu.classList.remove('mobile-open');
          if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        }

        // Smooth scroll with offset for sticky nav
        const navHeight = document.getElementById('mainNav')?.offsetHeight || 70;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Set active immediately
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (menuToggle && categoryMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = categoryMenu.classList.toggle('mobile-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Floating menu button (jumps or scrolls to category bar)
  if (floatingMenuBtn) {
    floatingMenuBtn.addEventListener('click', () => {
      const navBar = document.getElementById('mainNav');
      if (navBar) {
        navBar.scrollIntoView({ behavior: 'smooth' });
        // If on small screen, trigger drawer
        if (window.innerWidth <= 820 && categoryMenu) {
          categoryMenu.classList.add('mobile-open');
          if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
        }
      }
    });
  }

  // Back to Top button
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // IntersectionObserver to highlight category button corresponding to active section
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        categoryButtons.forEach(btn => {
          if (btn.getAttribute('href') === `#${id}`) {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('section[id]').forEach(sec => {
    sectionObserver.observe(sec);
  });

  /* ==========================================================================
     05. PROJECT FILTERING & MODAL BLUEPRINT INSPECTION
     ========================================================================= */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Blueprints data for dedicated inspection modal
  const projectBlueprints = {
    '1': {
      title: 'Personal Developer Portfolio',
      category: 'Web Experience & Creative Editorial',
      status: 'Active Prototype / Demo',
      diagram: 'assets/images/project-portfolio.svg',
      problem: 'Most developer portfolios use cookie-cutter React templates that look identical and fail to express design originality, vintage creative aesthetic, or fundamental HTML/CSS/JS expertise.',
      solution: 'Crafted a bespoke digital magazine & vintage scrapbook hybrid using zero frameworks. Employs brutalist paper borders, washi tape accents, and rich vanilla JS interactions.',
      features: [
        'Pure HTML5, CSS3, and Vanilla JavaScript with no frameworks',
        'Interactive category menu with scrollspy and mobile drawer',
        'Synthesized audio feedback utilizing Web Audio API without audio files',
        'Interactive project blueprint inspection modal and category filtering',
        'Completely responsive from 320px mobile screens to large 4K displays'
      ],
      techStack: ['HTML5', 'CSS3 Custom Properties', 'Vanilla JS (ES6+)', 'Web Audio API', 'Responsive Grid'],
      github: 'https://github.com/arinjain/portfolio',
      demo: '#home'
    },
    '2': {
      title: 'Student Management System',
      category: 'CLI & System Architecture',
      status: 'Academic Demo Concept',
      diagram: 'assets/images/project-student.svg',
      problem: 'Small departments and student organizations frequently deal with spreadsheet corruption, lack of structured data validation, and cumbersome record updates.',
      solution: 'Designed a lightweight, modular Python terminal application featuring CRUD database operations, structured error handling, and clean console reports.',
      features: [
        'Interactive CLI menu with formatted ASCII tables',
        'Student enrollment, course assignment, and GPA computation',
        'Persistent file storage with JSON/SQLite database backend',
        'Search and filter functionality with input validation checks'
      ],
      techStack: ['Python 3', 'SQLite / JSON', 'CLI Design', 'Data Validation', 'Modular Architecture'],
      github: 'https://github.com/arinjain/student-management',
      demo: '#projects'
    },
    '3': {
      title: 'Expense & Budget Tracker',
      category: 'Web Application & Personal Finance',
      status: 'Demo Prototype',
      diagram: 'assets/images/project-expense.svg',
      problem: 'University students need a distraction-free, zero-ad budget tracker that respects user privacy without forcing cloud account logins.',
      solution: 'Developed an offline-first ledger web application that logs transactions, calculates spending category distributions, and persists data exclusively in localStorage.',
      features: [
        'Instant transaction logging with customizable tags',
        'Monthly budget progress bar with automatic warning thresholds',
        'CSV format export and import for seamless ledger backups',
        'Client-side state calculation with sub-millisecond execution'
      ],
      techStack: ['JavaScript', 'HTML5 Web Storage', 'CSS Grid', 'Data Analytics'],
      github: 'https://github.com/arinjain/expense-tracker',
      demo: '#contact'
    },
    '4': {
      title: 'Weather Observation Station',
      category: 'Asynchronous API Web Application',
      status: 'Demo Prototype',
      diagram: 'assets/images/project-weather.svg',
      problem: 'Weather web apps often feel crowded with ads, heavy tracking scripts, and slow initial paint times.',
      solution: 'Created a vintage meteorological station dashboard that fetches live atmospheric data from public weather endpoints with robust error handling and caching.',
      features: [
        'Live weather queries with geocoding fallback',
        '5-day forecasted atmospheric barometer and temperature shifts',
        'Dynamic vintage theme adaptions based on solar time',
        'Graceful offline indicator when connection drops'
      ],
      techStack: ['Fetch API', 'Async / Await', 'JSON Data Parsing', 'CSS Flexbox & Animations'],
      github: 'https://github.com/arinjain/weather-dashboard',
      demo: '#contact'
    },
    '5': {
      title: 'Collaborative Hackathon Sprint',
      category: 'Rapid Prototyping & Hackathon Jam',
      status: 'Sprint Prototype',
      diagram: 'assets/images/project-hackathon.svg',
      problem: 'High-pressure 36-hour hackathons necessitate rapid feature prioritization, clean team Git synchronization, and high-impact pitch prototypes.',
      solution: 'Collaborated with peers to design, build, and pitch a functioning interactive prototype, managing sprint workflows and modular frontend components.',
      features: [
        'Engineered responsive interface within 36 hours',
        'Maintained structured Git branching and code review conventions',
        'Produced functional demo tested across various devices',
        'Delivered 3-minute pitch deck and architectural walkthrough'
      ],
      techStack: ['JavaScript', 'Rapid UI Wireframing', 'Team Git Workflows', 'Pitch Presentation'],
      github: 'https://github.com/arinjain/hackathon-prototype',
      demo: '#contact'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalProjectId = document.getElementById('modalProjectId');

  function openProjectModal(id) {
    const data = projectBlueprints[id];
    if (!data || !projectModal || !modalBody) return;

    if (modalProjectId) modalProjectId.textContent = `AJ-PROJ-0${id}`;

    modalBody.innerHTML = `
      <div class="modal-category-tag" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-orange); font-weight: 800; margin-bottom: 0.4rem;">
        ${data.category} • <span style="color: var(--olive-green);">${data.status}</span>
      </div>
      <h3 class="modal-proj-title">${data.title}</h3>
      
      <div class="modal-proj-diagram">
        <img src="${data.diagram}" alt="${data.title} blueprint" style="width: 100%; height: auto;" />
      </div>

      <div style="margin: 1.25rem 0;">
        <h4 style="font-family: var(--font-mono); font-size: 0.9rem; font-weight: 800; color: var(--dark-brown); margin-bottom: 0.35rem;">PROBLEM STATEMENT:</h4>
        <p style="font-size: 0.95rem; color: var(--ink-secondary); line-height: 1.6; margin-bottom: 1rem;">${data.problem}</p>
        
        <h4 style="font-family: var(--font-mono); font-size: 0.9rem; font-weight: 800; color: var(--dark-brown); margin-bottom: 0.35rem;">ENGINEERING SOLUTION:</h4>
        <p style="font-size: 0.95rem; color: var(--ink-secondary); line-height: 1.6; margin-bottom: 1.25rem;">${data.solution}</p>
      </div>

      <div style="background-color: var(--paper-white); border: 2px solid var(--dark-brown); padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; color: var(--accent-orange); margin-bottom: 0.6rem;">CORE SPECIFICATIONS & FEATURES:</h4>
        <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--ink-primary); line-height: 1.6;">
          ${data.features.map(f => `<li style="margin-bottom: 0.35rem;">${f}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 1.75rem;">
        <h4 style="font-family: var(--font-mono); font-size: 0.82rem; font-weight: 800; color: var(--dark-brown); margin-bottom: 0.5rem;">TECHNOLOGIES EMPLOYED:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; border-top: 1.5px dashed var(--dark-brown); padding-top: 1.25rem;">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 0.8rem; padding: 0.65rem 1.2rem;">
          <i class="fa-brands fa-github"></i> VIEW REPOSITORY
        </a>
        <a href="${data.demo}" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.65rem 1.2rem;" onclick="closeProjectModal();">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> TEST PROTOTYPE
        </a>
      </div>
    `;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('open');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.btn-inspect').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-inspect');
      openProjectModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     07. SIMULATED OPEN SOURCE CONTRIBUTION CALENDAR
     ========================================================================== */
  const contribCalendar = document.getElementById('contribCalendar');
  if (contribCalendar) {
    const totalCells = 36 * 7; // 36 columns, 7 rows
    const fragment = document.createDocumentFragment();

    // Deterministic pseudo-random seed pattern to represent authentic activity
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.className = 'contrib-cell';

      // Weight towards level 0, 1, 2, with occasional 3 and 4
      const rand = Math.sin(i * 3.7 + (i % 7)) * 0.5 + 0.5;
      let level = 0;
      if (rand > 0.85) level = 4;
      else if (rand > 0.68) level = 3;
      else if (rand > 0.48) level = 2;
      else if (rand > 0.28) level = 1;

      cell.classList.add(`lvl-${level}`);
      cell.title = `Simulated day: ${level > 0 ? level * 2 + ' contributions' : 'No commits recorded'}`;
      fragment.appendChild(cell);
    }
    contribCalendar.appendChild(fragment);
  }

  /* ==========================================================================
     08. CONTACT FORM VALIDATION & MAILTO FALLBACK
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactMessage = document.getElementById('contactMessage');
  const charCount = document.getElementById('charCount');
  const formFeedback = document.getElementById('formFeedback');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Real-time character counter
  if (contactMessage && charCount) {
    contactMessage.addEventListener('input', () => {
      const len = contactMessage.value.length;
      charCount.textContent = `${len} characters`;
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Clear previous error states
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (messageError) messageError.textContent = '';
      if (formFeedback) {
        formFeedback.hidden = true;
        formFeedback.className = 'form-feedback';
      }

      // Name validation
      if (!contactName.value.trim()) {
        if (nameError) nameError.textContent = 'Please provide your name.';
        isValid = false;
      }

      // Email validation
      if (!contactEmail.value.trim()) {
        if (emailError) emailError.textContent = 'Email address is required.';
        isValid = false;
      } else if (!validateEmail(contactEmail.value.trim())) {
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      // Message validation
      if (!contactMessage.value.trim()) {
        if (messageError) messageError.textContent = 'Dispatch message cannot be blank.';
        isValid = false;
      } else if (contactMessage.value.trim().length < 10) {
        if (messageError) messageError.textContent = 'Please enter at least 10 characters.';
        isValid = false;
      }

      if (isValid) {
        const nameVal = encodeURIComponent(contactName.value.trim());
        const emailVal = encodeURIComponent(contactEmail.value.trim());
        const msgVal = encodeURIComponent(contactMessage.value.trim());

        // Prepare feedback message
        if (formFeedback) {
          formFeedback.hidden = false;
          formFeedback.classList.add('success');
          formFeedback.innerHTML = `
            <strong>&#10003; DISPATCH PREPARED!</strong><br>
            Frontend validation successful. Launching your default mail application via <code>mailto:</code> fallback...<br>
            <span style="font-size: 0.78rem; opacity: 0.85;">(Note: Connect Formspree, EmailJS, or an Express backend for automatic background email transmission).</span>
          `;
        }

        // Trigger mailto fallback after brief delay
        setTimeout(() => {
          const mailtoUri = `mailto:arinjain.contact@example.com?subject=Portfolio%20Inquiry%20from%20${nameVal}&body=Sender%20Name:%20${nameVal}%0D%0ASender%20Email:%20${emailVal}%0D%0A%0D%0AMessage:%0D%0A${msgVal}`;
          window.location.href = mailtoUri;
        }, 1200);

        playAudioChime();
        contactForm.reset();
        if (charCount) charCount.textContent = '0 characters';
      } else {
        if (formFeedback) {
          formFeedback.hidden = false;
          formFeedback.classList.add('error');
          formFeedback.innerHTML = '<strong>&#9888; FORM ERROR:</strong> Please correct the highlighted fields before transmitting.';
        }
      }
    });
  }

  // Resume Download Button Placeholder Handler
  const downloadResumeBtn = document.getElementById('downloadResumeBtn');
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Arin Jain — Resume Dossier:\n\nThis is an editable download placeholder. Replace this action with a link to your hosted PDF file (e.g. assets/Arin_Jain_Resume.pdf) when ready!');
    });
  }

  /* ==========================================================================
     09. FOOTER DYNAMIC YEAR UPDATE
     ========================================================================== */
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
