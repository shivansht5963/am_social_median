<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
        <button class="nav-btn" id="homeBtn" onclick="window.location.href='home.jsp'">
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
        <div class="user-avatar" id="profileBtn" onclick="window.location.href='profile.jsp'">
            <img src="https://via.placeholder.com/32/6366f1/ffffff?text=U" alt="User">
        </div>
    </div>
</nav> 