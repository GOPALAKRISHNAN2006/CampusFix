# CampusFix

CampusFix is a full-stack college complaint management system that allows students to report campus-related issues and track their complaints until resolution.

The system provides separate dashboards and role-based access for Students, Admins, and Staff, making the complaint management process organized, transparent, and efficient.

---

## Features

### Student

- Register and login
- Submit campus complaints
- View submitted complaints
- View complaint details
- Track complaint status
- View assigned staff
- View resolution details
- Close resolved complaints

### Admin

- Secure admin login
- View all complaints
- View complete complaint details
- Create staff accounts
- View available staff
- Assign complaints to staff
- Monitor complaint status

### Staff

- Secure staff login
- View assigned complaints
- View complaint details
- Start working on complaints
- Resolve complaints
- Add resolution details
- Track complaint status

---

## Complaint Workflow
```text
Student submits complaint
          ↓
       Pending
          ↓
Admin assigns staff
          ↓
       Assigned
          ↓
Staff starts work
          ↓
     In-Progress
          ↓
Staff resolves complaint
          ↓
       Resolved
          ↓
Staff adds resolution
          ↓
Student reviews resolution
          ↓
Student closes complaint
          ↓
        Closed
User Roles
Role	Responsibilities
Student	Create and track complaints
Admin	Manage complaints and assign staff
Staff	Handle and resolve assigned complaints
Tech Stack
Frontend
React.js
JavaScript
HTML
CSS
React Router
Axios
Vite
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
bcryptjs
dotenv
CORS
Project Structure
CampusFix/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   └── Navbar/
│   │   │       ├── Navbar.jsx
│   │   │       └── Navbar.css
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── student/
│   │   │   ├── admin/
│   │   │   └── staff/
│   │   │
│   │   ├── routes/
│   │   │   ├── ProtectedRoutes.jsx
│   │   │   └── RoleRoute.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── complaintServices.js
│   │   │   ├── adminServices.js
│   │   │   └── staffServices.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
Main API Routes
Authentication
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
Student
POST  /api/complaints
GET   /api/complaints/my
GET   /api/complaints/:id
PATCH /api/complaints/:complaintId/close
Admin
GET   /api/admin/complaints
GET   /api/admin/complaints/:id
POST  /api/admin/staff
GET   /api/admin/staff
PATCH /api/admin/complaints/:complaintId/assign
Staff
GET   /api/staff/complaints
GET   /api/staff/complaints/:id
PATCH /api/staff/complaints/:complaintId/start
PATCH /api/staff/complaints/:complaintId/resolve
PATCH /api/staff/complaints/:complaintId/resolution
Authentication & Authorization

CampusFix uses JWT-based authentication.

After login, the authenticated user receives a JWT token that is used for protected API requests.

Role-based authorization ensures that users can only access functionality belonging to their role.

JWT Authentication
       ↓
Protect Middleware
       ↓
Role Authorization
       ↓
Student / Admin / Staff
Installation
1. Clone the Repository
git clone <your-repository-url>
cd CampusFix
2. Install Backend Dependencies
cd server
npm install
3. Configure Environment Variables

Create a .env file inside the server directory.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
4. Start the Backend
npm run dev

Backend:

http://localhost:5000
Frontend Setup

Open another terminal:

cd client
npm install

Start the frontend:

npm run dev

Frontend:

http://localhost:5173
Environment Variables

Never commit sensitive environment variables to GitHub.

Example .env.example:

PORT=5000
MONGO_URI=
JWT_SECRET=

Make sure .env is included in .gitignore.

API Architecture
React Frontend
      │
      │ Axios
      ↓
Express REST API
      │
      ├── Authentication
      ├── Student APIs
      ├── Admin APIs
      └── Staff APIs
      │
      ↓
MongoDB
Security
JWT-based authentication
Password hashing using bcryptjs
Role-based authorization
Protected API routes
Environment variables for sensitive configuration
CORS configuration
Authentication token validation
Modules
Student
Home
Login
Register
Student Dashboard
My Complaints
Complaint Details
Create Complaint
Close Complaint
Admin
Admin Dashboard
All Complaints
Complaint Details
Create Staff
Assign Staff
Staff
Staff Dashboard
Assigned Complaints
Complaint Details
Start Work
Resolve Complaint
Add Resolution
Future Enhancements
Complaint image upload
Email notifications
Push notifications
Admin analytics and charts
Complaint filtering and searching
Staff performance analytics
Complaint history/timeline
Pagination
Real-time status updates
Improved mobile responsiveness
Learning Outcomes

Through this project, the following concepts were implemented:

React component development
React Hooks
React Router
Protected routes
Role-based routing
REST API integration
Axios
JWT authentication
Express.js REST APIs
MongoDB and Mongoose
CRUD operations
Middleware
API error handling
Frontend state management
Full-stack application architecture
Author

Gopalakrishnan M

B.Tech Information Technology

License

This project is developed for educational and portfolio purposes.
