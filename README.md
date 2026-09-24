# CampusOS Enterprise — Intelligent Digital Operating System for College Campuses

> **"Your Campus. One Operating System."**  
> An enterprise-grade, full-stack digital operating system unifying academics, placements, CRT training, emergency sudden circulars, digital fee payments, examinations & digital hall tickets, semester CGPA progress, lost & found belongings, and campus vigilance & safety in a unified, cinematic glassmorphic interface.

---

## 🌟 What's New in CampusOS Enterprise

1. **🏢 Campus Placements Hub**:
   - Tier-1 multinational company drives (Microsoft IDC, Google, Goldman Sachs, Cisco, TCS Digital).
   - Package tracking (Highest CTC: ₹44.5 LPA, Average: ₹11.8 LPA, 94.6% clearance).
   - Eligibility criteria (CGPA cutoff, allowed branches, active backlog policies) and 1-click verified application with status tracking.

2. **🧠 Campus Recruitment Training (CRT)**:
   - 4 Core Training Pillars: Quantitative Aptitude, Logical Reasoning, Verbal Ability, Technical Coding & DSA Sprints, and Soft Skills.
   - Interactive Online Mock Test Simulator with real-time timers, automatic scoring, and detailed analytical explanations.
   - Company-Specific Preparation Kits (TCS NQT, Microsoft OA, Infosys SP/DSE).

3. **⚡ Sudden & Flash Circulars ("Emergency Gazettes")**:
   - Flash Emergency Banner & ticker across the application for immediate campus alerts (e.g. cyclonic rainfall holidays, sudden exam postponements).
   - Official University Notice Board with reference numbers (`REF: CAMPUS-OS/REG/2026/CIRC-1082-FLASH`), authority stamps, and "View / Print Official Document" mode.

4. **💳 Digital Fee Payments & Financial Ledger**:
   - Semester Tuition Fee, Examination Fee, Hostel & Mess Charges, Campus Bus Pass, and Library deposits.
   - Simulated 256-bit encrypted **CampusPay / Razorpay Gateway** supporting UPI, Net Banking, and Debit/Credit Cards.
   - Instant Official Digital Fee Receipt generator with QR code, transaction ID, college header, and printable PDF voucher.

5. **📝 Examinations & Digital Hall Ticket Allotment**:
   - Mid-Term and Semester End Examination timetable countdown.
   - Official **Digital Admit Card / Hall Ticket** with scannable barcode, student photograph, subject list, instructions, and print capability.
   - **Live Seating Allotment Query**: Enter student roll number (e.g. `22BCSE1042`) to retrieve assigned Hall Number, Desk Number (`D-14`), and floor.

6. **📊 Semesters & CGPA Progress Hub**:
   - Semester 1 through 8 transcript history.
   - **Interactive SGPA / CGPA Simulator**: Adjust projected course letter grades to see instant GPA changes.
   - **Smart 75% Attendance Compliance Tool**: Calculates safe bunks remaining or exact consecutive classes needed to cross the mandatory 75% threshold.

7. **🎒 Lost & Found Belongings Registry**:
   - Report lost money/cash, wallets, student ID cards, keys, laptops, or calculators with location and cash reward tags.
   - Report found items deposited with campus security.
   - Digital Claim Verification workflow with proof of ownership matching.

8. **🛡️ Campus Safety, Anti-Ragging & SOS Vigilance**:
   - Confidential & 100% Anonymous Incident Reporting for campus fights, harassment, ragging, hostel disputes, or vandalism.
   - **One-Click Red Emergency SOS Alert** with automatic security dispatch notification.
   - 24/7 Campus Emergency Desk directory (Chief Security Officer, UGC Anti-Ragging Toll-Free Helpline, Campus Ambulance, Proctorial Squad).
   - Proctorial investigation board log with disciplinary enforcement tracking.

9. **🎭 Cultural & Technical Extravaganzas**:
   - Cultural Fests (Mirage 2026, Battle of the Bands, Group Choreography, Pro-Nites).
   - Technical Summits (National Hackathons, RoboWars Arena, Coding Duels).

---

## 🚀 Running Locally (Step-by-Step)

### Option A: Quick Start (Full-Stack Monolith on Port 5000)
Runs the entire application (both backend API and production client) with a single command:

```bash
# 1. Install dependencies across client and server
npm run install:all

# 2. Build the client bundle (zero warnings, chunk-optimized)
npm run build:client

# 3. Seed MongoDB database with realistic campus dataset
npm run seed

# 4. Start the production full-stack server
npm start
```
Open [http://localhost:5000](http://localhost:5000) in your browser!

---

### Option B: Development Mode (Hot Module Replacement)
Run server and client concurrently with live reload:

**Terminal 1 (Backend Server):**
```bash
npm run dev:server
# Server active on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
npm run dev:client
# Vite dev server active on http://localhost:5173
```
*Note: Vite automatically proxies `/api` requests to `http://localhost:5000`.*

---

## ☁️ Deploying on Render (Zero Build Log Warnings)

CampusOS is configured out of the box for **Render 1-Click Web Service Deployment**:

### Render Web Service Setup:
1. Push your repository to GitHub / GitLab.
2. Log into [Render Dashboard](https://dashboard.render.com) and click **New +** -> **Web Service**.
3. Connect your repository.
4. Fill in the following settings:

| Setting | Value |
|---|---|
| **Name** | `campusos` |
| **Region** | Singapore / Oregon / Frankfurt (closest to you) |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |
| **Plan** | Free (or Starter) |

### Environment Variables on Render:
Add these in the **Environment** tab:

```env
NODE_ENV=production
PORT=10000
JWT_SECRET=super_secret_production_campusos_jwt_key_2026
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/campusos?retryWrites=true&w=majority
```

*(Note: If `MONGODB_URI` is not provided during initial deployment, CampusOS automatically enters safe offline/demo mode so your site boots and renders without crashing!)*

---

## 🔑 Demo Login Credentials

Pre-seeded for instant evaluation:

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Student** | `student@campusos.demo` | `CampusOS@2026` | Full access to Academics, Placements, CRT, Fees, Exams, Lost & Found, Safety, Events |
| **Super Admin** | `admin@campusos.demo` | `CampusOS@2026` | Institutional management, user clearance, system telemetry |
| **Faculty** | `faculty@campusos.demo` | `CampusOS@2026` | Course management, announcement publishing, grade verification |
| **Club Admin** | `club@campusos.demo` | `CampusOS@2026` | Event organizing, hackathon management, society leadership |

---

## 📡 API Endpoints Reference

### Core APIs:
- `GET /api/health` — System status, uptime, and active subservices
- `POST /api/auth/login` — User authentication and JWT generation
- `POST /api/auth/register` — Student registration

### Placements & CRT:
- `GET /api/placements` — Active & upcoming recruitment drives and batch statistics
- `POST /api/placements/:id/apply` — 1-Click placement drive application
- `GET /api/crt` — Campus recruitment training modules, syllabus, and mock tests

### Sudden Circulars & Alerts:
- `GET /api/circulars` — Flash emergency circulars and official university notifications
- `POST /api/circulars` — Publish emergency administrative gazette

### Fee Payments & Invoices:
- `GET /api/fees` — Student fee ledger, breakdown, and payment history
- `POST /api/fees/pay` — Process simulated payment and generate verified digital receipt

### Examinations & Hall Tickets:
- `GET /api/exams` — Mid-term and semester examination timetables
- `GET /api/exams/hall-ticket` — Digital admit card with barcode and student data

### Lost & Belongings Found:
- `GET /api/lost-found` — List active lost belongings and found items
- `POST /api/lost-found` — Report lost item or found property
- `POST /api/lost-found/:id/claim` — Submit ownership verification claim

### Campus Safety & Vigilance:
- `GET /api/safety` — Incident log, 24/7 emergency hotlines, and code of conduct
- `POST /api/safety/report` — Confidential & anonymous incident reporting

---

## 🛡️ License
CampusOS Enterprise is open-source under the ISC License.
# FSD-PROJECT-CLG 
