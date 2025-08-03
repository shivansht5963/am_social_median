/**
 * PhotoShare - Main Application File
 * Handles application initialization and core functionality
 */

// Global application state
const AppState = {
    currentUser: null,
    posts: [],
    likedPosts: new Set(),
    savedPosts: new Set(),
    currentTheme: 'light',
    isLoggedIn: false,
    isLoading: false
};

// Animation utilities
const AnimationUtils = {
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 10);
    },
    
    slideIn: (element, direction = 'right', duration = 300) => {
        const transforms = {
            right: 'translateX(100%)',
            left: 'translateX(-100%)',
            up: 'translateY(-100%)',
            down: 'translateY(100%)'
        };
        
        element.style.transform = transforms[direction];
        element.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        setTimeout(() => {
            element.style.transform = 'translate(0, 0)';
        }, 10);
    },
    
    scaleIn: (element, duration = 300) => {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 10);
    },
    
    ripple: (event) => {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
};

// Application initialization
class PhotoShareApp {
    constructor() {
        this.initialized = false;
        this.modules = {};
    }

    /**
     * Initialize the application
     */
    async init() {
        if (this.initialized) return;
        
        try {
            console.log('🚀 Initializing PhotoShare Application...');
            
            // Initialize core modules
            await this.initializeModules();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Check authentication status
            this.checkLoginStatus();
            
            // Initialize sample data if needed
            this.initializeSampleData();
            
            this.initialized = true;
            console.log('✅ PhotoShare Application initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize PhotoShare Application:', error);
            this.showNotification('Failed to initialize application', 'error');
        }
    }

    /**
     * Initialize all application modules
     */
    async initializeModules() {
        // Import and initialize modules
        const modules = [
            'auth',
            'posts', 
            'ui',
            'themes',
            'utils'
        ];

        for (const moduleName of modules) {
            try {
                const module = await import(`./${moduleName}.js`);
                this.modules[moduleName] = module.default;
                await this.modules[moduleName].init();
                console.log(`✅ ${moduleName} module initialized`);
            } catch (error) {
                console.error(`❌ Failed to initialize ${moduleName} module:`, error);
            }
        }
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // DOM Content Loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Window events
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Global click handler for modals and overlays
        document.addEventListener('click', this.handleGlobalClick.bind(this));
    }

    /**
     * Handle DOM ready event
     */
    onDOMReady() {
        // Initialize UI components
        this.initializeUIComponents();
        
        // Setup navigation
        this.setupNavigation();
        
        // Setup modals
        this.setupModals();
        
        // Setup post interactions
        this.setupPostInteractions();
        
        // Setup profile tabs
        this.setupProfileTabs();
        
        // Setup comment inputs
        this.setupCommentInputs();
        
        // Setup password toggle
        this.setupPasswordToggle();
        
        // Setup search functionality
        this.setupSearch();
        
        // Setup stories
        this.setupStories();
        
        // Setup follow buttons
        this.setupFollowButtons();
    }

    /**
     * Initialize UI components
     */
    initializeUIComponents() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn-modern, .nav-btn, .action-btn');
        buttons.forEach(button => {
            button.addEventListener('click', AnimationUtils.ripple);
        });

        // Initialize loading states
        this.setupLoadingStates();
    }

    /**
     * Setup navigation functionality
     */
    setupNavigation() {
        const homeBtn = document.getElementById('homeBtn');
        const exploreBtn = document.getElementById('exploreBtn');
        const uploadBtn = document.getElementById('uploadBtn');
        const heartBtn = document.getElementById('heartBtn');
        const profileBtn = document.getElementById('profileBtn');

        if (homeBtn) homeBtn.addEventListener('click', () => this.navigateTo('home'));
        if (exploreBtn) exploreBtn.addEventListener('click', () => this.navigateTo('explore'));
        if (uploadBtn) uploadBtn.addEventListener('click', () => this.showUploadModal());
        if (heartBtn) heartBtn.addEventListener('click', () => this.navigateTo('notifications'));
        if (profileBtn) profileBtn.addEventListener('click', () => this.navigateTo('profile'));
    }

    /**
     * Setup modal functionality
     */
    setupModals() {
        const modals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.close, .modal-close');

        closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) this.closeModal(modal);
            });
        });

        // Close modal on overlay click
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal(modal);
            });
        });
    }

    /**
     * Setup post interaction handlers
     */
    setupPostInteractions() {
        // Like buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.like-btn')) {
                this.handleLike(e);
            }
        });

        // Save buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.save-btn')) {
                this.handleSave(e);
            }
        });

        // Post menu buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.post-menu')) {
                this.handlePostMenu(e);
            }
        });
    }

    /**
     * Setup profile tab functionality
     */
    setupProfileTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.target.dataset.tab;
                this.switchProfileTab(targetTab);
            });
        });
    }

    /**
     * Setup comment input functionality
     */
    setupCommentInputs() {
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('post-comment-input')) {
                this.handleCommentInput(e);
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('post-comment-btn')) {
                const postIndex = e.target.dataset.postIndex;
                this.handleComment(postIndex);
            }
        });
    }

    /**
     * Setup password toggle functionality
     */
    setupPasswordToggle() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('password-toggle')) {
                this.togglePasswordVisibility(e);
            }
        });
    }

    /**
     * Setup search functionality
     */
    setupSearch() {
        const searchInput = document.querySelector('.search-container input');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
        }
    }

    /**
     * Setup stories functionality
     */
    setupStories() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.story')) {
                this.handleStoryClick(e);
            }
        });
    }

    /**
     * Setup follow button functionality
     */
    setupFollowButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('follow-btn')) {
                this.handleFollow(e);
            }
        });
    }

    /**
     * Setup loading states
     */
    setupLoadingStates() {
        // Add loading class to elements that need it
        const loadingElements = document.querySelectorAll('[data-loading]');
        loadingElements.forEach(element => {
            element.addEventListener('click', () => {
                this.showLoadingState(element);
            });
        });
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.updateLayout();
        }, 250);
    }

    /**
     * Handle window scroll
     */
    handleScroll() {
        // Add scroll-based animations or effects here
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    /**
     * Handle global clicks
     */
    handleGlobalClick(e) {
        // Close dropdowns when clicking outside
        const dropdowns = document.querySelectorAll('.dropdown.active');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    /**
     * Update layout based on screen size
     */
    updateLayout() {
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile', isMobile);
        
        // Update sidebar visibility
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.display = isMobile ? 'none' : 'block';
        }
    }

    /**
     * Check user login status
     */
    checkLoginStatus() {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
            try {
                AppState.currentUser = JSON.parse(userData);
                AppState.isLoggedIn = true;
                this.updateUIForLoggedInUser();
            } catch (error) {
                console.error('Invalid user data:', error);
                this.logout();
            }
        } else {
            this.updateUIForLoggedOutUser();
        }
    }

    /**
     * Update UI for logged in user
     */
    updateUIForLoggedInUser() {
        document.body.classList.add('logged-in');
        
        // Update user avatar
        const userAvatar = document.querySelector('.user-avatar img');
        if (userAvatar && AppState.currentUser.avatar) {
            userAvatar.src = AppState.currentUser.avatar;
        }
        
        // Show authenticated content
        const authElements = document.querySelectorAll('[data-auth="required"]');
        authElements.forEach(element => {
            element.style.display = 'block';
        });
    }

    /**
     * Update UI for logged out user
     */
    updateUIForLoggedOutUser() {
        document.body.classList.remove('logged-in');
        
        // Hide authenticated content
        const authElements = document.querySelectorAll('[data-auth="required"]');
        authElements.forEach(element => {
            element.style.display = 'none';
        });
    }

    /**
     * Initialize sample data
     */
    initializeSampleData() {
        if (AppState.posts.length === 0) {
            AppState.posts = [
                {
                    id: 1,
                    user: {
                        username: 'sarah_photography',
                        avatar: 'https://via.placeholder.com/40/ef4444/ffffff?text=S',
                        location: 'New York, NY'
                    },
                    image: 'https://via.placeholder.com/600/400/ef4444/ffffff?text=Photo+1',
                    caption: 'Beautiful sunset in the city! 🌆 #photography #sunset #newyork',
                    likes: 1247,
                    comments: 89,
                    time: '2 hours ago',
                    liked: false,
                    saved: false
                },
                {
                    id: 2,
                    user: {
                        username: 'mike_travels',
                        avatar: 'https://via.placeholder.com/40/10b981/ffffff?text=M',
                        location: 'Paris, France'
                    },
                    image: 'https://via.placeholder.com/600/400/10b981/ffffff?text=Photo+2',
                    caption: 'Exploring the streets of Paris 🇫🇷 #travel #paris #adventure',
                    likes: 892,
                    comments: 45,
                    time: '5 hours ago',
                    liked: true,
                    saved: false
                }
            ];
        }
    }

    /**
     * Show loading state
     */
    showLoadingState(element = null) {
        AppState.isLoading = true;
        document.body.classList.add('loading');
        
        if (element) {
            element.classList.add('loading');
            element.disabled = true;
        }
    }

    /**
     * Hide loading state
     */
    hideLoadingState(element = null) {
        AppState.isLoading = false;
        document.body.classList.remove('loading');
        
        if (element) {
            element.classList.remove('loading');
            element.disabled = false;
        }
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        if (this.modules.ui && this.modules.ui.showNotification) {
            this.modules.ui.showNotification(message, type);
        }
    }

    /**
     * Navigate to different pages
     */
    navigateTo(page) {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage !== page) {
            window.location.href = `${page}.jsp`;
        }
    }

    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        AppState.currentUser = null;
        AppState.isLoggedIn = false;
        this.updateUIForLoggedOutUser();
        this.navigateTo('index');
    }

    /**
     * Get application state
     */
    getState() {
        return { ...AppState };
    }

    /**
     * Update application state
     */
    updateState(newState) {
        Object.assign(AppState, newState);
    }
}

// Create global app instance
const app = new PhotoShareApp();

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

// Export for module usage
export default app; 