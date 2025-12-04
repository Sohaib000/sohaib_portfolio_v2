// ============================================
// Smooth Easing Function (Define Early)
// ============================================
$(document).ready(function() {
    $.easing.easeInOutCubic = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };
});

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

    // Prevent scrolling during preloader (but allow hero to be visible) - Batch CSS changes
    requestAnimationFrame(function() {
        const body = document.body;
        body.classList.add('preloader-active');
        body.style.overflow = 'hidden';
    });

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
    
    // Cache section offsets once on load
    function cacheSectionOffsets() {
        $('.nav-link').each(function() {
            const href = $(this).attr('href');
            if (href && href.startsWith('#')) {
                const section = $(href);
                if (section.length) {
                    sectionOffsets[href] = {
                        top: section[0].offsetTop,
                        height: section[0].offsetHeight
                    };
                }
            }
        });
    }
    
    cacheSectionOffsets();
    
    // Throttled scroll handler using requestAnimationFrame
    function updateActiveNav() {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || 0;
        const scrollPosWithOffset = scrollPos + 100;
        
        // Only update if scroll position changed significantly
        if (Math.abs(scrollPos - lastScrollPos) < 10) {
            return;
        }
        lastScrollPos = scrollPos;
        
        let activeFound = false;
        $('.nav-link').each(function() {
            const currLink = $(this);
            const href = currLink.attr('href');
            
            if (href && href.startsWith('#') && sectionOffsets[href]) {
                const offset = sectionOffsets[href];
                if (offset.top <= scrollPosWithOffset && 
                    offset.top + offset.height > scrollPosWithOffset) {
                    if (!activeFound) {
                        $('.nav-link').removeClass('active');
                        currLink.addClass('active');
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
            // Use cached offset or get it once
            const targetOffset = sectionOffsets[href] ? sectionOffsets[href].top : target.offsetTop;
            
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
$('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: $('input[name="name"]').val(),
        email: $('input[name="email"]').val(),
        subject: $('input[name="subject"]').val(),
        message: $('textarea[name="message"]').val()
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    const submitBtn = $(this).find('button[type="submit"]');
    const originalText = submitBtn.html();
    
    submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
    submitBtn.prop('disabled', true);

    // Simulate form submission
    setTimeout(function() {
        alert('Thank you for your message! I will get back to you soon.');
        $('#contactForm')[0].reset();
        submitBtn.html(originalText);
        submitBtn.prop('disabled', false);
    }, 1500);
});

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
            aboutSectionOffset = aboutSection.offsetTop;
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
    // Set initial active nav link - Use requestAnimationFrame to avoid forced reflow
    requestAnimationFrame(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
        if (scrollTop === 0) {
            $('.nav-link[href="#home"]').addClass('active');
        }
    });
});

