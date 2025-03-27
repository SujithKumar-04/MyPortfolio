/**
 * JavaScript for the contact page
 * Handles contact form submission via AJAX
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form validation and submission
    initContactForm();
});

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('id_name');
            const emailInput = document.getElementById('id_email');
            const subjectInput = document.getElementById('id_subject');
            const messageInput = document.getElementById('id_message');
            
            // Reset previous validation
            resetFormValidation();
            
            // Validate form
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                showError(nameInput, 'name-error', 'Please enter your name');
                isValid = false;
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, 'email-error', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'email-error', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!subjectInput.value.trim()) {
                showError(subjectInput, 'subject-error', 'Please enter a subject');
                isValid = false;
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, 'message-error', 'Please enter your message');
                isValid = false;
            }
            
            // If form is valid, submit via AJAX
            if (isValid) {
                submitForm();
            }
        });
    }
}

/**
 * Show error message for form validation
 */
function showError(inputElement, errorId, errorMessage) {
    inputElement.classList.add('is-invalid');
    document.getElementById(errorId).textContent = errorMessage;
}

/**
 * Reset form validation state
 */
function resetFormValidation() {
    const formElements = document.querySelectorAll('.form-control');
    const errorElements = document.querySelectorAll('.invalid-feedback');
    
    formElements.forEach(element => {
        element.classList.remove('is-invalid');
    });
    
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    document.getElementById('formSuccess').classList.add('d-none');
    document.getElementById('formError').classList.add('d-none');
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Submit form via AJAX
 */
function submitForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const submitSpinner = document.getElementById('submitSpinner');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtnText.textContent = 'Sending...';
    submitSpinner.classList.remove('d-none');
    
    // Send AJAX request
    fetch('/send-message/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Reset loading state
        submitBtn.disabled = false;
        submitBtnText.textContent = 'Send Message';
        submitSpinner.classList.add('d-none');
        
        if (data.success) {
            // Show success message
            document.getElementById('formSuccess').classList.remove('d-none');
            // Reset form
            form.reset();
        } else {
            // Show error message
            const errorElement = document.getElementById('formError');
            const errorTextElement = document.getElementById('errorText');
            
            if (data.errors) {
                // Show field-specific errors
                for (const [field, message] of Object.entries(data.errors)) {
                    const inputElement = document.getElementById(`id_${field}`);
                    const errorId = `${field}-error`;
                    if (inputElement && document.getElementById(errorId)) {
                        showError(inputElement, errorId, message);
                    }
                }
            } else {
                // Show general error
                errorTextElement.textContent = data.message || 'There was an error sending your message. Please try again.';
                errorElement.classList.remove('d-none');
            }
        }
    })
    .catch(error => {
        // Reset loading state
        submitBtn.disabled = false;
        submitBtnText.textContent = 'Send Message';
        submitSpinner.classList.add('d-none');
        
        // Show error message
        const errorElement = document.getElementById('formError');
        const errorTextElement = document.getElementById('errorText');
        errorTextElement.textContent = 'Network error. Please check your connection and try again.';
        errorElement.classList.remove('d-none');
        
        console.error('Error:', error);
    });
}
