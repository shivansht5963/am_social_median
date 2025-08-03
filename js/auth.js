/**
 * PhotoShare - Authentication Module
 * Handles user authentication, login, signup, and session management
 */

class AuthModule {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.authToken = null;
    }

    /**
     * Initialize the authentication module
     */
    async init() {
        console.log('🔐 Initializing Authentication Module...');
        
        // Check for existing session
        this.checkExistingSession();
        
        // Setup authentication event listeners
        this.setupAuthEventListeners();
        
        console.log('✅ Authentication Module initialized');
    }

    /**
     * Check for existing authentication session
     */
    checkExistingSession() {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.authToken = token;
                this.isAuthenticated = true;
                this.updateAuthUI();
                console.log('👤 User session restored:', this.currentUser.username);
            } catch (error) {
                console.error('❌ Invalid session data:', error);
                this.clearSession();
            }
        }
    }

    /**
     * Setup authentication event listeners
     */
    setupAuthEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }

        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', this.handleSignup.bind(this));
        }

        // Social login buttons
        const socialButtons = document.querySelectorAll('.social-btn');
        socialButtons.forEach(button => {
            button.addEventListener('click', this.handleSocialLogin.bind(this));
        });

        // Logout functionality
        const logoutButtons = document.querySelectorAll('[data-action="logout"]');
        logoutButtons.forEach(button => {
            button.addEventListener('click', this.handleLogout.bind(this));
        });
    }

    /**
     * Handle user login
     */
    async handleLogin(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const rememberMe = formData.get('rememberMe') === 'on';

        try {
            // Show loading state
            this.showLoadingState(form);
            
            // Validate input
            if (!this.validateLoginInput(email, password)) {
                return;
            }

            // Simulate API call
            const response = await this.loginUser(email, password);
            
            if (response.success) {
                // Store session data
                this.createSession(response.user, response.token, rememberMe);
                
                // Update UI
                this.updateAuthUI();
                
                // Show success message
                this.showNotification('Login successful! Welcome back.', 'success');
                
                // Redirect to home page
                setTimeout(() => {
                    window.location.href = 'home.jsp';
                }, 1000);
                
            } else {
                this.showNotification(response.message || 'Login failed. Please try again.', 'error');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            this.showNotification('An error occurred during login. Please try again.', 'error');
        } finally {
            this.hideLoadingState(form);
        }
    }

    /**
     * Handle user signup
     */
    async handleSignup(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        try {
            // Show loading state
            this.showLoadingState(form);
            
            // Validate input
            if (!this.validateSignupInput(username, email, password, confirmPassword)) {
                return;
            }

            // Simulate API call
            const response = await this.signupUser(username, email, password);
            
            if (response.success) {
                // Store session data
                this.createSession(response.user, response.token, false);
                
                // Update UI
                this.updateAuthUI();
                
                // Show success message
                this.showNotification('Account created successfully! Welcome to PhotoShare.', 'success');
                
                // Close signup modal and redirect
                this.closeSignupModal();
                setTimeout(() => {
                    window.location.href = 'home.jsp';
                }, 1000);
                
            } else {
                this.showNotification(response.message || 'Signup failed. Please try again.', 'error');
            }
            
        } catch (error) {
            console.error('Signup error:', error);
            this.showNotification('An error occurred during signup. Please try again.', 'error');
        } finally {
            this.hideLoadingState(form);
        }
    }

    /**
     * Handle social login
     */
    async handleSocialLogin(event) {
        event.preventDefault();
        
        const button = event.currentTarget;
        const provider = button.dataset.provider || 'google';
        
        try {
            this.showLoadingState(button);
            
            // Simulate social login
            const response = await this.socialLogin(provider);
            
            if (response.success) {
                this.createSession(response.user, response.token, false);
                this.updateAuthUI();
                this.showNotification(`Logged in with ${provider}!`, 'success');
                
                setTimeout(() => {
                    window.location.href = 'home.jsp';
                }, 1000);
            } else {
                this.showNotification(`Failed to login with ${provider}.`, 'error');
            }
            
        } catch (error) {
            console.error('Social login error:', error);
            this.showNotification('Social login failed. Please try again.', 'error');
        } finally {
            this.hideLoadingState(button);
        }
    }

    /**
     * Handle user logout
     */
    handleLogout(event) {
        event.preventDefault();
        
        try {
            this.clearSession();
            this.updateAuthUI();
            this.showNotification('Logged out successfully.', 'success');
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'index.jsp';
            }, 1000);
            
        } catch (error) {
            console.error('Logout error:', error);
            this.showNotification('Logout failed. Please try again.', 'error');
        }
    }

    /**
     * Validate login input
     */
    validateLoginInput(email, password) {
        if (!email || !email.trim()) {
            this.showNotification('Please enter your email address.', 'error');
            return false;
        }
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!password || password.length < 6) {
            this.showNotification('Password must be at least 6 characters long.', 'error');
            return false;
        }
        
        return true;
    }

    /**
     * Validate signup input
     */
    validateSignupInput(username, email, password, confirmPassword) {
        if (!username || username.trim().length < 3) {
            this.showNotification('Username must be at least 3 characters long.', 'error');
            return false;
        }
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!password || password.length < 8) {
            this.showNotification('Password must be at least 8 characters long.', 'error');
            return false;
        }
        
        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match.', 'error');
            return false;
        }
        
        return true;
    }

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Simulate login API call
     */
    async loginUser(email, password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock validation
        if (email === 'demo@example.com' && password === 'password123') {
            return {
                success: true,
                user: {
                    id: 1,
                    username: 'demo_user',
                    email: email,
                    avatar: 'https://via.placeholder.com/150/6366f1/ffffff?text=D',
                    fullName: 'Demo User',
                    bio: 'Welcome to PhotoShare!'
                },
                token: 'mock-jwt-token-' + Date.now()
            };
        } else {
            return {
                success: false,
                message: 'Invalid email or password.'
            };
        }
    }

    /**
     * Simulate signup API call
     */
    async signupUser(username, email, password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock signup
        return {
            success: true,
            user: {
                id: Date.now(),
                username: username,
                email: email,
                avatar: 'https://via.placeholder.com/150/6366f1/ffffff?text=' + username.charAt(0).toUpperCase(),
                fullName: username,
                bio: 'New PhotoShare user'
            },
            token: 'mock-jwt-token-' + Date.now()
        };
    }

    /**
     * Simulate social login API call
     */
    async socialLogin(provider) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            success: true,
            user: {
                id: Date.now(),
                username: `${provider}_user_${Math.floor(Math.random() * 1000)}`,
                email: `${provider}@example.com`,
                avatar: `https://via.placeholder.com/150/6366f1/ffffff?text=${provider.charAt(0).toUpperCase()}`,
                fullName: `${provider} User`,
                bio: `Signed up with ${provider}`
            },
            token: `mock-${provider}-token-${Date.now()}`
        };
    }

    /**
     * Create user session
     */
    createSession(user, token, rememberMe = false) {
        this.currentUser = user;
        this.authToken = token;
        this.isAuthenticated = true;
        
        // Store in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(user));
        
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        console.log('🔐 Session created for user:', user.username);
    }

    /**
     * Clear user session
     */
    clearSession() {
        this.currentUser = null;
        this.authToken = null;
        this.isAuthenticated = false;
        
        // Clear localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('rememberMe');
        
        console.log('🔐 Session cleared');
    }

    /**
     * Update authentication UI
     */
    updateAuthUI() {
        if (this.isAuthenticated) {
            // Show authenticated content
            document.body.classList.add('authenticated');
            document.body.classList.remove('unauthenticated');
            
            // Update user avatar
            const userAvatars = document.querySelectorAll('.user-avatar img');
            userAvatars.forEach(avatar => {
                if (this.currentUser.avatar) {
                    avatar.src = this.currentUser.avatar;
                    avatar.alt = this.currentUser.username;
                }
            });
            
            // Update username displays
            const usernameDisplays = document.querySelectorAll('.username-display');
            usernameDisplays.forEach(display => {
                display.textContent = this.currentUser.username;
            });
            
            // Show/hide auth-dependent elements
            const authElements = document.querySelectorAll('[data-auth="required"]');
            authElements.forEach(element => {
                element.style.display = 'block';
            });
            
            const unauthElements = document.querySelectorAll('[data-auth="unauthorized"]');
            unauthElements.forEach(element => {
                element.style.display = 'none';
            });
            
        } else {
            // Show unauthenticated content
            document.body.classList.add('unauthenticated');
            document.body.classList.remove('authenticated');
            
            // Hide auth-dependent elements
            const authElements = document.querySelectorAll('[data-auth="required"]');
            authElements.forEach(element => {
                element.style.display = 'none';
            });
            
            const unauthElements = document.querySelectorAll('[data-auth="unauthorized"]');
            unauthElements.forEach(element => {
                element.style.display = 'block';
            });
        }
    }

    /**
     * Show signup modal
     */
    showSignupModal() {
        const modal = document.getElementById('signupModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Close signup modal
     */
    closeSignupModal() {
        const modal = document.getElementById('signupModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Close modal
     */
    closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Show loading state
     */
    showLoadingState(element) {
        if (element) {
            element.classList.add('loading');
            const submitBtn = element.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Loading...';
            }
        }
    }

    /**
     * Hide loading state
     */
    hideLoadingState(element) {
        if (element) {
            element.classList.remove('loading');
            const submitBtn = element.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
            }
        }
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Create notification element
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
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
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
     * Get current user
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Check if user is authenticated
     */
    isUserAuthenticated() {
        return this.isAuthenticated;
    }

    /**
     * Get auth token
     */
    getAuthToken() {
        return this.authToken;
    }

    /**
     * Require authentication
     */
    requireAuth(redirectTo = 'index.jsp') {
        if (!this.isAuthenticated) {
            window.location.href = redirectTo;
            return false;
        }
        return true;
    }
}

// Create and export auth module instance
const authModule = new AuthModule();
export default authModule; 