# ⚡ QUICK DEPLOY - 5 Minutes Setup

## 🎯 Fastest Way: Render.com (Free)

### Step 1: MongoDB Atlas (2 minutes)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account → Create free cluster (M0)
3. Click "Connect" → "Connect your application"
4. Copy connection string (looks like: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/...`)
5. Click "Network Access" → Add IP Address → "Allow Access from Anywhere" (0.0.0.0/0)

### Step 2: Deploy Backend (2 minutes)
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - **Name**: `smart-leave-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGO_URI`: (paste your MongoDB connection string)
   - `PORT`: `10000`
6. Click "Create Web Service"
7. **Copy the URL** (e.g., `https://smart-leave-backend.onrender.com`)

### Step 3: Deploy Frontend (1 minute)
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repo
4. Settings:
   - **Root Directory**: `frontend 3`
   - **Framework Preset**: Vite
5. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: (paste your backend URL from Step 2)
6. Click "Deploy"

### ✅ Done! Your app is live!

**Frontend URL**: `https://your-project.vercel.app`
**Backend URL**: `https://smart-leave-backend.onrender.com`

---

## 🔧 Alternative: Railway (One Platform)

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Add two services:
   - **Backend**: Select `backend` folder
     - Add env: `MONGO_URI` = your MongoDB string
   - **Frontend**: Select `frontend 3` folder
     - Add env: `VITE_API_URL` = backend Railway URL
4. Deploy both!

---

## 📝 Important Notes

- **MongoDB**: Use MongoDB Atlas (free tier available)
- **Backend URL**: Will be something like `https://xxx.onrender.com` or `https://xxx.railway.app`
- **Frontend URL**: Will be something like `https://xxx.vercel.app`
- **CORS**: Already configured in backend
- **First Time**: Backend may take 2-3 minutes to start (free tier)

---

## 🐛 Troubleshooting

**Backend not starting?**
- Check MongoDB connection string
- Verify environment variables
- Check Render logs

**Frontend can't connect?**
- Verify `VITE_API_URL` is set correctly
- Check backend is running (visit backend URL in browser)
- Check CORS settings

**Need help?** Check the full `DEPLOYMENT.md` guide.


