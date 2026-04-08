# 🚀 Portfolio Deployment Guide

## Quick Deployment to GitHub Pages

Follow these steps to deploy your portfolio website to GitHub Pages:

### 1. Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Create a new repository** with the name: `manju-murthy.github.io`
   - ✅ Make it **Public**
   - ❌ **Do NOT** initialize with README, .gitignore, or license (we already have these)
3. **Copy the repository URL** (HTTPS or SSH)

### 2. Connect Local Repository to GitHub

```bash
# Navigate to your portfolio directory
cd /Users/rp/Desktop/portfolio-site

# Add GitHub remote (replace with your actual repository URL)
git remote add origin https://github.com/manju-murthy/manju-murthy.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down to "Pages"** section
4. **Under "Source"**, select **"Deploy from a branch"**
5. **Select branch**: `main`
6. **Select folder**: `/ (root)`
7. **Click "Save"**

### 4. Access Your Live Site

- **Your portfolio will be available at**: `https://manju-murthy.github.io/`
- **Initial deployment takes**: 5-10 minutes
- **Updates deploy automatically** when you push changes

---

## Alternative Deployment Options

### Option A: Different Repository Name

If you want a different repository name:

1. Create repository with any name (e.g., `portfolio`)
2. Your site will be at: `https://manju-murthy.github.io/portfolio/`
3. Update all internal links in `index.html` to include the repository name

### Option B: Custom Domain

To use your own domain (e.g., `manjumurthy.com`):

1. **Create a CNAME file**:
   ```bash
   echo "manjumurthy.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **Configure DNS with your domain provider**:
   - Add CNAME record: `www` → `manju-murthy.github.io`
   - Add A records for apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Enable HTTPS** in GitHub Pages settings (takes 24-48 hours)

---

## 📝 Making Updates

### Content Updates

1. **Edit files locally**:
   - `index.html` - Main content
   - `styles.css` - Styling changes
   - `script.js` - Functionality updates

2. **Test changes locally**:
   ```bash
   # Serve locally to test
   python -m http.server 8000
   # Open http://localhost:8000
   ```

3. **Deploy updates**:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push
   ```

### Adding New Projects

1. **Add project card** in the `.projects-grid` section of `index.html`
2. **Include**:
   - Project image/background
   - Title and description
   - Technology tags
   - GitHub/demo links
   - Key metrics

3. **Update README.md** with new project information

---

## 🔧 Maintenance Tips

### Regular Updates

- **Update achievements** and metrics monthly
- **Add new articles** from Medium/LinkedIn
- **Refresh project descriptions** based on recent work
- **Update education status** (graduation date, new certifications)

### Performance Monitoring

- **Check Google PageSpeed Insights** quarterly
- **Monitor mobile responsiveness** across devices
- **Update dependencies** if using any external libraries

### SEO Maintenance

- **Update sitemap.xml** when adding new sections
- **Refresh meta descriptions** for current achievements
- **Monitor Google Search Console** for indexing issues

---

## 🛠️ Troubleshooting

### Common Issues

1. **Site not loading**:
   - Check GitHub Pages is enabled
   - Verify branch is set to `main`
   - Wait 10-15 minutes for initial deployment

2. **Images not showing**:
   - Ensure image paths are relative
   - Check file extensions are correct
   - Verify images are committed to repository

3. **Custom domain not working**:
   - Verify DNS settings with your provider
   - Check CNAME file contains only the domain
   - Allow 24-48 hours for DNS propagation

4. **Mobile layout issues**:
   - Test on actual devices, not just browser dev tools
   - Check viewport meta tag is present
   - Validate CSS media queries

### Getting Help

- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **GitHub Community**: https://github.community/
- **Web Developer Tools**: Use browser dev tools for debugging

---

## 📊 Analytics Setup (Optional)

### Google Analytics 4

1. **Create GA4 property** for your domain
2. **Add tracking code** to `index.html` before `</head>`:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### LinkedIn Insight Tag

Add to track professional profile visitors:
```html
<script type="text/javascript">
_linkedin_partner_id = "YOUR_PARTNER_ID";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
```

---

## ✅ Final Checklist

Before going live, ensure:

- [ ] All links work correctly
- [ ] Contact information is accurate
- [ ] Resume link points to latest version
- [ ] Project links are functional
- [ ] Mobile responsiveness is tested
- [ ] SEO meta tags are complete
- [ ] Social media links are correct
- [ ] Professional photo/avatar is included (if desired)
- [ ] Spelling and grammar are error-free
- [ ] GitHub repository is public
- [ ] README.md is comprehensive

---

**🎉 Congratulations! Your professional portfolio is ready to help you land your next AI/ML Product Leadership role!**