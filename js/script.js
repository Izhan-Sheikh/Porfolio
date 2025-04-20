// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Header
const header = document.querySelector('header');
const heroSection = document.querySelector('.hero');
const heroSectionHeight = heroSection.offsetHeight;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Skill Animation on Scroll
const skillSections = document.querySelectorAll('.skill-item');
const animateSkills = () => {
    skillSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionTop < screenPosition) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            
            // Animate progress bars
            const progressBar = section.querySelector('.skill-progress');
            progressBar.style.width = progressBar.parentElement.previousElementSibling.lastElementChild.textContent;
        }
    });
};

// Hide skills initially
skillSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease';
    
    // Set initial width of progress bar to 0
    const progressBar = section.querySelector('.skill-progress');
    progressBar.style.width = '0';
    progressBar.style.transition = 'width 1s ease-in-out';
});

// Add animation on scroll event
window.addEventListener('scroll', animateSkills);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Make sure FormSubmit is properly activated
    contactForm.addEventListener('submit', function(e) {
        // For testing locally without FormSubmit active
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            e.preventDefault();
            window.location.href = 'thanks.html';
            return;
        }
        
        // For production use with FormSubmit
        console.log('Form submission in progress...');
        
        // Display feedback to user while form is submitting
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // After 2 seconds, if the form hasn't redirected yet, redirect manually
        setTimeout(() => {
            if (document.activeElement === submitBtn) {
                window.location.href = 'thanks.html';
            }
        }, 2000);
    });
}

// Animate floating elements
const floatingElements = document.querySelectorAll('.floating-element');
floatingElements.forEach(element => {
    let randomX = Math.random() * 10 - 5;
    let randomY = Math.random() * 10 - 5;
    
    setInterval(() => {
        randomX = -randomX;
        randomY = -randomY;
        
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 3000);
});

// Add animation class to elements when they come into view
const animateOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionTop < screenPosition) {
            section.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
window.addEventListener('load', () => {
    animateSkills();
    animateOnScroll();
    
    // Typing effect for hero section
    const element = document.querySelector('.element');
    if (element) {
        const texts = ["HTML", "CSS", "JavaScript", "UI Design", "UX Design", "Web Development"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                // Remove a character
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Add a character
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Typing speed
            let typeSpeed = isDeleting ? 50 : 150;
            
            // If word is complete
            if (!isDeleting && charIndex === currentText.length) {
                // Pause at end of word
                typeSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing effect
        setTimeout(type, 1000);
    }
    
    // Perspective effect for code block
    const codeBlock = document.querySelector('.code-block');
    if (codeBlock) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Limited rotation effect
            const rotateY = 5 - (x * 10);
            const rotateX = -5 + (y * 10);
            
            codeBlock.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
        
        // Reset on mouse leave
        document.addEventListener('mouseleave', () => {
            codeBlock.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
        });
    }
}); 