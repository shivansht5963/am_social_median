# PhotoShare - Social Media Frontend

A modern, beautiful photo-sharing social network frontend built with HTML, CSS, JavaScript, and JSP (JavaServer Pages). This application provides a complete social media experience with user authentication, post interactions, and profile management.

## Features

- **User Authentication**: Login and signup functionality
- **Modern UI**: Instagram and Facebook-inspired design with beautiful animations
- **Post Interactions**: Like, comment, save, and share posts
- **Profile Management**: View and edit user profiles
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Notifications**: Interactive notification system
- **Search Functionality**: Find users and content
- **Story Features**: Share temporary stories
- **Light/Dark Theme**: Toggle between light and dark themes
- **Modular Architecture**: Clean, maintainable code structure

## Prerequisites

To run this JSP application, you need:

1. **Java Development Kit (JDK)** - Version 8 or higher
2. **Apache Tomcat** - Version 9 or higher

## Installation & Setup

### Step 1: Install Java JDK
1. Download and install Java JDK from [Oracle's website](https://www.oracle.com/java/technologies/downloads/) or use OpenJDK
2. Set JAVA_HOME environment variable
3. Verify installation: `java -version`

### Step 2: Install Apache Tomcat
1. Download Apache Tomcat from [Apache Tomcat website](https://tomcat.apache.org/)
2. Extract the downloaded file to a directory (e.g., `C:\tomcat`)
3. Set CATALINA_HOME environment variable to point to your Tomcat directory

### Step 3: Deploy the Application
1. Copy all project files to Tomcat's webapps directory:
   ```
   Copy all files to: [TOMCAT_HOME]/webapps/photoshare/
   ```

2. Your directory structure should look like:
   ```
   [TOMCAT_HOME]/webapps/photoshare/
   ├── index.jsp
   ├── home.jsp
   ├── profile.jsp
   ├── main.css
   ├── script.js
   ├── css/
   ├── js/
   ├── components/
   └── README.md
   ```

## Running the Application

### Method 1: Using Tomcat's built-in server
1. Navigate to your Tomcat directory
2. Run the startup script:
   ```bash
   # Windows
   cd [TOMCAT_HOME]/bin
   startup.bat
   
   # Linux/Mac
   cd [TOMCAT_HOME]/bin
   ./startup.sh
   ```

3. Open your browser and go to:
   ```
   http://localhost:8080/photoshare/
   ```

### Method 2: Using the provided batch script
1. Run the `run_photoshare.bat` script in the project directory
2. This will automatically start Tomcat and open the application

## Project Structure

### Modular Architecture

The application has been refactored into a modular structure for better maintainability and scalability:

```
photoshare/
├── index.jsp                    # Login page
├── home.jsp                     # Home page (refactored)
├── profile.jsp                  # Profile page (refactored)
├── script.js                    # Legacy compatibility layer
├── main.css                     # Main CSS file (imports all modules)
├── run_photoshare.bat           # Tomcat management script
├── README.md                    # This file
├── css/                         # Modular CSS files
│   ├── variables.css            # CSS custom properties and theme variables
│   ├── base.css                 # Reset, base styles, and typography
│   ├── components.css           # Reusable UI components
│   ├── forms.css                # Form elements and input styles
│   ├── navigation.css           # Navigation and header styles
│   ├── layout.css               # Layout and grid systems
│   ├── posts.css                # Post-related styles
│   ├── stories.css              # Story-related styles
│   ├── sidebar.css              # Sidebar and suggestions styles
│   ├── themes.css               # Theme-specific styles
│   ├── responsive.css           # Media queries and responsive design
│   └── main.css                 # Main file that imports all components
├── js/                          # Modular JavaScript files
│   ├── app.js                   # Main application entry point
│   ├── auth.js                  # Authentication and user management
│   ├── posts.js                 # Post-related functionality
│   ├── ui.js                    # General UI components and interactions
│   ├── themes.js                # Theme management and settings
│   └── utils.js                 # Utility functions and helpers
└── components/                  # Reusable JSP components
    ├── head.jsp                 # Common head section
    ├── navigation.jsp           # Reusable navigation bar
    ├── sidebar.jsp              # Reusable sidebar component
    ├── stories.jsp              # Stories section component
    ├── post.jsp                 # Individual post component
    ├── settings-panel.jsp       # Settings panel component
    ├── upload-modal.jsp         # Upload modal component
    ├── profile-header.jsp       # Profile header component
    ├── profile-stats-overview.jsp # Profile statistics component
    ├── profile-tabs.jsp         # Profile tabs component
    ├── profile-posts-grid.jsp   # Profile posts grid component
    └── edit-profile-modal.jsp   # Edit profile modal component
```

### Key Improvements

#### 1. Code Organization
- **Before**: Single large files (1,200+ lines CSS, 930+ lines JS)
- **After**: Multiple focused files (50-200 lines each)

#### 2. Maintainability
- **Before**: Difficult to find specific functionality
- **After**: Clear file structure with specific responsibilities

#### 3. Reusability
- **Before**: Code duplication across pages
- **After**: Reusable components and modules

#### 4. Readability
- **Before**: Monolithic files hard to navigate
- **After**: Well-organized, self-documenting code

#### 5. Developer Experience
- **Before**: Difficult for multiple developers to work simultaneously
- **After**: Clear separation of concerns, easier collaboration

## How to Use the Modular Structure

### CSS
The main CSS file (`main.css`) imports all modular CSS files:
```css
@import url('variables.css');
@import url('base.css');
@import url('components.css');
/* ... etc */
```

### JavaScript
The main JavaScript file (`js/app.js`) imports and initializes all modules:
```javascript
import authModule from './auth.js';
import postsModule from './posts.js';
import uiModule from './ui.js';
// ... etc
```

### JSP Components
Pages use JSP includes for reusable components:
```jsp
<jsp:include page="components/navigation.jsp"/>
<jsp:include page="components/sidebar.jsp"/>
```

## Benefits for Backend Integration

### 1. Easier API Integration
- Modular JavaScript makes it easier to integrate with backend APIs
- Clear separation between UI logic and data management
- Structured approach to handling API responses

### 2. Component-Based Development
- Reusable components can be easily connected to backend data
- Consistent data flow patterns across the application
- Easier to implement server-side rendering

### 3. Maintainable Codebase
- Clear file structure makes it easier for backend developers to understand
- Modular approach allows for easier testing and debugging
- Better organization for team collaboration

## Theme System

The application includes a comprehensive theme system:

- **Light/Dark Themes**: Toggle between light and dark themes
- **Theme Persistence**: User preferences are saved in localStorage
- **System Theme Detection**: Automatically detects system theme preference
- **Settings Panel**: Easy theme switching through the settings panel

## Future Enhancements

### 1. Build System
- Implement a build system (Webpack, Vite) for better optimization
- CSS and JS minification for production
- Asset bundling and optimization

### 2. Component Library
- Create a comprehensive component library
- Document component usage and API
- Implement design system guidelines

### 3. Testing
- Add unit tests for JavaScript modules
- Implement integration tests for components
- Add visual regression testing

## Conclusion

The PhotoShare application features a modern, modular architecture that:

- **Improves maintainability** through better code organization
- **Enhances developer experience** with clear file structure
- **Enables better collaboration** through separation of concerns
- **Facilitates backend integration** with structured data flow
- **Preserves all existing functionality** while improving code quality

The modular structure makes the codebase more scalable, maintainable, and ready for future development and backend integration. 