document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        const submitBtn = contactForm.querySelector('.btn-submit');
        const privacyCheck = document.getElementById('privacy');

        function updateSubmitButton() {
            submitBtn.disabled = !privacyCheck.checked;
        }

        if (privacyCheck) {
            privacyCheck.addEventListener('change', updateSubmitButton);
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
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
                    let feedbackEl = document.getElementById('formFeedback');
                    if (!feedbackEl) {
                        feedbackEl = document.createElement('div');
                        feedbackEl.id = 'formFeedback';
                        contactForm.appendChild(feedbackEl);
                    }
                    feedbackEl.textContent = '¡Gracias! Tu mensaje ha sido enviado con éxito. Dra. Valeria se pondrá en contacto pronto.';
                    feedbackEl.className = 'form-feedback success';
                    feedbackEl.classList.remove('hidden');
                    
                    contactForm.reset();
                    privacyCheck.checked = false;
                    updateSubmitButton();
                } else {
                    throw new Error('Error al enviar el formulario');
                }
            } catch (error) {
                // Error
                let feedbackEl = document.getElementById('formFeedback');
                if (!feedbackEl) {
                    feedbackEl = document.createElement('div');
                    feedbackEl.id = 'formFeedback';
                    contactForm.appendChild(feedbackEl);
                }
                feedbackEl.textContent = 'Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo más tarde.';
                feedbackEl.className = 'form-feedback error';
                feedbackEl.classList.remove('hidden');
            } finally {
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = !privacyCheck.checked;
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

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    const navOverlay = document.querySelector('.nav-overlay');

    function toggleNav(open) {
        navToggle.classList.toggle('open', open);
        nav.classList.toggle('open', open);
        navOverlay.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => toggleNav(!nav.classList.contains('open')));
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', () => toggleNav(false));
    }

    // Close nav on link click
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => toggleNav(false));
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

    // Modal Logic
    const privacyLink = document.getElementById('privacyLink');
    const privacyModal = document.getElementById('privacyModal');
    const closePrivacyModal = document.getElementById('closePrivacyModal');

    if (privacyLink && privacyModal && closePrivacyModal) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            privacyModal.classList.remove('hidden');
        });

        closePrivacyModal.addEventListener('click', () => {
            privacyModal.classList.add('hidden');
        });

        privacyModal.addEventListener('click', (e) => {
            // Close if clicking outside the modal content
            if (e.target === privacyModal) {
                privacyModal.classList.add('hidden');
            }
        });
    }

    // Service Modal Logic
    const serviceBtns = document.querySelectorAll('.service-btn');
    const serviceModal = document.getElementById('serviceModal');
    const closeServiceModal = document.getElementById('closeServiceModal');
    const serviceModalTitle = document.getElementById('serviceModalTitle');
    const serviceModalDesc = document.getElementById('serviceModalDesc');
    const serviceModalIcon = document.getElementById('serviceModalIcon');
    const serviceModalCta = document.getElementById('serviceModalCta');

    const serviceData = {
        patologias: {
            title: 'Control de Patologías',
            desc: 'Nuestro abordaje nutricional clínico te ayudará a manejar de forma efectiva condiciones como el Síndrome de Ovario Poliquístico (SOP), hipotiroidismo, resistencia a la insulina, diabetes e hipertensión.<br><br>A través de un plan 100% personalizado y basado en evidencia médica, buscamos mejorar tus síntomas, estabilizar tus laboratorios y recuperar tu calidad de vida desde la raíz.',
            icon: '<i class="fa-solid fa-file-medical"></i>',
            bgColor: '#dcfce7',
            color: '#166534',
            formValue: 'control-patologias'
        },
        recomposicion: {
            title: 'Recomposición Corporal',
            desc: 'Si buscas transformar tu físico, te ofrecemos un programa estructurado para perder grasa mientras mantienes o aumentas tu masa muscular.<br><br>Aprenderás a alimentar tus entrenamientos de forma óptima, acelerando tu metabolismo de manera saludable y sostenible, sin pasar hambre ni recurrir a dietas extremas que generan efecto rebote.',
            icon: '<i class="fa-solid fa-dumbbell"></i>',
            bgColor: '#e0f2fe',
            color: '#0369a1',
            formValue: 'recomposicion-corporal'
        },
        educacion: {
            title: 'Educación Nutricional',
            desc: 'Transforma tu relación con la comida de una vez por todas. En este servicio aprenderás las bases de una buena alimentación para que puedas disfrutar de tus comidas favoritas sin culpa ni ansiedad.<br><br>Nos enfocamos en enseñarte a armar platos balanceados, leer el etiquetado nutricional y tomar decisiones inteligentes que perdurarán toda tu vida.',
            icon: '<i class="fa-solid fa-utensils"></i>',
            bgColor: '#ecfccb',
            color: '#65a30d',
            formValue: 'educacion-nutricional'
        }
    };

    if (serviceModal && closeServiceModal) {
        serviceBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const type = btn.getAttribute('data-service');
                const data = serviceData[type];
                
                if (data) {
                    serviceModalTitle.textContent = data.title;
                    serviceModalDesc.innerHTML = data.desc;
                    serviceModalIcon.innerHTML = data.icon;
                    serviceModalIcon.style.backgroundColor = data.bgColor;
                    serviceModalIcon.style.color = data.color;
                    
                    // Pre-select service in form
                    serviceModalCta.onclick = () => {
                        serviceModal.classList.add('hidden');
                        const subjectSelect = document.getElementById('subject');
                        if (subjectSelect) subjectSelect.value = data.formValue;
                    };
                    
                    serviceModal.classList.remove('hidden');
                }
            });
        });

        closeServiceModal.addEventListener('click', () => {
            serviceModal.classList.add('hidden');
        });

        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                serviceModal.classList.add('hidden');
            }
        });
    }

    // --- GSAP ANIMATIONS ---
    window.addEventListener('load', () => {
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Force a refresh of ScrollTrigger after a slight delay to ensure layouts/images are fully calculated
            setTimeout(() => { ScrollTrigger.refresh(); }, 500);

            // Hero Section
            gsap.fromTo('.hero-content h1', 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'transform' }
            );
            gsap.fromTo('.hero-content p', 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out', clearProps: 'transform' }
            );
            gsap.fromTo('.hero-ctas .btn', 
                { y: 20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.4, ease: 'power3.out', clearProps: 'transform' }
            );
            gsap.fromTo('.hero-image', 
                { x: 50, opacity: 0 }, 
                { x: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: 'power3.out', clearProps: 'transform' }
            );

            // Empathy Cards
            gsap.fromTo('.empathy-card', 
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.empathy', start: 'top 85%' },
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out', clearProps: 'transform'
                }
            );

            // Services Cards
            gsap.fromTo('.service-card', 
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.services', start: 'top 85%' },
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out', clearProps: 'transform'
                }
            );

            // Testimonials
            gsap.fromTo('.testimonial-card', 
                { scale: 0.9, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.testimonials', start: 'top 85%' },
                    scale: 1, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)', clearProps: 'transform'
                }
            );

            // Contact Section
            gsap.fromTo('.contact-info', 
                { x: -50, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.contact', start: 'top 85%' },
                    x: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'transform'
                }
            );

            gsap.fromTo('.contact-form-side-modern', 
                { x: 50, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.contact', start: 'top 85%' },
                    x: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'transform'
                }
            );

            // About Section
            gsap.fromTo('.about-content > *', 
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.about', start: 'top 85%' },
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out', clearProps: 'transform'
                }
            );

            gsap.fromTo('.metric-card', 
                { scale: 0.8, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.about-metrics', start: 'top 90%' },
                    scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)', clearProps: 'transform'
                }
            );

            gsap.fromTo('.about-visual', 
                { x: 50, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.about', start: 'top 85%' },
                    x: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'transform'
                }
            );
        }
    });
});
