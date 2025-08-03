/**
 * PhotoShare - Utils Module
 * Contains utility functions, helpers, and common functionality
 */

class UtilsModule {
    constructor() {
        this.debounceTimers = new Map();
        this.throttleTimers = new Map();
    }

    /**
     * Initialize the utils module
     */
    async init() {
        console.log('🔧 Initializing Utils Module...');
        
        // Setup utility functions
        this.setupUtilityFunctions();
        
        console.log('✅ Utils Module initialized');
    }

    /**
     * Setup utility functions
     */
    setupUtilityFunctions() {
        // Add utility methods to global scope for easy access
        window.utils = {
            debounce: this.debounce.bind(this),
            throttle: this.throttle.bind(this),
            formatNumber: this.formatNumber.bind(this),
            formatDate: this.formatDate.bind(this),
            generateId: this.generateId.bind(this),
            validateEmail: this.validateEmail.bind(this),
            copyToClipboard: this.copyToClipboard.bind(this),
            downloadFile: this.downloadFile.bind(this),
            getRandomColor: this.getRandomColor.bind(this),
            getRandomGradient: this.getRandomGradient.bind(this)
        };
    }

    /**
     * Debounce function execution
     */
    debounce(func, delay, key = 'default') {
        return (...args) => {
            clearTimeout(this.debounceTimers.get(key));
            this.debounceTimers.set(key, setTimeout(() => {
                func.apply(this, args);
                this.debounceTimers.delete(key);
            }, delay));
        };
    }

    /**
     * Throttle function execution
     */
    throttle(func, delay, key = 'default') {
        return (...args) => {
            if (!this.throttleTimers.has(key)) {
                func.apply(this, args);
                this.throttleTimers.set(key, setTimeout(() => {
                    this.throttleTimers.delete(key);
                }, delay));
            }
        };
    }

    /**
     * Format number with appropriate suffix
     */
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    /**
     * Format date to relative time
     */
    formatDate(date) {
        const now = new Date();
        const diff = now - new Date(date);
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) {
            return years === 1 ? '1 year ago' : `${years} years ago`;
        } else if (months > 0) {
            return months === 1 ? '1 month ago' : `${months} months ago`;
        } else if (weeks > 0) {
            return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
        } else if (days > 0) {
            return days === 1 ? '1 day ago' : `${days} days ago`;
        } else if (hours > 0) {
            return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
        } else if (minutes > 0) {
            return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
        } else {
            return 'Just now';
        }
    }

    /**
     * Generate unique ID
     */
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Validate email format
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Copy text to clipboard
     */
    async copyToClipboard(text) {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            }
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            return false;
        }
    }

    /**
     * Download file
     */
    downloadFile(url, filename) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Get random color
     */
    getRandomColor() {
        const colors = [
            '#ef4444', '#f97316', '#f59e0b', '#eab308',
            '#84cc16', '#22c55e', '#10b981', '#14b8a6',
            '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
            '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * Get random gradient
     */
    getRandomGradient() {
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(45deg, #ff6b6b, #ee5a24)',
            'linear-gradient(45deg, #00d2ff, #3a7bd5)',
            'linear-gradient(45deg, #56ab2f, #a8e6cf)',
            'linear-gradient(45deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(45deg, #ffecd2, #fcb69f)',
            'linear-gradient(45deg, #a8edea, #fed6e3)'
        ];
        return gradients[Math.floor(Math.random() * gradients.length)];
    }

    /**
     * Get file extension from filename
     */
    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    }

    /**
     * Check if file is image
     */
    isImageFile(filename) {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
        const extension = this.getFileExtension(filename).toLowerCase();
        return imageExtensions.includes(extension);
    }

    /**
     * Check if file is video
     */
    isVideoFile(filename) {
        const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'];
        const extension = this.getFileExtension(filename).toLowerCase();
        return videoExtensions.includes(extension);
    }

    /**
     * Format file size
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Get device type
     */
    getDeviceType() {
        const userAgent = navigator.userAgent;
        
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
            return 'mobile';
        } else if (/iPad/i.test(userAgent)) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }

    /**
     * Check if device is mobile
     */
    isMobile() {
        return this.getDeviceType() === 'mobile';
    }

    /**
     * Check if device is tablet
     */
    isTablet() {
        return this.getDeviceType() === 'tablet';
    }

    /**
     * Check if device is desktop
     */
    isDesktop() {
        return this.getDeviceType() === 'desktop';
    }

    /**
     * Get screen dimensions
     */
    getScreenDimensions() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio || 1
        };
    }

    /**
     * Check if element is in viewport
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Scroll to element smoothly
     */
    scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Scroll to top smoothly
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Get URL parameters
     */
    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    }

    /**
     * Set URL parameter
     */
    setUrlParam(key, value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    }

    /**
     * Remove URL parameter
     */
    removeUrlParam(key) {
        const url = new URL(window.location);
        url.searchParams.delete(key);
        window.history.pushState({}, '', url);
    }

    /**
     * Get local storage with fallback
     */
    getLocalStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    }

    /**
     * Set local storage with error handling
     */
    setLocalStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    }

    /**
     * Remove from local storage
     */
    removeLocalStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }

    /**
     * Clear all local storage
     */
    clearLocalStorage() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }

    /**
     * Get session storage with fallback
     */
    getSessionStorage(key, defaultValue = null) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from sessionStorage:', error);
            return defaultValue;
        }
    }

    /**
     * Set session storage with error handling
     */
    setSessionStorage(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to sessionStorage:', error);
            return false;
        }
    }

    /**
     * Remove from session storage
     */
    removeSessionStorage(key) {
        try {
            sessionStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from sessionStorage:', error);
            return false;
        }
    }

    /**
     * Clear all session storage
     */
    clearSessionStorage() {
        try {
            sessionStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing sessionStorage:', error);
            return false;
        }
    }

    /**
     * Generate random string
     */
    generateRandomString(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Generate random number between min and max
     */
    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Shuffle array
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Deep clone object
     */
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    }

    /**
     * Merge objects deeply
     */
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key] instanceof Object && key in target) {
                    result[key] = this.deepMerge(target[key], source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }
        
        return result;
    }

    /**
     * Check if object is empty
     */
    isEmpty(obj) {
        if (obj == null) return true;
        if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
        if (obj instanceof Map || obj instanceof Set) return obj.size === 0;
        if (typeof obj === 'object') return Object.keys(obj).length === 0;
        return false;
    }

    /**
     * Get object size
     */
    getObjectSize(obj) {
        if (obj == null) return 0;
        if (Array.isArray(obj) || typeof obj === 'string') return obj.length;
        if (obj instanceof Map || obj instanceof Set) return obj.size;
        if (typeof obj === 'object') return Object.keys(obj).length;
        return 0;
    }

    /**
     * Capitalize first letter
     */
    capitalize(str) {
        if (typeof str !== 'string') return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Convert to camel case
     */
    toCamelCase(str) {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    /**
     * Convert to kebab case
     */
    toKebabCase(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    /**
     * Convert to snake case
     */
    toSnakeCase(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }

    /**
     * Truncate text
     */
    truncateText(text, maxLength, suffix = '...') {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - suffix.length) + suffix;
    }

    /**
     * Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Unescape HTML
     */
    unescapeHtml(text) {
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.textContent;
    }

    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
        if (performance && performance.getEntriesByType) {
            const navigation = performance.getEntriesByType('navigation')[0];
            const paint = performance.getEntriesByType('paint');
            
            return {
                loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
                domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
                firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
                firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
            };
        }
        return null;
    }

    /**
     * Get memory usage (if available)
     */
    getMemoryUsage() {
        if (performance && performance.memory) {
            return {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            };
        }
        return null;
    }

    /**
     * Get network information (if available)
     */
    getNetworkInfo() {
        if (navigator.connection) {
            return {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt,
                saveData: navigator.connection.saveData
            };
        }
        return null;
    }
}

// Create and export utils module instance
const utilsModule = new UtilsModule();
export default utilsModule; 