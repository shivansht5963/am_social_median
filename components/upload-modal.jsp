<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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