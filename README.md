# Portfolio Website

A modern, elegant portfolio website with dark/light theme toggle, preloader, project detail pages, and full mobile responsiveness.

## Features

- ✅ **Dark/Light Theme Toggle** - Switch between themes with persistent storage
- ✅ **Preloader Animation** - Smooth loading experience
- ✅ **Responsive Design** - Works perfectly on all devices
- ✅ **Project Detail Pages** - Detailed view for each project
- ✅ **Smooth Scrolling** - Elegant page navigation
- ✅ **Animated Counters** - Statistics with number animations
- ✅ **Testimonials Slider** - Interactive testimonials carousel
- ✅ **Contact Form** - Functional contact form with validation
- ✅ **Modern UI/UX** - Clean and attractive design

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript
- jQuery 3.7.1
- Font Awesome 6.4.0
- Google Fonts (Poppins)

## File Structure

```
├── index.html          # Main portfolio page
├── project-detail.html # Project detail page template
├── styles.css          # All styles with theme support
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. **Local Development**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

2. **Upload to GitHub**
   
   **First time setup:**
   ```bash
   # Initialize git repository
   git init
   
   # Add all files
   git add .
   
   # Create initial commit
   git commit -m "Initial commit: Portfolio website"
   
   # Add your GitHub repository (replace with your repo URL)
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```
   
   **Or using GitHub Desktop:**
   - Open GitHub Desktop
   - File → Add Local Repository
   - Select this folder
   - Publish repository to GitHub

3. **Deploy to Vercel**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect and deploy
   - Your site will be live instantly!

## Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --accent-primary: #6366f1;
    --accent-secondary: #8b5cf6;
    /* ... */
}
```

### Adding Projects
Edit the `projects` object in `project-detail.html` to add more projects.

### Updating Content
- Edit `index.html` to update your personal information
- Modify sections as needed
- Update project cards with your own projects

### Theme Colors
The theme system uses CSS variables, making it easy to customize:
- Light theme: Defined in `:root`
- Dark theme: Defined in `[data-theme="dark"]`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use for personal and commercial projects.

## Credits

- Font Awesome for icons
- Google Fonts for typography
- jQuery for enhanced functionality

