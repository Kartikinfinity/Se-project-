# 🚀 Deployment Guide - Smart Leave Management System

## Quick Deploy Options

### Option 1: Render.com (Recommended - Free Tier)

#### Backend Deployment (Render)

1. **Create Account**: Go to [render.com](https://render.com) and sign up

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder
   - Settings:
     - **Name**: `smart-leave-backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Port**: `10000` (Render default)

3. **Environment Variables**:
   - `MONGO_URI`: Your MongoDB connection string
     - Get free MongoDB from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - `PORT`: `10000`
   - `NODE_ENV`: `production`

4. **Deploy**: Click "Create Web Service"

#### Frontend Deployment (Vercel)

1. **Create Account**: Go to [vercel.com](https://vercel.com) and sign up

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the `frontend 3` folder

3. **Configure**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://smart-leave-backend.onrender.com`)

5. **Deploy**: Click "Deploy"

---

### Option 2: Railway (Full Stack - Easy)

1. **Create Account**: [railway.app](https://railway.app)

2. **Deploy Backend**:
   - New Project → "Deploy from GitHub repo"
   - Select `backend` folder
   - Add Environment Variables:
     - `MONGO_URI`: Your MongoDB connection string
   - Railway auto-detects Node.js

3. **Deploy Frontend**:
   - Add Service → "Deploy from GitHub repo"
   - Select `frontend 3` folder
   - Add Environment Variable:
     - `VITE_API_URL`: Your backend Railway URL

4. **Get URLs**: Railway provides URLs automatically

---

### Option 3: Netlify (Frontend) + Render (Backend)

#### Backend: Same as Option 1

#### Frontend: Netlify

1. Go to [netlify.com](https://netlify.com)
2. "Add new site" → "Import an existing project"
3. Connect GitHub → Select `frontend 3` folder
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variable:
   - `VITE_API_URL`: Your backend URL

---

## MongoDB Setup (Required)

1. **Create Free MongoDB Atlas Account**:
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create Cluster**:
   - Choose free tier (M0)
   - Select region closest to you
   - Create cluster

3. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Add your IP to whitelist (or use 0.0.0.0/0 for all)

4. **Connection String Format**:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smartLeaveDB?retryWrites=true&w=majority
   ```

---

## Environment Variables Summary

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smartLeaveDB?retryWrites=true&w=majority
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed with correct API URL
- [ ] MongoDB connected
- [ ] Test login functionality
- [ ] Test leave application
- [ ] Test teacher approval
- [ ] Test admin functions

---

## Quick Deploy Commands (If using CLI)

### Render CLI
```bash
npm install -g render-cli
render login
render deploy
```

### Vercel CLI
```bash
npm install -g vercel
cd "frontend 3"
vercel
```

---

## Support

If you face any issues:
1. Check backend logs in Render dashboard
2. Check frontend build logs in Vercel
3. Verify MongoDB connection string
4. Ensure CORS is enabled in backend
5. Check environment variables are set correctly

---

**Recommended**: Use **Render for Backend** + **Vercel for Frontend** (Both free tiers available)


