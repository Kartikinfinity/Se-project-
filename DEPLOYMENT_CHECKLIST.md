# ✅ Deployment Checklist

Use this checklist to ensure your deployment is complete and working.

## Pre-Deployment

- [ ] Code is pushed to GitHub
- [ ] All files are committed
- [ ] No sensitive data in code (use environment variables)
- [ ] `.env` files are in `.gitignore`

## MongoDB Atlas Setup

- [ ] Account created at mongodb.com/cloud/atlas
- [ ] Free cluster (M0) created
- [ ] Database user created with read/write permissions
- [ ] Network access configured (0.0.0.0/0 for all IPs)
- [ ] Connection string copied and saved
- [ ] Connection string tested (replace password and dbname)

## Backend Deployment (Render)

- [ ] Render account created
- [ ] GitHub repository connected
- [ ] Web service created
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Environment variables added:
  - [ ] `MONGO_URI` (MongoDB connection string)
  - [ ] `PORT` = `10000`
  - [ ] `NODE_ENV` = `production`
  - [ ] `FRONTEND_URL` (optional, for CORS)
- [ ] Service deployed successfully
- [ ] Health check works: `https://your-backend.onrender.com/health`
- [ ] Backend URL saved

## Frontend Deployment (Vercel)

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project imported
- [ ] Root directory set to `frontend 3`
- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variable added:
  - [ ] `VITE_API_URL` = backend URL
- [ ] Project deployed successfully
- [ ] Frontend URL saved

## Database Seeding

- [ ] Seed scripts run (seedUsers.js)
- [ ] Teachers seeded (seedTeachers.js)
- [ ] Database contains users
- [ ] Can verify users in MongoDB Atlas

## Testing

### Backend Tests
- [ ] Health endpoint works: `/health`
- [ ] API endpoints accessible
- [ ] CORS configured correctly
- [ ] No errors in Render logs

### Frontend Tests
- [ ] Frontend loads without errors
- [ ] Can access login page
- [ ] API connection works (check browser console)
- [ ] No CORS errors

### Login Tests
- [ ] Student login works
  - [ ] Email: `amandubey@amity.edu`
  - [ ] Password: `amandubey123`
  - [ ] Role: Student
- [ ] Teacher login works
  - [ ] Email: `drkrantikumardewangan@amity.edu`
  - [ ] Password: `drkrantikumardewangan123`
  - [ ] Role: Teacher
- [ ] Admin login works
  - [ ] Email: `admin@example.com`
  - [ ] Password: `admin123`
  - [ ] Role: Admin

### Feature Tests
- [ ] Student can view dashboard
- [ ] Student can apply for leave
- [ ] Teacher can view pending leaves
- [ ] Teacher can approve/reject leaves
- [ ] Admin can add subjects
- [ ] Admin can add teachers
- [ ] Admin can assign teachers to subjects

## Post-Deployment

- [ ] All URLs documented
- [ ] Environment variables documented
- [ ] Team members have access
- [ ] Monitoring set up (optional)
- [ ] Backup strategy in place (MongoDB Atlas has automatic backups)

## Troubleshooting Checklist

If something doesn't work:

- [ ] Check backend logs in Render
- [ ] Check frontend build logs in Vercel
- [ ] Verify MongoDB connection string
- [ ] Verify environment variables are set
- [ ] Check CORS configuration
- [ ] Verify database is seeded
- [ ] Test API endpoints directly
- [ ] Check browser console for errors
- [ ] Verify URLs are correct (no typos)

## Final Verification

- [ ] App is accessible from anywhere
- [ ] All features working
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Ready for production use

---

**Deployment Date**: _______________
**Backend URL**: _______________
**Frontend URL**: _______________
**MongoDB Cluster**: _______________

---

✅ **All checked? Your app is ready!** 🎉

