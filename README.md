# Modern Premium Frontend Developer Portfolio

A responsive, high-performance, and visually compelling frontend portfolio built with **semantic HTML5, raw CSS3 variables, and vanilla ES6+ JavaScript**. Designed to be completely framework-free, highly interactive, and interview-ready for software engineers.

---

## 🎨 Visual Identity & Theme
The portfolio utilizes a **Modern Slate Dark Theme** with subtle neon accents. It features:
- **Glassmorphic Cards**: Leveraging `backdrop-filter: blur()` alongside custom semi-transparent border grids.
- **Micro-Interactions**: Hover scales, ripple-effect buttons, and continuous floating background blur nodes.
- **Responsive Fluidity**: Fluid layouts scaling cleanly from small mobile phones up to high-resolution desktop monitors.
- **Dark & Light Mode Toggles**: Full local storage state persistence changing theme variables instantly.

---

## 🚀 Features & Interactive Modules

1. **Preloader**: A custom spinner initial loading bar matching the developer initials, fading out cleanly on asset load.
2. **Scroll Progress Tracking**: Smooth viewport scroll indicator reflecting read depth.
3. **Custom Lagging Cursor**: A specialized cursor ring mapping mouse coordinates with fluid inertia (desktops only).
4. **Hero Dynamic Typing**: Fast, lightweight typing engine cycling through core software roles without frameworks.
5. **Interactive Counters**: An Intersection Observer module counting stats (e.g. 150+ DSA Solved, 9.2 CGPA) only when they enter the viewport.
6. **Skills Progress Loading**: Custom CSS progress tracks that fill up and animate percentage values on section visibility.
7. **Filterable Projects Grid**: Segmenting projects instantly into Category groups with scale transitions.
8. **Immersive Project Modal**: Custom overlay populating detailed case studies, architectural stacks, and bullet lists dynamically.
9. **Interactive Certificate Mock Modal**: Beautiful certification viewer displaying gilded digital completion certifications.
10. **Validated Contact Forms**: Full client-side input sanitization with responsive error nodes and an automated secure delivery success overlay.
11. **Back-To-Top Anchor**: Floating scroll-top button with interactive bounce motion.

---

## 🛠️ Tech Stack
- **HTML5**: Semantic tags (`header`, `main`, `section`, `footer`) guaranteeing SEO optimization and ARIA accessibility.
- **CSS3**: Custom property definitions (variables), CSS Grid, Flexbox, media queries, keyframes, and transitions.
- **Vanilla JavaScript**: ES6+ modules, Intersection Observer API, Geolocation API, Local Storage API, and DOM manipulation.

---

## 📁 Project Folder Structure

To ensure compatibility with the live Cloud Run preview within AI Studio, the core files are served from the workspace root directory:

```
/
│── index.html              # Main index page structure
│── style.css               # Core CSS variables, resets, layout grids, & keyframes
│── script.js               # Core intersection observers, typing engines, & contact form logic
│── package.json            # Vite configuration details & scripts
│── tsconfig.json           # TS configurations for compiler assertions
│── vite.config.ts          # Vite build engine setup
│── README.md               # Extensive project documentation
│── metadata.json           # Application settings and configurations
│── assets/
│     └── images/           # Dynamic custom generated project artwork & avatars
│           ├── profile_avatar_1784474530925.jpg
│           ├── project_bus_1784474545786.jpg
│           ├── project_raksha_1784474559254.jpg
│           └── project_interior_1784474574005.jpg
```

---

## ⚙️ Customization Guide

### 1. Modifying Personal Details
Open `/index.html` and edit the literal text within the HTML body:
- **Hero Title**: Update the text within `span.hero-name` (e.g. `Aditya D`).
- **Typing Sequence**: To modify roles, open `/script.js` and edit the phrases in the `words` array:
  ```js
  const words = ["Frontend Developer", "Java Programmer", "Software Specialist"];
  ```

### 2. Modifying Core Theme Colors
Colors are fully managed through CSS3 root variables inside `/style.css`.
- To shift the dark theme accents: update `--primary-color` and `--secondary-color` values under `:root`.
- To shift the light theme parameters: update variables under `:root[data-theme="light"]`.

### 3. Adding New Projects
1. Add a new card element in the `projects-grid` container within `/index.html` matching the structure of other cards. Ensure you assign a unique `data-project-id` value to the open-modal button.
2. Register the project specifications inside `projectData` inside `/script.js`:
   ```js
   'your-project-id': {
     title: "Your Project Title",
     category: "Category Name",
     image: "Path to image",
     desc: "Extensive overview...",
     features: ["Bullet Feature 1", "Bullet Feature 2"],
     tech: ["Tag A", "Tag B"]
   }
   ```

---

## 🤝 Contact Information
- **Developer Name**: Aditya D
- **Official Email**: [24x01a0596@nrcmec.org](mailto:24x01a0596@nrcmec.org)
- **Role Openings**: Active for Frontend Development, Software Engineering Internships, & Junior Engineering Positions.
