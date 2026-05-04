# Job Application Portal - Project Instructions

This project is a Job Application Portal consisting of a React frontend and a Node.js/Express backend.

## Project Structure
- `client/`: React 19 + Vite frontend.
  - `src/components/`: Reusable UI components (Navbar, JobCard).
  - `src/context/`: Global state management (AuthContext).
  - `src/pages/`: Page components (Home, Jobs, JobDetail, Login, Register, Dashboard, PostJob).
  - `src/utils/`: Utility functions (API client).
- `server/`: Node.js + Express backend.

## Features
- **Authentication:** Secure login and registration for Applicants and Employers.
- **Job Browsing:** Modern, card-based job listing with filtering (via search).
- **Application Flow:** Applicants can upload resumes and apply for jobs.
- **Employer Tools:** Employers can post new job openings.
- **Responsive UI:** Mobile-first design with a professional aesthetic.
- **Seamless UX:** Skeleton loaders and smooth transitions.

## Tech Stack
- **Frontend:** React, Vanilla CSS.
- **Backend:** Node.js, Express, MongoDB (via Mongoose).
- **File Storage:** Cloudinary.

## Conventions
- Use surgical updates for code changes.
- Adhere to existing architectural patterns.
- Ensure type safety and idiomatic code.
- Always include tests for new features and bug fixes.
