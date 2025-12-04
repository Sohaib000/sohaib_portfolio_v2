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

    // Show hero content immediately for LCP
    $('.hero').css('opacity', '1').css('visibility', 'visible');
    $('.hero-title').css('opacity', '1').css('visibility', 'visible');

    // Prevent scrolling during preloader (but allow hero to be visible)
    $('body').addClass('preloader-active').css('overflow', 'hidden');

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
            $('.preloader').addClass('hidden');
            setTimeout(function() {
                $('.preloader').css('display', 'none');
                $('body').removeClass('preloader-active').css('overflow', '');
            }, 300); // Reduced from 500ms to 300ms
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

    // Active navigation link on scroll
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));
            
            if (refElement.length && 
                refElement.position().top <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass('active');
                currLink.addClass('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop(true, true).animate({
                scrollTop: target.offset().top - 70
            }, 800, 'easeInOutCubic');
        }
    });
});

// ============================================
// Navbar scroll effect
// ============================================
$(window).on('scroll', function() {
    if ($(window).scrollTop() > 50) {
        $('.navbar').css({
            'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
        });
    } else {
        $('.navbar').css({
            'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.05)'
        });
    }
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
// Scroll to Top Button (Optional Enhancement)
// ============================================
$(window).on('scroll', function() {
    if ($(window).scrollTop() > 300) {
        if ($('.scroll-to-top').length === 0) {
            $('body').append('<button class="scroll-to-top"><i class="fas fa-arrow-up"></i></button>');
            
            $('.scroll-to-top').on('click', function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 800);
            });
        }
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }
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
// Scroll Down Indicator
// ============================================
$('.scroll-indicator').on('click', function() {
    $('html, body').animate({
        scrollTop: $('#about').offset().top - 70
    }, 1000, 'easeInOutCubic');
});

// ============================================
// Initialize on Document Ready
// ============================================
$(document).ready(function() {
    // Set initial active nav link
    if ($(window).scrollTop() === 0) {
        $('.nav-link[href="#home"]').addClass('active');
    }
});

