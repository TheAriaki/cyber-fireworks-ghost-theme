// Main JavaScript for Cyber Fireworks Ghost Theme

(function() {
    'use strict';

    // Theme initialization
    function initTheme() {
        initMobileMenu();
        initSearch();
        initScrollEffects();
        initAnimations();
        initLazyLoading();
        console.log('Cyber Fireworks theme initialized');
    }

    // Mobile menu functionality
    function initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const siteNav = document.querySelector('.site-nav');
        
        if (mobileToggle && siteNav) {
            mobileToggle.addEventListener('click', function() {
                const isOpen = siteNav.classList.contains('mobile-open');
                
                if (isOpen) {
                    siteNav.classList.remove('mobile-open');
                    mobileToggle.classList.remove('active');
                } else {
                    siteNav.classList.add('mobile-open');
                    mobileToggle.classList.add('active');
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!siteNav.contains(e.target) && !mobileToggle.contains(e.target)) {
                    siteNav.classList.remove('mobile-open');
                    mobileToggle.classList.remove('active');
                }
            });
        }
    }

    // Search functionality
    function initSearch() {
        const searchToggle = document.querySelector('.search-toggle');
        const searchOverlay = document.querySelector('.search-overlay');
        const searchClose = document.querySelector('.search-close');
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');

        if (searchToggle && searchOverlay) {
            // Open search
            searchToggle.addEventListener('click', function() {
                searchOverlay.classList.add('active');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
            });

            // Close search
            function closeSearch() {
                searchOverlay.classList.remove('active');
                if (searchInput) {
                    searchInput.value = '';
                }
                if (searchResults) {
                    searchResults.innerHTML = '';
                }
            }

            if (searchClose) {
                searchClose.addEventListener('click', closeSearch);
            }

            // Close search with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                    closeSearch();
                }
            });

            // Close search when clicking outside
            searchOverlay.addEventListener('click', function(e) {
                if (e.target === searchOverlay) {
                    closeSearch();
                }
            });

            // Simple client-side search (can be enhanced with Ghost search API)
            if (searchInput && searchResults) {
                let searchTimeout;
                searchInput.addEventListener('input', function() {
                    clearTimeout(searchTimeout);
                    const query = this.value.trim();
                    
                    if (query.length > 2) {
                        searchTimeout = setTimeout(() => performSearch(query), 300);
                    } else {
                        searchResults.innerHTML = '';
                    }
                });
            }
        }
    }

    // Simple search function (can be replaced with Ghost Content API)
    function performSearch(query) {
        const searchResults = document.querySelector('.search-results');
        if (!searchResults) return;

        // This is a placeholder - in a real implementation, you would use Ghost's Content API
        searchResults.innerHTML = `
            <div class="search-message">
                <p>搜索功能需要集成 Ghost Content API</p>
                <p>Search query: "${query}"</p>
            </div>
        `;
    }

    // Scroll effects
    function initScrollEffects() {
        const header = document.querySelector('.site-header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (header) {
                // Add/remove scrolled class for styling
                if (currentScrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Hide/show header on scroll
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
            }

            lastScrollY = currentScrollY;
        });
    }

    // Animations
    function initAnimations() {
        // Add intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate
        const animateElements = document.querySelectorAll('.post-card, .hero-section, .cta-section');
        animateElements.forEach(el => observer.observe(el));
    }

    // Lazy loading for images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Reading progress indicator
    function initReadingProgress() {
        const article = document.querySelector('.article-content');
        if (!article) return;

        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
        document.body.appendChild(progressBar);

        const progressFill = progressBar.querySelector('.reading-progress-fill');

        window.addEventListener('scroll', function() {
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollTop = window.scrollY;

            const start = articleTop - viewportHeight;
            const end = articleTop + articleHeight;

            if (scrollTop >= start && scrollTop <= end) {
                const progress = (scrollTop - start) / (end - start);
                progressFill.style.width = Math.min(progress * 100, 100) + '%';
                progressBar.classList.add('visible');
            } else {
                progressBar.classList.remove('visible');
            }
        });
    }

    // Copy code blocks functionality
    function initCodeCopy() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(codeBlock => {
            const pre = codeBlock.parentElement;
            const copyButton = document.createElement('button');
            copyButton.className = 'code-copy-btn';
            copyButton.innerHTML = '复制';
            copyButton.setAttribute('aria-label', 'Copy code');
            
            pre.style.position = 'relative';
            pre.appendChild(copyButton);
            
            copyButton.addEventListener('click', function() {
                navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                    copyButton.innerHTML = '已复制!';
                    setTimeout(() => {
                        copyButton.innerHTML = '复制';
                    }, 2000);
                });
            });
        });
    }

    // Initialize theme when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Initialize additional features for article pages
    if (document.querySelector('.article-post')) {
        document.addEventListener('DOMContentLoaded', function() {
            initReadingProgress();
            initCodeCopy();
            initSmoothScrolling();
        });
    }

    // Expose some functions globally if needed
    window.CyberFireworksTheme = {
        init: initTheme
    };

})(); 