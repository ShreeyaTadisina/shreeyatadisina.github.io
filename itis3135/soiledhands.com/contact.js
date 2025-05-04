document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inquiryForm');
    const modal = document.getElementById('confirmationModal');
    const closeModal = document.querySelector('.close-modal');
    const modalCloseBtn = document.getElementById('modalClose');
    
    // Form validation and submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate email format
        const email = document.getElementById('email').value;
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        const eventDate = document.getElementById('event-date').value;
        if (eventDate && !isFutureDate(eventDate)) {
            alert('Event date must be in the future');
            return;
        }
        
        modal.style.display = 'block';
        form.reset();
    });
    
    // Close modal handlers
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    modalCloseBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isFutureDate(dateString) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputDate = new Date(dateString);
        return inputDate > today;
    }
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});