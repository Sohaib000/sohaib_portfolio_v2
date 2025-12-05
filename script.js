// ============================================
// Smooth Easing Function (Define Early)
// ============================================
// Wait for jQuery to load (since scripts are deferred)
(function() {
    function initEasing() {
        if (typeof jQuery !== 'undefined' && jQuery.easing) {
            jQuery.easing.easeInOutCubic = function(x, t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            };
        } else {
            // Retry if jQuery not loaded yet
            setTimeout(initEasing, 10);
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEasing);
    } else {
        initEasing();
    }
})();

// ============================================
// Theme Toggle Functionality
// ============================================
$(document).ready(function() {
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Theme toggle button
    $('#themeToggle').on('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = $('#themeIcon');
        if (icon.length) {
            if (theme === 'dark') {
                icon.removeClass('fa-moon').addClass('fa-sun');
            } else {
                icon.removeClass('fa-sun').addClass('fa-moon');
            }
        }
    }
});

// ============================================
// Preloader
// ============================================
$(document).ready(function() {
    let resourcesLoaded = false;
    let minTimeElapsed = false;
    const minDisplayTime = 300; // Reduced to 300ms for faster LCP
    const startTime = Date.now();

    // Show hero content immediately for LCP - No delay for banner visibility
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero-title');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.visibility = 'visible';
        hero.style.display = 'flex';
    }
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.visibility = 'visible';
    }
    if (heroTitle) {
        heroTitle.style.opacity = '1';
        heroTitle.style.visibility = 'visible';
    }

    // Check if preloader exists on this page
    const preloader = document.querySelector('.preloader');
    const isResumePage = window.location.pathname.includes('resume.html') || 
                         document.querySelector('.resume-page') !== null;

    // Only prevent scrolling if preloader exists (not on resume page)
    if (preloader && !isResumePage) {
        requestAnimationFrame(function() {
            const body = document.body;
            body.classList.add('preloader-active');
            body.style.overflow = 'hidden';
        });
    } else {
        // No preloader or on resume page - ensure scrolling is enabled
        const body = document.body;
        body.classList.remove('preloader-active');
        body.style.overflow = '';
    }

    function checkResourcesLoaded() {
        if (document.readyState === 'complete') {
            resourcesLoaded = true;
        }
    }

    function checkMinTime() {
        const elapsed = Date.now() - startTime;
        if (elapsed >= minDisplayTime) {
            minTimeElapsed = true;
        }
    }

    function checkIfReady() {
        if (resourcesLoaded && minTimeElapsed) {
            requestAnimationFrame(function() {
                const preloader = document.querySelector('.preloader');
                const body = document.body;
                
                if (preloader) {
                    preloader.classList.add('hidden');
                    setTimeout(function() {
                        preloader.style.display = 'none';
                        body.classList.remove('preloader-active');
                        body.style.overflow = '';
                    }, 300);
                } else {
                    // No preloader element found (e.g., on resume page) - remove preloader styles immediately
                    body.classList.remove('preloader-active');
                    body.style.overflow = '';
                }
            });
        }
    }

    // Check when window loads
    $(window).on('load', function() {
        resourcesLoaded = true;
        checkIfReady();
    });

    // Check if already loaded
    if (document.readyState === 'complete') {
        resourcesLoaded = true;
    } else {
        // Fallback check
        setTimeout(function() {
            resourcesLoaded = true;
            checkIfReady();
        }, 50); // Reduced from 100ms
    }

    // Check minimum time
    checkMinTime();
    setInterval(function() {
        checkMinTime();
        checkIfReady();
    }, 50); // Reduced from 100ms

    // Fallback timeout (reduced to 2 seconds)
    setTimeout(function() {
        resourcesLoaded = true;
        minTimeElapsed = true;
        checkIfReady();
    }, 2000);
});

// ============================================
// Navigation
// ============================================
$(document).ready(function() {
    // Mobile menu toggle with body class
    $('#menuToggle').on('click', function() {
        $(this).toggleClass('active');
        $('#navMenu').toggleClass('active');
        $('body').toggleClass('menu-open');
    });

    // Close mobile menu when clicking on a link
    $('.nav-link').on('click', function() {
        $('#menuToggle').removeClass('active');
        $('#navMenu').removeClass('active');
        $('body').removeClass('menu-open');
    });

    // Close menu when clicking outside
    $(document).on('click', function(e) {
        if ($('body').hasClass('menu-open') && 
            !$(e.target).closest('#navMenu').length && 
            !$(e.target).closest('#menuToggle').length) {
            $('#menuToggle').removeClass('active');
            $('#navMenu').removeClass('active');
            $('body').removeClass('menu-open');
        }
    });

    // Active navigation link on scroll - Optimized to prevent forced reflows
    let scrollTimeout;
    let lastScrollPos = 0;
    const sectionOffsets = {};
    
    // Cache section offsets once on load - Optimized to prevent forced reflows
    function cacheSectionOffsets() {
        // Wait for layout to be complete before reading
        if (document.readyState !== 'complete') {
            window.addEventListener('load', cacheSectionOffsets);
            return;
        }
        
        // Collect all sections first, then batch read all layout properties
        const sectionsToCache = [];
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const section = document.querySelector(href);
                if (section) {
                    sectionsToCache.push({ href: href, section: section });
                }
            }
        });
        
        // Batch all layout reads in a single requestAnimationFrame after a small delay
        // This ensures layout is stable before reading
        setTimeout(function() {
            requestAnimationFrame(function() {
                // Use window.pageYOffset only (doesn't cause reflow)
                const scrollTop = window.pageYOffset || 0;
                
                // Read all bounding rects in one batch - this is the only layout read
                sectionsToCache.forEach(function(item) {
                    const rect = item.section.getBoundingClientRect();
                    sectionOffsets[item.href] = {
                        top: rect.top + scrollTop,
                        height: rect.height
                    };
                });
            });
        }, 100); // Small delay to ensure layout is complete
    }
    
    // Cache offsets after page is fully loaded
    if (document.readyState === 'complete') {
        cacheSectionOffsets();
    } else {
        window.addEventListener('load', cacheSectionOffsets);
    }
    
    // Throttled scroll handler using requestAnimationFrame - No forced reflows
    function updateActiveNav() {
        // Use only window.pageYOffset to avoid forced reflow (read-only property)
        const scrollPos = window.pageYOffset || 0;
        const scrollPosWithOffset = scrollPos + 100;
        
        // Only update if scroll position changed significantly
        if (Math.abs(scrollPos - lastScrollPos) < 10) {
            return;
        }
        lastScrollPos = scrollPos;
        
        // Use native DOM methods to avoid jQuery overhead and forced reflows
        let activeFound = false;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#') && sectionOffsets[href]) {
                const offset = sectionOffsets[href];
                if (offset.top <= scrollPosWithOffset && 
                    offset.top + offset.height > scrollPosWithOffset) {
                    if (!activeFound) {
                        // Batch DOM writes to prevent forced reflows
                        navLinks.forEach(function(l) {
                            l.classList.remove('active');
                        });
                        link.classList.add('active');
                        activeFound = true;
                    }
                }
            }
        });
    }
    
    let rafId;
    $(window).on('scroll', function() {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        rafId = requestAnimationFrame(updateActiveNav);
    });

    // Smooth scrolling for anchor links - Optimized to prevent forced reflows
    $('a[href^="#"]').on('click', function(e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            // Use cached offset or calculate once using requestAnimationFrame
            let targetOffset;
            if (sectionOffsets[href]) {
                targetOffset = sectionOffsets[href].top;
            } else {
                // Calculate offset in next frame to avoid forced reflow
                requestAnimationFrame(function() {
                    const rect = target.getBoundingClientRect();
                    // Use only window.pageYOffset to avoid forced reflow
                    const scrollTop = window.pageYOffset || 0;
                    targetOffset = rect.top + scrollTop;
                    
                    $('html, body').stop(true, true).animate({
                        scrollTop: targetOffset - 70
                    }, 800, 'easeInOutCubic');
                });
                return;
            }
            
            requestAnimationFrame(function() {
                $('html, body').stop(true, true).animate({
                    scrollTop: targetOffset - 70
                }, 800, 'easeInOutCubic');
            });
        }
    });
});

// ============================================
// Navbar scroll effect - Optimized to prevent forced reflows
// ============================================
let navbarRafId;
let navbarShadowState = false;

function updateNavbarShadow() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const shouldHaveShadow = scrollTop > 50;
    
    if (shouldHaveShadow !== navbarShadowState) {
        navbarShadowState = shouldHaveShadow;
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.boxShadow = shouldHaveShadow 
                ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
                : '0 2px 4px rgba(0, 0, 0, 0.05)';
        }
    }
}

$(window).on('scroll', function() {
    if (navbarRafId) {
        cancelAnimationFrame(navbarRafId);
    }
    navbarRafId = requestAnimationFrame(updateNavbarShadow);
});

// ============================================
// Animated Counter for Stats
// ============================================
function animateCounter() {
    $('.stat-number').each(function() {
        const $this = $(this);
        const targetValue = $this.attr('data-target');
        
        // Handle missing or invalid data-target attribute
        if (!targetValue || targetValue === '') {
            return; // Skip animation for elements without data-target
        }
        
        // Extract numeric part and suffix (e.g., "4+" -> target: 4, suffix: "+")
        const match = targetValue.match(/^(\d+)(.*)$/);
        const target = match ? parseInt(match[1]) : parseInt(targetValue);
        const suffix = match ? match[2] : '';
        
        // Validate that we have a valid number
        if (isNaN(target)) {
            return; // Skip animation if target is not a valid number
        }
        
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = function() {
            current += increment;
            if (current < target) {
                $this.text(Math.floor(current) + suffix);
                requestAnimationFrame(updateCounter);
            } else {
                $this.text(target + suffix);
            }
        };

        // Start animation when element is in viewport
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !$this.hasClass('animated')) {
                    $this.addClass('animated');
                    updateCounter();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this);
    });
}

// Initialize counter animation
$(document).ready(function() {
    animateCounter();
});

// ============================================
// Testimonials Slider
// ============================================
let currentTestimonial = 0;
const testimonials = $('.testimonial-card');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.removeClass('active');
    $(testimonials[index]).addClass('active');
    
    // Update dots
    $('.dot').removeClass('active');
    $(`.dot[data-slide="${index}"]`).addClass('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Testimonial navigation
$('#nextTestimonial').on('click', nextTestimonial);
$('#prevTestimonial').on('click', prevTestimonial);

// Dot navigation
$('.dot').on('click', function() {
    currentTestimonial = parseInt($(this).attr('data-slide'));
    showTestimonial(currentTestimonial);
});

// Auto-play testimonials (optional)
// setInterval(nextTestimonial, 5000);

// ============================================
// Contact Form Handling
// ============================================
// ============================================
// Contact Form - EmailJS Integration
// ============================================
// 
// SETUP REQUIRED: Follow these steps to enable email functionality:
// 1. Sign up at https://www.emailjs.com/ (free account)
// 2. Create an Email Service and get your Service ID
// 3. Create an Email Template and get your Template ID
// 4. Get your Public Key from Account settings
// 5. Replace the placeholders below with your actual IDs
// See EMAILJS_SETUP.md for detailed instructions
//
// Initialize EmailJS when the page loads
// Wait for both jQuery and EmailJS to be loaded (since scripts are deferred)
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('lf7LY46jr4BKBzMEq');
        console.log('EmailJS initialized successfully');
    } else {
        // Retry if EmailJS not loaded yet
        setTimeout(initEmailJS, 100);
    }
}

$(document).ready(function() {
    // Initialize EmailJS after a short delay to ensure it's loaded
    setTimeout(initEmailJS, 200);
});

$('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: $('input[name="name"]').val().trim(),
        email: $('input[name="email"]').val().trim(),
        subject: $('input[name="subject"]').val().trim(),
        message: $('textarea[name="message"]').val().trim()
    };

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    const submitBtn = $(this).find('button[type="submit"]');
    const originalText = submitBtn.html();
    
    // Show loading state
    submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
    submitBtn.prop('disabled', true);

    // Check if EmailJS is loaded and initialized
    if (typeof emailjs === 'undefined' || !emailjs.init) {
        showMessage('Email service is not initialized. Please check your EmailJS configuration.', 'error');
        submitBtn.html(originalText);
        submitBtn.prop('disabled', false);
        return;
    }

    // Prepare email parameters
    // Note: Variable names must match your EmailJS template variables
    const templateParams = {
        name: formData.name,  // Template uses {{name}}
        from_email: formData.email,  // Template uses {{from_email}}
        subject: formData.subject || 'Contact Form Submission',  // Template uses {{subject}}
        message: formData.message,  // Template uses {{message}}
        time: new Date().toLocaleString()  // Template uses {{time}} for timestamp
    };

    // Send email using EmailJS
    console.log('Sending email with params:', templateParams);
    console.log('Service ID: service_9noyres');
    console.log('Template ID: template_71f253r');
    
    emailjs.send('service_9noyres', 'template_71f253r', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showMessage('Thank you for your message! I will get back to you soon.', 'success');
            $('#contactForm')[0].reset();
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
        }, function(error) {
            console.error('EmailJS Error Details:', error);
            console.error('Error Status:', error.status);
            console.error('Error Text:', error.text);
            
            let errorMessage = 'Sorry, there was an error sending your message. ';
            if (error.status === 400) {
                errorMessage += 'Please check that all form fields are filled correctly.';
            } else if (error.status === 401) {
                errorMessage += 'Authentication error. Please check your EmailJS Public Key.';
            } else if (error.status === 404) {
                errorMessage += 'Service or Template not found. Please verify your Service ID and Template ID.';
            } else {
                errorMessage += 'Please try again or contact me directly at sohaibsheikh71@gmail.com';
            }
            
            showMessage(errorMessage, 'error');
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
        });
});

// Function to show success/error messages
function showMessage(message, type) {
    // Remove any existing messages
    $('.form-message').remove();
    
    const messageClass = type === 'success' ? 'form-message-success' : 'form-message-error';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    const messageHtml = `
        <div class="form-message ${messageClass}">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    $('#contactForm').after(messageHtml);
    
    // Auto-remove message after 5 seconds
    setTimeout(function() {
        $('.form-message').fadeOut(300, function() {
            $(this).remove();
        });
    }, 5000);
}

// ============================================
// Scroll Animations
// ============================================
function animateOnScroll() {
    const elements = $('.service-card, .project-card, .pricing-card, .skill-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.each(function() {
        observer.observe(this);
    });
}

// Add CSS for scroll animations
$('<style>')
    .prop('type', 'text/css')
    .html(`
        .service-card,
        .project-card,
        .pricing-card,
        .skill-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .service-card.animate-in,
        .project-card.animate-in,
        .pricing-card.animate-in,
        .skill-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `)
    .appendTo('head');

// Initialize scroll animations
$(document).ready(function() {
    animateOnScroll();
});


// ============================================
// Project Card Hover Effects
// ============================================
$('.project-card').on('mouseenter', function() {
    $(this).find('.project-overlay').css('opacity', '1');
}).on('mouseleave', function() {
    $(this).find('.project-overlay').css('opacity', '0');
});

// ============================================
// Scroll to Top Button - Optimized to prevent forced reflows
// ============================================
let scrollTopRafId;
let scrollTopButtonState = false;

function updateScrollTopButton() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const shouldShow = scrollTop > 300;
    
    if (shouldShow !== scrollTopButtonState) {
        scrollTopButtonState = shouldShow;
        let button = document.querySelector('.scroll-to-top');
        
        if (shouldShow) {
            if (!button) {
                button = document.createElement('button');
                button.className = 'scroll-to-top';
                button.innerHTML = '<i class="fas fa-arrow-up"></i>';
                document.body.appendChild(button);
                
                button.addEventListener('click', function() {
                    requestAnimationFrame(function() {
                        $('html, body').animate({
                            scrollTop: 0
                        }, 800);
                    });
                });
            }
            button.style.display = 'flex';
        } else if (button) {
            button.style.display = 'none';
        }
    }
}

$(window).on('scroll', function() {
    if (scrollTopRafId) {
        cancelAnimationFrame(scrollTopRafId);
    }
    scrollTopRafId = requestAnimationFrame(updateScrollTopButton);
});

// Add styles for scroll to top button
$('<style>')
    .prop('type', 'text/css')
    .html(`
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-lg);
            z-index: 999;
            transition: transform 0.3s ease;
        }
        .scroll-to-top:hover {
            transform: translateY(-5px);
        }
    `)
    .appendTo('head');

// ============================================
// Scroll Down Indicator - Optimized to prevent forced reflows
// ============================================
let aboutSectionOffset = null;

function getAboutSectionOffset() {
    if (aboutSectionOffset === null) {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            // Use getBoundingClientRect to avoid forced reflow
            const rect = aboutSection.getBoundingClientRect();
            // Use only window.pageYOffset to avoid forced reflow
            const scrollTop = window.pageYOffset || 0;
            aboutSectionOffset = rect.top + scrollTop;
        }
    }
    return aboutSectionOffset || 0;
}

$('.scroll-indicator').on('click', function() {
    const offset = getAboutSectionOffset();
    requestAnimationFrame(function() {
        $('html, body').animate({
            scrollTop: offset - 70
        }, 1000, 'easeInOutCubic');
    });
});

// ============================================
// Initialize on Document Ready
// ============================================
$(document).ready(function() {
    // Set initial active nav link - Defer to avoid forced reflow during page load
    // Wait for page to be fully loaded before setting initial state
    if (document.readyState === 'complete') {
        setInitialNavLink();
    } else {
        window.addEventListener('load', setInitialNavLink);
    }
    
    function setInitialNavLink() {
        // Use requestAnimationFrame to batch with other operations after page load
        requestAnimationFrame(function() {
            // Use window.pageYOffset which doesn't cause reflow (read-only property)
            const scrollTop = window.pageYOffset || 0;
            if (scrollTop === 0) {
                // Batch DOM write - use native DOM to avoid jQuery overhead
                const homeLink = document.querySelector('.nav-link[href="#home"]');
                if (homeLink) {
                    homeLink.classList.add('active');
                }
            }
        });
    }
});

