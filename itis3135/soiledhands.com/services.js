document.addEventListener('DOMContentLoaded', function() {
    // Service filtering functionality
    const serviceFilter = document.getElementById('service-type');
    const serviceCards = document.querySelectorAll('.service-card');

    serviceFilter.addEventListener('change', function() {
        const selectedService = this.value;
        
        serviceCards.forEach(card => {
            if (selectedService === 'all' || card.dataset.service === selectedService) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Smooth scroll for inquire buttons
    document.querySelectorAll('.inquire-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 120,
                    behavior: 'smooth'
                });
            }
        });
    });
});