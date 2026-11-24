// Engineering case-study metadata for portfolio projects.
// Matched by project title from the Supabase/Express API.
// Only verified facts from repositories and codebase are included.

export const PROJECT_DETAILS = {
  jomnes: {
    category: "Mentor Booking & Learning Application",
    type: "Mobile Application Project",
    problem:
      "Students and parents need a structured platform to discover qualified mentors, browse courses, and coordinate learning sessions with integrated payments.",
    solution:
      "Built a cross-platform mobile application in Flutter backed by Supabase (PostgreSQL) and a Node.js/Express service with Stripe payment integration, supporting separate student and teacher screens.",
    features: [
      "User authentication and role-based student and teacher screens",
      "Mentor and course discovery interfaces",
      "Stripe payment integration via Node.js/Express backend",
      "PostgreSQL persistence via Supabase (currently using mock data for parts of mentor/course listings while live booking integration is being finalized)",
    ],
    architecture:
      "Flutter mobile client connected to Supabase for authentication and PostgreSQL data, paired with a Node.js/Express backend handling Stripe payment workflows.",
    databaseDesign:
      "PostgreSQL database hosted on Supabase storing user accounts and application records.",
    personalContribution:
      "Contributed to Flutter mobile application development, Supabase/PostgreSQL integration, backend API integration, and booking workflow screens.",
    outcomes:
      "Gained practical experience combining cross-platform Flutter UI development with Supabase authentication, PostgreSQL, Express APIs, and Stripe payments.",
  },
  "esp32 classroom noise monitoring system": {
    category: "Embedded Systems Project",
    type: "Hardware / Systems Project",
    problem:
      "Classroom noise can escalate gradually without immediate feedback, making it harder to maintain a focused learning environment.",
    solution:
      "Developed an embedded monitoring system on an ESP32 microcontroller using FreeRTOS to sample sound sensor readings, evaluate noise thresholds, and drive LED indicators and a buzzer.",
    features: [
      "Continuous sound sensor monitoring and threshold detection on ESP32",
      "Real-time task execution managed with FreeRTOS",
      "Visual status signaling using LED indicators",
      "Audible alert output via buzzer integration",
    ],
    architecture:
      "ESP32 C/C++ firmware running FreeRTOS to coordinate sensor reading, threshold evaluation, and hardware output control for LEDs and buzzer.",
    personalContribution:
      "Worked on ESP32 firmware programming with FreeRTOS, noise threshold detection logic, and hardware/software integration for the sensor, LEDs, and buzzer.",
    outcomes:
      "Demonstrated systems-level engineering beyond web and mobile apps, gaining hands-on experience with FreeRTOS, microcontroller I/O, and hardware/software debugging.",
  },
  homesweet: {
    category: "Student Rental Management Platform",
    type: "Internship / Team Project (2025 – 2027)",
    problem:
      "Students looking for housing often deal with scattered listings, unclear pricing, and difficulty communicating reliably with landlords.",
    solution:
      "Collaborated on a Vue.js and Firebase web platform connecting students with landlords through property discovery, rental applications, identity verification, messaging, and landlord/admin portals.",
    features: [
      "Property discovery and structured rental listing views",
      "Rental application workflows and identity verification",
      "In-app messaging between students and landlords",
      "Dedicated landlord and admin portals backed by Firestore and Firebase Storage",
    ],
    architecture:
      "Vue.js frontend connected to Firebase Authentication, Cloud Firestore, and Firebase Storage.",
    databaseDesign:
      "Cloud Firestore document collections storing property listings, user profiles, rental applications, and messaging threads.",
    personalContribution:
      "Served as UX/UI designer and collaborated on frontend implementation: created wireframes and interface layouts in Figma, and helped implement responsive frontend views. Other team members handled backend/Firebase integration, authentication, and portal logic.",
    challenges:
      "Aligning interface designs with Firestore data structures and coordinating work across a multi-developer Git repository.",
    outcomes:
      "Delivered collaborative frontend layouts and Figma prototypes in the team repository (`ThyrexGG/Internship-Project`), building experience in team workflows and design-to-code execution.",
  },
  "movie e-ticket prototype": {
    category: "Backend & Distributed Systems Prototype",
    type: "Backend Systems Project",
    problem:
      "Concurrent ticket booking systems risk double-booking the same seat when multiple users attempt to reserve or purchase seats simultaneously.",
    solution:
      "Built a containerized backend architecture using Node.js, Express, MySQL, Redis, and Docker separating booking and notification responsibilities, using Redis for temporary seat locking and MySQL transactions for atomic booking persistence.",
    features: [
      "Independent booking and notification services",
      "Redis-based temporary seat locking to prevent concurrent race conditions",
      "MySQL transactions for atomic seat reservation and booking confirmation",
      "Double-booking prevention returning HTTP 409 Conflict when a seat is already held",
      "Dockerized multi-service local environment",
    ],
    architecture:
      "Decoupled Node.js/Express booking and notification services running in Docker containers, backed by Redis for fast ephemeral seat locks and MySQL for durable transactional storage.",
    databaseDesign:
      "Relational MySQL schema with transactional locking for bookings alongside Redis key-based seat holds with TTL expiration.",
    personalContribution:
      "Designed and implemented the Node.js/Express services, MySQL transactional booking flow, Redis seat-locking mechanism, and Docker setup.",
    challenges:
      "Coordinating ephemeral Redis seat holds with durable MySQL transactions so concurrent requests for an already-held seat fail cleanly with a 409 Conflict instead of creating duplicate bookings.",
    outcomes:
      "Demonstrated practical backend systems engineering covering concurrency control, database transactions, Redis caching/locking, and Docker containerization.",
  },
  petly: {
    category: "Full-Stack Web Application",
    type: "Full-Stack Web Project",
    problem:
      "Pet owners and clinics need a centralized platform for discovering pet products, finding clinics, and moderating community reports securely.",
    solution:
      "Built a full-stack web application using React, Vite, and Tailwind CSS with an Express.js backend and Supabase (PostgreSQL) featuring authentication, RLS policies, product and clinic APIs, and report moderation.",
    features: [
      "Supabase authentication and Row Level Security (RLS) enforcement",
      "REST API endpoints for pet products, clinics, and report moderation",
      "Responsive React + Vite + Tailwind CSS frontend",
      "Planned/in-progress modules documented in README: chat, reviews, wishlist, selling form, admin dashboard, and map",
    ],
    architecture:
      "React + Vite SPA communicating with an Express.js REST API and Supabase PostgreSQL database with RLS.",
    databaseDesign:
      "PostgreSQL schema in Supabase covering users, products, clinics, and moderation reports protected by Row Level Security policies.",
    personalContribution:
      "Built the React/Vite frontend, Express API routes for products, clinics, and moderation, and configured the Supabase schema and RLS policies.",
    outcomes:
      "Strengthened full-stack skills in designing relational Supabase schemas, enforcing Row Level Security, and structuring RESTful resource APIs.",
  },
  "personal portfolio website": {
    category: "Full-Stack Web Application",
    type: "Solo Project",
    problem:
      "Static portfolio sites require manual code edits and redeployment whenever project entries or contact inquiries change.",
    solution:
      "Built a decoupled full-stack web application using React, Vite, and Tailwind CSS on the frontend, paired with an Express.js REST API and Supabase PostgreSQL database on the backend.",
    features: [
      "REST API endpoints (`/api/projects`, `/api/contact`, `/api/health`) in Express.js",
      "Admin key authentication middleware (`x-admin-key`) protecting project create, update, and delete routes",
      "Dual-channel contact handling: Web3Forms email delivery with Supabase `contacts` table persistence",
      "Environment-aware database layer supporting Supabase PostgreSQL with legacy MongoDB/Mongoose fallback",
    ],
    architecture:
      "React + Vite SPA communicating over HTTPS with a Node.js/Express REST API hosted on Render, connected to Supabase PostgreSQL via `@supabase/supabase-js`.",
    databaseDesign:
      "Two PostgreSQL tables in Supabase with Row Level Security: `projects` (UUID primary key, `title`, `description`, `techStack` and `imageUrls` text arrays, `featured`, `order`, timestamps) and `contacts` (`name`, `email`, `message`, `read`, `created_at`).",
    personalContribution:
      "Sole developer responsible for UI/UX design, React component architecture, Express.js REST API implementation, database migration from MongoDB Atlas to Supabase, and cloud deployment on Render.",
    challenges:
      "Migrating the persistence layer from MongoDB to Supabase PostgreSQL without breaking frontend components that relied on MongoDB's `_id` field. Resolved by normalizing PostgreSQL `id` values to include `_id` in the Express route layer.",
    outcomes:
      "Deployed a live full-stack portfolio on Render backed by Supabase PostgreSQL, with working admin CRUD management and structured project case studies.",
  },
  "skincare e-commerce": {
    category: "Frontend Development",
    type: "Supporting Frontend Project",
    problem:
      "E-commerce storefronts require clear product browsing, search filtering, and consistent cart state across multiple views without backend overhead.",
    solution:
      "Developed a responsive skincare storefront in React and Tailwind CSS implementing product listings, search filtering, detail views, dynamic cart state, and a client-side checkout simulation.",
    features: [
      "Responsive product catalog and search filtering",
      "Product detail views with item information",
      "Dynamic shopping cart management (add, remove, quantity and total updates)",
      "Client-side checkout simulation flow",
    ],
    architecture:
      "Client-side React SPA styled with Tailwind CSS managing product catalog, cart items, and checkout state in browser memory.",
    personalContribution:
      "Sole developer responsible for React components, client-side cart and filter state logic, and responsive Tailwind CSS styling.",
    outcomes:
      "Completed a 5-view responsive storefront (`sivatei/skincare-store_projects`), strengthening skills in React state management and UI layout.",
  },
  "food receipt front-end": {
    category: "Frontend Development",
    type: "Solo Project",
    problem:
      "Food ordering and receipt workflows require structured item selection, search filtering, and accurate client-side price calculation.",
    solution:
      "Built an interactive React and Tailwind CSS frontend for browsing food courses, searching items, viewing course details, and generating itemized receipt summaries.",
    features: [
      "Course catalog, search, and detail views",
      "Client-side pricing calculation and itemized receipt display",
      "Login and subscription UI views",
    ],
    architecture:
      "Client-side React application using Tailwind CSS for responsive layout and component state for order calculation.",
    personalContribution:
      "Sole developer for React UI components, search/order state logic, and Tailwind CSS styling.",
    outcomes:
      "Built a multi-view React frontend (`sivatei/Final-project`) covering catalog browsing, search, and itemized receipt rendering.",
  },
  "anywhere beauty app design": {
    category: "UI/UX Design",
    type: "Design Prototype",
    problem:
      "Mobile beauty shopping experiences can become cluttered when product discovery and checkout steps are not clearly structured.",
    solution:
      "Created a mobile UX/UI prototype in Figma covering user research, wireframing, high-fidelity screens, and streamlined checkout flows.",
    features: [
      "User research and mobile information architecture",
      "Wireframes and high-fidelity UI screens in Figma",
      "Checkout flow prototype focused on reducing navigation friction",
    ],
    personalContribution:
      "Lead UX/UI designer responsible for user research, wireframing, visual design, and interactive prototyping in Figma.",
    outcomes:
      "Produced a complete mobile app design prototype in Figma prior to implementation.",
  },
  "bus ticket booking app design": {
    category: "UI/UX Design",
    type: "Design Prototype",
    problem:
      "Mobile ticket booking becomes error-prone when route schedules, seat selection, and checkout steps are poorly organized.",
    solution:
      "Designed a mobile bus ticketing prototype in Figma featuring schedule search, visual seat layout maps, and structured booking checkout flows.",
    features: [
      "Schedule search and route selection screens",
      "Interactive seat layout map design",
      "End-to-end booking and checkout prototype in Figma",
    ],
    personalContribution:
      "UX/UI designer responsible for user flows, screen layouts, seat map visualization, and Figma prototyping.",
    outcomes:
      "Designed a multi-step booking prototype handling schedule lookup and seat selection workflows.",
  },
};

export function getProjectDetails(project) {
  if (!project?.title) return null;
  const key = project.title.trim().toLowerCase();
  return PROJECT_DETAILS[key] || null;
}
