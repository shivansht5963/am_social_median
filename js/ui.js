/**
 * PhotoShare - UI Module
 * Handles UI components, notifications, modals, and animations
 */

class UIModule {
    constructor() {
        this.notifications = [];
        this.activeModals = new Set();
        this.animations = new Map();
    }

    /**
     * Initialize the UI module
     */
    async init() {
        console.log('🎨 Initializing UI Module...');
        
        // Setup UI event listeners
        this.setupUIEventListeners();
        
        // Initialize UI components
        this.initializeUIComponents();
        
        console.log('✅ UI Module initialized');
    }

    /**
     * Setup UI event listeners
     */
    setupUIEventListeners() {
        // Modal close buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close') || e.target.classList.contains('modal-close')) {
                this.closeModal(e.target.closest('.modal'));
            }
        });

        // Modal overlay clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Password toggle
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('password-toggle')) {
                this.togglePasswordVisibility(e);
            }
        });

        // Search functionality
        const searchInput = document.querySelector('.search-container input');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
        }

        // Profile tabs
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                this.switchProfileTab(e.target);
            }
        });

        // Follow buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('follow-btn')) {
                this.handleFollow(e);
            }
        });

        // Story clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.story')) {
                this.handleStoryClick(e);
            }
        });
    }

    /**
     * Initialize UI components
     */
    initializeUIComponents() {
        // Add ripple effect to buttons
        this.addRippleEffect();
        
        // Initialize loading states
        this.initializeLoadingStates();
        
        // Initialize tooltips
        this.initializeTooltips();
        
        // Initialize scroll animations
        this.initializeScrollAnimations();
    }

    /**
     * Add ripple effect to buttons
     */
    addRippleEffect() {
        const buttons = document.querySelectorAll('.btn-modern, .nav-btn, .action-btn, .social-btn');
        buttons.forEach(button => {
            button.addEventListener('click', this.createRippleEffect.bind(this));
        });
    }

    /**
     * Create ripple effect
     */
    createRippleEffect(event) {
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
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    /**
     * Initialize loading states
     */
    initializeLoadingStates() {
        const loadingElements = document.querySelectorAll('[data-loading]');
        loadingElements.forEach(element => {
            element.addEventListener('click', () => {
                this.showLoadingState(element);
            });
        });
    }

    /**
     * Initialize tooltips
     */
    initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip.bind(this));
            element.addEventListener('mouseleave', this.hideTooltip.bind(this));
        });
    }

    /**
     * Initialize scroll animations
     */
    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info', duration = 5000) {
        const notification = this.createNotificationElement(message, type);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Store notification reference
        this.notifications.push(notification);
        
        // Remove notification after duration
        setTimeout(() => {
            this.removeNotification(notification);
        }, duration);
        
        return notification;
    }

    /**
     * Create notification element
     */
    createNotificationElement(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-icon">
                    <i class="fas ${this.getNotificationIcon(type)}"></i>
                </div>
                <div class="notification-title">${this.getNotificationTitle(type)}</div>
            </div>
            <div class="notification-message">${message}</div>
        `;
        
        return notification;
    }

    /**
     * Remove notification
     */
    removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }, 300);
    }

    /**
     * Get notification icon
     */
    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check',
            error: 'fa-exclamation-triangle',
            warning: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    /**
     * Get notification title
     */
    getNotificationTitle(type) {
        const titles = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Information'
        };
        return titles[type] || titles.info;
    }

    /**
     * Show modal
     */
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.activeModals.add(modal);
            
            // Add animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
    }

    /**
     * Close modal
     */
    closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                this.activeModals.delete(modal);
            }, 300);
        }
    }

    /**
     * Close all modals
     */
    closeAllModals() {
        this.activeModals.forEach(modal => {
            this.closeModal(modal);
        });
    }

    /**
     * Toggle password visibility
     */
    togglePasswordVisibility(event) {
        const toggle = event.target;
        const input = toggle.previousElementSibling;
        
        if (input.type === 'password') {
            input.type = 'text';
            toggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            input.type = 'password';
            toggle.innerHTML = '<i class="fas fa-eye"></i>';
        }
    }

    /**
     * Handle search
     */
    handleSearch(event) {
        const query = event.target.value.toLowerCase();
        const searchResults = this.performSearch(query);
        this.displaySearchResults(searchResults);
    }

    /**
     * Perform search
     */
    performSearch(query) {
        if (!query) return [];
        
        // Mock search results
        const mockResults = [
            { type: 'user', name: 'sarah_photography', avatar: 'https://via.placeholder.com/32/ef4444/ffffff?text=S' },
            { type: 'user', name: 'mike_travels', avatar: 'https://via.placeholder.com/32/10b981/ffffff?text=M' },
            { type: 'hashtag', name: '#photography' },
            { type: 'hashtag', name: '#travel' },
            { type: 'location', name: 'New York, NY' }
        ];
        
        return mockResults.filter(result => 
            result.name.toLowerCase().includes(query)
        );
    }

    /**
     * Display search results
     */
    displaySearchResults(results) {
        const searchContainer = document.querySelector('.search-container');
        let dropdown = searchContainer.querySelector('.search-dropdown');
        
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.className = 'search-dropdown';
            searchContainer.appendChild(dropdown);
        }
        
        if (results.length === 0) {
            dropdown.style.display = 'none';
            return;
        }
        
        dropdown.innerHTML = results.map(result => `
            <div class="search-result" data-type="${result.type}">
                <img src="${result.avatar || 'https://via.placeholder.com/32/6366f1/ffffff?text=#'}" alt="${result.name}">
                <span>${result.name}</span>
            </div>
        `).join('');
        
        dropdown.style.display = 'block';
    }

    /**
     * Switch profile tab
     */
    switchProfileTab(tabButton) {
        const tabName = tabButton.dataset.tab;
        const tabContent = document.querySelector(`[data-tab-content="${tabName}"]`);
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        tabButton.classList.add('active');
        
        // Show active content
        document.querySelectorAll('[data-tab-content]').forEach(content => {
            content.style.display = 'none';
        });
        if (tabContent) {
            tabContent.style.display = 'block';
        }
    }

    /**
     * Handle follow button
     */
    async handleFollow(event) {
        event.preventDefault();
        
        const followBtn = event.target;
        const isFollowing = followBtn.classList.contains('following');
        
        try {
            // Show loading state
            followBtn.disabled = true;
            followBtn.textContent = isFollowing ? 'Unfollowing...' : 'Following...';
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update button state
            if (isFollowing) {
                followBtn.classList.remove('following');
                followBtn.textContent = 'Follow';
                this.showNotification('Unfollowed successfully', 'success');
            } else {
                followBtn.classList.add('following');
                followBtn.textContent = 'Following';
                this.showNotification('Followed successfully', 'success');
            }
            
        } catch (error) {
            console.error('Follow error:', error);
            this.showNotification('Failed to update follow status', 'error');
        } finally {
            followBtn.disabled = false;
        }
    }

    /**
     * Handle story click
     */
    handleStoryClick(event) {
        const story = event.target.closest('.story');
        const storyId = story.dataset.storyId;
        
        // Add viewed class
        story.classList.add('viewed');
        
        // Show story modal (mock)
        this.showNotification('Story feature coming soon!', 'info');
    }

    /**
     * Show tooltip
     */
    showTooltip(event) {
        const element = event.target;
        const tooltipText = element.dataset.tooltip;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        
        element.tooltip = tooltip;
    }

    /**
     * Hide tooltip
     */
    hideTooltip(event) {
        const element = event.target;
        if (element.tooltip) {
            element.tooltip.remove();
            element.tooltip = null;
        }
    }

    /**
     * Show loading state
     */
    showLoadingState(element) {
        element.classList.add('loading');
        element.disabled = true;
        
        // Add loading spinner
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        element.appendChild(spinner);
        
        element.loadingSpinner = spinner;
    }

    /**
     * Hide loading state
     */
    hideLoadingState(element) {
        element.classList.remove('loading');
        element.disabled = false;
        
        if (element.loadingSpinner) {
            element.loadingSpinner.remove();
            element.loadingSpinner = null;
        }
    }

    /**
     * Animate element
     */
    animateElement(element, animation, duration = 300) {
        return new Promise((resolve) => {
            element.style.animation = `${animation} ${duration}ms ease-out`;
            
            setTimeout(() => {
                element.style.animation = '';
                resolve();
            }, duration);
        });
    }

    /**
     * Fade in element
     */
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 10);
    }

    /**
     * Slide in element
     */
    slideIn(element, direction = 'right', duration = 300) {
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
    }

    /**
     * Scale in element
     */
    scaleIn(element, duration = 300) {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 10);
    }

    /**
     * Show upload modal
     */
    showUploadModal() {
        this.showModal('uploadModal');
    }

    /**
     * Show edit profile modal
     */
    showEditProfileModal() {
        this.showModal('editProfileModal');
    }

    /**
     * Update UI for mobile
     */
    updateMobileUI() {
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile', isMobile);
        
        // Update sidebar visibility
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.display = isMobile ? 'none' : 'block';
        }
    }

    /**
     * Get active modals count
     */
    getActiveModalsCount() {
        return this.activeModals.size;
    }

    /**
     * Get notifications count
     */
    getNotificationsCount() {
        return this.notifications.length;
    }
}

// Create and export UI module instance
const uiModule = new UIModule();
export default uiModule; 