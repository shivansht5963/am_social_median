<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PhotoShare - Profile</title>
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
                <button class="nav-btn" onclick="window.location.href='home.jsp'">
                    <i class="fas fa-home"></i>
                </button>
                <button class="nav-btn">
                    <i class="fas fa-compass"></i>
                </button>
                <button class="nav-btn" id="uploadBtn">
                    <i class="fas fa-plus-square"></i>
                </button>
                <button class="nav-btn">
                    <i class="fas fa-heart"></i>
                </button>
                <div class="user-avatar active">
                    <img src="https://via.placeholder.com/32/6366f1/ffffff?text=U" alt="User">
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="main-content profile-content">
            <div class="profile-container">
                <!-- Profile Header -->
                <div class="profile-header">
                    <div class="profile-avatar-large">
                        <img src="https://via.placeholder.com/150/6366f1/ffffff?text=U" alt="Profile">
                    </div>
                    
                    <div class="profile-info-main">
                        <div class="profile-username">
                            <h2>your_username</h2>
                            <button class="edit-profile-btn">Edit Profile</button>
                            <button class="settings-btn">
                                <i class="fas fa-cog"></i>
                            </button>
                        </div>
                        
                        <div class="profile-stats">
                            <div class="stat">
                                <span class="stat-number">42</span>
                                <span class="stat-label">posts</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">1,234</span>
                                <span class="stat-label">followers</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">567</span>
                                <span class="stat-label">following</span>
                            </div>
                        </div>
                        
                        <div class="profile-bio">
                            <h3>Your Name</h3>
                            <p>📸 Photography enthusiast | Travel lover | Creative soul</p>
                            <p>📍 Based in New York</p>
                            <a href="#" class="profile-website">www.yourwebsite.com</a>
                        </div>
                    </div>
                </div>

                <!-- Profile Stats Overview -->
                <div class="profile-stats-overview">
                    <div class="stats-card">
                        <div class="stat-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total Likes</h3>
                            <span class="stat-value">15,678</span>
                            <span class="stat-change positive">+234 this week</span>
                        </div>
                    </div>
                    
                    <div class="stats-card">
                        <div class="stat-icon">
                            <i class="fas fa-comment"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total Comments</h3>
                            <span class="stat-value">3,456</span>
                            <span class="stat-change positive">+89 this week</span>
                        </div>
                    </div>
                    
                    <div class="stats-card">
                        <div class="stat-icon">
                            <i class="fas fa-share"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total Shares</h3>
                            <span class="stat-value">1,234</span>
                            <span class="stat-change positive">+45 this week</span>
                        </div>
                    </div>
                    
                    <div class="stats-card">
                        <div class="stat-icon">
                            <i class="fas fa-eye"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Profile Views</h3>
                            <span class="stat-value">8,901</span>
                            <span class="stat-change positive">+567 this week</span>
                        </div>
                    </div>
                </div>

                <!-- Profile Tabs -->
                <div class="profile-tabs">
                    <button class="tab-btn active" data-tab="posts">
                        <i class="fas fa-th"></i>
                        <span>Posts</span>
                    </button>
                    <button class="tab-btn" data-tab="saved">
                        <i class="fas fa-bookmark"></i>
                        <span>Saved</span>
                    </button>
                    <button class="tab-btn" data-tab="tagged">
                        <i class="fas fa-user-tag"></i>
                        <span>Tagged</span>
                    </button>
                </div>

                <!-- Posts Grid -->
                <div class="profile-posts-grid" id="postsTab">
                    <div class="post-grid-item">
                        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop" alt="Post">
                        <div class="post-overlay">
                            <div class="post-stats">
                                <span><i class="fas fa-heart"></i> 234</span>
                                <span><i class="fas fa-comment"></i> 45</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="post-grid-item">
                        <img src="https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=300&fit=crop" alt="Post">
                        <div class="post-overlay">
                            <div class="post-stats">
                                <span><i class="fas fa-heart"></i> 189</span>
                                <span><i class="fas fa-comment"></i> 32</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="post-grid-item">
                        <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=300&fit=crop" alt="Post">
                        <div class="post-overlay">
                            <div class="post-stats">
                                <span><i class="fas fa-heart"></i> 456</span>
                                <span><i class="fas fa-comment"></i> 78</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="post-grid-item">
                        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop" alt="Post">
                        <div class="post-overlay">
                            <div class="post-stats">
                                <span><i class="fas fa-heart"></i> 123</span>
                                <span><i class="fas fa-comment"></i> 21</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="post-grid-item">
                        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop" alt="Post">
                        <div class="post-overlay">
                            <div class="post-stats">
                                <span><i class="fas fa-heart"></i> 345</span>
                                <span><i class="fas fa-comment"></i> 67</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="post-grid-item">
                        <img src="https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=300&fit=crop" alt="Post">
                        <div class="post-overlay">
                            <div class="post-stats">
                                <span><i class="fas fa-heart"></i> 278</span>
                                <span><i class="fas fa-comment"></i> 43</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Saved Posts Grid -->
                <div class="profile-posts-grid hidden" id="savedTab">
                    <div class="post-grid-item">
                        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop" alt="Saved Post">
                        <div class="post-overlay">
                            <div class="post-stats">
                                <span><i class="fas fa-heart"></i> 567</span>
                                <span><i class="fas fa-comment"></i> 89</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="post-grid-item">
                        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop" alt="Saved Post">
                        <div class="post-overlay">
                            <div class="post-stats">
                                <span><i class="fas fa-heart"></i> 234</span>
                                <span><i class="fas fa-comment"></i> 45</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tagged Posts Grid -->
                <div class="profile-posts-grid hidden" id="taggedTab">
                    <div class="post-grid-item">
                        <img src="https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=300&fit=crop" alt="Tagged Post">
                        <div class="post-overlay">
                            <div class="post-stats">
                                <span><i class="fas fa-heart"></i> 189</span>
                                <span><i class="fas fa-comment"></i> 32</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Edit Profile Modal -->
    <div id="editProfileModal" class="modal">
        <div class="modal-content edit-profile-modal">
            <div class="modal-header">
                <h2>Edit Profile</h2>
                <span class="close">&times;</span>
            </div>
            <form class="edit-profile-form">
                <div class="form-group">
                    <label>Profile Picture</label>
                    <div class="avatar-upload">
                        <img src="https://via.placeholder.com/100/6366f1/ffffff?text=U" alt="Profile" id="avatarPreview">
                        <button type="button" class="change-avatar-btn">Change Photo</button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" value="Your Name" required>
                </div>
                
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" value="your_username" required>
                </div>
                
                <div class="form-group">
                    <label>Bio</label>
                    <textarea rows="3" placeholder="Write something about yourself...">📸 Photography enthusiast | Travel lover | Creative soul</textarea>
                </div>
                
                <div class="form-group">
                    <label>Website</label>
                    <input type="url" value="www.yourwebsite.com" placeholder="Website">
                </div>
                
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" value="New York" placeholder="Location">
                </div>
                
                <div class="form-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
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