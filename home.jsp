<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <jsp:include page="components/head.jsp">
        <jsp:param name="title" value="Home"/>
    </jsp:include>
</head>
<body>
    <div class="app-container">
        <!-- Navigation -->
        <jsp:include page="components/navigation.jsp"/>

        <!-- Main Content -->
        <main class="main-content">
            <div class="content-wrapper">
                <!-- Stories Section -->
                <jsp:include page="components/stories.jsp"/>

                <!-- Posts Feed -->
                <div class="posts-feed">
                    <!-- Post 1 -->
                    <jsp:include page="components/post.jsp">
                        <jsp:param name="postId" value="1"/>
                        <jsp:param name="userAvatar" value="https://via.placeholder.com/40/ef4444/ffffff?text=S"/>
                        <jsp:param name="username" value="sarah_photography"/>
                        <jsp:param name="location" value="New York, NY"/>
                        <jsp:param name="imageUrl" value="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop"/>
                        <jsp:param name="likesCount" value="1,234"/>
                        <jsp:param name="caption" value="Beautiful sunset in the city! 🌆 #photography #sunset #newyork"/>
                        <jsp:param name="comments" value="
                            <div class='comment'>
                                <strong>mike_travel</strong> Amazing shot! 📸
                            </div>
                            <div class='comment'>
                                <strong>emma_art</strong> Love the colors! 😍
                            </div>"/>
                        <jsp:param name="timeAgo" value="2 hours ago"/>
                    </jsp:include>

                    <!-- Post 2 -->
                    <jsp:include page="components/post.jsp">
                        <jsp:param name="postId" value="2"/>
                        <jsp:param name="userAvatar" value="https://via.placeholder.com/40/10b981/ffffff?text=M"/>
                        <jsp:param name="username" value="mike_travel"/>
                        <jsp:param name="location" value="Paris, France"/>
                        <jsp:param name="imageUrl" value="https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=600&fit=crop"/>
                        <jsp:param name="likesCount" value="856"/>
                        <jsp:param name="caption" value="Eiffel Tower magic ✨ #paris #travel #eiffeltower"/>
                        <jsp:param name="comments" value="
                            <div class='comment'>
                                <strong>john_photographer</strong> Stunning! 🔥
                            </div>"/>
                        <jsp:param name="timeAgo" value="5 hours ago"/>
                    </jsp:include>

                    <!-- Post 3 -->
                    <jsp:include page="components/post.jsp">
                        <jsp:param name="postId" value="3"/>
                        <jsp:param name="userAvatar" value="https://via.placeholder.com/40/3b82f6/ffffff?text=E"/>
                        <jsp:param name="username" value="emma_art"/>
                        <jsp:param name="location" value="Tokyo, Japan"/>
                        <jsp:param name="imageUrl" value="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=600&fit=crop"/>
                        <jsp:param name="likesCount" value="2,567"/>
                        <jsp:param name="caption" value="Cherry blossoms in full bloom! 🌸 #tokyo #cherryblossom #spring"/>
                        <jsp:param name="comments" value="
                            <div class='comment'>
                                <strong>sarah_photography</strong> So beautiful! 🌸
                            </div>
                            <div class='comment'>
                                <strong>mike_travel</strong> Need to visit! ✈️
                            </div>"/>
                        <jsp:param name="timeAgo" value="1 day ago"/>
                    </jsp:include>
                </div>
            </div>

            <!-- Sidebar -->
            <jsp:include page="components/sidebar.jsp"/>
        </main>
    </div>

    <!-- Upload Modal -->
    <jsp:include page="components/upload-modal.jsp"/>

    <!-- Settings Panel -->
    <jsp:include page="components/settings-panel.jsp"/>

    <script type="module" src="js/app.js"></script>
</body>
</html> 