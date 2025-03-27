/**
 * JavaScript for the projects page
 * Handles filtering of projects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize project filtering
    initProjectFilter();
});

/**
 * Initialize project filtering functionality
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length && projectItems.length) {
        // Add click event to each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        
                        // Add animation
                        setTimeout(() => {
                            item.style.opacity = 1;
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = 0;
                        item.style.transform = 'scale(0.8)';
                        
                        // Hide after animation
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Set initial styles for animation
        projectItems.forEach(item => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = 1;
            item.style.transform = 'scale(1)';
        });
    }
}
