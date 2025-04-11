// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
 // Add active class to nav links based on scroll position
 const sections = document.querySelectorAll('section[id]');
 const navLinks = document.querySelectorAll('.nav-links a');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.progress-bar');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const percentage = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = percentage;
        }, 100);
    });
};

// Intersection Observer for skill bars animation
const skillsSection = document.querySelector('.skills-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(skillsSection);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check if user previously set a theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'light-theme') {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        if (icon.classList.contains('fa-moon')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light-theme');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark-theme');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
   
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elementsToAnimate = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right');
        
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Add animation classes to elements
    document.querySelectorAll('.certification-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.article-card').forEach((card, index) => {
        card.classList.add('slide-in-left');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Run animations on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Mobile menu functionality
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Only add mobile menu if not already present
    if (!document.querySelector('.mobile-menu-toggle')) {
        nav.insertBefore(mobileMenuToggle, navLinks);
        
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });
    }
});