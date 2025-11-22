# 🚀 COMPLETE DEPLOYMENT GUIDE - Smart Leave System

## 📋 Table of Contents
1. [Quick Start (5 Minutes)](#quick-start)
2. [Step-by-Step Deployment](#step-by-step-deployment)
3. [Database Setup](#database-setup)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment](#post-deployment)
6. [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Start (5 Minutes)

### Prerequisites
- GitHub account (to host your code)
- Email account (for platform signups)

### Recommended Stack (All Free)
- **Backend**: Render.com (Free tier)
- **Frontend**: Vercel.com (Free tier)
- **Database**: MongoDB Atlas (Free tier)

---

## 📝 Step-by-Step Deployment

### Step 1: Push Code to GitHub (2 minutes)

1. **Create GitHub Repository**:
   ```bash
   # If not already on GitHub
   git init
   git add .
   git commit -m "Initial commit - Smart Leave System"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/smart-leave-system.git
   git push -u origin main
   ```

2. **Make sure your repository is public** (for free tiers)

---

### Step 2: Setup MongoDB Atlas (3 minutes)

1. **Create Account**:
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up with email or Google

2. **Create Free Cluster**:
   - Click "Build a Database"
   - Choose **FREE** (M0) tier
   - Select region closest to you
   - Click "Create"

3. **Setup Database Access**:
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `smartleaveuser` (or your choice)
   - Password: Generate secure password (SAVE IT!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Setup Network Access**:
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `smartLeaveDB`
   - **Example**: `mongodb+srv://smartleaveuser:YourPassword123@cluster0.xxxxx.mongodb.net/smartLeaveDB?retryWrites=true&w=majority`
   - **SAVE THIS STRING** - You'll need it in Step 3!

---

### Step 3: Deploy Backend to Render (3 minutes)

1. **Create Render Account**:
   - Go to https://dashboard.render.com
   - Sign up with GitHub

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**:
   - **Name**: `smart-leave-backend` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable"
   
   Add these variables:
   ```
   MONGO_URI = mongodb+srv://smartleaveuser:YourPassword@cluster0.xxxxx.mongodb.net/smartLeaveDB?retryWrites=true&w=majority
   PORT = 10000
   NODE_ENV = production
   ```
   (Use your actual MongoDB connection string from Step 2)

5. **Deploy**:
   - Click "Create Web Service"
   - Wait 2-3 minutes for first deployment
   - **Copy the URL** (e.g., `https://smart-leave-backend.onrender.com`)
   - **SAVE THIS URL** - You'll need it in Step 4!

6. **Verify Backend**:
   - Visit: `https://your-backend-url.onrender.com/health`
   - Should see: `{"status":"ok","message":"Server is running"}`

---

### Step 4: Deploy Frontend to Vercel (2 minutes)

1. **Create Vercel Account**:
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `frontend 3`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://your-backend-url.onrender.com` (from Step 3)
   - Click "Save"

5. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes
   - **Copy the URL** (e.g., `https://smart-leave-system.vercel.app`)

6. **Update Backend CORS** (Optional but Recommended):
   - Go back to Render dashboard
   - Edit your backend service
   - Add environment variable:
     - **Key**: `FRONTEND_URL`
     - **Value**: `https://your-frontend-url.vercel.app`
   - Save and redeploy

---

### Step 5: Seed Database (2 minutes)

After deployment, you need to populate the database with users.

**Option A: Using Render Shell (Recommended)**

1. Go to Render dashboard → Your backend service
2. Click "Shell" tab
3. Run these commands:
   ```bash
   cd backend
   node seedUsers.js
   node routes/seedTeachers.js
   ```

**Option B: Using MongoDB Atlas**

1. Go to MongoDB Atlas → Your cluster
2. Click "Browse Collections"
3. Create database: `smartLeaveDB`
4. Use the seed scripts locally (connect to Atlas):
   ```bash
   # Update .env with Atlas connection string
   cd backend
   node seedUsers.js
   node routes/seedTeachers.js
   ```

**Option C: Create Admin via API** (After seeding)

Visit your backend URL and use the register endpoint or admin panel.

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed and accessible (`/health` endpoint works)
- [ ] Frontend deployed and accessible
- [ ] MongoDB Atlas connected
- [ ] Environment variables set correctly
- [ ] Database seeded with users
- [ ] Test login with student credentials
- [ ] Test login with teacher credentials
- [ ] Test login with admin credentials
- [ ] Test leave application flow
- [ ] Test teacher approval flow

---

## 🔧 Environment Variables Reference

### Backend (Render)
```
MONGO_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/smartLeaveDB?retryWrites=true&w=majority
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app (optional)
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- **Solution**: Check Render logs
- **Common causes**: 
  - Wrong MongoDB connection string
  - Missing environment variables
  - Port mismatch (should be 10000 for Render)

**Problem**: "MongoDB Connection Error"
- **Solution**: 
  - Verify MongoDB Atlas network access (0.0.0.0/0)
  - Check connection string format
  - Verify database user credentials

**Problem**: CORS errors
- **Solution**: 
  - Add `FRONTEND_URL` environment variable in Render
  - Or allow all origins (already configured)

### Frontend Issues

**Problem**: "Cannot connect to API"
- **Solution**: 
  - Verify `VITE_API_URL` is set in Vercel
  - Check backend is running (visit backend URL)
  - Verify backend URL is correct (no trailing slash)

**Problem**: "404 Not Found" on routes
- **Solution**: 
  - Check `vercel.json` exists in `frontend 3` folder
  - Verify rewrites configuration

**Problem**: Build fails
- **Solution**: 
  - Check Vercel build logs
  - Verify all dependencies in `package.json`
  - Check for syntax errors

### Database Issues

**Problem**: "User not found" after login
- **Solution**: 
  - Run seed scripts to populate database
  - Check MongoDB connection
  - Verify users exist in database

**Problem**: Seed scripts not working
- **Solution**: 
  - Verify MongoDB connection string
  - Check database name matches (`smartLeaveDB`)
  - Run scripts from Render shell or locally

---

## 🔄 Alternative Deployment Options

### Option 1: Railway (All-in-One)

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Add two services:
   - **Backend**: `backend` folder
   - **Frontend**: `frontend 3` folder
4. Add environment variables for each service
5. Deploy!

### Option 2: Netlify (Frontend) + Render (Backend)

**Frontend on Netlify**:
1. Go to https://netlify.com
2. "Add new site" → "Import an existing project"
3. Connect GitHub → Select `frontend 3` folder
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variable: `VITE_API_URL`

**Backend**: Same as Step 3 above

---

## 📞 Support & Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Project Issues**: Check deployment logs first

---

## 🎉 Success!

Once deployed, your app will be accessible from anywhere:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

**Default Login Credentials** (after seeding):
- **Student**: Use any student email from seed file
- **Teacher**: Use any teacher email from seed file
- **Admin**: `admin@example.com` / `admin123`

---

**Made with ❤️ - Smart Leave Management System**

