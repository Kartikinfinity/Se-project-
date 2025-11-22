# 🔐 Environment Variables Setup

## Backend Environment Variables

Create a `.env` file in the `backend` folder with the following:

```env
# MongoDB Connection String
# Get this from MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smartLeaveDB?retryWrites=true&w=majority

# Server Port
# Use 10000 for Render, or let the platform assign (Railway, etc.)
PORT=5000

# Environment
NODE_ENV=production

# Frontend URL (for CORS - optional)
# Can be comma-separated for multiple frontends
FRONTEND_URL=https://your-frontend.vercel.app
```

### For Local Development:
```env
MONGO_URI=mongodb://127.0.0.1:27017/smartLeaveDB
PORT=5000
NODE_ENV=development
```

### For Production (Render):
```env
MONGO_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/smartLeaveDB?retryWrites=true&w=majority
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

---

## Frontend Environment Variables

Create a `.env` file in the `frontend 3` folder with the following:

```env
# Backend API URL
# For local development
VITE_API_URL=http://localhost:5000

# For production (replace with your backend URL)
# VITE_API_URL=https://smart-leave-backend.onrender.com
```

### For Local Development:
```env
VITE_API_URL=http://localhost:5000
```

### For Production (Vercel):
```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## How to Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in to your account
3. Click on your cluster
4. Click "Connect"
5. Choose "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database user password
8. Replace `<dbname>` with `smartLeaveDB` (or your database name)

**Example format:**
```
mongodb+srv://username:YourPassword123@cluster0.xxxxx.mongodb.net/smartLeaveDB?retryWrites=true&w=majority
```

---

## Setting Environment Variables on Platforms

### Render (Backend)
1. Go to your service dashboard
2. Click "Environment" tab
3. Click "Add Environment Variable"
4. Add each variable one by one

### Vercel (Frontend)
1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add `VITE_API_URL` with your backend URL

### Railway
1. Go to your service
2. Click "Variables" tab
3. Add environment variables

---

## Security Notes

⚠️ **Never commit `.env` files to Git!**
- They are already in `.gitignore`
- Always use environment variables on deployment platforms
- Never share your MongoDB connection string publicly

---

## Quick Reference

| Variable | Backend | Frontend | Required |
|----------|---------|----------|----------|
| `MONGO_URI` | ✅ | ❌ | ✅ |
| `PORT` | ✅ | ❌ | ✅ |
| `NODE_ENV` | ✅ | ❌ | Optional |
| `FRONTEND_URL` | ✅ | ❌ | Optional |
| `VITE_API_URL` | ❌ | ✅ | ✅ |

