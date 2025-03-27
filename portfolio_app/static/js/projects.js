/**
 * JavaScript for the projects page
 * Handles filtering of projects and card interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize project filtering
    initProjectFilter();
    
    // Initialize tooltips for project cards
    initProjectCardFeatures();
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

/**
 * Initialize features for project cards
 * - Tooltips for Read More buttons
 * - Read More functionality
 */
function initProjectCardFeatures() {
    // Initialize tooltips for all elements with data-bs-toggle="tooltip"
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Add click event for Read More buttons
    const readMoreButtons = document.querySelectorAll('.project-expand a');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the project card
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('.card-title').textContent;
            
            // In a real implementation, this would show a modal with full project details
            // For now, just show an alert
            alert(`Full details for "${projectTitle}" would be shown in a modal.`);
        });
    });
}
