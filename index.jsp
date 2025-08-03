<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PhotoShare - Connect Through Photos</title>
    <link rel="stylesheet" href="main.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="login-container">
            <div class="login-left">
                <div class="brand-section">
                    <div class="logo">
                        <i class="fas fa-camera"></i>
                        <h1>PhotoShare</h1>
                    </div>
                    <p class="tagline">Share your moments, connect with friends</p>
                </div>
                <div class="features">
                    <div class="feature">
                        <i class="fas fa-heart"></i>
                        <span>Like and interact with posts</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-comment"></i>
                        <span>Comment and engage</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-share"></i>
                        <span>Share amazing content</span>
                    </div>
                </div>
            </div>
            <div class="login-right">
                <div class="login-card">
                    <h2>Welcome Back</h2>
                    <p class="login-subtitle">Sign in to continue your journey</p>
                    
                    <form id="loginForm" class="login-form">
                        <div class="input-group">
                            <div class="input-icon">
                                <i class="fas fa-user"></i>
                            </div>
                            <input type="text" id="username" placeholder="Username or Email" required>
                        </div>
                        
                        <div class="input-group">
                            <div class="input-icon">
                                <i class="fas fa-lock"></i>
                            </div>
                            <input type="password" id="password" placeholder="Password" required>
                            <div class="password-toggle">
                                <i class="fas fa-eye" id="togglePassword"></i>
                            </div>
                        </div>
                        
                        <div class="form-options">
                            <label class="checkbox-container">
                                <input type="checkbox" id="rememberMe">
                                <span class="checkmark"></span>
                                Remember me
                            </label>
                            <a href="#" class="forgot-password">Forgot password?</a>
                        </div>
                        
                        <button type="submit" class="login-btn">
                            <span>Sign In</span>
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </form>
                    
                    <div class="divider">
                        <span>or</span>
                    </div>
                    
                    <div class="social-login">
                        <button class="social-btn facebook">
                            <i class="fab fa-facebook-f"></i>
                            <span>Continue with Facebook</span>
                        </button>
                        <button class="social-btn google">
                            <i class="fab fa-google"></i>
                            <span>Continue with Google</span>
                        </button>
                    </div>
                    
                    <div class="signup-link">
                        <p>Don't have an account? <a href="#" id="showSignup">Sign up</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Signup Modal -->
    <div id="signupModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Create Account</h2>
                <span class="close">&times;</span>
            </div>
            <form id="signupForm" class="signup-form">
                <div class="input-group">
                    <input type="text" placeholder="Full Name" required>
                </div>
                <div class="input-group">
                    <input type="email" placeholder="Email Address" required>
                </div>
                <div class="input-group">
                    <input type="text" placeholder="Username" required>
                </div>
                <div class="input-group">
                    <input type="password" placeholder="Password" required>
                </div>
                <div class="input-group">
                    <input type="password" placeholder="Confirm Password" required>
                </div>
                <button type="submit" class="signup-btn">Create Account</button>
            </form>
        </div>
    </div>

    <script type="module" src="js/app.js"></script>
</body>
</html> 