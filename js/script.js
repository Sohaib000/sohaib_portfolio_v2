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
// Preloader with Progress
// ============================================
$(document).ready(function() {
    let resourcesLoaded = false;
    let minTimeElapsed = false;
    const minDisplayTime = 300; // Restored to 300ms for better mobile performance balance
    const startTime = Date.now();
    let progress = 0;

    // Hero is already visible via critical CSS - no JS manipulation needed for LCP
    // This reduces forced reflows during page load

    // Check if preloader exists on this page
    const preloader = document.querySelector('.preloader');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const isResumePage = window.location.pathname.includes('resume.html') || 
                         document.querySelector('.resume-page') !== null;

    // Only prevent scrolling if preloader exists (not on resume page)
    if (preloader && !isResumePage) {
        requestAnimationFrame(function() {
            const body = document.body;
            body.classList.add('preloader-active');
            body.style.overflow = 'hidden';
        });

        // Simulate progress
        function updateProgress() {
            if (progress < 90) {
                progress += Math.random() * 15;
                if (progress > 90) progress = 90;
            } else if (document.readyState === 'complete') {
                progress = 100;
            }

            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
            if (progressText) {
                progressText.textContent = Math.floor(progress) + '%';
            }

            if (progress < 100) {
                setTimeout(updateProgress, 100);
            }
        }

        // Start progress animation
        setTimeout(updateProgress, 200);
    } else {
        // No preloader or on resume page - ensure scrolling is enabled
        const body = document.body;
        body.classList.remove('preloader-active');
        body.style.overflow = '';
    }

    function checkResourcesLoaded() {
        if (document.readyState === 'complete') {
            resourcesLoaded = true;
            // Complete progress when resources are loaded
            if (progressFill) {
                progress = 100;
                progressFill.style.width = '100%';
            }
            if (progressText) {
                progressText.textContent = '100%';
            }
        }
    }

    function checkMinTime() {
        const elapsed = Date.now() - startTime;
        if (elapsed >= minDisplayTime) {
            minTimeElapsed = true;
        }
    }

    function checkIfReady() {
        checkResourcesLoaded();
        checkMinTime();
        
        if (resourcesLoaded && minTimeElapsed && progress >= 100) {
            requestAnimationFrame(function() {
                const preloader = document.querySelector('.preloader');
                const body = document.body;
                
                if (preloader) {
                    // Add fade-out animation
                    preloader.classList.add('hidden');
                    setTimeout(function() {
                        preloader.style.display = 'none';
                        body.classList.remove('preloader-active');
                        body.style.overflow = '';
                    }, 500);
                } else {
                    // No preloader element found (e.g., on resume page) - remove preloader styles immediately
                    body.classList.remove('preloader-active');
                    body.style.overflow = '';
                }
            });
        } else if (preloader && !isResumePage) {
            // Continue checking
            setTimeout(checkIfReady, 100);
        }
    }

    // Check when window loads
    $(window).on('load', function() {
        resourcesLoaded = true;
        if (progressFill) {
            progress = 100;
            progressFill.style.width = '100%';
        }
        if (progressText) {
            progressText.textContent = '100%';
        }
        checkIfReady();
    });

    // Check if already loaded
    if (document.readyState === 'complete') {
        resourcesLoaded = true;
        if (progressFill) {
            progress = 100;
            progressFill.style.width = '100%';
        }
        if (progressText) {
            progressText.textContent = '100%';
        }
    } else {
        // Fallback check
        setTimeout(function() {
            resourcesLoaded = true;
            if (progressFill) {
                progress = 100;
                progressFill.style.width = '100%';
            }
            if (progressText) {
                progressText.textContent = '100%';
            }
            checkIfReady();
        }, 50);
    }

    // Check minimum time
    checkMinTime();
    setInterval(function() {
        checkMinTime();
        checkIfReady();
    }, 50);

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
        
        // Batch all layout reads in a single requestAnimationFrame
        // Single RAF is sufficient - double RAF adds unnecessary delay on mobile
        requestAnimationFrame(function() {
            // Use window.pageYOffset only (doesn't cause reflow)
            const scrollTop = window.pageYOffset || 0;
            
            // Read all bounding rects in one batch - this is the only layout read
            // Batch all reads first, then process to minimize reflows
            const rects = sectionsToCache.map(function(item) {
                return {
                    href: item.href,
                    rect: item.section.getBoundingClientRect()
                };
            });
            
            // Now process all cached rects
            rects.forEach(function(item) {
                sectionOffsets[item.href] = {
                    top: item.rect.top + scrollTop,
                    height: item.rect.height
                };
            });
        });
    }
    
    // Cache offsets after page is fully loaded
    if (document.readyState === 'complete') {
        cacheSectionOffsets();
    } else {
        window.addEventListener('load', cacheSectionOffsets);
    }
    
    // Throttled scroll handler using requestAnimationFrame - Optimized for mobile
    let lastUpdateTime = 0;
    const MOBILE_THROTTLE_MS = 100; // Throttle to 10fps on mobile for better performance
    
    function updateActiveNav() {
        const now = Date.now();
        // Throttle more aggressively on mobile
        if (now - lastUpdateTime < MOBILE_THROTTLE_MS) {
            return;
        }
        lastUpdateTime = now;
        
        // Use only window.pageYOffset to avoid forced reflow (read-only property)
        const scrollPos = window.pageYOffset || 0;
        const scrollPosWithOffset = scrollPos + 100;
        
        // Only update if scroll position changed significantly (increased threshold for mobile)
        if (Math.abs(scrollPos - lastScrollPos) < 20) {
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
    // Use passive listener for better mobile performance
    window.addEventListener('scroll', function() {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        rafId = requestAnimationFrame(updateActiveNav);
    }, { passive: true });

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
                // Calculate offset using single RAF - double RAF adds unnecessary delay on mobile
                requestAnimationFrame(function() {
                    const rect = target.getBoundingClientRect();
                    // Use only window.pageYOffset to avoid forced reflow
                    const scrollTop = window.pageYOffset || 0;
                    targetOffset = rect.top + scrollTop;
                    
                    // Cache it for future use
                    sectionOffsets[href] = {
                        top: targetOffset,
                        height: rect.height
                    };
                    
                    $('html, body').stop(true, true).animate({
                        scrollTop: targetOffset - 70
                    }, 800, 'easeInOutCubic');
                });
                return;
            }
            
            // Single RAF is sufficient for mobile performance
            requestAnimationFrame(function() {
                $('html, body').stop(true, true).animate({
                    scrollTop: targetOffset - 70
                }, 800, 'easeInOutCubic');
            });
        }
    });
});

// ============================================
// Navbar scroll effect - Optimized for mobile performance
// ============================================
let navbarRafId;
let navbarShadowState = false;
let lastNavbarUpdate = 0;
const NAVBAR_THROTTLE_MS = 100; // Throttle to 10fps for mobile

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

function handleNavbarScroll() {
    const now = Date.now();
    if (now - lastNavbarUpdate < NAVBAR_THROTTLE_MS) {
        return;
    }
    lastNavbarUpdate = now;
    updateNavbarShadow();
}

// Use passive listener for better mobile scrolling performance
window.addEventListener('scroll', function() {
    if (navbarRafId) {
        cancelAnimationFrame(navbarRafId);
    }
    navbarRafId = requestAnimationFrame(handleNavbarScroll);
}, { passive: true });

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
// CONFIGURATION REQUIRED:
// 1. Replace 'YOUR_PUBLIC_KEY' with your EmailJS Public Key
// 2. Replace 'YOUR_SERVICE_ID' with your EmailJS Service ID
// 3. Replace 'YOUR_TEMPLATE_ID' with your EmailJS Template ID
// 
// Get these from: https://www.emailjs.com/
// See EMAILJS_SETUP.md for detailed instructions

// EmailJS Configuration
const EMAILJS_CONFIG = {
    publicKey: 'lf7LY46jr4BKBzMEq',
    serviceID: 'service_9noyres',
    templateID: 'template_ar0dc9e'
};

// Initialize EmailJS when page loads
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized successfully');
        return true;
    } else {
        console.warn('EmailJS not loaded yet, retrying...');
        setTimeout(initEmailJS, 100);
        return false;
    }
}

// Wait for DOM and EmailJS to be ready
$(document).ready(function() {
    // Initialize EmailJS after a short delay to ensure library is loaded
    setTimeout(function() {
        initEmailJS();
    }, 300);
});

// Contact Form Submission Handler
$('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: $('input[name="name"]').val().trim(),
        email: $('input[name="email"]').val().trim(),
        subject: $('input[name="subject"]').val().trim(),
        message: $('textarea[name="message"]').val().trim()
    };

    // Validation - Check required fields
    if (!formData.name || !formData.email || !formData.message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Get submit button and store original content
    const submitBtn = $(this).find('button[type="submit"]');
    const originalText = submitBtn.html();
    
    // Show loading state
    submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
    submitBtn.prop('disabled', true);

    // Check if EmailJS is loaded and initialized
    if (typeof emailjs === 'undefined') {
        showMessage('Email service is not available. Please refresh the page and try again.', 'error');
        submitBtn.html(originalText);
        submitBtn.prop('disabled', false);
        return;
    }

    // Prepare template parameters (must match your EmailJS template variables)
    const templateParams = {
        name: formData.name,                    // {{name}} in template
        from_email: formData.email,             // {{from_email}} in template (optional)
        subject: formData.subject || 'Contact Form Submission',  // {{subject}} in template
        message: formData.message,              // {{message}} in template
        time: new Date().toLocaleString()       // {{time}} in template
    };

    // Send email using EmailJS
    emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            showMessage('Thank you for your message! I will get back to you soon.', 'success');
            $('#contactForm')[0].reset();
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
        }, function(error) {
            console.error('EmailJS Error:', error);
            console.error('Status:', error.status);
            console.error('Text:', error.text);
            
            // Provide specific error messages
            let errorMsg = 'Sorry, there was an error sending your message. ';
            if (error.status === 400) {
                errorMsg += 'Please check that all fields are filled correctly.';
            } else if (error.status === 401) {
                errorMsg += 'Authentication error. Please check your EmailJS Public Key.';
            } else if (error.status === 404) {
                errorMsg += 'Service or Template not found. Please verify your Service ID and Template ID.';
            } else {
                errorMsg += 'Please try again or contact me directly at sohaibsheikh71@gmail.com';
            }
            
            showMessage(errorMsg, 'error');
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
        });
});

// Function to display success/error messages
function showMessage(message, type) {
    // Remove any existing messages
    $('.form-message').remove();
    
    // Determine message styling
    const messageClass = type === 'success' ? 'form-message-success' : 'form-message-error';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    // Create message HTML
    const messageHtml = `
        <div class="form-message ${messageClass}">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Insert message after the form
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
    
    // Optimize IntersectionObserver for mobile - use larger rootMargin to reduce checks
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame to batch DOM updates
                requestAnimationFrame(() => {
                    entry.target.classList.add('animate-in');
                    // Unobserve after animation to reduce overhead
                    observer.unobserve(entry.target);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' // Larger margin for mobile to reduce checks
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

// Combine scroll to top with other scroll handlers for better performance
window.addEventListener('scroll', function() {
    if (scrollTopRafId) {
        cancelAnimationFrame(scrollTopRafId);
    }
    scrollTopRafId = requestAnimationFrame(updateScrollTopButton);
}, { passive: true });

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
    // If not cached, calculate it synchronously
    if (aboutSectionOffset === null) {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            // Calculate offset synchronously to ensure it's available on first click
            const rect = aboutSection.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
            aboutSectionOffset = rect.top + scrollTop;
        } else {
            // Fallback: calculate based on viewport height if section not found
            aboutSectionOffset = window.innerHeight;
        }
    }
    return aboutSectionOffset || 0;
}

// Pre-calculate offset when DOM is ready
function calculateAboutSectionOffset() {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
        aboutSectionOffset = rect.top + scrollTop;
    }
}

// Scroll indicator click handler - Optimized for mobile touch
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    // Pre-calculate offset on initialization
    calculateAboutSectionOffset();
    
    // Recalculate offset on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            aboutSectionOffset = null; // Reset cache
            calculateAboutSectionOffset();
        }, 100);
    }, { passive: true });
    
    // Use both click and touchstart for better mobile support
    function handleScrollClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Ensure offset is calculated before scrolling
        const offset = getAboutSectionOffset();
        
        // Use native smooth scroll for better reliability
        const targetPosition = Math.max(0, offset - 70);
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    scrollIndicator.addEventListener('click', handleScrollClick, { passive: false });
    
    // Handle touch events separately to avoid double-firing
    let touchStartTime = 0;
    scrollIndicator.addEventListener('touchstart', function(e) {
        touchStartTime = Date.now();
    }, { passive: true });
    
    scrollIndicator.addEventListener('touchend', function(e) {
        // Only trigger if it's a quick tap (not a swipe)
        if (Date.now() - touchStartTime < 300) {
            e.preventDefault();
            handleScrollClick(e);
        }
    }, { passive: false });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollIndicator);
} else {
    // DOM already ready
    initScrollIndicator();
}

// ============================================
// Typewriter Effect for Hero Subtitle
// ============================================
$(document).ready(function() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    const roles = [
        { prefix: 'WordPress ', suffix: 'Developer' },
        { prefix: 'Frontend ', suffix: 'Developer' },
        { prefix: 'UI/UX ', suffix: 'Developer' }
    ];

    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed in ms
    let deletingSpeed = 50; // Faster when deleting
    let pauseTime = 2000; // Pause before switching roles

    function typeWriter() {
        const currentRole = roles[currentRoleIndex];
        const fullText = currentRole.prefix + currentRole.suffix;
        const prefixLength = currentRole.prefix.length;
        
        if (!isDeleting && currentCharIndex > prefixLength) {
            // Typing the "Developer" part - apply different color
            const prefixText = currentRole.prefix;
            const suffixText = currentRole.suffix.substring(0, currentCharIndex - prefixLength);
            typewriterElement.innerHTML = prefixText + '<span class="developer-text">' + suffixText + '</span>';
        } else if (!isDeleting && currentCharIndex <= prefixLength) {
            // Typing the prefix part
            const prefixText = currentRole.prefix.substring(0, currentCharIndex);
            typewriterElement.innerHTML = prefixText;
        } else if (isDeleting && currentCharIndex > prefixLength) {
            // Deleting the "Developer" part
            const prefixText = currentRole.prefix;
            const suffixText = currentRole.suffix.substring(0, currentCharIndex - prefixLength);
            typewriterElement.innerHTML = prefixText + '<span class="developer-text">' + suffixText + '</span>';
        } else {
            // Deleting the prefix part
            const prefixText = currentRole.prefix.substring(0, currentCharIndex);
            typewriterElement.innerHTML = prefixText;
        }

        if (!isDeleting) {
            // Typing forward
            currentCharIndex++;
            if (currentCharIndex <= fullText.length) {
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Finished typing, pause then start deleting
                isDeleting = true;
                setTimeout(typeWriter, pauseTime);
            }
        } else {
            // Deleting backward
            currentCharIndex--;
            if (currentCharIndex >= 0) {
                setTimeout(typeWriter, deletingSpeed);
            } else {
                // Finished deleting, move to next role
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                setTimeout(typeWriter, 500); // Brief pause before starting next role
            }
        }
    }

    // Start the typewriter effect after a short delay
    setTimeout(typeWriter, 1000);
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

