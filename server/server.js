import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import academicRoutes from './routes/academicRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import opportunityRoutes from './routes/opportunityRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// New Advanced CampusOS Modules
import placementRoutes from './routes/placementRoutes.js';
import crtRoutes from './routes/crtRoutes.js';
import circularRoutes from './routes/circularRoutes.js';
import feeRoutes from './routes/feeRoutes.js';
import examRoutes from './routes/examRoutes.js';
import lostFoundRoutes from './routes/lostFoundRoutes.js';
import safetyRoutes from './routes/safetyRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Robust CORS configuration supporting Localhost, Vercel, and Render deployments
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  'https://fsd-project-clg-client.vercel.app',
  'https://fsd-project-clg.onrender.com',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser calls (Postman, server-to-server, curl, mobile)
    if (!origin) return callback(null, true);

    // Exact matches
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Dynamic matches for Vercel and Render deployments/previews
    if (/^https:\/\/.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.onrender\.com$/.test(origin)) {
      return callback(null, true);
    }

    // Default permissive reflection for cross-origin access
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Set-Cookie', 'Authorization'],
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Explicit preflight fallback handler ensuring headers are never stripped by reverse proxies
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// System Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    system: 'CampusOS Core Operating Engine',
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    services: [
      'Placements & Drives',
      'CRT Training Sprints',
      'Sudden Official Circulars',
      'Digital Fee Ledger',
      'Examination & Seating Allotments',
      'Lost & Belongings Found',
      'Campus Safety & Vigilance SOS',
    ],
  });
});

// Core API Routes
app.use('/api/auth', authRoutes);
app.use('/api/academics', academicRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/posts', communityRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

// New Feature API Routes
app.use('/api/placements', placementRoutes);
app.use('/api/crt', crtRoutes);
app.use('/api/circulars', circularRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/lost-found', lostFoundRoutes);
app.use('/api/safety', safetyRoutes);

// Locate frontend build directory for Production deployment (e.g. Render Web Service)
const clientDistCandidates = [
  path.join(__dirname, '../client/dist'),
  path.join(process.cwd(), 'client/dist'),
  path.join(process.cwd(), 'dist'),
];

const clientDistPath = clientDistCandidates.find((candidate) => fs.existsSync(candidate));

if (clientDistPath) {
  console.log(`[CampusOS Engine] Serving production client build from: ${clientDistPath}`);
  app.use(express.static(clientDistPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[CampusOS Engine] Server active on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
});
