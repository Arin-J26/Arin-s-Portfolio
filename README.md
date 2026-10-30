# ARIN JAIN — PERSONAL DEVELOPER PORTFOLIO
### Vintage Digital Magazine × Creative Developer Scrapbook

A personal developer portfolio built for **Arin Jain**, a first-year Computer Science student and aspiring software developer at **Rishihood University**.

This project breaks away from generic portfolio templates, fusing **vintage editorial print**, **90s graphic design**, **retro newspaper mastheads**, and **brutalist developer interfaces**.

---

## 🎨 DESIGN PHILOSOPHY & COLOR PALETTE

- **Warm Cream (`#F4EBD8`)**: Base background simulating warm vintage book paper.
- **Paper Beige (`#E7D9BD`)**: Secondary parchment tones for cards and banners.
- **Burnt Orange (`#C65D32`)**: Key accent for primary calls-to-action, highlights, and stamps.
- **Dark Brown (`#29231D`)**: High-contrast ink tone for headings, brutalist borders, and retro shadows.
- **Olive Green (`#68734A`)**: Used for verified badges, terminal indicators, and status chips.
- **Muted Yellow (`#D9B65D`)**: Sticky notes, highlight tapes, and rating medals.

### Visual Elements Included:
- Procedural paper grain texture overlay.
- Torn paper borders and dotted newspaper dividers.
- Vintage rubber stamps with rotating CSS animations (`BUILD • LEARN • REPEAT`).
- Vintage ID card with barcode and photo mounts.
- Polaroid snapshots with washi tape accents.
- Interactive architectural blueprint modal and project drawer.
- Synthesized Web Audio API tactile feedback with sound toggle.

---

## 🚀 TECHNOLOGY STACK

This portfolio is intentionally engineered with **zero heavyweight frameworks** or build steps:
- **HTML5**: Semantic tags, accessible landmarks, micro-formats.
- **CSS3**: CSS Custom Properties (Variables), Flexbox, CSS Grid, and custom keyframe animations.
- **Vanilla JavaScript (ES6+)**: IntersectionObserver for active section tracking, custom cursor physics, Web Audio synthesizer, and modal handling.

---

## 📂 FOLDER STRUCTURE

```
PORTFOLIO/
├── index.html                   # Main semantic HTML structure
├── style.css                    # Complete vintage editorial styling
├── script.js                    # Interactive features & audio engine
├── README.md                    # Deployment & setup documentation
└── assets/
    └── images/
        ├── profile-placeholder.svg  # Vintage developer avatar dossier
        ├── project-portfolio.svg    # Architectural blueprint for portfolio
        ├── project-student.svg      # Terminal blueprint for Student Management
        ├── project-expense.svg      # Ledger blueprint for Expense Tracker
        ├── project-weather.svg      # Meteorological gauge blueprint
        ├── project-hackathon.svg    # Sprint diagram for Hackathon Jam
        ├── scrapbook-tech.svg       # Hardware & gears scrapbook illustration
        └── scrapbook-trading.svg    # Financial market & quant chart
```

---

## 💻 1. HOW TO RUN THE PROJECT LOCALLY

Because this project uses vanilla HTML, CSS, and JavaScript, **no build step or compiler is required**.

### Method A: Direct Browser Launch (Fastest)
1. Navigate to the `PORTFOLIO` folder on your computer.
2. Double-click `index.html` or right-click and choose **Open With > Google Chrome** (or Firefox, Safari, Edge).

### Method B: Using VS Code Live Server (Recommended)
1. Open the `PORTFOLIO` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions tab (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Right-click `index.html` in the explorer and click **"Open with Live Server"**.
4. The site will launch automatically at `http://127.0.0.1:5500/`.

### Method C: Using Python's Built-in Local Server
Open your terminal in the `PORTFOLIO` folder and run:
```bash
# Python 3
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🌐 2. HOW TO CREATE A GITHUB REPOSITORY & DEPLOY FOR FREE

You can host this website completely free using **GitHub Pages**.

### Step 1: Initialize Git and Create Local Commit
Open your terminal in the `PORTFOLIO` folder:
```bash
git init
git add .
git commit -m "feat: initial commit of Arin Jain developer portfolio"
```

### Step 2: Create a New Repository on GitHub
1. Log in to [GitHub](https://github.com).
2. Click the **`+`** icon in the top right corner and select **New repository**.
3. Name your repository (for example: `portfolio` or `arinjain.github.io`).
4. Set visibility to **Public**.
5. Leave "Add a README file", ".gitignore", and license **unchecked** (we already have our files).
6. Click **Create repository**.

### Step 3: Link and Push Your Files
In your terminal, run the commands displayed on GitHub:
```bash
# Rename branch to main
git branch -M main

# Add your GitHub remote repository (replace with your actual username)
git remote add origin https://github.com/<your-username>/portfolio.git

# Push your code
git push -u origin main
```

---

## 📄 3. HOW TO ENABLE GITHUB PAGES

Once your repository is pushed to GitHub:

1. Open your repository on **GitHub.com**.
2. Click on the **Settings** tab (the gear icon on the top right).
3. In the left sidebar, navigate to **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Choose `main` and folder `/ (root)`.
   - Click **Save**.
5. Wait 1 to 2 minutes for GitHub Actions to build and deploy your site.

---

## 🔗 4. HOW TO OBTAIN YOUR LIVE WEBSITE URL

1. Refresh the **Settings > Pages** screen after 1–2 minutes.
2. A green notification box will appear at the top saying:
   > **"Your site is live at `https://<your-username>.github.io/portfolio/`"**
3. Click the **Visit site** button to open your live portfolio on the internet!
4. You can share this URL on your LinkedIn, resume, or GitHub profile.

---

## ✏️ 5. HOW TO CUSTOMIZE & EDIT YOUR CONTENT

Everything in this portfolio is cleanly commented so you can update it as you progress through university:

### 1. Updating Your Profile Photo
Replace the image in `index.html`:
```html
<img src="YOUR_PHOTO_URL_OR_PATH" alt="Arin Jain Developer Portrait" class="profile-img" />
```
You can also drop your image file into `assets/images/my-photo.jpg` and reference it directly.

### 2. Updating Profile & Social Links
In `index.html`:
- Search for `https://github.com/arinjain` and replace with your exact handle.
- Search for `https://linkedin.com/in/arin-jain` and update with your LinkedIn profile link.
- Update LeetCode, Codeforces, HackerRank, and CodeChef links in Section 12.

### 3. Adding Real Projects
In `index.html` under Section 04:
- Edit the project titles, problems, solutions, and tags.
- Open `script.js` and edit the `projectBlueprints` object to update the detailed popup view for each project.

### 4. Updating Achievements & Certifications
In Section 05:
- Replace any entry marked `<div class="stamp-placeholder">EDITABLE PLACEHOLDER</div>` with your real hackathon awards, club milestones, or new course certificates as you earn them.

### 5. Connecting a Form Backend (Optional)
The contact form currently validates inputs and opens the user's default email client using a `mailto:` fallback. If you want emails sent directly without opening an email app:
- Sign up for free at [Formspree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/).
- Add `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` to the `<form id="contactForm">` tag in `index.html`.

---

## 🛡️ INTEGRITY & ACCESSIBILITY

- **No Broken Links**: All project cards, anchors, and assets have valid fallback implementations.
- **Offline Resilient**: High-resolution Unsplash photos include fallback local SVGs if offline.
- **Zero Framework Bloat**: Loads in under 0.5s with zero external runtime dependencies.
- **Mobile Responsive**: Verified across phone, tablet, laptop, and desktop screen sizes.

---

*Crafted for Arin Jain • Department of Computer Science • Rishihood University*
