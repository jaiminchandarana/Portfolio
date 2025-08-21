document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Initialize loading screen
    initializeLoadingScreen();
    
    // Initialize profile image handling
    initializeProfileImage();
    
    // Initialize animations after a short delay
    setTimeout(() => {
        initializeAnimations();
    }, 1500);
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            animateNavMenu(true);
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });

    // Hero Section Button Smooth Scrolling
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project Filtering with enhanced animations
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            animateProjectFilter(filter, projectCards);
        });
    });

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');

        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        animateFormSubmission();
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
    });

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            toggleTheme();
        });
    }

    // Navbar Background on Scroll
    window.addEventListener('scroll', handleScroll);

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        updateActiveNavOnScroll(sections, navLinks);
    });

    initializeHoverAnimations();
    initializeScrollAnimations();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

function initializeProfileImage() {
    const profileImage = document.getElementById('profile-img');
    const profilePlaceholder = document.getElementById('profile-placeholder');
    
    if (!profileImage || !profilePlaceholder) return;
    profileImage.addEventListener('load', function() {
        profilePlaceholder.style.opacity = '0';
        profileImage.style.opacity = '1';
        profileImage.classList.add('loaded');
        
        console.log('Profile image loaded successfully');
    });
    
    profileImage.addEventListener('error', function() {
        createProfessionalAvatar();
        
        console.log('Profile image failed to load, showing professional avatar');
    });
    if (profileImage.src.includes('profile-photo.jpg')) {
        createProfessionalAvatar();
    }
}

function createProfessionalAvatar() {
    const profilePlaceholder = document.getElementById('profile-placeholder');
    
    if (!profilePlaceholder) return;
    
    // Replace placeholder content with professional avatar
    profilePlaceholder.innerHTML = '';
    profilePlaceholder.classList.add('professional-avatar');
    
    // Add initials
    const initials = document.createElement('span');
    initials.textContent = 'JC';
    initials.style.fontFamily = 'var(--font-family-base)';
    profilePlaceholder.appendChild(initials);
    
    // Show the avatar
    profilePlaceholder.style.opacity = '1';
    profilePlaceholder.style.visibility = 'visible';
}

// Theme Management
function initializeTheme() {
    const savedTheme = getThemeFromStorage() || 'light';
    setTheme(savedTheme);
}

function getThemeFromStorage() {
    try {
        return localStorage.getItem('portfolio-theme');
    } catch (e) {
        console.warn('localStorage not available, using default theme');
        return null;
    }
}

function setThemeToStorage(theme) {
    try {
        localStorage.setItem('portfolio-theme', theme);
    } catch (e) {
        console.warn('localStorage not available, theme preference not saved');
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);
    updateThemeIcon(theme);
    setThemeToStorage(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTheme(newTheme);
    animateThemeToggle(newTheme);
    
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 300);
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

function animateThemeToggle(newTheme) {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle || !themeIcon) return;
    
    themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
    setTimeout(() => {
        updateThemeIcon(newTheme);
        themeToggle.style.transform = 'scale(1) rotate(0deg)';
    }, 150);
}

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;

    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300);
    }, 1500);
}

// Enhanced Animations
function initializeAnimations() {
    if (typeof motion === 'undefined') {
        console.warn('Framer motion not loaded, using CSS fallbacks');
        initializeFallbackAnimations();
        return;
    }

    animateHeroSection();
    animateSkillsSection();
    animateExperienceSection();
    animateProjectsSection();
    animateContactSection();
}

function animateHeroSection() {
    if (typeof motion === 'undefined') return;

    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroDescription = document.getElementById('hero-description');
    const heroButtons = document.getElementById('hero-buttons');
    const heroImage = document.getElementById('hero-image');

    const heroElements = [heroTitle, heroSubtitle, heroDescription, heroButtons];
    heroElements.forEach((element, index) => {
        if (element) {
            motion.animate(element, {
                opacity: [0, 1],
                y: [30, 0]
            }, {
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1]
            });
        }
    });

    if (heroImage) {
        motion.animate(heroImage, {
            opacity: [0, 1],
            scale: [0.8, 1],
            rotate: [5, 0]
        }, {
            duration: 1,
            delay: 0.8,
            ease: [0.16, 1, 0.3, 1]
        });
    }
}

function animateSkillsSection() {
    if (typeof motion === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const grid = entry.target;
                const cards = grid.querySelectorAll('.skill-card');
                cards.forEach((card, index) => {
                    motion.animate(card, {
                        opacity: [0, 1],
                        y: [40, 0],
                        scale: [0.9, 1]
                    }, {
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: [0.16, 1, 0.3, 1]
                    });
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skills-grid').forEach(grid => {
        observer.observe(grid);
    });
}

function animateExperienceSection() {
    if (typeof motion === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.experience-card');
                cards.forEach((card, index) => {
                    motion.animate(card, {
                        opacity: [0, 1],
                        y: [50, 0],
                        scale: [0.95, 1]
                    }, {
                        duration: 0.8,
                        delay: index * 0.2,
                        ease: [0.16, 1, 0.3, 1]
                    });

                    // Animate responsibility items with stagger
                    setTimeout(() => {
                        const responsibilities = card.querySelectorAll('.responsibilities li');
                        responsibilities.forEach((item, itemIndex) => {
                            motion.animate(item, {
                                opacity: [0, 1],
                                x: [-20, 0]
                            }, {
                                duration: 0.5,
                                delay: itemIndex * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            });
                        });

                        // Animate tech badges
                        const techBadges = card.querySelectorAll('.tech-badge');
                        techBadges.forEach((badge, badgeIndex) => {
                            motion.animate(badge, {
                                opacity: [0, 1],
                                scale: [0.8, 1]
                            }, {
                                duration: 0.4,
                                delay: (responsibilities.length * 0.1) + (badgeIndex * 0.05),
                                ease: [0.16, 1, 0.3, 1]
                            });
                        });
                    }, (index * 0.2 + 0.4) * 1000);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const experienceSection = document.querySelector('.experience-timeline');
    if (experienceSection) {
        observer.observe(experienceSection);
    }
}

function animateProjectsSection() {
    if (typeof motion === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    motion.animate(card, {
                        opacity: [0, 1],
                        y: [50, 0],
                        rotateX: [15, 0]
                    }, {
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: [0.16, 1, 0.3, 1]
                    });
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        observer.observe(projectsGrid);
    }
}

function animateContactSection() {
    if (typeof motion === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const formFields = document.querySelectorAll('.form-field');
                formFields.forEach((field, index) => {
                    motion.animate(field, {
                        opacity: [0, 1],
                        x: [-30, 0]
                    }, {
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: [0.16, 1, 0.3, 1]
                    });
                });

                const contactItems = document.querySelectorAll('.contact-item');
                contactItems.forEach((item, index) => {
                    motion.animate(item, {
                        opacity: [0, 1],
                        x: [30, 0]
                    }, {
                        duration: 0.6,
                        delay: index * 0.1 + 0.2,
                        ease: [0.16, 1, 0.3, 1]
                    });
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const contactSection = document.getElementById('contact');
    if (contactSection) {
        observer.observe(contactSection);
    }
}

// Fallback animations
function initializeFallbackAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animateElements = document.querySelectorAll('.skill-card, .project-card, .experience-card, .contact-item, .hero-title, .hero-subtitle');
    animateElements.forEach(el => observer.observe(el));
}

// Enhanced Interactions
function initializeHoverAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (typeof motion !== 'undefined') {
                motion.animate(this, {
                    y: -8,
                    scale: 1.02
                }, {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1]
                });
            }
        });

        card.addEventListener('mouseleave', function() {
            if (typeof motion !== 'undefined') {
                motion.animate(this, {
                    y: 0,
                    scale: 1
                }, {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1]
                });
            }
        });
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (typeof motion !== 'undefined') {
                motion.animate(this, {
                    y: -8,
                    scale: 1.01
                }, {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1]
                });
            }
        });

        card.addEventListener('mouseleave', function() {
            if (typeof motion !== 'undefined') {
                motion.animate(this, {
                    y: 0,
                    scale: 1
                }, {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1]
                });
            }
        });
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (typeof motion !== 'undefined') {
                motion.animate(this, {
                    y: -2,
                    scale: 1.02
                }, {
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1]
                });
            }
        });

        button.addEventListener('mouseleave', function() {
            if (typeof motion !== 'undefined') {
                motion.animate(this, {
                    y: 0,
                    scale: 1
                }, {
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1]
                });
            }
        });
    });
}

// Animation Functions
function animateNavMenu(isOpen) {
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    if (isOpen) {
        navLinks.forEach((link, index) => {
            if (typeof motion !== 'undefined') {
                motion.animate(link, {
                    opacity: [0, 1],
                    x: [-20, 0]
                }, {
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                });
            }
        });
    }
}

function animateProjectFilter(filter, projectCards) {
    projectCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;

        if (typeof motion !== 'undefined') {
            if (shouldShow) {
                card.style.display = 'block';
                motion.animate(card, {
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    y: [20, 0]
                }, {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                });
            } else {
                motion.animate(card, {
                    opacity: [1, 0],
                    scale: [1, 0.9],
                    y: [0, -20]
                }, {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1]
                }).then(() => {
                    card.style.display = 'none';
                });
            }
        } else {
            if (shouldShow) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        }
    });
}

function animateFormSubmission() {
    const submitButton = document.querySelector('.form-submit');
    if (typeof motion !== 'undefined' && submitButton) {
        motion.animate(submitButton, {
            scale: [1, 0.95, 1]
        }, {
            duration: 0.3,
            easing: [0.16, 1, 0.3, 1]
        });
    }
}

function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (typeof motion !== 'undefined') {
                    motion.animate(entry.target, {
                        opacity: [0, 1],
                        y: [30, 0]
                    }, {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1]
                    });
                } else {
                    entry.target.classList.add('fade-in');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.section-title, .category-title').forEach(title => {
        observer.observe(title);
    });
}

function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(var(--color-surface-rgb), 0.95)';
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.background = 'rgba(var(--color-surface-rgb), 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

function updateActiveNavOnScroll(sections, navLinks) {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

function updateActiveNavLink(clickedLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--space-16);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        max-width: 350px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(20px);
    `;

    if (type === 'success') {
        notification.style.borderColor = 'var(--color-success)';
        notification.style.backgroundColor = 'rgba(var(--color-success-rgb), 0.1)';
    } else if (type === 'error') {
        notification.style.borderColor = 'var(--color-error)';
        notification.style.backgroundColor = 'rgba(var(--color-error-rgb), 0.1)';
    } else if (type === 'info') {
        notification.style.borderColor = 'var(--color-info)';
        notification.style.backgroundColor = 'rgba(var(--color-info-rgb), 0.1)';
    }

    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}" 
               style="color: var(--color-${type === 'info' ? 'info' : type}); font-size: 18px;"></i>
            <div style="flex: 1;">
                <div style="color: var(--color-text); font-weight: var(--font-weight-medium); margin-bottom: 4px;">
                    ${type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : 'Info'}
                </div>
                <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm); line-height: 1.4;">
                    ${message}
                </div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: var(--color-text-secondary); cursor: pointer; padding: 4px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}