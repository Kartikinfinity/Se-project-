# 🚀 START HERE - Deploy in 5 Minutes!

## ⚡ Fastest Deployment Path

### 1️⃣ Get MongoDB (2 min)
- Visit: https://www.mongodb.com/cloud/atlas/register
- Sign up → Create FREE cluster
- Click "Connect" → "Connect your application"
- **Copy the connection string** (save it!)

### 2️⃣ Deploy Backend (2 min)
- Visit: https://dashboard.render.com
- Sign up (free)
- Click "New +" → "Web Service"
- Connect GitHub → Select your repo
- **Settings**:
  ```
  Name: smart-leave-backend
  Root Directory: backend
  Environment: Node
  Build Command: npm install
  Start Command: npm start
  ```
- **Environment Variables**:
  - `MONGO_URI` = (paste your MongoDB string)
  - `PORT` = `10000`
- Click "Create Web Service"
- **Wait 2-3 minutes** → Copy the URL (e.g., `https://smart-leave-backend.onrender.com`)

### 3️⃣ Deploy Frontend (1 min)
- Visit: https://vercel.com
- Sign up (free)
- Click "Add New" → "Project"
- Import GitHub repo
- **Settings**:
  ```
  Root Directory: frontend 3
  Framework: Vite
  ```
- **Environment Variable**:
  - `VITE_API_URL` = (paste your backend URL from step 2)
- Click "Deploy"

### ✅ DONE! 

**Your App URL**: Check Vercel dashboard for your frontend URL!

---

## 🎯 What You'll Get

- **Frontend URL**: `https://your-project.vercel.app` ✅
- **Backend URL**: `https://smart-leave-backend.onrender.com` ✅

Both are **FREE** and **LIVE**!

---

## 📱 Test Your Deployment

1. Open your Vercel frontend URL
2. Try logging in (create users via admin panel)
3. Test leave application
4. Test teacher approval

---

## ⚠️ Important

- First deployment takes 2-3 minutes
- Backend may sleep after 15 min inactivity (free tier)
- MongoDB Atlas is free forever (512MB)

---

## 🆘 Need Help?

Check `QUICK_DEPLOY.md` for detailed steps or `DEPLOYMENT.md` for full guide.

**You're all set! 🎉**


