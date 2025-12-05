// ============================================
// Blog Posts Data
// ============================================
const blogPosts = {
    '1': {
        id: 1,
        title: 'Complete Guide to Custom WordPress Theme Development',
        category: 'WordPress',
        date: 'January 15, 2025',
        dateShort: 'Jan 15, 2025',
        readingTime: '8 min read',
        views: 1234,
        image: 'images/project-1.webp',
        excerpt: 'Learn how to build custom WordPress themes from scratch. This comprehensive guide covers everything from setting up your development environment to creating responsive, SEO-friendly themes that stand out.',
        tags: ['WordPress', 'Theme Development', 'PHP'],
        content: `
            <p class="blog-post-intro">
                Building custom WordPress themes from scratch is one of the most rewarding skills a web developer can master. In this comprehensive guide, I'll walk you through everything you need to know to create professional, responsive, and SEO-friendly WordPress themes.
            </p>

            <h2>Why Build Custom WordPress Themes?</h2>
            <p>
                While there are thousands of pre-made themes available, creating a custom theme gives you complete control over your website's design, functionality, and performance. Custom themes are tailored to your specific needs, load faster, and provide a unique user experience.
            </p>

            <h2>Setting Up Your Development Environment</h2>
            <p>
                Before diving into theme development, you'll need a proper development environment. Here's what you need:
            </p>
            <ul>
                <li><strong>Local Development Server:</strong> Use tools like Local by Flywheel, XAMPP, or MAMP</li>
                <li><strong>Code Editor:</strong> VS Code, PhpStorm, or Sublime Text</li>
                <li><strong>WordPress Installation:</strong> Latest version of WordPress</li>
                <li><strong>Browser DevTools:</strong> For debugging and testing</li>
            </ul>

            <h2>Understanding WordPress Theme Structure</h2>
            <p>
                A WordPress theme consists of several essential files. The minimum required files are:
            </p>
            <ul>
                <li><code>style.css</code> - Contains theme information and styles</li>
                <li><code>index.php</code> - The main template file</li>
                <li><code>functions.php</code> - Theme functions and features</li>
            </ul>

            <h2>Creating Your First Theme</h2>
            <p>
                Let's start by creating a basic theme structure. Create a new folder in <code>wp-content/themes/</code> with your theme name. Inside this folder, create the following files:
            </p>

            <div class="code-block">
                <div class="code-header">
                    <span>style.css</span>
                    <button class="copy-code-btn" onclick="copyCode(this)">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <pre><code>/*
Theme Name: Your Theme Name
Description: A custom WordPress theme
Author: Your Name
Version: 1.0
*/

/* Your CSS styles here */</code></pre>
            </div>

            <h2>Best Practices for Theme Development</h2>
            <p>
                Following best practices ensures your theme is maintainable, secure, and performs well:
            </p>
            <ul>
                <li>Use WordPress coding standards</li>
                <li>Implement proper security measures</li>
                <li>Optimize for performance and speed</li>
                <li>Make themes responsive and mobile-friendly</li>
                <li>Follow accessibility guidelines (WCAG)</li>
            </ul>

            <h2>Adding Custom Functionality</h2>
            <p>
                The <code>functions.php</code> file is where you add custom features to your theme. This includes:
            </p>
            <ul>
                <li>Enqueuing stylesheets and scripts</li>
                <li>Registering navigation menus</li>
                <li>Adding theme support features</li>
                <li>Creating custom post types</li>
                <li>Adding custom fields</li>
            </ul>

            <h2>Responsive Design Implementation</h2>
            <p>
                Modern websites must be responsive. Use CSS media queries and flexible layouts to ensure your theme looks great on all devices. Consider mobile-first design principles for better performance.
            </p>

            <h2>SEO Optimization</h2>
            <p>
                A well-coded theme contributes significantly to SEO. Ensure proper HTML structure, semantic markup, and fast loading times. Consider integrating with SEO plugins like Yoast SEO for enhanced functionality.
            </p>

            <h2>Testing Your Theme</h2>
            <p>
                Before launching, thoroughly test your theme:
            </p>
            <ul>
                <li>Test on different browsers and devices</li>
                <li>Check WordPress compatibility</li>
                <li>Validate HTML and CSS</li>
                <li>Test with various plugins</li>
                <li>Check accessibility</li>
            </ul>

            <h2>Conclusion</h2>
            <p>
                Building custom WordPress themes is a skill that takes time to master, but the results are worth it. You'll have complete control over your website's appearance and functionality, creating unique experiences for your users.
            </p>
            <p>
                If you need help with custom WordPress theme development, feel free to <a href="index.html#contact">contact me</a>. I specialize in creating custom themes that are fast, secure, and tailored to your business needs.
            </p>
        `
    },
    '2': {
        id: 2,
        title: 'WooCommerce Performance Optimization: Speed Up Your Store',
        category: 'E-Commerce',
        date: 'January 10, 2025',
        dateShort: 'Jan 10, 2025',
        readingTime: '6 min read',
        views: 987,
        image: 'images/project-2.webp',
        excerpt: 'Discover proven strategies to optimize your WooCommerce store for better performance. Learn about caching, database optimization, and code improvements that can significantly boost your site speed.',
        tags: ['WooCommerce', 'Performance', 'Optimization'],
        content: `
            <p class="blog-post-intro">
                WooCommerce stores can become slow as they grow, but with the right optimization strategies, you can dramatically improve performance. This guide covers everything you need to speed up your WooCommerce store.
            </p>

            <h2>Why WooCommerce Performance Matters</h2>
            <p>
                Slow-loading e-commerce sites lose customers and revenue. Studies show that a 1-second delay can reduce conversions by 7%. Optimizing your WooCommerce store is crucial for success.
            </p>

            <h2>Database Optimization</h2>
            <p>
                WooCommerce stores a lot of data in the database. Regular optimization is essential:
            </p>
            <ul>
                <li>Clean up old orders and revisions</li>
                <li>Optimize database tables regularly</li>
                <li>Remove unused product variations</li>
                <li>Clear expired transients</li>
            </ul>

            <h2>Caching Strategies</h2>
            <p>
                Implement proper caching to reduce server load:
            </p>
            <ul>
                <li>Use object caching (Redis or Memcached)</li>
                <li>Implement page caching for non-dynamic content</li>
                <li>Use CDN for static assets</li>
                <li>Enable browser caching</li>
            </ul>

            <h2>Image Optimization</h2>
            <p>
                Product images are often the largest files on e-commerce sites. Optimize them:
            </p>
            <ul>
                <li>Compress images before uploading</li>
                <li>Use WebP format when possible</li>
                <li>Implement lazy loading</li>
                <li>Use appropriate image sizes</li>
            </ul>

            <h2>Code Optimization</h2>
            <p>
                Optimize your WooCommerce code:
            </p>
            <ul>
                <li>Minify CSS and JavaScript</li>
                <li>Remove unused plugins and code</li>
                <li>Optimize database queries</li>
                <li>Use efficient hooks and filters</li>
            </ul>

            <h2>Conclusion</h2>
            <p>
                WooCommerce performance optimization is an ongoing process. Regular monitoring and optimization will keep your store fast and your customers happy.
            </p>
        `
    },
    '3': {
        id: 3,
        title: 'WordPress Security Best Practices for 2025',
        category: 'Security',
        date: 'January 5, 2025',
        dateShort: 'Jan 5, 2025',
        readingTime: '7 min read',
        views: 1456,
        image: 'images/project-3.webp',
        excerpt: 'Protect your WordPress website from threats with these essential security practices. From plugin management to SSL certificates, learn how to keep your site safe and secure.',
        tags: ['Security', 'WordPress', 'Best Practices'],
        content: `
            <p class="blog-post-intro">
                WordPress security is more important than ever. With millions of websites running WordPress, it's a prime target for attackers. Follow these best practices to protect your site.
            </p>

            <h2>Keep WordPress Updated</h2>
            <p>
                Always keep WordPress core, themes, and plugins updated. Updates often include security patches that fix vulnerabilities.
            </p>

            <h2>Use Strong Passwords</h2>
            <p>
                Implement strong password policies for all user accounts. Use a password manager and enable two-factor authentication.
            </p>

            <h2>Limit Login Attempts</h2>
            <p>
                Protect against brute force attacks by limiting login attempts. Use plugins like Limit Login Attempts Reloaded.
            </p>

            <h2>Use SSL Certificates</h2>
            <p>
                Always use HTTPS for your WordPress site. SSL certificates encrypt data between your server and visitors' browsers.
            </p>

            <h2>Regular Backups</h2>
            <p>
                Implement automated backups. Store backups off-site and test restoration procedures regularly.
            </p>

            <h2>Security Plugins</h2>
            <p>
                Use reputable security plugins like Wordfence or Sucuri to monitor and protect your site.
            </p>

            <h2>Conclusion</h2>
            <p>
                Security is an ongoing process. Stay vigilant and keep your WordPress site protected with these practices.
            </p>
        `
    },
    '4': {
        id: 4,
        title: 'Advanced Elementor Pro Tips for Professional Websites',
        category: 'Design',
        date: 'December 28, 2024',
        dateShort: 'Dec 28, 2024',
        readingTime: '9 min read',
        views: 1123,
        image: 'images/project-4.webp',
        excerpt: 'Master Elementor Pro with these advanced techniques. Create stunning layouts, custom widgets, and dynamic content that will make your WordPress sites stand out from the competition.',
        tags: ['Elementor', 'Page Builder', 'Design'],
        content: `
            <p class="blog-post-intro">
                Elementor Pro is a powerful page builder that can transform your WordPress site. These advanced tips will help you create professional, high-performing websites.
            </p>

            <h2>Custom CSS in Elementor</h2>
            <p>
                Use custom CSS to extend Elementor's capabilities. Add custom styles to individual widgets or use global CSS for site-wide changes.
            </p>

            <h2>Dynamic Content</h2>
            <p>
                Leverage Elementor's dynamic content features to create reusable templates that automatically populate with content from custom fields, ACF, or other sources.
            </p>

            <h2>Custom Widgets</h2>
            <p>
                Create custom Elementor widgets to add unique functionality to your pages. This requires PHP knowledge but provides unlimited customization.
            </p>

            <h2>Performance Optimization</h2>
            <p>
                Optimize Elementor for performance by using CSS print method, disabling unused features, and optimizing asset loading.
            </p>

            <h2>Conclusion</h2>
            <p>
                Elementor Pro offers powerful tools for creating professional websites. Master these techniques to unlock its full potential.
            </p>
        `
    },
    '5': {
        id: 5,
        title: 'WordPress SEO: Complete Optimization Guide',
        category: 'SEO',
        date: 'December 20, 2024',
        dateShort: 'Dec 20, 2024',
        readingTime: '10 min read',
        views: 1654,
        image: 'images/project-5.webp',
        excerpt: 'Boost your WordPress site\'s search engine rankings with this comprehensive SEO guide. Learn about on-page optimization, schema markup, and technical SEO best practices.',
        tags: ['SEO', 'WordPress', 'Optimization'],
        content: `
            <p class="blog-post-intro">
                SEO is crucial for WordPress site success. This comprehensive guide covers all aspects of WordPress SEO optimization to help you rank higher in search results.
            </p>

            <h2>On-Page SEO</h2>
            <p>
                Optimize your content for search engines:
            </p>
            <ul>
                <li>Use descriptive, keyword-rich titles</li>
                <li>Write compelling meta descriptions</li>
                <li>Optimize headings (H1, H2, H3)</li>
                <li>Use alt text for images</li>
                <li>Create internal linking structure</li>
            </ul>

            <h2>Technical SEO</h2>
            <p>
                Improve technical aspects:
            </p>
            <ul>
                <li>Optimize site speed</li>
                <li>Ensure mobile responsiveness</li>
                <li>Create XML sitemaps</li>
                <li>Implement schema markup</li>
                <li>Fix broken links</li>
            </ul>

            <h2>SEO Plugins</h2>
            <p>
                Use plugins like Yoast SEO or Rank Math to automate many SEO tasks and get recommendations.
            </p>

            <h2>Conclusion</h2>
            <p>
                WordPress SEO is an ongoing process. Monitor your rankings and continuously optimize your content and technical setup.
            </p>
        `
    }
};

// Generate additional blog posts data
const generateBlogPost = (id, title, category, date, dateShort, readingTime, views, image, excerpt, tags, content) => {
    blogPosts[id] = {
        id: parseInt(id),
        title,
        category,
        date,
        dateShort,
        readingTime,
        views,
        image,
        excerpt,
        tags,
        content: content || `<p class="blog-post-intro">${excerpt}</p><p>This is a comprehensive guide about ${title.toLowerCase()}. Full content coming soon...</p>`
    };
};

// Generate all 45 blog posts
generateBlogPost(6, 'How to Create Custom Post Types in WordPress', 'WordPress', 'January 12, 2025', 'Jan 12, 2025', '6 min read', 856, 'images/project-2.webp', 'Discover how to create and manage custom post types in WordPress. Learn the code approach and plugin methods to extend WordPress functionality for your specific content needs.', ['WordPress', 'Custom Post Types', 'Development']);
generateBlogPost(7, 'WordPress Plugin Development: A Beginner\'s Guide', 'WordPress', 'January 8, 2025', 'Jan 8, 2025', '8 min read', 1023, 'images/project-3.webp', 'Start building WordPress plugins with this step-by-step guide. Learn plugin structure, hooks, filters, and best practices for creating maintainable and secure plugins.', ['WordPress', 'Plugins', 'PHP']);
generateBlogPost(8, 'Understanding WordPress Hooks: Actions and Filters', 'WordPress', 'January 3, 2025', 'Jan 3, 2025', '7 min read', 934, 'images/project-4.webp', 'Master WordPress hooks system with this comprehensive guide. Learn the difference between actions and filters, and how to use them effectively in your development workflow.', ['WordPress', 'Hooks', 'Development']);
generateBlogPost(9, 'WordPress REST API: Building Custom Endpoints', 'WordPress', 'December 28, 2024', 'Dec 28, 2024', '9 min read', 789, 'images/project-5.webp', 'Explore the WordPress REST API and learn how to create custom endpoints. Build headless WordPress applications and integrate with external services seamlessly.', ['WordPress', 'REST API', 'Development']);
generateBlogPost(10, 'Optimizing WordPress Database Performance', 'WordPress', 'December 25, 2024', 'Dec 25, 2024', '6 min read', 1123, 'images/project-6.webp', 'Learn how to optimize your WordPress database for better performance. Discover techniques for cleaning, indexing, and maintaining your database efficiently.', ['WordPress', 'Database', 'Performance']);
generateBlogPost(11, 'WordPress Multisite: Setup and Management', 'WordPress', 'December 22, 2024', 'Dec 22, 2024', '8 min read', 678, 'images/project-1.webp', 'Complete guide to setting up and managing WordPress Multisite networks. Learn how to create a network of sites from a single WordPress installation.', ['WordPress', 'Multisite', 'Network']);
generateBlogPost(12, 'Creating Custom WordPress Widgets', 'WordPress', 'December 18, 2024', 'Dec 18, 2024', '7 min read', 892, 'images/project-2.webp', 'Build custom WordPress widgets to extend your theme\'s functionality. Learn widget API, form fields, and how to create reusable widget components.', ['WordPress', 'Widgets', 'Development']);
generateBlogPost(13, 'WordPress Gutenberg Block Development', 'WordPress', 'December 15, 2024', 'Dec 15, 2024', '9 min read', 756, 'images/project-3.webp', 'Create custom Gutenberg blocks for the WordPress block editor. Learn block registration, attributes, and how to build interactive block components.', ['WordPress', 'Gutenberg', 'Blocks']);
generateBlogPost(14, 'WordPress Custom Fields with ACF', 'WordPress', 'December 12, 2024', 'Dec 12, 2024', '7 min read', 1345, 'images/project-4.webp', 'Master Advanced Custom Fields (ACF) to create flexible content management solutions. Learn field types, groups, and how to display custom field data in themes.', ['WordPress', 'ACF', 'Custom Fields']);
generateBlogPost(15, 'WordPress User Roles and Capabilities Explained', 'WordPress', 'December 10, 2024', 'Dec 10, 2024', '6 min read', 987, 'images/project-5.webp', 'Understand WordPress user roles and capabilities system. Learn how to create custom roles, modify capabilities, and implement proper access control.', ['WordPress', 'User Roles', 'Security']);
generateBlogPost(16, 'WordPress Performance Optimization Techniques', 'WordPress', 'December 8, 2024', 'Dec 8, 2024', '10 min read', 1456, 'images/project-6.webp', 'Comprehensive guide to optimizing WordPress performance. Learn caching strategies, image optimization, code minification, and server-level optimizations.', ['WordPress', 'Performance', 'Optimization']);

// E-Commerce posts
generateBlogPost(17, 'WooCommerce Custom Product Fields', 'E-Commerce', 'January 7, 2025', 'Jan 7, 2025', '6 min read', 723, 'images/project-1.webp', 'Add custom fields to WooCommerce products to enhance product information. Learn how to create, display, and save custom product data for better e-commerce functionality.', ['WooCommerce', 'Custom Fields', 'Products']);
generateBlogPost(18, 'Building a Custom WooCommerce Checkout', 'E-Commerce', 'January 4, 2025', 'Jan 4, 2025', '8 min read', 834, 'images/project-3.webp', 'Customize the WooCommerce checkout process to match your brand and improve user experience. Learn how to add custom fields, modify layout, and enhance checkout functionality.', ['WooCommerce', 'Checkout', 'Customization']);
generateBlogPost(19, 'WooCommerce Payment Gateway Integration', 'E-Commerce', 'December 30, 2024', 'Dec 30, 2024', '9 min read', 645, 'images/project-4.webp', 'Learn how to integrate custom payment gateways into WooCommerce. Step-by-step guide to creating payment gateway plugins for various payment providers.', ['WooCommerce', 'Payment', 'Gateway']);
generateBlogPost(20, 'WooCommerce Product Variations Guide', 'E-Commerce', 'December 27, 2024', 'Dec 27, 2024', '7 min read', 912, 'images/project-5.webp', 'Master WooCommerce product variations to create flexible product options. Learn how to set up attributes, variations, and manage variable products effectively.', ['WooCommerce', 'Products', 'Variations']);
generateBlogPost(21, 'WooCommerce Shipping Methods Customization', 'E-Commerce', 'December 24, 2024', 'Dec 24, 2024', '6 min read', 567, 'images/project-6.webp', 'Customize WooCommerce shipping methods to match your business needs. Learn how to create custom shipping zones, rates, and integrate with shipping carriers.', ['WooCommerce', 'Shipping', 'Customization']);
generateBlogPost(22, 'WooCommerce Order Management System', 'E-Commerce', 'December 21, 2024', 'Dec 21, 2024', '7 min read', 789, 'images/project-1.webp', 'Streamline your order management process with WooCommerce. Learn how to customize order statuses, emails, and create efficient workflows for order processing.', ['WooCommerce', 'Orders', 'Management']);
generateBlogPost(23, 'WooCommerce Subscription Plugin Setup', 'E-Commerce', 'December 18, 2024', 'Dec 18, 2024', '8 min read', 634, 'images/project-2.webp', 'Set up recurring payments and subscription products with WooCommerce Subscriptions. Learn configuration, subscription management, and integration best practices.', ['WooCommerce', 'Subscriptions', 'Recurring']);

// Design posts
generateBlogPost(24, 'Creating Responsive WordPress Themes', 'Design', 'December 25, 2024', 'Dec 25, 2024', '8 min read', 1123, 'images/project-3.webp', 'Learn how to create fully responsive WordPress themes that look great on all devices. Master CSS Grid, Flexbox, and media queries for modern web design.', ['Design', 'Responsive', 'CSS']);
generateBlogPost(25, 'WordPress Typography Best Practices', 'Design', 'December 22, 2024', 'Dec 22, 2024', '7 min read', 856, 'images/project-5.webp', 'Master typography in WordPress themes. Learn about font pairing, readability, hierarchy, and how to implement beautiful typography that enhances user experience.', ['Design', 'Typography', 'UI/UX']);
generateBlogPost(26, 'Color Theory for Web Design', 'Design', 'December 19, 2024', 'Dec 19, 2024', '6 min read', 934, 'images/project-6.webp', 'Understand color theory and how to apply it in web design. Learn about color schemes, contrast, accessibility, and creating visually appealing WordPress themes.', ['Design', 'Color', 'UI/UX']);
generateBlogPost(27, 'Mobile-First Design Approach', 'Design', 'December 16, 2024', 'Dec 16, 2024', '7 min read', 723, 'images/project-1.webp', 'Adopt a mobile-first design strategy for WordPress development. Learn how to prioritize mobile experience and progressively enhance for larger screens.', ['Design', 'Mobile', 'Responsive']);
generateBlogPost(28, 'WordPress Customizer API Guide', 'Design', 'December 13, 2024', 'Dec 13, 2024', '8 min read', 1023, 'images/project-2.webp', 'Master the WordPress Customizer API to create theme options. Learn how to add custom controls, sections, and panels for live theme customization.', ['WordPress', 'Customizer', 'API']);

// SEO posts
generateBlogPost(29, 'Schema Markup for WordPress', 'SEO', 'December 17, 2024', 'Dec 17, 2024', '7 min read', 789, 'images/project-4.webp', 'Implement structured data (Schema.org) in WordPress to improve search visibility. Learn how to add schema markup for better rich snippets and search results.', ['SEO', 'Schema', 'WordPress']);
generateBlogPost(30, 'WordPress XML Sitemap Configuration', 'SEO', 'December 14, 2024', 'Dec 14, 2024', '6 min read', 645, 'images/project-6.webp', 'Configure and optimize WordPress XML sitemaps for better search engine indexing. Learn how to customize sitemaps and submit them to search engines.', ['SEO', 'Sitemap', 'WordPress']);
generateBlogPost(31, 'WordPress Meta Tags Optimization', 'SEO', 'December 11, 2024', 'Dec 11, 2024', '7 min read', 912, 'images/project-1.webp', 'Optimize meta tags in WordPress for better SEO performance. Learn about title tags, meta descriptions, Open Graph, and Twitter Card implementation.', ['SEO', 'Meta Tags', 'WordPress']);
generateBlogPost(32, 'WordPress Speed and SEO Relationship', 'SEO', 'December 8, 2024', 'Dec 8, 2024', '6 min read', 567, 'images/project-2.webp', 'Understand how website speed impacts SEO rankings. Learn optimization techniques that improve both performance and search engine visibility.', ['SEO', 'Performance', 'Speed']);

// Security posts
generateBlogPost(33, 'WordPress Backup Strategies', 'Security', 'December 31, 2024', 'Dec 31, 2024', '7 min read', 1234, 'images/project-5.webp', 'Implement comprehensive backup strategies for WordPress sites. Learn about automated backups, storage solutions, and disaster recovery planning.', ['Security', 'Backup', 'WordPress']);
generateBlogPost(34, 'WordPress Malware Removal Guide', 'Security', 'December 28, 2024', 'Dec 28, 2024', '8 min read', 856, 'images/project-6.webp', 'Step-by-step guide to removing malware from WordPress sites. Learn detection methods, cleanup procedures, and prevention strategies.', ['Security', 'Malware', 'WordPress']);
generateBlogPost(35, 'WordPress Two-Factor Authentication Setup', 'Security', 'December 25, 2024', 'Dec 25, 2024', '6 min read', 723, 'images/project-1.webp', 'Enhance WordPress security with two-factor authentication. Learn how to implement 2FA for admin accounts and protect your site from unauthorized access.', ['Security', '2FA', 'Authentication']);

// Tutorials posts
generateBlogPost(36, 'How to Install WordPress Locally', 'Tutorials', 'December 23, 2024', 'Dec 23, 2024', '5 min read', 1456, 'images/project-2.webp', 'Complete guide to setting up WordPress on your local machine. Learn about Local by Flywheel, XAMPP, and other local development environments.', ['Tutorial', 'WordPress', 'Setup']);
generateBlogPost(37, 'Setting Up WordPress on a Live Server', 'Tutorials', 'December 20, 2024', 'Dec 20, 2024', '7 min read', 1123, 'images/project-3.webp', 'Step-by-step tutorial for deploying WordPress to a live server. Learn about hosting setup, database configuration, and file transfer methods.', ['Tutorial', 'WordPress', 'Hosting']);
generateBlogPost(38, 'WordPress Child Theme Development', 'Tutorials', 'December 17, 2024', 'Dec 17, 2024', '6 min read', 987, 'images/project-4.webp', 'Learn how to create and use WordPress child themes to safely customize parent themes without losing changes during updates.', ['Tutorial', 'Child Theme', 'WordPress']);
generateBlogPost(39, 'WordPress Database Management', 'Tutorials', 'December 14, 2024', 'Dec 14, 2024', '7 min read', 834, 'images/project-5.webp', 'Master WordPress database management with phpMyAdmin. Learn how to backup, restore, and optimize your WordPress database effectively.', ['Tutorial', 'Database', 'WordPress']);
generateBlogPost(40, 'WordPress Migration Guide', 'Tutorials', 'December 11, 2024', 'Dec 11, 2024', '8 min read', 756, 'images/project-6.webp', 'Complete guide to migrating WordPress sites between servers or domains. Learn manual and plugin-based migration methods with step-by-step instructions.', ['Tutorial', 'Migration', 'WordPress']);
generateBlogPost(41, 'WordPress Maintenance Checklist', 'Tutorials', 'December 8, 2024', 'Dec 8, 2024', '6 min read', 912, 'images/project-1.webp', 'Essential WordPress maintenance tasks to keep your site running smoothly. Learn about updates, backups, security checks, and performance monitoring.', ['Tutorial', 'Maintenance', 'WordPress']);
generateBlogPost(42, 'WordPress Debugging Techniques', 'Tutorials', 'December 5, 2024', 'Dec 5, 2024', '7 min read', 645, 'images/project-2.webp', 'Learn how to debug WordPress issues effectively. Master WP_DEBUG, error logging, and troubleshooting common WordPress problems.', ['Tutorial', 'Debugging', 'WordPress']);
generateBlogPost(43, 'WordPress Customizer Development', 'Tutorials', 'December 2, 2024', 'Dec 2, 2024', '8 min read', 789, 'images/project-3.webp', 'Tutorial on adding custom options to WordPress Customizer. Learn how to create custom controls and sections for live theme customization.', ['Tutorial', 'Customizer', 'WordPress']);
generateBlogPost(44, 'WordPress Shortcodes Creation', 'Tutorials', 'November 29, 2024', 'Nov 29, 2024', '6 min read', 567, 'images/project-4.webp', 'Create custom WordPress shortcodes to add dynamic content easily. Learn shortcode API, attributes, and best practices for shortcode development.', ['Tutorial', 'Shortcodes', 'WordPress']);
generateBlogPost(45, 'WordPress AJAX Implementation', 'Tutorials', 'November 26, 2024', 'Nov 26, 2024', '8 min read', 723, 'images/project-5.webp', 'Implement AJAX in WordPress for dynamic content loading. Learn WordPress AJAX API, security, and how to create interactive features without page reloads.', ['Tutorial', 'AJAX', 'WordPress']);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = blogPosts;
}

