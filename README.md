# Job Portal Backend 

This is the backend server for the MERN Stack Job Portal application. It handles user authentication, job postings, applications, and automated newsletter functionality.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Job Management**: Create, read, update, and delete job postings
- **Job Applications**: Users can apply for jobs and manage their applications
- **Newsletter**: Automated newsletter system using Cron jobs
- **Email Notifications**: Send emails to users and job applicants
- **Error Handling**: Comprehensive error handling middleware
- **Security**: Environment variables for sensitive data

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **Task Scheduling**: Node Cron
- **Environment Management**: dotenv

## Project Structure

```backend/
├── app.js                    # Express app configuration
├── server.js                 # Server entry point
├── package.json              # Dependencies and scripts
├── automation/               # Automated tasks
│   └── newsLetterCron.js     # Newsletter scheduling
├── config/                   # Configuration files
│   └── config.env            # Environment variables
├── controllers/              # Request handlers
│   ├── applicationController.js
│   ├── jobController.js
│   └── userController.js
├── database/                 # Database connection
│   └── connection.js
├── middlewares/              # Express middlewares
│   ├── auth.js               # Authentication middleware
│   ├── catchAsyncErrors.js   # Error catching wrapper
│   └── error.js              # Error handler middleware
├── models/                   # MongoDB schemas
│   ├── applicationSchema.js
│   ├── jobSchema.js
│   └── userSchema.js
├── routes/                   # API routes
│   ├── applicationRouter.js
│   ├── jobRouter.js
│   └── userRouter.js
└── utils/                    # Utility functions
    ├── jwtToken.js           # JWT token generation
    ├── sendEmail.js          # Email sending utility
    └── emailTemplates/       # Email templates
        └── jobNewsletterTemplate.js
```

## Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   Create a `config/config.env` file with the following variables:

   ```env
   PORT=4000
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   COOKIE_EXPIRE=7

   SMTP_HOST=your_email_service_host
   SMTP_PORT=your_email_service_port
   SMTP_USER=your_email_address
   SMTP_PASS=your_email_password
   ```

## Running the Server

- **Development Mode** (with auto-reload):

  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

## API Endpoints

### User Routes (`/api/v1/user`)

- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /logout` - Logout user
- `GET /me` - Get current user profile
- `PUT /update/profile` - Update user profile
- `PUT /update/password` - Update user password

### Job Routes (`/api/v1/job`)

- `GET /` - Get all jobs (with filters)
- `POST /` - Create a new job posting
- `GET /:id` - Get job details
- `PUT /:id` - Update job posting
- `DELETE /:id` - Delete job posting

### Application Routes (`/api/v1/application`)

- `GET /` - Get all applications
- `POST /` - Submit a job application
- `DELETE /:id` - Withdraw application

## Middleware

### `auth.js`

Verifies JWT token and authenticates requests. Attaches user information to the request object.

### `catchAsyncErrors.js`

Wrapper function to catch errors in async route handlers and pass them to the error middleware.

### `error.js`

Global error handler middleware that formats and sends error responses to clients.

## Database Models

### User Schema

- Email and password (hashed)
- First and last name
- Phone number
- Role (user/employer)
- Timestamps

### Job Schema

- Title, description, location
- Salary range
- Skills required
- Posted by (user reference)
- Timestamps

### Application Schema

- Applicant (user reference)
- Job applied to (job reference)
- Status (pending/accepted/rejected)
- Timestamps

## Email Configuration

The backend uses Nodemailer for sending emails. Configure SMTP settings in `config.env`:

- For Gmail: Use App Password (not regular password)
- For other services: Use the respective SMTP credentials

## Automated Tasks

### Newsletter Cron Job

- Runs on a scheduled basis (configured in `automation/newsLetterCron.js`)
- Sends job newsletter to subscribed users
- Uses email templates from `utils/emailTemplates/`

## Error Handling

All errors are caught by the `catchAsyncErrors` middleware and processed by the global error handler. Errors include:

- Authentication errors
- Validation errors
- Database errors
- Server errors

## Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens are used for session management
- Environment variables store sensitive data
- CORS headers are configured
- Input validation on routes

## Future Enhancements

- Add rate limiting
- Implement pagination
- Add file upload for resumes
- Enhanced search and filtering
- Admin dashboard

````````` ##`

# Job Portal Frontend

This is the frontend application for the MERN Stack Job Portal. It provides a user-friendly interface for job seekers and employers to interact with the job portal.

## Features

- **User Authentication**: Register, login, and secure session management
- **Job Browsing**: View and search available job postings
- **Job Applications**: Apply for jobs and track application status
- **User Dashboard**: Manage profile, applications, and posted jobs
- **Job Posting**: Employers can post new job opportunities
- **Profile Management**: Update personal information and password
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: State management with Redux for seamless data flow

## Tech Stack

- **Frontend Framework**: React.js
- **State Management**: Redux & Redux Toolkit
- **Build Tool**: Vite
- **Styling**: CSS
- **HTTP Client**: Axios
- **Routing**: React Router

## Project Structure

```frontend/
├── index.html                # Main HTML file
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── App.jsx                   # Main App component
├── App.css                   # Global styles
├── main.jsx                  # Entry point
├── public/                   # Static assets
├── src/
│   ├── components/           # Reusable components
│   │   ├── Applications.jsx   # View applications
│   │   ├── Footer.jsx         # Footer component
│   │   ├── Hero.jsx           # Hero section
│   │   ├── HowItWorks.jsx     # How it works section
│   │   ├── JobPost.jsx        # Job posting component
│   │   ├── MyApplications.jsx # User's applications
│   │   ├── MyJobs.jsx         # Employer's posted jobs
│   │   ├── MyProfile.jsx      # User profile view
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── Spinner.jsx        # Loading spinner
│   │   ├── TopNiches.jsx      # Featured job categories
│   │   ├── UpdatePassword.jsx # Change password component
│   │   └── UpdateProfile.jsx  # Edit profile component
│   ├── pages/                # Page components
│   │   ├── Dashboard.jsx     # User dashboard
│   │   ├── Home.jsx          # Home page
│   │   ├── Jobs.jsx          # Jobs listing page
│   │   ├── Login.jsx         # Login page
│   │   ├── NotFound.jsx      # 404 page
│   │   ├── PostApplication.jsx # Application form
│   │   └── Register.jsx      # Registration page
│   └── store/                # Redux store
│       ├── store.js          # Store configuration
│       └── slices/           # Redux slices
│           ├── applicationSlice.js   # Application state
│           ├── jobSlice.js          # Job state
│           ├── updateProfileSlice.js # Profile update state
│           └── userSlice.js         # User authentication state
```

## Installation

1. **Navigate to Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the frontend directory:

   ```env
   VITE_API_URL=http://localhost:4000/api/v1
   ```

## Running the Application

- **Development Mode** (with hot reload):

  ```bash
  npm run dev
  ```

- **Build for Production**:

  ```bash
  npm run build
  ```

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

## Pages Overview

### Home Page (`pages/Home.jsx`)

- Landing page with hero section
- Featured job categories
- How the platform works
- Call-to-action buttons

### Jobs Page (`pages/Jobs.jsx`)

- Browse all available jobs
- Search and filter functionality
- Job details display
- Apply to jobs button

### Login Page (`pages/Login.jsx`)

- User login form
- Email and password fields
- Remember me option
- Register link

### Register Page (`pages/Register.jsx`)

- New user registration
- Form validation
- Role selection (job seeker/employer)
- Login link

### Dashboard (`pages/Dashboard.jsx`)

- Personalized user dashboard
- Display user role-specific content
- Quick access to applications or posted jobs

### Post Application (`pages/PostApplication.jsx`)

- Job application form
- Upload resume/documents
- Submit application

### Not Found (`pages/NotFound.jsx`)

- 404 error page for invalid routes

## Components Overview

### Navbar (`components/Navbar.jsx`)

- Navigation menu
- User authentication status
- Logout functionality
- Mobile responsive menu

### Hero (`components/Hero.jsx`)

- Eye-catching landing section
- Call-to-action buttons
- Hero background image/video

### HowItWorks (`components/HowItWorks.jsx`)

- Step-by-step process explanation
- Platform usage guide

### TopNiches (`components/TopNiches.jsx`)

- Featured job categories
- Category-based browsing

### JobPost (`components/JobPost.jsx`)

- Display individual job posting
- Job details and requirements
- Apply button

### MyJobs (`components/MyJobs.jsx`)

- List of jobs posted by employer
- Edit and delete options
- View applicants

### MyApplications (`components/MyApplications.jsx`)

- User's submitted applications
- Application status tracking
- Withdraw application option

### MyProfile (`components/MyProfile.jsx`)

- View user profile information
- Link to update profile/password

### UpdateProfile (`components/UpdateProfile.jsx`)

- Edit profile information
- Update personal details

### UpdatePassword (`components/UpdatePassword.jsx`)

- Change password form
- Password validation

### Spinner (`components/Spinner.jsx`)

- Loading indicator
- Used during API calls

### Footer (`components/Footer.jsx`)

- Footer links
- Copyright information
- Social media links

## Redux Store

### Store Structure (`store/store.js`)

Combines multiple slices for state management

### User Slice (`slices/userSlice.js`)

- User authentication state
- Login/logout actions
- User profile data

### Job Slice (`slices/jobSlice.js`)

- Jobs data state
- Fetch jobs action
- Filter and search state

### Application Slice (`slices/applicationSlice.js`)

- User applications state
- Submit application action
- Track application status

### Update Profile Slice (`slices/updateProfileSlice.js`)

- Profile update process state
- Loading and error states

## API Integration

All API calls are made to the backend server. Configure the API base URL in `.env`:

```
VITE_API_URL=http://localhost:4000/api/v1
```

### Example API Endpoints Used

- `POST /user/register` - Register new user
- `POST /user/login` - Login user
- `GET /user/me` - Fetch current user
- `GET /job` - Fetch all jobs
- `POST /job` - Create job posting
- `POST /application` - Submit application
- `GET /application` - Fetch user applications

## Styling

- Global styles in `App.css`
- Component-specific styles (can be added as needed)
- Responsive design using CSS media queries
- Mobile-first approach

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in Redux store and local storage
4. Token used for authenticated API requests
5. Protected routes check authentication status
6. Logout clears token and redirects to home

## Performance Optimization

- Lazy loading of pages using React Router
- Redux for efficient state management
- Vite for fast build and development
- Component reusability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port Already in Use

```bash
# Change port in vite.config.js or use --port flag
npm run dev -- --port 3001
```

### API Connection Issues

- Verify backend is running on the correct port
- Check `.env` file for correct API URL
- Check browser console for CORS errors

### Redux State Issues

- Check Redux DevTools browser extension
- Verify actions are dispatched correctly
- Check reducer logic for state updates

## Future Enhancements

- Dark mode support
- Advanced job filtering
- Saved jobs feature
- Job recommendations
- Interview scheduling
- Skill verification
- Payment integration

## Contributing

1. Create a new branch for features
2. Make changes and test thoroughly
3. Create a pull request with description

## License

This project is part of the MERN Stack Job Portal application.

## Support

For issues or questions, please contact me.

## ## Email : contact@biplapneupane.com.np
