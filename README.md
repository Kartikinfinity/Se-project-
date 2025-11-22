# 🎓 Smart Leave & Attendance Management System

A full-stack MERN application for managing student leave requests, teacher approvals, and admin controls.

## ✨ Features

- **Student**: Apply leave, view balance, track status
- **Teacher**: Approve/reject leaves, view history
- **Admin**: Manage subjects, teachers, assignments

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm

### Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# MONGO_URI=mongodb://127.0.0.1:27017/smartLeaveDB
# PORT=5000
npm run dev
```

### Frontend Setup
```bash
cd "frontend 3"
npm install
npm run dev
```

Visit: http://localhost:5173

## 🌐 Deploy to Production

### 🚀 Quick Start (5 Minutes)
**Start here**: [QUICK_START.md](./QUICK_START.md) - Fastest way to deploy!

### 📚 Complete Guides
- **Full Deployment Guide**: [DEPLOY_COMPLETE.md](./DEPLOY_COMPLETE.md) - Step-by-step instructions
- **Environment Setup**: [ENV_SETUP.md](./ENV_SETUP.md) - Environment variables guide
- **Deployment Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Ensure nothing is missed

### 🎯 Recommended Stack (All Free!)
- **Backend**: Render.com (free tier)
- **Frontend**: Vercel.com (free tier)
- **Database**: MongoDB Atlas (free tier)

### ⚡ Quick Deploy Steps
1. Setup MongoDB Atlas (2 min)
2. Deploy backend to Render (2 min)
3. Deploy frontend to Vercel (1 min)
4. Seed database (1 min)

**Total time: ~5 minutes!** See [QUICK_START.md](./QUICK_START.md) for details.

## 📁 Project Structure

```
SE PROJECT/
├── backend/          # Express.js API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend 3/      # React + Vite
│   ├── src/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🔑 Default Credentials

Create users via seed scripts or admin panel.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, CSS3
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: bcryptjs
- **Database**: MongoDB with Mongoose

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/smartLeaveDB
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## 🚀 Deployment Status

Ready for deployment! Follow [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for 5-minute setup.

## 📧 Support

For issues or questions, check the deployment guides or open an issue.

---

**Made with ❤️ for Smart Leave Management**


