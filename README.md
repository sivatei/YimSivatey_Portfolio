# Yim Sivatey — Software Engineering Portfolio

Personal portfolio website showcasing my software engineering projects, technical interests, and development experience.

## Overview
This repository contains a full-stack portfolio application with a React frontend and an Express API. It presents projects across application development, backend systems, databases, and embedded systems.

## Tech stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Data layer:** Supabase or MongoDB, depending on the configured backend mode
- **Deployment:** Netlify frontend configuration

## Structure
```text
.
├── frontend/       # React portfolio application
├── backend/        # Express API for projects and contact messages
└── netlify.toml    # Netlify build and SPA routing configuration
```

## Run locally
Requirements: Node.js 18+ and npm.

1. Install frontend dependencies: `cd frontend && npm install`.
2. Configure frontend environment variables in a local environment file.
3. Start the frontend with `npm run dev`.
4. In another terminal, install backend dependencies: `cd backend && npm install`.
5. Configure backend environment variables in `backend/.env`.
6. Start the API with `npm run dev`.

Use the variable names expected by the backend configuration. Never commit private keys, database service-role keys, or other secrets.

## Current focus
- Presenting projects with clear descriptions and evidence
- Keeping project and contact API configuration understandable
- Improving accessibility, responsive layout, and maintainability

This is an actively maintained personal project. Screenshots, a live demo URL, and detailed project case studies can be added as the portfolio content is finalized.
