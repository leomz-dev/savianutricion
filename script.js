document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div style="background: #222; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;"><i class="fa-solid fa-spinner fa-spin"></i></div> enviando...';
            submitBtn.disabled = true;

            // Collect form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Send to Formspree
            try {
                const response = await fetch('https://formspree.io/f/mqejgnez', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    formFeedback.textContent = '¡Gracias! Tu mensaje ha sido enviado con éxito. Dra. Valeria se pondrá en contacto pronto.';
                    formFeedback.className = 'form-feedback success';
                    formFeedback.classList.remove('hidden');
                    
                    contactForm.reset();
                } else {
                    throw new Error('Error al enviar el formulario');
                }
            } catch (error) {
                // Error
                formFeedback.textContent = 'Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo más tarde.';
                formFeedback.className = 'form-feedback error';
                formFeedback.classList.remove('hidden');
            } finally {
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
            }
        });
    }

    // Nav Indicator Logic
    const navLinks = document.querySelectorAll('.main-nav a');
    const indicator = document.querySelector('.nav-indicator');

    function updateIndicator(link) {
        if (!link || !indicator) return;
        const rect = link.getBoundingClientRect();
        const parentRect = link.closest('ul').getBoundingClientRect();
        
        indicator.style.width = `${rect.width}px`;
        // We subtract the parent's left position to get the relative left position
        indicator.style.left = `${rect.left - parentRect.left}px`;
    }

    // Set initial position
    const activeLink = document.querySelector('.main-nav a.active');
    if (activeLink) {
        // Use timeout to ensure styles and layout are computed
        setTimeout(() => updateIndicator(activeLink), 100);
    }

    // Update on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            updateIndicator(this);
        });
    });

    // Update on resize to keep it aligned
    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.main-nav a.active');
        if (currentActive) updateIndicator(currentActive);
    });

    // Smooth scroll for nav links (handled by CSS, but this ensures it works everywhere)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
