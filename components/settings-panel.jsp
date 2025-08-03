<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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