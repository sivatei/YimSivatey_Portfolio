// Run with: npm run seed:supabase
// Populates your Supabase "projects" table with verified portfolio projects and assets.

require("dotenv").config();
const supabase = require("./supabase");

const projects = [
  // ─── Featured Engineering Projects (6 items: 3x2 grid) ───
  {
    title: "Jomnes",
    description:
      "Cross-platform mentor booking and learning mobile app built with Flutter, Supabase, PostgreSQL, Node.js, Express, and Stripe, featuring authentication, mentor/course discovery, student/teacher screens, and payment integration.",
    techStack: ["Flutter", "Supabase", "PostgreSQL", "Node.js", "Express.js", "Stripe"],
    imageUrl: "/jomnes-erd.jpg",
    imageUrls: [
      "/jomnes-erd.jpg",
      "/jomnes-home.jpg",
      "/jomnes-search.jpg",
      "/jomnes-mentor.png",
      "/jomnes-payment.jpg",
      "/jomnes-role.jpg",
      "/jomnes-login.jpg",
    ],
    videoUrl: "",
    githubUrl: "https://github.com/v1mean/MOBILE_APPLICATION",
    liveUrl: "",
    role: "Mobile Application",
    featured: true,
    order: 1,
  },
  {
    title: "ESP32 Classroom Noise Monitoring System",
    description:
      "Embedded IoT classroom noise monitoring system built on an ESP32 microcontroller with FreeRTOS, featuring sound sensor threshold detection, local LED warning, ThingsBoard Cloud telemetry dashboard, and remote buzzer control.",
    techStack: ["ESP32", "C / C++", "FreeRTOS", "ThingsBoard", "Embedded Systems"],
    imageUrl: "/esp32-diagram.png",
    imageUrls: [
      "/esp32-diagram.png",
      "/esp32-hardware.png",
      "/esp32-dashboard.png",
    ],
    videoUrl: "",
    githubUrl: "https://github.com/sivatei/esp32-classroom-noise-monitor",
    liveUrl: "",
    role: "Embedded Systems",
    featured: true,
    order: 2,
  },
  {
    title: "HomeSweet",
    description:
      "Team internship project connecting students with landlords through property discovery, rental applications, identity verification, messaging, and landlord/admin portals.",
    techStack: ["Vue.js", "Firebase", "Firestore", "Figma", "Tailwind CSS"],
    imageUrl: "/internship.png",
    imageUrls: ["/internship.png"],
    videoUrl: "",
    githubUrl: "https://github.com/ThyrexGG/Internship-Project",
    liveUrl: "",
    role: "Internship / Team Project",
    featured: true,
    order: 3,
  },
  {
    title: "Movie E-Ticket Prototype",
    description:
      "Backend-focused ticket booking prototype built with Node.js, Express, MySQL, Redis, and Docker, featuring independent booking and notification services, MySQL transactions, Redis seat locking, and 409 double-booking prevention.",
    techStack: ["Node.js", "Express.js", "MySQL", "Redis", "Docker"],
    imageUrl: "/movie-eticket-architecture.png",
    imageUrls: [
      "/movie-eticket-architecture.png",
      "/movie-eticket-409.jpg",
      "/movie-eticket-bookings.jpg",
      "/movie-eticket-docker.jpg",
    ],
    videoUrl: "",
    githubUrl: "https://github.com/sivatei/MovieETicket-Prototype",
    liveUrl: "",
    role: "Backend Systems",
    featured: true,
    order: 4,
  },
  {
    title: "Petly",
    description:
      "Full-stack web application built with React, Vite, Tailwind CSS, Express, and Supabase, featuring relational database schema, Row Level Security (RLS), authentication, product and clinic APIs, and report moderation.",
    techStack: ["React", "Vite", "Tailwind CSS", "Express.js", "Supabase"],
    imageUrl: "/petly-home.png",
    imageUrls: [
      "/petly-home.png",
      "/petly-shop.jpg",
      "/petly-vet.jpg",
      "/petly-login.png",
    ],
    videoUrl: "",
    githubUrl: "https://github.com/sivatei/Petly",
    liveUrl: "",
    role: "Full-Stack Web App",
    featured: true,
    order: 5,
  },
  {
    title: "Skincare E-Commerce",
    description:
      "Responsive e-commerce frontend featuring product listings, search filtering, product detail pages, dynamic cart management, and a client-side checkout simulation.",
    techStack: ["React", "Tailwind CSS"],
    imageUrl: "/Elisting.png",
    imageUrls: [
      "/Elisting.png",
      "/Edetail (1).png",
      "/Edetail (2).png",
      "/Echeckout.png",
      "/Echeckout2.png",
    ],
    videoUrl: "",
    githubUrl: "https://github.com/sivatei/skincare-store_projects",
    liveUrl: "",
    role: "Frontend Project",
    featured: true,
    order: 6,
  },

  // ─── UI/UX & Other Projects (Secondary Section) ───
  {
    title: "Food Receipt Front-End",
    description:
      "Interactive frontend website for browsing food courses, calculating order totals, and displaying structured itemized receipts.",
    techStack: ["React", "Tailwind CSS"],
    imageUrl: "/Foodbanner.png",
    imageUrls: [
      "/Foodbanner.png",
      "/Foodcard.png",
      "/FoodCourse.png",
      "/FoodDetail.png",
      "/FoodSearch.png",
      "/FoodSub.png",
      "/FoodLogin.png",
    ],
    videoUrl: "",
    githubUrl: "https://github.com/sivatei/Final-project",
    liveUrl: "",
    role: "Frontend Project",
    featured: false,
    order: 7,
  },
  {
    title: "Anywhere Beauty App Design",
    description:
      "Mobile UX/UI prototype for a beauty shopping application covering user research, wireframes, high-fidelity screens, and streamlined checkout flows in Figma.",
    techStack: ["Figma", "UX/UI Design", "Wireframing"],
    imageUrl: "/anywhere-beauty.png",
    imageUrls: ["/anywhere-beauty.png"],
    videoUrl: "",
    githubUrl: "",
    liveUrl: "",
    role: "UI/UX Prototype",
    featured: false,
    order: 8,
  },
  {
    title: "Bus Ticket Booking App Design",
    description:
      "Mobile UX/UI prototype for a bus ticketing application featuring route schedule search, seat layout maps, and checkout flows designed in Figma.",
    techStack: ["Figma", "UX/UI Design", "Prototyping"],
    imageUrl: "/bus-ticket-booking.png",
    imageUrls: ["/bus-ticket-booking.png"],
    videoUrl: "",
    githubUrl: "",
    liveUrl: "",
    role: "UI/UX Prototype",
    featured: false,
    order: 9,
  },
];

async function seed() {
  console.log("Connecting to Supabase and seeding projects...");

  const { error: deleteError } = await supabase
    .from("projects")
    .delete()
    .neq("title", "___nonexistent___");

  if (deleteError) {
    console.warn("Notice during delete:", deleteError.message);
  }

  const { data, error } = await supabase
    .from("projects")
    .insert(projects)
    .select();

  if (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }

  console.log(`Successfully seeded ${data.length} projects to Supabase.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
