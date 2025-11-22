// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_URL}/api/auth/login`,
  REGISTER: `${API_URL}/api/auth/register`,
  
  // Student
  STUDENT_DASHBOARD: (id) => `${API_URL}/api/student/dashboard/${id}`,
  STUDENT_LEAVES: (id) => `${API_URL}/api/student/leaves/${id}`,
  
  // Leave
  APPLY_LEAVE: `${API_URL}/api/leave/apply`,
  
  // Teacher
  TEACHER_PENDING: (id) => `${API_URL}/api/teacher/pending/${id}`,
  TEACHER_HISTORY: (id) => `${API_URL}/api/teacher/history/${id}`,
  APPROVE_LEAVE: (id) => `${API_URL}/api/teacher/approve/${id}`,
  REJECT_LEAVE: (id) => `${API_URL}/api/teacher/reject/${id}`,
  
  // Admin
  ADD_SUBJECT: `${API_URL}/api/admin/add-subject`,
  ADD_TEACHER: `${API_URL}/api/admin/add-teacher`,
  GET_SUBJECTS: `${API_URL}/api/admin/subjects`,
  GET_TEACHERS: `${API_URL}/api/admin/teachers`,
  ASSIGN_TEACHER: `${API_URL}/api/admin/assign-teacher`,
};


