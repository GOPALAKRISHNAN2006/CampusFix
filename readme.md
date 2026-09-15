# Student Complaint Management System

A role-based web application designed to streamline the lodging, tracking, and resolution of grievances within an educational institution. The system connects students, staff, and administrators under a unified, transparent workflow.

---

## 👥 User Roles & Features

### 1. Student
* **Account Setup:** Register, log in.
* **Track Status:** Monitor complaint lifecycle (`Pending`, `Assigned`, `In Progress`, `Resolved`).
* **History & Feedback:** View resolved grievances and submit satisfaction ratings or follow-up remarks.

### 2. Staff / Faculty
* **Department Queue:** Access complaints assigned to their specific department or jurisdiction.
* **Resolution Management:** Update ticket status, provide resolution remarks, or escalate complex issues.
* **Direct Communication:** Request additional details or clarification directly from the complainant.

### 3. Administrator
* **User Management:** Create, verify, assign roles
* **Routing & Escalation:** Reassign grievances across departments or handle escalated tickets.
* **Category Control:** Add, edit, or remove grievance categories and priority levels.
* **Analytics & Reports:** Generate data reports on resolution times, recurrent issues, and department performance.

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js (Express)
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Tokens) with role-based middleware
