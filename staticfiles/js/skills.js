/**
 * JavaScript for the skills page
 * Handles skill progress animation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill progress animation
    initSkillsAnimation();
});

/**
 * Initialize skill progress bar animation
 */
function initSkillsAnimation() {
    const skillProgressBars = document.querySelectorAll('.progress-bar');
    
    if (skillProgressBars.length) {
        // Reset initial width to 0
        skillProgressBars.forEach(bar => {
            bar.style.width = '0%';
        });
        
        // Animate progress bars when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('aria-valuenow') + '%';
                    
                    // Animate to target width
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1s ease-in-out';
                        progressBar.style.width = targetWidth;
                    }, 200);
                    
                    // Unobserve after animation
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe each progress bar
        skillProgressBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Add hover effect to tool cards
    const toolCards = document.querySelectorAll('.tool-card');
    
    if (toolCards.length) {
        toolCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    }
}
