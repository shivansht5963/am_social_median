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
   ├── styles.css
   ├── script.js
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

### Method 2: Using IDE (Recommended for development)
1. **Eclipse IDE**:
   - Install Eclipse IDE for Enterprise Java Developers
   - Import the project as a Dynamic Web Project
   - Configure Tomcat server in Eclipse
   - Run the project directly from Eclipse

2. **IntelliJ IDEA**:
   - Install IntelliJ IDEA Ultimate (supports JSP)
   - Import the project
   - Configure Tomcat server
   - Run the project

3. **VS Code**:
   - Install Java Extension Pack
   - Install Tomcat for Java extension
   - Configure Tomcat server
   - Run the project

## File Structure

```
photoshare/
├── index.jsp          # Login and signup page
├── home.jsp           # Main feed page
├── profile.jsp        # User profile page
├── styles.css         # All CSS styles
├── script.js          # JavaScript functionality
└── README.md          # This file
```

## Design Features

- **Modern UI**: Clean, minimalist design inspired by Instagram and Facebook
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: CSS transitions and hover effects
- **Color Scheme**: Modern color palette with proper contrast
- **Typography**: Clean, readable fonts using Google Fonts
- **Icons**: Font Awesome icons for better visual appeal

## Key Functionalities

### Authentication
- User login with username/email and password
- Sign up with full name, email, username, and password
- Remember me functionality
- Social login options (Facebook, Google)

### Post Interactions
- Like and unlike posts
- Comment on posts
- Save posts to favorites
- Share posts
- View post details

### Profile Management
- View user profile with statistics
- Edit profile information
- Upload profile picture
- View posts, saved posts, and tagged posts
- Follow/unfollow users

### Navigation
- Responsive navigation bar
- Search functionality
- Notifications
- User menu

## Customization

### Colors
The application uses CSS custom properties for easy color customization. Main colors are defined in `styles.css`:

```css
:root {
    --primary-color: #1877f2;
    --secondary-color: #42a5f5;
    --accent-color: #e91e63;
    --background-color: #fafafa;
    --text-color: #262626;
    --border-color: #dbdbdb;
}
```

### Styling
- All styles are in `styles.css`
- Responsive breakpoints are defined for mobile, tablet, and desktop
- Animations and transitions are customizable

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

1. **JSP files downloading instead of rendering**:
   - Make sure you're using Apache Tomcat, not a static file server
   - Verify Tomcat is properly configured and running
   - Check that files are in the correct webapps directory

2. **Tomcat won't start**:
   - Check if port 8080 is already in use
   - Verify JAVA_HOME is set correctly
   - Check Tomcat logs in `[TOMCAT_HOME]/logs/`

3. **404 errors**:
   - Ensure files are in the correct webapps directory
   - Check file permissions
   - Verify Tomcat is running

4. **Styling issues**:
   - Clear browser cache
   - Check browser console for CSS errors
   - Verify all CSS files are accessible

### Getting Help

If you encounter issues:
1. Check Tomcat logs in `[TOMCAT_HOME]/logs/catalina.out`
2. Check browser console for JavaScript errors
3. Verify all file paths and permissions
4. Ensure Java and Tomcat versions are compatible

## Future Enhancements

- Backend integration with Java Servlets
- Database integration
- Real-time messaging
- Advanced search filters
- Post categories and hashtags
- User stories and highlights
- Advanced privacy settings
- Mobile app development

## License

This project is open source and available under the MIT License.

---

**Note**: This is a frontend-only application. For production use, you'll need to implement proper backend services, database integration, and security measures. 