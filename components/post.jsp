<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="post">
    <div class="post-header">
        <div class="post-user">
            <img src="${param.userAvatar}" alt="User" class="user-avatar">
            <div class="user-info">
                <h4>${param.username}</h4>
                <span>${param.location}</span>
            </div>
        </div>
        <button class="post-menu">
            <i class="fas fa-ellipsis-h"></i>
        </button>
    </div>
    
    <div class="post-image">
        <img src="${param.imageUrl}" alt="Post">
    </div>
    
    <div class="post-actions">
        <div class="action-buttons">
            <button class="action-btn like-btn" data-post="${param.postId}">
                <i class="far fa-heart"></i>
            </button>
            <button class="action-btn">
                <i class="far fa-comment"></i>
            </button>
            <button class="action-btn">
                <i class="far fa-paper-plane"></i>
            </button>
            <button class="action-btn save-btn" data-post="${param.postId}">
                <i class="far fa-bookmark"></i>
            </button>
        </div>
    </div>
    
    <div class="post-info">
        <div class="likes-count">
            <span class="likes-number">${param.likesCount}</span> likes
        </div>
        <div class="post-caption">
            <strong>${param.username}</strong> ${param.caption}
        </div>
        <div class="post-comments">
            ${param.comments}
        </div>
        <div class="post-time">${param.timeAgo}</div>
    </div>
    
    <div class="post-comment-input">
        <input type="text" placeholder="Add a comment...">
        <button class="post-comment-btn">Post</button>
    </div>
</div> 