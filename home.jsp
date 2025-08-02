<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PhotoShare - Home</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="app-container">
        <!-- Navigation -->
        <nav class="navbar">
            <div class="nav-left">
                <div class="logo">
                    <i class="fas fa-camera"></i>
                    <h1>PhotoShare</h1>
                </div>
            </div>
            
            <div class="nav-center">
                <div class="search-container">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search photos, people, or places...">
                </div>
            </div>
            
            <div class="nav-right">
                <button class="nav-btn" id="homeBtn">
                    <i class="fas fa-home"></i>
                </button>
                <button class="nav-btn" id="exploreBtn">
                    <i class="fas fa-compass"></i>
                </button>
                <button class="nav-btn" id="uploadBtn">
                    <i class="fas fa-plus-square"></i>
                </button>
                <button class="nav-btn" id="heartBtn">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="nav-btn settings-btn" id="settingsBtn">
                    <i class="fas fa-cog"></i>
                </button>
                <div class="user-avatar" id="profileBtn">
                    <img src="https://via.placeholder.com/32/6366f1/ffffff?text=U" alt="User">
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="main-content">
            <div class="content-wrapper">
                <!-- Stories Section -->
                <div class="stories-section">
                    <div class="stories-container">
                        <div class="story add-story">
                            <div class="story-avatar">
                                <i class="fas fa-plus"></i>
                            </div>
                            <span>Add Story</span>
                        </div>
                        <div class="story">
                            <div class="story-avatar">
                                <img src="https://via.placeholder.com/60/ef4444/ffffff?text=1" alt="Story">
                            </div>
                            <span>Sarah</span>
                        </div>
                        <div class="story">
                            <div class="story-avatar">
                                <img src="https://via.placeholder.com/60/10b981/ffffff?text=2" alt="Story">
                            </div>
                            <span>Mike</span>
                        </div>
                        <div class="story">
                            <div class="story-avatar">
                                <img src="https://via.placeholder.com/60/3b82f6/ffffff?text=3" alt="Story">
                            </div>
                            <span>Emma</span>
                        </div>
                        <div class="story">
                            <div class="story-avatar">
                                <img src="https://via.placeholder.com/60/f59e0b/ffffff?text=4" alt="Story">
                            </div>
                            <span>John</span>
                        </div>
                    </div>
                </div>

                <!-- Posts Feed -->
                <div class="posts-feed">
                    <!-- Post 1 -->
                    <div class="post">
                        <div class="post-header">
                            <div class="post-user">
                                <img src="https://via.placeholder.com/40/ef4444/ffffff?text=S" alt="User" class="user-avatar">
                                <div class="user-info">
                                    <h4>sarah_photography</h4>
                                    <span>New York, NY</span>
                                </div>
                            </div>
                            <button class="post-menu">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                        </div>
                        
                        <div class="post-image">
                            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop" alt="Post">
                        </div>
                        
                        <div class="post-actions">
                            <div class="action-buttons">
                                <button class="action-btn like-btn" data-post="1">
                                    <i class="far fa-heart"></i>
                                </button>
                                <button class="action-btn">
                                    <i class="far fa-comment"></i>
                                </button>
                                <button class="action-btn">
                                    <i class="far fa-paper-plane"></i>
                                </button>
                                <button class="action-btn save-btn" data-post="1">
                                    <i class="far fa-bookmark"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="post-info">
                            <div class="likes-count">
                                <span class="likes-number">1,234</span> likes
                            </div>
                            <div class="post-caption">
                                <strong>sarah_photography</strong> Beautiful sunset in the city! 🌆 #photography #sunset #newyork
                            </div>
                            <div class="post-comments">
                                <div class="comment">
                                    <strong>mike_travel</strong> Amazing shot! 📸
                                </div>
                                <div class="comment">
                                    <strong>emma_art</strong> Love the colors! 😍
                                </div>
                            </div>
                            <div class="post-time">2 hours ago</div>
                        </div>
                        
                        <div class="post-comment-input">
                            <input type="text" placeholder="Add a comment...">
                            <button class="post-comment-btn">Post</button>
                        </div>
                    </div>

                    <!-- Post 2 -->
                    <div class="post">
                        <div class="post-header">
                            <div class="post-user">
                                <img src="https://via.placeholder.com/40/10b981/ffffff?text=M" alt="User" class="user-avatar">
                                <div class="user-info">
                                    <h4>mike_travel</h4>
                                    <span>Paris, France</span>
                                </div>
                            </div>
                            <button class="post-menu">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                        </div>
                        
                        <div class="post-image">
                            <img src="https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=600&fit=crop" alt="Post">
                        </div>
                        
                        <div class="post-actions">
                            <div class="action-buttons">
                                <button class="action-btn like-btn" data-post="2">
                                    <i class="far fa-heart"></i>
                                </button>
                                <button class="action-btn">
                                    <i class="far fa-comment"></i>
                                </button>
                                <button class="action-btn">
                                    <i class="far fa-paper-plane"></i>
                                </button>
                                <button class="action-btn save-btn" data-post="2">
                                    <i class="far fa-bookmark"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="post-info">
                            <div class="likes-count">
                                <span class="likes-number">856</span> likes
                            </div>
                            <div class="post-caption">
                                <strong>mike_travel</strong> Eiffel Tower magic ✨ #paris #travel #eiffeltower
                            </div>
                            <div class="post-comments">
                                <div class="comment">
                                    <strong>john_photographer</strong> Stunning! 🔥
                                </div>
                            </div>
                            <div class="post-time">5 hours ago</div>
                        </div>
                        
                        <div class="post-comment-input">
                            <input type="text" placeholder="Add a comment...">
                            <button class="post-comment-btn">Post</button>
                        </div>
                    </div>

                    <!-- Post 3 -->
                    <div class="post">
                        <div class="post-header">
                            <div class="post-user">
                                <img src="https://via.placeholder.com/40/3b82f6/ffffff?text=E" alt="User" class="user-avatar">
                                <div class="user-info">
                                    <h4>emma_art</h4>
                                    <span>Tokyo, Japan</span>
                                </div>
                            </div>
                            <button class="post-menu">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                        </div>
                        
                        <div class="post-image">
                            <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=600&fit=crop" alt="Post">
                        </div>
                        
                        <div class="post-actions">
                            <div class="action-buttons">
                                <button class="action-btn like-btn" data-post="3">
                                    <i class="far fa-heart"></i>
                                </button>
                                <button class="action-btn">
                                    <i class="far fa-comment"></i>
                                </button>
                                <button class="action-btn">
                                    <i class="far fa-paper-plane"></i>
                                </button>
                                <button class="action-btn save-btn" data-post="3">
                                    <i class="far fa-bookmark"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="post-info">
                            <div class="likes-count">
                                <span class="likes-number">2,567</span> likes
                            </div>
                            <div class="post-caption">
                                <strong>emma_art</strong> Cherry blossoms in full bloom! 🌸 #tokyo #cherryblossom #spring
                            </div>
                            <div class="post-comments">
                                <div class="comment">
                                    <strong>sarah_photography</strong> So beautiful! 🌸
                                </div>
                                <div class="comment">
                                    <strong>mike_travel</strong> Need to visit! ✈️
                                </div>
                            </div>
                            <div class="post-time">1 day ago</div>
                        </div>
                        
                        <div class="post-comment-input">
                            <input type="text" placeholder="Add a comment...">
                            <button class="post-comment-btn">Post</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <aside class="sidebar">
                <div class="user-profile">
                    <img src="https://via.placeholder.com/60/6366f1/ffffff?text=U" alt="User" class="profile-avatar">
                    <div class="profile-info">
                        <h4>your_username</h4>
                        <span>Your Name</span>
                    </div>
                    <button class="switch-btn">Switch</button>
                </div>

                <div class="suggestions">
                    <div class="suggestions-header">
                        <h4>Suggestions for you</h4>
                        <button class="see-all-btn">See All</button>
                    </div>
                    
                    <div class="suggestion-item">
                        <img src="https://via.placeholder.com/32/f59e0b/ffffff?text=J" alt="User" class="suggestion-avatar">
                        <div class="suggestion-info">
                            <h5>john_photographer</h5>
                            <span>Followed by mike_travel</span>
                        </div>
                        <button class="follow-btn">Follow</button>
                    </div>
                    
                    <div class="suggestion-item">
                        <img src="https://via.placeholder.com/32/8b5cf6/ffffff?text=L" alt="User" class="suggestion-avatar">
                        <div class="suggestion-info">
                            <h5>lisa_creative</h5>
                            <span>New to PhotoShare</span>
                        </div>
                        <button class="follow-btn">Follow</button>
                    </div>
                    
                    <div class="suggestion-item">
                        <img src="https://via.placeholder.com/32/ec4899/ffffff?text=A" alt="User" class="suggestion-avatar">
                        <div class="suggestion-info">
                            <h5>alex_design</h5>
                            <span>Followed by emma_art</span>
                        </div>
                        <button class="follow-btn">Follow</button>
                    </div>
                </div>

                <div class="footer-links">
                    <a href="#">About</a>
                    <a href="#">Help</a>
                    <a href="#">Press</a>
                    <a href="#">API</a>
                    <a href="#">Jobs</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Top Accounts</a>
                    <a href="#">Hashtags</a>
                    <a href="#">Locations</a>
                    <a href="#">Language</a>
                </div>
                
                <div class="copyright">
                    © 2024 PhotoShare
                </div>
            </aside>
        </main>
    </div>

    <!-- Upload Modal -->
    <div id="uploadModal" class="modal">
        <div class="modal-content upload-modal">
            <div class="modal-header">
                <h2>Create New Post</h2>
                <span class="close">&times;</span>
            </div>
            <div class="upload-area">
                <div class="upload-placeholder">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <h3>Drag photos and videos here</h3>
                    <button class="select-btn">Select from computer</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Floating Action Button -->
    <div class="fab" onclick="showUploadModal()">
        <i class="fas fa-plus"></i>
    </div>

    <!-- Settings Panel -->
    <div class="settings-overlay" id="settingsOverlay"></div>
    <div class="settings-panel" id="settingsPanel">
        <div class="settings-header">
            <h2>Settings</h2>
            <button class="settings-close" id="settingsClose">&times;</button>
        </div>
        <div class="settings-content">
            <!-- Theme Settings -->
            <div class="settings-section">
                <h3>Appearance</h3>
                <div class="settings-item">
                    <div>
                        <div class="settings-item-label">Theme</div>
                        <div class="settings-item-description">Choose your preferred theme</div>
                    </div>
                    <div class="theme-toggle" id="themeToggle"></div>
                </div>
                
                <div class="theme-preview">
                    <div class="theme-option" data-theme="light">
                        <span class="theme-option-icon">☀️</span>
                        <div class="theme-option-label">Light</div>
                    </div>
                    <div class="theme-option" data-theme="dark">
                        <span class="theme-option-icon">🌙</span>
                        <div class="theme-option-label">Dark</div>
                    </div>
                </div>
            </div>

            <!-- Account Settings -->
            <div class="settings-section">
                <h3>Account</h3>
                <div class="settings-item">
                    <div>
                        <div class="settings-item-label">Privacy</div>
                        <div class="settings-item-description">Manage your privacy settings</div>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <div class="settings-item">
                    <div>
                        <div class="settings-item-label">Security</div>
                        <div class="settings-item-description">Password and login settings</div>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <div class="settings-item">
                    <div>
                        <div class="settings-item-label">Notifications</div>
                        <div class="settings-item-description">Manage notification preferences</div>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>

            <!-- App Settings -->
            <div class="settings-section">
                <h3>App</h3>
                <div class="settings-item">
                    <div>
                        <div class="settings-item-label">Language</div>
                        <div class="settings-item-description">English (US)</div>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <div class="settings-item">
                    <div>
                        <div class="settings-item-label">Data Usage</div>
                        <div class="settings-item-description">Manage data and storage</div>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <div class="settings-item">
                    <div>
                        <div class="settings-item-label">About</div>
                        <div class="settings-item-description">Version 1.0.0</div>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>

            <!-- Logout -->
            <div class="settings-section">
                <div class="settings-item">
                    <div>
                        <div class="settings-item-label" style="color: var(--error-color);">Log Out</div>
                        <div class="settings-item-description">Sign out of your account</div>
                    </div>
                    <i class="fas fa-sign-out-alt" style="color: var(--error-color);"></i>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html> 