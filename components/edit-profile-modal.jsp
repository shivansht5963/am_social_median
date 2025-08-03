<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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