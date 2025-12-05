// ============================================
// Blog Functions - Dynamic Content Loading
// ============================================

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Calculate reading time (approximate)
function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime + ' min read';
}

// Render blog post card
function renderBlogPost(post) {
    const imageIndex = ((post.id - 1) % 6) + 1;
    return `
        <article class="blog-post" data-category="${post.category.toLowerCase()}" data-id="${post.id}">
            <div class="blog-post-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <div class="blog-post-category">${post.category}</div>
            </div>
            <div class="blog-post-content">
                <div class="blog-post-meta">
                    <span class="blog-post-date">
                        <i class="fas fa-calendar"></i> ${post.date}
                    </span>
                    <span class="blog-post-author">
                        <i class="fas fa-user"></i> SOHAIB
                    </span>
                </div>
                <h2 class="blog-post-title">
                    <a href="blog-post.html?id=${post.id}">${post.title}</a>
                </h2>
                <p class="blog-post-excerpt">${post.excerpt}</p>
                <div class="blog-post-footer">
                    <a href="blog-post.html?id=${post.id}" class="btn btn-primary">Read More</a>
                    <div class="blog-post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        </article>
    `;
}

// Filter and display blog posts
function displayBlogPosts(posts, page = 1, postsPerPage = 5) {
    const blogMain = document.querySelector('.blog-main');
    if (!blogMain) return;

    // Remove loading indicator
    const loadingIndicator = blogMain.querySelector('.blog-loading');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }

    // Remove existing posts (keep pagination if exists)
    const existingPosts = blogMain.querySelectorAll('.blog-post');
    existingPosts.forEach(post => post.remove());

    // Calculate pagination
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = posts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Render posts
    const postsHtml = postsToShow.map(post => renderBlogPost(post)).join('');
    const paginationContainer = blogMain.querySelector('.blog-pagination');
    
    if (paginationContainer) {
        paginationContainer.insertAdjacentHTML('beforebegin', postsHtml);
    } else {
        blogMain.insertAdjacentHTML('beforeend', postsHtml);
        // Add pagination
        const paginationHtml = generatePagination(page, totalPages);
        blogMain.insertAdjacentHTML('beforeend', paginationHtml);
    }

    // Update pagination
    if (paginationContainer) {
        paginationContainer.outerHTML = generatePagination(page, totalPages);
    }
}

// Generate pagination HTML
function generatePagination(currentPage, totalPages) {
    if (totalPages <= 1) return '';

    // Get current URL parameters to preserve filters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const archive = urlParams.get('archive');
    const tag = urlParams.get('tag');
    const search = urlParams.get('search');
    
    // Build base URL with current filters
    let baseUrl = '?';
    const params = [];
    if (category) params.push(`category=${encodeURIComponent(category)}`);
    if (archive) params.push(`archive=${encodeURIComponent(archive)}`);
    if (tag) params.push(`tag=${encodeURIComponent(tag)}`);
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    
    const baseParams = params.length > 0 ? params.join('&') + '&' : '';

    let paginationHtml = '<div class="blog-pagination">';
    
    // Previous button
    if (currentPage > 1) {
        paginationHtml += `<a href="${baseUrl}${baseParams}page=${currentPage - 1}" class="pagination-btn">
            <i class="fas fa-chevron-left"></i>
        </a>`;
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHtml += `<a href="${baseUrl}${baseParams}page=${i}" class="pagination-btn ${i === currentPage ? 'active' : ''}">${i}</a>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHtml += `<span class="pagination-dots">...</span>`;
        }
    }

    // Next button
    if (currentPage < totalPages) {
        paginationHtml += `<a href="${baseUrl}${baseParams}page=${currentPage + 1}" class="pagination-btn">
            <i class="fas fa-chevron-right"></i>
        </a>`;
    }

    paginationHtml += '</div>';
    return paginationHtml;
}

// Filter posts by category
function filterByCategory(category) {
    const allPosts = Object.values(blogPosts).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    if (category) {
        const filtered = allPosts.filter(post => 
            post.category.toLowerCase() === category.toLowerCase()
        );
        const page = parseInt(getUrlParameter('page')) || 1;
        displayBlogPosts(filtered, page);
        updatePageTitle(category);
    } else {
        const page = parseInt(getUrlParameter('page')) || 1;
        displayBlogPosts(allPosts, page);
        updatePageTitle('All Posts');
    }
}

// Filter posts by archive (month/year)
function filterByArchive(archive) {
    const allPosts = Object.values(blogPosts).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    if (archive) {
        const [year, month] = archive.split('-');
        const filtered = allPosts.filter(post => {
            const postDate = new Date(post.date);
            return postDate.getFullYear() == year && 
                   (postDate.getMonth() + 1) == month;
        });
        const page = parseInt(getUrlParameter('page')) || 1;
        displayBlogPosts(filtered, page);
        updatePageTitle(`Archive: ${getMonthName(month)} ${year}`);
    } else {
        const page = parseInt(getUrlParameter('page')) || 1;
        displayBlogPosts(allPosts, page);
    }
}

// Filter posts by tag
function filterByTag(tag) {
    const allPosts = Object.values(blogPosts).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    if (tag) {
        const filtered = allPosts.filter(post => 
            post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
        );
        const page = parseInt(getUrlParameter('page')) || 1;
        displayBlogPosts(filtered, page);
        updatePageTitle(`Tag: ${tag}`);
    } else {
        const page = parseInt(getUrlParameter('page')) || 1;
        displayBlogPosts(allPosts, page);
    }
}

// Search posts
function searchPosts(query) {
    const allPosts = Object.values(blogPosts).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    if (query && query.trim()) {
        const searchTerm = query.toLowerCase().trim();
        const filtered = allPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            post.category.toLowerCase().includes(searchTerm)
        );
        const page = parseInt(getUrlParameter('page')) || 1;
        displayBlogPosts(filtered, page);
        updatePageTitle(`Search: ${query}`);
    } else {
        const page = parseInt(getUrlParameter('page')) || 1;
        displayBlogPosts(allPosts, page);
        updatePageTitle('All Posts');
    }
}

// Update page title
function updatePageTitle(title) {
    const blogHeader = document.querySelector('.blog-header-content h1');
    if (blogHeader && title !== 'All Posts') {
        blogHeader.textContent = title;
    }
}

// Get month name
function getMonthName(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[parseInt(month) - 1] || month;
}

// Initialize blog page
function initBlogPage() {
    const category = getUrlParameter('category');
    const archive = getUrlParameter('archive');
    const tag = getUrlParameter('tag');
    const search = getUrlParameter('search');
    const page = parseInt(getUrlParameter('page')) || 1;

    // Handle search
    if (search) {
        searchPosts(search);
        // Set search input value
        const searchInput = document.querySelector('.blog-search-input');
        if (searchInput) {
            searchInput.value = decodeURIComponent(search);
        }
        return;
    }

    // Handle category filter
    if (category) {
        filterByCategory(category);
        // Highlight active category
        highlightActiveCategory(category);
        return;
    }

    // Handle archive filter
    if (archive) {
        filterByArchive(archive);
        return;
    }

    // Handle tag filter
    if (tag) {
        filterByTag(tag);
        return;
    }

    // Display all posts with pagination
    const allPosts = Object.values(blogPosts).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    displayBlogPosts(allPosts, page);
}

// Highlight active category
function highlightActiveCategory(category) {
    const categoryLinks = document.querySelectorAll('.categories-list a');
    categoryLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(`category=${category.toLowerCase()}`)) {
            link.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))';
            link.style.borderColor = 'var(--accent-primary)';
        }
    });
}

// Initialize blog post detail page
function initBlogPostDetail() {
    const postId = getUrlParameter('id') || '1';
    const post = blogPosts[postId];

    if (!post) {
        document.querySelector('.blog-post-detail').innerHTML = 
            '<div class="container"><h1>Post not found</h1><p><a href="blog.html">Back to Blog</a></p></div>';
        return;
    }

    // Update page title
    document.title = `${post.title} - SOHAIB Blog`;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', post.excerpt);
    }

    // Update breadcrumb
    const breadcrumb = document.querySelector('.blog-post-breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `
            <a href="index.html">Home</a>
            <i class="fas fa-chevron-right"></i>
            <a href="blog.html">Blog</a>
            <i class="fas fa-chevron-right"></i>
            <span>${post.title}</span>
        `;
    }

    // Update category badge
    const categoryBadge = document.querySelector('.blog-post-category-badge');
    if (categoryBadge) {
        categoryBadge.textContent = post.category;
    }

    // Update title
    const title = document.querySelector('.blog-post-detail-title');
    if (title) {
        title.textContent = post.title;
    }

    // Update meta information
    const metaDate = document.querySelector('.blog-post-detail-meta .meta-value');
    if (metaDate) {
        const metaItems = document.querySelectorAll('.blog-post-detail-meta .meta-value');
        if (metaItems[1]) metaItems[1].textContent = post.date;
        if (metaItems[2]) metaItems[2].textContent = post.readingTime;
        if (metaItems[3]) metaItems[3].textContent = post.views.toLocaleString();
    }

    // Update featured image
    const featuredImage = document.querySelector('.blog-post-featured-image img');
    if (featuredImage) {
        featuredImage.src = post.image;
        featuredImage.alt = post.title;
    }

    // Update content
    const content = document.querySelector('.blog-post-body');
    if (content) {
        content.innerHTML = post.content;
    }

    // Update tags
    const tagsSection = document.querySelector('.blog-post-tags-section .blog-post-tags');
    if (tagsSection) {
        tagsSection.innerHTML = post.tags.map(tag => 
            `<a href="blog.html?tag=${encodeURIComponent(tag.toLowerCase())}" class="tag">${tag}</a>`
        ).join('');
    }

    // Update share buttons URLs
    const currentUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(post.title);
    
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        if (btn.classList.contains('share-facebook')) {
            btn.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        } else if (btn.classList.contains('share-twitter')) {
            btn.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareTitle}`;
        } else if (btn.classList.contains('share-linkedin')) {
            btn.href = `https://www.linkedin.com/shareArticle?url=${currentUrl}&title=${shareTitle}`;
        } else if (btn.classList.contains('share-whatsapp')) {
            btn.href = `https://wa.me/?text=${shareTitle}%20${currentUrl}`;
        }
    });

    // Update related posts
    updateRelatedPosts(post);

    // Update navigation (prev/next)
    updatePostNavigation(postId);
}

// Update related posts
function updateRelatedPosts(currentPost) {
    const relatedPosts = Object.values(blogPosts)
        .filter(post => 
            post.id !== currentPost.id && 
            (post.category === currentPost.category || 
             post.tags.some(tag => currentPost.tags.includes(tag)))
        )
        .slice(0, 3);

    const relatedGrid = document.querySelector('.related-posts-grid');
    if (relatedGrid && relatedPosts.length > 0) {
        relatedGrid.innerHTML = relatedPosts.map(post => `
            <article class="related-post-card">
                <div class="related-post-image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                </div>
                <div class="related-post-content">
                    <span class="related-post-category">${post.category}</span>
                    <h4><a href="blog-post.html?id=${post.id}">${post.title}</a></h4>
                    <span class="related-post-date">${post.dateShort}</span>
                </div>
            </article>
        `).join('');
    }
}

// Update post navigation (prev/next)
function updatePostNavigation(currentId) {
    const allPosts = Object.values(blogPosts).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    const currentIndex = allPosts.findIndex(post => post.id == currentId);
    
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    const prevLink = document.querySelector('.prev-post');
    const nextLink = document.querySelector('.next-post');

    if (prevLink) {
        if (prevPost) {
            prevLink.href = `blog-post.html?id=${prevPost.id}`;
            prevLink.querySelector('.nav-post-title').textContent = prevPost.title;
            prevLink.style.display = 'flex';
        } else {
            prevLink.style.display = 'none';
        }
    }

    if (nextLink) {
        if (nextPost) {
            nextLink.href = `blog-post.html?id=${nextPost.id}`;
            nextLink.querySelector('.nav-post-title').textContent = nextPost.title;
            nextLink.style.display = 'flex';
        } else {
            nextLink.style.display = 'none';
        }
    }
}

// Handle search form submission
function initSearchForm() {
    const searchForm = document.querySelector('.blog-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('.blog-search-input');
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `blog.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (window.location.pathname.includes('blog.html')) {
            initBlogPage();
            initSearchForm();
        } else if (window.location.pathname.includes('blog-post.html')) {
            initBlogPostDetail();
        }
    });
} else {
    if (window.location.pathname.includes('blog.html')) {
        initBlogPage();
        initSearchForm();
    } else if (window.location.pathname.includes('blog-post.html')) {
        initBlogPostDetail();
    }
}

