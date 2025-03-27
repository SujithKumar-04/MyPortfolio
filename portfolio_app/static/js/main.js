/**
 * Main JavaScript file for the portfolio website
 * Includes global functions and utilities
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize back to top button
    initBackToTop();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize Bootstrap tooltips
    initTooltips();
    
    // Initialize animated background
    initAnimatedBackground();
});

/**
 * Initialize the back to top button functionality
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        // Scroll to top when the button is clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize smooth scrolling for all anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize Bootstrap tooltips
 */
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Initialize animated background with floating elements
 */
function initAnimatedBackground() {
    const backgroundContainer = document.getElementById('animatedBackground');
    if (!backgroundContainer) return;
    
    // Create floating elements
    const numElements = 20; // Number of floating elements
    const colors = ['#e6f2ff', '#cce6ff', '#b3d9ff', '#99ccff', '#80bfff'];
    const sizes = [10, 15, 20, 25, 30, 40, 50];
    
    for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        // Random properties
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const top = Math.random() * 100; // %
        const left = Math.random() * 100; // %
        const opacity = 0.1 + Math.random() * 0.2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Apply styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.top = `${top}%`;
        element.style.left = `${left}%`;
        element.style.opacity = opacity;
        element.style.backgroundColor = color;
        
        // Apply animations with random duration and delay
        const animationDuration = 15 + Math.random() * 20; // 15-35s
        const animationDelay = Math.random() * 10; // 0-10s
        const animationType = Math.random() > 0.5 ? 'float' : 'float2';
        
        element.style.animation = `${animationType} ${animationDuration}s infinite ease-in-out ${animationDelay}s, 
                                  pulse ${animationDuration/2}s infinite ease-in-out ${animationDelay}s`;
        
        // Append to container
        backgroundContainer.appendChild(element);
    }
}
