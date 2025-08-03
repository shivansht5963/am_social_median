<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <jsp:include page="components/head.jsp">
        <jsp:param name="title" value="Profile"/>
    </jsp:include>
</head>
<body>
    <div class="app-container">
        <!-- Navigation -->
        <jsp:include page="components/navigation.jsp"/>

        <!-- Main Content -->
        <main class="main-content profile-content">
            <div class="profile-container">
                <!-- Profile Header -->
                <jsp:include page="components/profile-header.jsp"/>

                <!-- Profile Stats Overview -->
                <jsp:include page="components/profile-stats-overview.jsp"/>

                <!-- Profile Tabs -->
                <jsp:include page="components/profile-tabs.jsp"/>

                <!-- Profile Posts Grid -->
                <jsp:include page="components/profile-posts-grid.jsp"/>
            </div>
        </main>
    </div>

    <!-- Edit Profile Modal -->
    <jsp:include page="components/edit-profile-modal.jsp"/>

    <!-- Upload Modal -->
    <jsp:include page="components/upload-modal.jsp"/>

    <!-- Settings Panel -->
    <jsp:include page="components/settings-panel.jsp"/>

    <script type="module" src="js/app.js"></script>
</body>
</html> 