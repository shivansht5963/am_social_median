// Global variables
let currentUser = null;
let posts = [];
let likedPosts = new Set();
let savedPosts = new Set();

// Modern animation utilities
const animations = {
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

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupEventListeners();
    setupModals();
    setupPostInteractions();
    setupProfileTabs();
    setupCommentInputs();
    setupPasswordToggle();
    setupSearch();
    setupStories();
    setupFollowButtons();
    setupThemeSystem();
    
    // Check if user is logged in
    checkLoginStatus();
}

// Setup all event listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Show signup modal
    const showSignupBtn = document.getElementById('showSignup');
    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', showSignupModal);
    }

    // Navigation buttons
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => navigateTo('home.jsp'));
    }

    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => navigateTo('profile.jsp'));
    }

    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', showUploadModal);
    }

    // Edit profile button
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', showEditProfileModal);
    }

    // Follow buttons
    const followBtns = document.querySelectorAll('.follow-btn');
    followBtns.forEach(btn => {
        btn.addEventListener('click', handleFollow);
    });

    // Switch account button
    const switchBtn = document.querySelector('.switch-btn');
    if (switchBtn) {
        switchBtn.addEventListener('click', handleSwitchAccount);
    }
}

// Setup modal functionality
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close');

    // Close modal when clicking on close button
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: block"]');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

// Setup post interactions
function setupPostInteractions() {
    // Like buttons
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', handleLike);
    });

    // Save buttons
    const saveBtns = document.querySelectorAll('.save-btn');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', handleSave);
    });

    // Post menu buttons
    const postMenus = document.querySelectorAll('.post-menu');
    postMenus.forEach(btn => {
        btn.addEventListener('click', handlePostMenu);
    });
}

// Setup profile tabs
function setupProfileTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.profile-posts-grid');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(targetTab + 'Tab').classList.remove('hidden');
        });
    });
}

// Setup comment inputs
function setupCommentInputs() {
    const commentInputs = document.querySelectorAll('.post-comment-input input');
    const commentBtns = document.querySelectorAll('.post-comment-btn');

    commentInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            const btn = commentBtns[index];
            if (this.value.trim()) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                handleComment(index);
            }
        });
    });

    commentBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => handleComment(index));
    });
}

// Setup password toggle
function setupPasswordToggle() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}

// Setup stories
function setupStories() {
    const stories = document.querySelectorAll('.story');
    stories.forEach(story => {
        story.addEventListener('click', handleStoryClick);
    });
}

// Setup follow buttons
function setupFollowButtons() {
    const followBtns = document.querySelectorAll('.follow-btn');
    followBtns.forEach(btn => {
        btn.addEventListener('click', handleFollow);
    });
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Simple validation
    if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Simulate login process
    showLoadingState();
    
    setTimeout(() => {
        // Simulate successful login
        currentUser = {
            username: username,
            name: 'Your Name',
            avatar: 'https://via.placeholder.com/32/6366f1/ffffff?text=U'
        };

        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        }

        hideLoadingState();
        showNotification('Login successful!', 'success');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'home.jsp';
        }, 1000);
    }, 1500);
}

// Handle signup
function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name') || 'New User';
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Simple validation
    if (!email || !username || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Account created successfully!', 'success');
        closeModal(document.getElementById('signupModal'));
        
        // Auto-login after signup
        setTimeout(() => {
            handleLogin(new Event('submit'));
        }, 1000);
    }, 1500);
}

// Handle like
function handleLike(e) {
    const btn = e.currentTarget;
    const postId = btn.getAttribute('data-post');
    const icon = btn.querySelector('i');
    const likesCount = btn.closest('.post').querySelector('.likes-number');

    // Add ripple effect
    animations.ripple(e);

    if (likedPosts.has(postId)) {
        // Unlike
        likedPosts.delete(postId);
        btn.classList.remove('liked');
        icon.classList.remove('fas');
        icon.classList.add('far');
        
        // Decrease like count
        const currentLikes = parseInt(likesCount.textContent.replace(',', ''));
        likesCount.textContent = (currentLikes - 1).toLocaleString();
        showNotification('Post unliked', 'info');
    } else {
        // Like
        likedPosts.add(postId);
        btn.classList.add('liked');
        icon.classList.remove('far');
        icon.classList.add('fas');
        
        // Add floating heart animation
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.cssText = `
            position: absolute;
            color: #ff4757;
            font-size: 2rem;
            pointer-events: none;
            z-index: 1000;
            animation: floatHeart 1s ease-out forwards;
        `;
        btn.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
        
        // Increase like count
        const currentLikes = parseInt(likesCount.textContent.replace(',', ''));
        likesCount.textContent = (currentLikes + 1).toLocaleString();
        showNotification('Post liked! ❤️', 'success');
    }

    // Enhanced animation
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 300);
}

// Handle save
function handleSave(e) {
    const btn = e.currentTarget;
    const postId = btn.getAttribute('data-post');
    const icon = btn.querySelector('i');

    if (savedPosts.has(postId)) {
        // Unsave
        savedPosts.delete(postId);
        btn.classList.remove('saved');
        icon.classList.remove('fas');
        icon.classList.add('far');
        showNotification('Post removed from saved', 'info');
    } else {
        // Save
        savedPosts.add(postId);
        btn.classList.add('saved');
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('Post saved to collection', 'success');
    }
}

// Handle comment
function handleComment(index) {
    const commentInput = document.querySelectorAll('.post-comment-input input')[index];
    const comment = commentInput.value.trim();
    
    if (!comment) return;

    const post = commentInput.closest('.post');
    const commentsContainer = post.querySelector('.post-comments');
    
    // Create new comment element
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `<strong>${currentUser?.username || 'you'}</strong> ${comment}`;
    
    // Add comment to container
    commentsContainer.appendChild(commentElement);
    
    // Clear input
    commentInput.value = '';
    commentInput.closest('.post-comment-input').querySelector('.post-comment-btn').classList.remove('active');
    
    // Show notification
    showNotification('Comment posted!', 'success');
}

// Handle post menu
function handlePostMenu(e) {
    const btn = e.currentTarget;
    const post = btn.closest('.post');
    
    // Create dropdown menu
    const menu = document.createElement('div');
    menu.className = 'post-menu-dropdown';
    menu.innerHTML = `
        <div class="menu-item">Report</div>
        <div class="menu-item">Copy Link</div>
        <div class="menu-item">Share to...</div>
        <div class="menu-item">Unfollow</div>
    `;
    
    // Position menu
    const rect = btn.getBoundingClientRect();
    menu.style.position = 'absolute';
    menu.style.top = rect.bottom + 'px';
    menu.style.right = '16px';
    menu.style.zIndex = '1000';
    
    // Add to post
    post.style.position = 'relative';
    post.appendChild(menu);
    
    // Remove menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function removeMenu(e) {
            if (!menu.contains(e.target) && !btn.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', removeMenu);
            }
        });
    }, 0);
}

// Handle follow
function handleFollow(e) {
    const btn = e.currentTarget;
    const isFollowing = btn.textContent === 'Following';
    
    if (isFollowing) {
        btn.textContent = 'Follow';
        btn.style.color = '#0095f6';
        showNotification('User unfollowed', 'info');
    } else {
        btn.textContent = 'Following';
        btn.style.color = '#262626';
        showNotification('User followed', 'success');
    }
}

// Handle story click
function handleStoryClick(e) {
    const story = e.currentTarget;
    const storyName = story.querySelector('span')?.textContent;
    
    if (storyName === 'Add Story') {
        showUploadModal();
    } else {
        showNotification(`Viewing ${storyName}'s story`, 'info');
        // Here you would typically show a story viewer
    }
}

// Handle search
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (query.length > 0) {
        // Simulate search results
        showNotification(`Searching for "${query}"...`, 'info');
    }
}

// Handle switch account
function handleSwitchAccount() {
    showNotification('Switch account feature coming soon!', 'info');
}

// Show signup modal
function showSignupModal() {
    const modal = document.getElementById('signupModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Show upload modal
function showUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Show edit profile modal
function showEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Close modal
function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
    }
}

// Navigate to page
function navigateTo(page) {
    window.location.href = page;
}

// Check login status
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || 'null');
    
    if (user && window.location.pathname.includes('index.jsp')) {
        // User is logged in, redirect to home
        window.location.href = 'home.jsp';
    } else if (!user && !window.location.pathname.includes('index.jsp')) {
        // User is not logged in, redirect to login
        window.location.href = 'index.jsp';
    }
    
    currentUser = user;
}

// Show loading state
function showLoadingState() {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.innerHTML = '<span class="loading-spinner"></span> Signing In...';
        loginBtn.disabled = true;
        loginBtn.style.opacity = '0.7';
    }
}

// Hide loading state
function hideLoadingState() {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.innerHTML = '<span>Sign In</span><i class="fas fa-arrow-right"></i>';
        loginBtn.disabled = false;
        loginBtn.style.opacity = '1';
        
        // Add success animation
        loginBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            loginBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Get notification color
function getNotificationColor(type) {
    const colors = {
        success: '#00c851',
        error: '#ff4444',
        warning: '#ff8800',
        info: '#0095f6'
    };
    return colors[type] || '#0095f6';
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 0.8rem;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
    }
    
    .post-menu-dropdown {
        background: white;
        border: 1px solid #dbdbdb;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        min-width: 150px;
    }
    
    .menu-item {
        padding: 12px 16px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background 0.3s ease;
    }
    
    .menu-item:hover {
        background: #fafafa;
    }
    
    .menu-item:not(:last-child) {
        border-bottom: 1px solid #dbdbdb;
    }
`;
document.head.appendChild(style);

// Initialize sample data
function initializeSampleData() {
    // Sample posts data
    posts = [
        {
            id: 1,
            user: 'sarah_photography',
            location: 'New York, NY',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
            caption: 'Beautiful sunset in the city! 🌆 #photography #sunset #newyork',
            likes: 1234,
            comments: [
                { user: 'mike_travel', text: 'Amazing shot! 📸' },
                { user: 'emma_art', text: 'Love the colors! 😍' }
            ],
            time: '2 hours ago'
        },
        {
            id: 2,
            user: 'mike_travel',
            location: 'Paris, France',
            image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=600&fit=crop',
            caption: 'Eiffel Tower magic ✨ #paris #travel #eiffeltower',
            likes: 856,
            comments: [
                { user: 'john_photographer', text: 'Stunning! 🔥' }
            ],
            time: '5 hours ago'
        },
        {
            id: 3,
            user: 'emma_art',
            location: 'Tokyo, Japan',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=600&fit=crop',
            caption: 'Cherry blossoms in full bloom! 🌸 #tokyo #cherryblossom #spring',
            likes: 2567,
            comments: [
                { user: 'sarah_photography', text: 'So beautiful! 🌸' },
                { user: 'mike_travel', text: 'Need to visit! ✈️' }
            ],
            time: '1 day ago'
        }
    ];
}

// Call initialization
initializeSampleData();

// Theme System Functions
function setupThemeSystem() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Setup theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Setup theme option buttons
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            setTheme(theme);
            updateThemeOptions(theme);
        });
    });
    
    // Setup settings panel
    setupSettingsPanel();
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeOptions(theme);
    
    // Show notification
    const themeName = theme === 'dark' ? 'Dark' : 'Light';
    showNotification(`${themeName} theme applied!`, 'success');
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function updateThemeOptions(activeTheme) {
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        if (option.dataset.theme === activeTheme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function setupSettingsPanel() {
    const settingsBtn = document.querySelector('.settings-btn');
    const settingsBtnHome = document.getElementById('settingsBtn');
    const settingsPanel = document.getElementById('settingsPanel');
    const settingsOverlay = document.getElementById('settingsOverlay');
    const settingsClose = document.getElementById('settingsClose');
    
    // Handle settings button in profile page
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsPanel.classList.add('open');
            settingsOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Handle settings button in home page
    if (settingsBtnHome) {
        settingsBtnHome.addEventListener('click', () => {
            settingsPanel.classList.add('open');
            settingsOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (settingsClose) {
        settingsClose.addEventListener('click', closeSettingsPanel);
    }
    
    if (settingsOverlay) {
        settingsOverlay.addEventListener('click', closeSettingsPanel);
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSettingsPanel();
        }
    });
}

function closeSettingsPanel() {
    const settingsPanel = document.getElementById('settingsPanel');
    const settingsOverlay = document.getElementById('settingsOverlay');
    
    if (settingsPanel) {
        settingsPanel.classList.remove('open');
    }
    if (settingsOverlay) {
        settingsOverlay.classList.remove('open');
    }
    document.body.style.overflow = '';
} 