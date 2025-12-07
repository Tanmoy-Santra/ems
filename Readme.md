## Employee Management System
## ==========================

### UI - React , tailwind css
### DB - Mysql

- Employee / Administrator login
- Employee make their account / fill details / Check their attendence / track salary / edit profile
- Admin can manage employee / send emails / add notice / disburst salary

## Folder Structure

ems-backend/
├── src/
│   ├── config/
│   │   └── db.js                # MySQL connection
│   │
│   ├── controllers/
│   │   ├── auth.controller.js   # employee/admin login & signup
│   │   ├── employee.controller.js  # employee profile, attendance, salary view
│   │   ├── admin.controller.js  # admin actions: manage employees, notice, salary
│   │   ├── attendance.controller.js
│   │   ├── salary.controller.js
│   │   └── notice.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js   # verify JWT, check role (admin/employee)
│   │   └── error.middleware.js
│   │
│   ├── models/
│   │   ├── employee.model.js    # DB queries related to employees
│   │   ├── admin.model.js
│   │   ├── attendance.model.js
│   │   ├── salary.model.js
│   │   └── notice.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── employee.routes.js
│   │   ├── admin.routes.js
│   │   ├── attendance.routes.js
│   │   ├── salary.routes.js
│   │   └── notice.routes.js
│   │
│   ├── utils/
│   │   ├── sendEmail.js        # Email sender (nodemailer)
│   │   └── helpers.js          # common utility functions
│   │
│   ├── app.js                  # Express app setup
│   └── server.js               # Start server
│
├── .env                         # DB credentials, JWT secret
├── package.json
└── README.md
