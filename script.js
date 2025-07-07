// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Animate hamburger menu
        const spans = mobileMenu.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navLinks.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link (improved for mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) { // Only close on mobile/tablet
                navLinks.classList.remove('active');
                const spans = mobileMenu.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    });

    // Optional: Close menu when clicking outside nav on mobile
    document.addEventListener('click', (e) => {
        if (
            navLinks.classList.contains('active') &&
            window.innerWidth <= 900 &&
            !navLinks.contains(e.target) &&
            !mobileMenu.contains(e.target)
        ) {
            navLinks.classList.remove('active');
            const spans = mobileMenu.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
}

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 76, 58, 0.98)';
    } else {
        header.style.background = 'rgba(26, 76, 58, 0.95)';
    }
});

// Form submission handler
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic form validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Phone number validation (if phone field exists)
    const phoneField = document.getElementById('phone');
    if (phoneField && phoneField.value.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phoneField.value.trim())) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    this.reset();
});

// Notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
        `;
    
        // Append notification to body
        document.body.appendChild(notification);
    
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

// Animate stats on scroll
const statsContainer = document.querySelector('.stats');

if (statsContainer) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(statNum => {
                    // Prevent re-animating
                    if (statNum.dataset.animated) {
                        return;
                    }
                    statNum.dataset.animated = 'true';

                    const text = statNum.textContent;
                    const target = parseInt(text, 10);
                    const suffix = text.replace(/[0-9]/g, '');
                    const duration = 2000; // 2 seconds

                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        const currentValue = Math.floor(progress * target);
                        statNum.textContent = currentValue + suffix;
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        } else {
                            statNum.textContent = target + suffix;
                        }
                    };
                    window.requestAnimationFrame(step);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(statsContainer);
}

// Animate About section numbers on scroll
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const aboutNumbers = entry.target.querySelectorAll('.about-number');
                aboutNumbers.forEach(num => {
                    if (num.dataset.animated) return;
                    num.dataset.animated = 'true';

                    const text = num.textContent;
                    const target = parseInt(text, 10);
                    const suffix = text.replace(/[0-9]/g, '');
                    const duration = 2000;

                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        const currentValue = Math.floor(progress * target);
                        num.textContent = currentValue + suffix;
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        } else {
                            num.textContent = target + suffix;
                        }
                    };
                    window.requestAnimationFrame(step);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);
}

// Back to Top button functionality
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
}
