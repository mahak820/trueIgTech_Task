# FitPlanHub Backend (Node + Express + MongoDB)

This is the backend API for FitPlanHub with Authentication, Plan Management, and Subscriptions.

## 🚀 Setup
npm install
npm run dev

bash
Copy code
Create `.env`:
MONGO_URI=your_uri
JWT_SECRET=your_key
PORT=5000

markdown
Copy code

## 📌 Routes Overview

### 🔐 Auth — `/api/auth`
- POST `/register`
- POST `/login`

### 📝 Plans — `/api/plans`
(Trainer Only)
- POST `/` → create plan  
- GET `/my-plans`  
- PUT `/:id`  
- DELETE `/:id`  
(All Users)
- GET `/:id` → view plan  

### 💳 Subscription — `/api/subscribe`
- POST `/:planId` → buy plan  
- GET `/my-subscriptions`

## 🧪 Testing (Postman)
1. Register → Login → Copy Token  
2. Add Header:
Authorization: Bearer <token>

bash
Copy code
3. Test trainer/user routes.

## 🟢 Root
`GET /` → `{ "mssg": "hello server" }`

## ✔ Tech Used
Node.js, Express, MongoDB, JWT, Middleware.
