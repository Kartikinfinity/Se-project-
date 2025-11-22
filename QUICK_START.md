# ⚡ QUICK START - Deploy in 5 Minutes

## 🎯 Fastest Deployment Path

**Recommended**: Render (Backend) + Vercel (Frontend) + MongoDB Atlas (Database)

All platforms offer free tiers! 🎉

---

## 📋 Prerequisites Checklist

- [ ] GitHub account
- [ ] Email for signups
- [ ] 10 minutes of time

---

## 🚀 Step-by-Step (Copy-Paste Ready)

### 1️⃣ Setup MongoDB Atlas (2 min)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up → Create FREE cluster (M0)
3. **Database Access**: Create user (save password!)
4. **Network Access**: Allow from anywhere (0.0.0.0/0)
5. **Get Connection String**: 
   - Connect → Connect your application
   - Copy string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `smartLeaveDB`
   - **SAVE THIS STRING!**

---

### 2️⃣ Deploy Backend to Render (2 min)

1. Go to: https://dashboard.render.com
2. Sign up with GitHub
3. **New +** → **Web Service**
4. Connect your GitHub repo
5. **Settings**:
   ```
   Name: smart-leave-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```
6. **Environment Variables** (Add these):
   ```
   MONGO_URI = (paste your MongoDB string from step 1)
   PORT = 10000
   NODE_ENV = production
   ```
7. Click **Create Web Service**
8. Wait 2-3 minutes
9. **Copy the URL** (e.g., `https://smart-leave-backend.onrender.com`)
10. Test: Visit `https://your-url.onrender.com/health` (should show OK)

---

### 3️⃣ Deploy Frontend to Vercel (1 min)

1. Go to: https://vercel.com
2. Sign up with GitHub
3. **Add New** → **Project**
4. Import your GitHub repo
5. **Settings**:
   ```
   Root Directory: frontend 3
   Framework Preset: Vite (auto)
   ```
6. **Environment Variables**:
   ```
   VITE_API_URL = (paste your backend URL from step 2)
   ```
7. Click **Deploy**
8. Wait 1 minute
9. **Copy the URL** (e.g., `https://smart-leave.vercel.app`)

---

### 4️⃣ Seed Database (1 min)

**Option A: Using Render Shell** (Easiest)

1. Go to Render dashboard → Your backend service
2. Click **Shell** tab
3. Run:
   ```bash
   cd backend
   node seedUsers.js
   node routes/seedTeachers.js
   ```

**Option B: Local** (If you have MongoDB locally)

1. Create `backend/.env`:
   ```env
   MONGO_URI=your-atlas-connection-string
   ```
2. Run:
   ```bash
   cd backend
   npm install
   node seedUsers.js
   node routes/seedTeachers.js
   ```

---

## ✅ Test Your Deployment

1. **Visit your frontend URL**
2. **Login as Student**:
   - Email: `amandubey@amity.edu`
   - Password: `amandubey123`
   - Role: Student
3. **Login as Teacher**:
   - Email: `drkrantikumardewangan@amity.edu`
   - Password: `drkrantikumardewangan123`
   - Role: Teacher
4. **Login as Admin**:
   - Email: `admin@example.com`
   - Password: `admin123`
   - Role: Admin

---

## 🎉 Done!

Your app is now live and accessible from anywhere!

**Frontend**: `https://your-app.vercel.app`  
**Backend**: `https://your-backend.onrender.com`

---

## 🐛 Quick Troubleshooting

**Backend not working?**
- Check Render logs
- Verify MongoDB connection string
- Check environment variables

**Frontend can't connect?**
- Verify `VITE_API_URL` is set
- Check backend is running (visit `/health`)
- Check browser console for errors

**Can't login?**
- Run seed scripts to populate database
- Check MongoDB connection

---

## 📚 Need More Help?

- Full guide: See `DEPLOY_COMPLETE.md`
- Checklist: See `DEPLOYMENT_CHECKLIST.md`
- Environment setup: See `ENV_SETUP.md`

---

**That's it! You're live! 🚀**

