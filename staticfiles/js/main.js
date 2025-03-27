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
    
    // Initialize theme toggle functionality
    initThemeToggle();
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
    const numElements = 25; // Number of floating elements
    const shades = ['#000000', '#222222', '#444444', '#666666', '#888888', '#aaaaaa', '#cccccc', '#eeeeee', '#ffffff'];
    const sizes = [10, 15, 20, 25, 30, 40, 50, 60];
    
    // Determine the theme
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        // Random properties
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const top = Math.random() * 100; // %
        const left = Math.random() * 100; // %
        const opacity = 0.05 + Math.random() * 0.15; // More subtle opacity
        
        // Use black and white shades depending on theme
        let color;
        if (isDarkTheme) {
            // For dark theme, use lighter shades
            color = shades[Math.floor(Math.random() * 5) + 4]; // 4-8 (lighter shades)
        } else {
            // For light theme, use darker shades
            color = shades[Math.floor(Math.random() * 5)]; // 0-4 (darker shades)
        }
        
        // Apply styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.borderRadius = Math.random() > 0.5 ? '50%' : `${Math.floor(Math.random() * 5) + 5}px`;
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

/**
 * Initialize theme toggle functionality
 * Toggles between light and dark mode
 */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    const icon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    // Check if theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        bodyElement.setAttribute('data-bs-theme', savedTheme);
        updateThemeIcon(savedTheme, icon);
    }
    
    // Add click event to theme toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = bodyElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update the theme attribute
            bodyElement.setAttribute('data-bs-theme', newTheme);
            
            // Update the icon
            updateThemeIcon(newTheme, icon);
            
            // Save theme preference to localStorage
            localStorage.setItem('theme', newTheme);
        });
    }
}

/**
 * Updates the theme toggle icon based on the current theme
 * @param {string} theme - The current theme ('light' or 'dark')
 * @param {Element} icon - The icon element to update
 */
function updateThemeIcon(theme, icon) {
    if (!icon) return;
    
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}
