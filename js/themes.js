/**
 * PhotoShare - Themes Module
 * Handles theme switching, settings panel, and theme persistence
 */

class ThemesModule {
    constructor() {
        this.currentTheme = 'light';
        this.availableThemes = ['light', 'dark'];
        this.settingsPanel = null;
        this.settingsOverlay = null;
    }

    /**
     * Initialize the themes module
     */
    async init() {
        console.log('🎨 Initializing Themes Module...');
        
        // Load saved theme
        this.loadSavedTheme();
        
        // Setup theme event listeners
        this.setupThemeEventListeners();
        
        // Setup settings panel
        this.setupSettingsPanel();
        
        console.log('✅ Themes Module initialized');
    }

    /**
     * Load saved theme from localStorage
     */
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && this.availableThemes.includes(savedTheme)) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.currentTheme = prefersDark ? 'dark' : 'light';
        }
        
        this.applyTheme(this.currentTheme);
    }

    /**
     * Setup theme event listeners
     */
    setupThemeEventListeners() {
        // Theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Theme option buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-option')) {
                const themeOption = e.target.closest('.theme-option');
                const theme = themeOption.dataset.theme;
                if (theme && this.availableThemes.includes(theme)) {
                    this.setTheme(theme);
                }
            }
        });

        // Settings button
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.openSettingsPanel());
        }

        // Settings close button
        const settingsClose = document.getElementById('settingsClose');
        if (settingsClose) {
            settingsClose.addEventListener('click', () => this.closeSettingsPanel());
        }

        // Settings overlay click
        const settingsOverlay = document.getElementById('settingsOverlay');
        if (settingsOverlay) {
            settingsOverlay.addEventListener('click', () => this.closeSettingsPanel());
        }

        // Escape key to close settings
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSettingsPanel();
            }
        });

        // System theme change detection
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                // Only auto-switch if user hasn't manually set a theme
                const newTheme = e.matches ? 'dark' : 'light';
                this.setTheme(newTheme);
            }
        });
    }

    /**
     * Setup settings panel
     */
    setupSettingsPanel() {
        this.settingsPanel = document.getElementById('settingsPanel');
        this.settingsOverlay = document.getElementById('settingsOverlay');
        
        if (this.settingsPanel) {
            // Initialize theme options
            this.updateThemeOptions();
        }
    }

    /**
     * Set theme
     */
    setTheme(theme) {
        if (!this.availableThemes.includes(theme)) {
            console.error('Invalid theme:', theme);
            return;
        }

        // Remove previous theme
        document.documentElement.removeAttribute('data-theme');
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Update theme options UI
        this.updateThemeOptions();
        
        // Update theme toggle button
        this.updateThemeToggle();
        
        // Show notification
        this.showThemeNotification(theme);
        
        console.log(`🎨 Theme changed to: ${theme}`);
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    /**
     * Apply theme to document
     */
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.updateThemeOptions();
        this.updateThemeToggle();
    }

    /**
     * Update theme options in settings panel
     */
    updateThemeOptions() {
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            const theme = option.dataset.theme;
            if (theme === this.currentTheme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    /**
     * Update theme toggle button
     */
    updateThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            // The toggle button appearance is handled by CSS
            // based on the data-theme attribute
        }
    }

    /**
     * Open settings panel
     */
    openSettingsPanel() {
        if (this.settingsPanel && this.settingsOverlay) {
            this.settingsPanel.classList.add('open');
            this.settingsOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            const firstFocusable = this.settingsPanel.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    }

    /**
     * Close settings panel
     */
    closeSettingsPanel() {
        if (this.settingsPanel && this.settingsOverlay) {
            this.settingsPanel.classList.remove('open');
            this.settingsOverlay.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Show theme change notification
     */
    showThemeNotification(theme) {
        const themeNames = {
            light: 'Light Theme',
            dark: 'Dark Theme'
        };
        
        const message = `Switched to ${themeNames[theme]}`;
        this.showNotification(message, 'success', 2000);
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info', duration = 3000) {
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
        }, duration);
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
     * Get current theme
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Get available themes
     */
    getAvailableThemes() {
        return [...this.availableThemes];
    }

    /**
     * Check if theme is dark
     */
    isDarkTheme() {
        return this.currentTheme === 'dark';
    }

    /**
     * Check if theme is light
     */
    isLightTheme() {
        return this.currentTheme === 'light';
    }

    /**
     * Get theme preference from system
     */
    getSystemThemePreference() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    /**
     * Reset theme to system preference
     */
    resetToSystemTheme() {
        const systemTheme = this.getSystemThemePreference();
        this.setTheme(systemTheme);
        localStorage.removeItem('theme'); // Remove manual override
    }

    /**
     * Add custom theme
     */
    addCustomTheme(themeName, themeData) {
        if (!this.availableThemes.includes(themeName)) {
            this.availableThemes.push(themeName);
            
            // Add CSS variables for the new theme
            this.addThemeCSSVariables(themeName, themeData);
            
            console.log(`🎨 Custom theme "${themeName}" added`);
            return true;
        }
        return false;
    }

    /**
     * Add CSS variables for custom theme
     */
    addThemeCSSVariables(themeName, themeData) {
        const style = document.createElement('style');
        style.textContent = `
            [data-theme="${themeName}"] {
                --primary-gradient: ${themeData.primaryGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
                --secondary-gradient: ${themeData.secondaryGradient || 'linear-gradient(45deg, #ff6b6b, #ee5a24)'};
                --accent-gradient: ${themeData.accentGradient || 'linear-gradient(45deg, #00d2ff, #3a7bd5)'};
                --primary-color: ${themeData.primaryColor || '#1877f2'};
                --secondary-color: ${themeData.secondaryColor || '#42a5f5'};
                --accent-color: ${themeData.accentColor || '#e91e63'};
                --bg-primary: ${themeData.bgPrimary || '#ffffff'};
                --bg-secondary: ${themeData.bgSecondary || '#f8f9fa'};
                --bg-tertiary: ${themeData.bgTertiary || '#f1f3f4'};
                --text-primary: ${themeData.textPrimary || '#262626'};
                --text-secondary: ${themeData.textSecondary || '#65676b'};
                --text-tertiary: ${themeData.textTertiary || '#8e8e93'};
                --border-primary: ${themeData.borderPrimary || '#dbdbdb'};
                --border-secondary: ${themeData.borderSecondary || '#e4e6eb'};
                --shadow-light: ${themeData.shadowLight || '0 8px 32px rgba(0, 0, 0, 0.1)'};
                --shadow-medium: ${themeData.shadowMedium || '0 12px 40px rgba(0, 0, 0, 0.15)'};
                --shadow-heavy: ${themeData.shadowHeavy || '0 20px 60px rgba(0, 0, 0, 0.2)'};
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Get theme data for export
     */
    exportThemeData() {
        return {
            currentTheme: this.currentTheme,
            availableThemes: this.availableThemes,
            systemPreference: this.getSystemThemePreference(),
            savedTheme: localStorage.getItem('theme')
        };
    }

    /**
     * Import theme data
     */
    importThemeData(data) {
        if (data.currentTheme && this.availableThemes.includes(data.currentTheme)) {
            this.setTheme(data.currentTheme);
        }
        
        if (data.availableThemes && Array.isArray(data.availableThemes)) {
            this.availableThemes = [...new Set([...this.availableThemes, ...data.availableThemes])];
        }
    }

    /**
     * Get theme statistics
     */
    getThemeStats() {
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = this.getSystemThemePreference();
        
        return {
            currentTheme: this.currentTheme,
            savedTheme: savedTheme,
            systemTheme: systemTheme,
            isUsingSystemTheme: !savedTheme,
            isUsingCustomTheme: savedTheme && savedTheme !== systemTheme
        };
    }
}

// Create and export themes module instance
const themesModule = new ThemesModule();
export default themesModule; 