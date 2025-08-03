/**
 * PhotoShare - Posts Module
 * Handles post interactions, likes, comments, and feed management
 */

class PostsModule {
    constructor() {
        this.posts = [];
        this.likedPosts = new Set();
        this.savedPosts = new Set();
        this.currentPostIndex = 0;
    }

    /**
     * Initialize the posts module
     */
    async init() {
        console.log('📸 Initializing Posts Module...');
        
        // Load posts data
        await this.loadPosts();
        
        // Setup post event listeners
        this.setupPostEventListeners();
        
        // Initialize post interactions
        this.initializePostInteractions();
        
        console.log('✅ Posts Module initialized');
    }

    /**
     * Load posts data
     */
    async loadPosts() {
        try {
            // Load from localStorage or use default data
            const savedPosts = localStorage.getItem('posts');
            const savedLikedPosts = localStorage.getItem('likedPosts');
            const savedSavedPosts = localStorage.getItem('savedPosts');
            
            if (savedPosts) {
                this.posts = JSON.parse(savedPosts);
            } else {
                this.posts = this.getDefaultPosts();
            }
            
            if (savedLikedPosts) {
                this.likedPosts = new Set(JSON.parse(savedLikedPosts));
            }
            
            if (savedSavedPosts) {
                this.savedPosts = new Set(JSON.parse(savedSavedPosts));
            }
            
            console.log(`📸 Loaded ${this.posts.length} posts`);
            
        } catch (error) {
            console.error('❌ Error loading posts:', error);
            this.posts = this.getDefaultPosts();
        }
    }

    /**
     * Get default posts data
     */
    getDefaultPosts() {
        return [
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
            },
            {
                id: 3,
                user: {
                    username: 'emma_art',
                    avatar: 'https://via.placeholder.com/40/3b82f6/ffffff?text=E',
                    location: 'London, UK'
                },
                image: 'https://via.placeholder.com/600/400/3b82f6/ffffff?text=Photo+3',
                caption: 'Street art in Shoreditch 🎨 #streetart #london #art',
                likes: 567,
                comments: 23,
                time: '1 day ago',
                liked: false,
                saved: true
            }
        ];
    }

    /**
     * Setup post event listeners
     */
    setupPostEventListeners() {
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

        // Comment buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.post-comment-btn')) {
                this.handleComment(e);
            }
        });

        // Post menu buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.post-menu')) {
                this.handlePostMenu(e);
            }
        });

        // Comment input handling
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('post-comment-input')) {
                this.handleCommentInput(e);
            }
        });
    }

    /**
     * Initialize post interactions
     */
    initializePostInteractions() {
        // Update like and save states
        this.posts.forEach((post, index) => {
            if (this.likedPosts.has(post.id)) {
                post.liked = true;
            }
            if (this.savedPosts.has(post.id)) {
                post.saved = true;
            }
        });
        
        // Update UI
        this.updatePostsUI();
    }

    /**
     * Handle like button click
     */
    async handleLike(event) {
        event.preventDefault();
        
        const likeBtn = event.target.closest('.like-btn');
        const postElement = likeBtn.closest('.post');
        const postId = parseInt(postElement.dataset.postId);
        
        try {
            // Find post
            const post = this.posts.find(p => p.id === postId);
            if (!post) return;
            
            // Toggle like state
            const wasLiked = post.liked;
            post.liked = !wasLiked;
            
            if (post.liked) {
                post.likes++;
                this.likedPosts.add(post.id);
                likeBtn.classList.add('liked');
                
                // Add heart animation
                this.createHeartAnimation(event);
                
            } else {
                post.likes--;
                this.likedPosts.delete(post.id);
                likeBtn.classList.remove('liked');
            }
            
            // Update UI
            this.updatePostLikes(postElement, post.likes);
            
            // Save to localStorage
            this.savePostsData();
            
            // Simulate API call
            await this.updateLikeOnServer(postId, post.liked);
            
        } catch (error) {
            console.error('Error handling like:', error);
            // Revert changes on error
            this.handleLikeError(postElement, postId);
        }
    }

    /**
     * Handle save button click
     */
    async handleSave(event) {
        event.preventDefault();
        
        const saveBtn = event.target.closest('.save-btn');
        const postElement = saveBtn.closest('.post');
        const postId = parseInt(postElement.dataset.postId);
        
        try {
            // Find post
            const post = this.posts.find(p => p.id === postId);
            if (!post) return;
            
            // Toggle save state
            const wasSaved = post.saved;
            post.saved = !wasSaved;
            
            if (post.saved) {
                this.savedPosts.add(post.id);
                saveBtn.classList.add('saved');
            } else {
                this.savedPosts.delete(post.id);
                saveBtn.classList.remove('saved');
            }
            
            // Save to localStorage
            this.savePostsData();
            
            // Show notification
            this.showNotification(
                post.saved ? 'Post saved to your collection!' : 'Post removed from collection.',
                'success'
            );
            
            // Simulate API call
            await this.updateSaveOnServer(postId, post.saved);
            
        } catch (error) {
            console.error('Error handling save:', error);
            // Revert changes on error
            this.handleSaveError(postElement, postId);
        }
    }

    /**
     * Handle comment button click
     */
    async handleComment(event) {
        event.preventDefault();
        
        const commentBtn = event.target.closest('.post-comment-btn');
        const postElement = commentBtn.closest('.post');
        const postId = parseInt(postElement.dataset.postId);
        const commentInput = postElement.querySelector('.post-comment-input');
        const commentText = commentInput.value.trim();
        
        if (!commentText) {
            this.showNotification('Please enter a comment.', 'warning');
            return;
        }
        
        try {
            // Find post
            const post = this.posts.find(p => p.id === postId);
            if (!post) return;
            
            // Add comment
            const newComment = {
                id: Date.now(),
                user: {
                    username: 'current_user',
                    avatar: 'https://via.placeholder.com/32/6366f1/ffffff?text=U'
                },
                text: commentText,
                time: 'Just now'
            };
            
            // Add to post comments (if comments array doesn't exist, create it)
            if (!post.commentsList) {
                post.commentsList = [];
            }
            post.commentsList.push(newComment);
            post.comments++;
            
            // Update UI
            this.updatePostComments(postElement, post.commentsList);
            
            // Clear input
            commentInput.value = '';
            commentBtn.classList.remove('active');
            
            // Save to localStorage
            this.savePostsData();
            
            // Show notification
            this.showNotification('Comment added successfully!', 'success');
            
            // Simulate API call
            await this.addCommentOnServer(postId, commentText);
            
        } catch (error) {
            console.error('Error adding comment:', error);
            this.showNotification('Failed to add comment. Please try again.', 'error');
        }
    }

    /**
     * Handle comment input changes
     */
    handleCommentInput(event) {
        const input = event.target;
        const postElement = input.closest('.post');
        const commentBtn = postElement.querySelector('.post-comment-btn');
        
        if (input.value.trim()) {
            commentBtn.classList.add('active');
        } else {
            commentBtn.classList.remove('active');
        }
    }

    /**
     * Handle post menu click
     */
    handlePostMenu(event) {
        event.preventDefault();
        
        const menuBtn = event.target.closest('.post-menu');
        const postElement = menuBtn.closest('.post');
        
        // Toggle menu dropdown
        const dropdown = postElement.querySelector('.post-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('active');
        }
        
        // Close other dropdowns
        document.querySelectorAll('.post-dropdown.active').forEach(dd => {
            if (dd !== dropdown) {
                dd.classList.remove('active');
            }
        });
    }

    /**
     * Create heart animation
     */
    createHeartAnimation(event) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: 24px;
            pointer-events: none;
            z-index: 1000;
            animation: floatHeart 1s ease-out forwards;
        `;
        
        const rect = event.currentTarget.getBoundingClientRect();
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1000);
    }

    /**
     * Update post likes count in UI
     */
    updatePostLikes(postElement, likesCount) {
        const likesElement = postElement.querySelector('.likes-count');
        if (likesElement) {
            likesElement.textContent = `${likesCount.toLocaleString()} likes`;
        }
    }

    /**
     * Update post comments in UI
     */
    updatePostComments(postElement, comments) {
        const commentsContainer = postElement.querySelector('.post-comments');
        if (commentsContainer && comments) {
            const commentsHTML = comments.map(comment => `
                <div class="comment">
                    <strong>${comment.user.username}</strong> ${comment.text}
                </div>
            `).join('');
            commentsContainer.innerHTML = commentsHTML;
        }
    }

    /**
     * Update all posts UI
     */
    updatePostsUI() {
        this.posts.forEach(post => {
            const postElement = document.querySelector(`[data-post-id="${post.id}"]`);
            if (postElement) {
                // Update like state
                const likeBtn = postElement.querySelector('.like-btn');
                if (likeBtn) {
                    if (post.liked) {
                        likeBtn.classList.add('liked');
                    } else {
                        likeBtn.classList.remove('liked');
                    }
                }
                
                // Update save state
                const saveBtn = postElement.querySelector('.save-btn');
                if (saveBtn) {
                    if (post.saved) {
                        saveBtn.classList.add('saved');
                    } else {
                        saveBtn.classList.remove('saved');
                    }
                }
                
                // Update likes count
                this.updatePostLikes(postElement, post.likes);
                
                // Update comments
                if (post.commentsList) {
                    this.updatePostComments(postElement, post.commentsList);
                }
            }
        });
    }

    /**
     * Save posts data to localStorage
     */
    savePostsData() {
        try {
            localStorage.setItem('posts', JSON.stringify(this.posts));
            localStorage.setItem('likedPosts', JSON.stringify([...this.likedPosts]));
            localStorage.setItem('savedPosts', JSON.stringify([...this.savedPosts]));
        } catch (error) {
            console.error('Error saving posts data:', error);
        }
    }

    /**
     * Simulate API call to update like on server
     */
    async updateLikeOnServer(postId, liked) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log(`📡 Updated like for post ${postId}: ${liked}`);
        return { success: true };
    }

    /**
     * Simulate API call to update save on server
     */
    async updateSaveOnServer(postId, saved) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log(`📡 Updated save for post ${postId}: ${saved}`);
        return { success: true };
    }

    /**
     * Simulate API call to add comment on server
     */
    async addCommentOnServer(postId, commentText) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        console.log(`📡 Added comment to post ${postId}: ${commentText}`);
        return { success: true };
    }

    /**
     * Handle like error
     */
    handleLikeError(postElement, postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.liked = !post.liked;
            if (post.liked) {
                post.likes++;
            } else {
                post.likes--;
            }
            this.updatePostLikes(postElement, post.likes);
        }
    }

    /**
     * Handle save error
     */
    handleSaveError(postElement, postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.saved = !post.saved;
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
        }, 3000);
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
     * Get all posts
     */
    getPosts() {
        return this.posts;
    }

    /**
     * Get liked posts
     */
    getLikedPosts() {
        return this.posts.filter(post => this.likedPosts.has(post.id));
    }

    /**
     * Get saved posts
     */
    getSavedPosts() {
        return this.posts.filter(post => this.savedPosts.has(post.id));
    }

    /**
     * Add new post
     */
    addPost(postData) {
        const newPost = {
            id: Date.now(),
            ...postData,
            likes: 0,
            comments: 0,
            time: 'Just now',
            liked: false,
            saved: false
        };
        
        this.posts.unshift(newPost);
        this.savePostsData();
        
        return newPost;
    }

    /**
     * Delete post
     */
    deletePost(postId) {
        const index = this.posts.findIndex(post => post.id === postId);
        if (index !== -1) {
            this.posts.splice(index, 1);
            this.likedPosts.delete(postId);
            this.savedPosts.delete(postId);
            this.savePostsData();
            return true;
        }
        return false;
    }
}

// Create and export posts module instance
const postsModule = new PostsModule();
export default postsModule; 