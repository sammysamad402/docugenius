<div align="center">

<br />

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0078D4,100:412991&height=200&section=header&text=DocuGenius&fontSize=72&fontColor=ffffff&fontAlignY=38&desc=AI-Powered%20Document%20Intelligence%20Platform&descAlignY=58&descSize=20" alt="DocuGenius Banner" width="100%" />

<br />

<p align="center">
  <a href="https://docugenius-chi.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Now-0078D4?style=for-the-badge&logoColor=white" alt="Live Demo" />
  </a>
  &nbsp;
  <a href="https://imaginecup.microsoft.com/" target="_blank">
    <img src="https://img.shields.io/badge/Microsoft-Imagine%20Cup%202026-0078D4?style=for-the-badge&logo=microsoft&logoColor=white" alt="Imagine Cup 2026" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Azure-Document%20Intelligence-0078D4?flat-square&logo=microsoftazure&logoColor=white" alt="Azure AI" />
  <img src="https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?flat-square&logo=openai&logoColor=white" alt="OpenAI" />
  <img src="https://img.shields.io/badge/Deployed-Vercel%20%2B%20Railway-black?flat-square&logo=vercel&logoColor=white" alt="Deployment" />
  <img src="https://img.shields.io/badge/License-MIT-green?flat-square" alt="MIT License" />
</p>

<br />

> **Upload any document. Understand it instantly.**
>
> DocuGenius uses Azure AI OCR and OpenAI GPT-4o-mini to classify, extract, and summarize receipts, invoices, contracts, medical records, IDs, and more — with zero manual data entry.

<br />

**[🌐 Live Demo](https://docugenius-chi.vercel.app)** &nbsp;·&nbsp; **[🎨 Behance Case Study](https://www.behance.net/gallery/250843061/DocuGenius-AI-Powered-Document-Intelligence-Platform)** &nbsp;·&nbsp; **[🐛 Report Bug](../../issues)** &nbsp;·&nbsp; **[✨ Request Feature](../../issues)**

<br />

</div>

---

## 📋 Table of Contents

- [🎯 About the Project](#-about-the-project)
- [✨ Features](#-features)
- [🏗 System Architecture](#-system-architecture)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Environment Variables](#️-environment-variables)
- [▶️ Running the App](#️-running-the-app)
- [📡 API Endpoints](#-api-endpoints)
- [☁️ Deployment Architecture](#️-deployment-architecture)
- [🔒 Security & Production Features](#-security--production-features)
- [🖼 Screenshots](#-screenshots)
- [🗺 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 About the Project

**DocuGenius** is a full-stack AI document intelligence platform built for **Microsoft Imagine Cup 2026**. It solves a universal problem: physical and digital paperwork is hard to organize, search, and understand.

With DocuGenius, users simply upload a photo or scan of any document — a hospital bill, a rent agreement, a tax form, a business invoice — and receive a fully structured analysis in seconds:

- ✅ What kind of document is this?
- ✅ What are the key figures, dates, and parties involved?
- ✅ What is a plain-English summary?
- ✅ What tags make it searchable?

No manual entry. No lost documents. Pure intelligence.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📤 Document Ingestion
- Upload **JPG, PNG, or PDF** files (up to 10MB)
- Instant client-side file validation
- Document preview before and after analysis
- Drag-and-drop friendly interface

</td>
<td width="50%">

### 🔍 AI-Powered Analysis
- **Azure AI OCR** extracts text from any document, including handwritten content
- **GPT-4o-mini** classifies, summarizes, and extracts structured data
- Handles real-world, imperfect scans gracefully

</td>
</tr>
<tr>
<td width="50%">

### 🏷 Smart Organization
- Auto-categorization: **Financial, Medical, Legal, Personal, Business**
- Auto-generated **searchable tags**
- Key field extraction: dates, amounts, vendors, parties
- Full-text search across all documents

</td>
<td width="50%">

### 📊 Management & Export
- **Persistent storage** between sessions
- Category filter tabs for fast browsing
- **Export to `.txt` report** for any document
- Mobile-responsive design

</td>
</tr>
</table>

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
│                                                             │
│   User uploads document (JPG / PNG / PDF)                   │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS Request (multipart/form-data)
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              REACT 19 FRONTEND  ·  Vercel CDN               │
│                                                             │
│   • File validation & preview                               │
│   • Upload progress UI                                      │
│   • Document gallery with search & filters                  │
│   • Export & reporting interface                            │
└────────────────────────────┬────────────────────────────────┘
                             │ REST API Call
                             ▼
┌─────────────────────────────────────────────────────────────┐
│            EXPRESS.JS BACKEND  ·  Railway Cloud             │
│                                                             │
│   • Multer: multipart file handling                         │
│   • File type & size validation                             │
│   • CORS, rate limiting, error handling                     │
└──────────────┬──────────────────────────┬───────────────────┘
               │                          │
               ▼                          ▼
┌──────────────────────┐    ┌─────────────────────────────────┐
│  AZURE AI DOCUMENT   │    │        OPENAI GPT-4o-mini        │
│   INTELLIGENCE       │    │                                  │
│                      │    │  • Document classification       │
│  • OCR text extract  │───▶│  • Key info extraction           │
│  • Prebuilt-read     │    │  • Plain-English summary         │
│    model             │    │  • Auto-tagging                  │
│  • Handles scans +   │    │  • Structured JSON output        │
│    handwriting       │    │                                  │
└──────────────────────┘    └─────────────────┬───────────────┘
                                              │
                                              ▼
                             ┌────────────────────────────────┐
                             │      STRUCTURED JSON RESPONSE  │
                             │                                │
                             │  {                             │
                             │    type: "Invoice",            │
                             │    category: "Financial",      │
                             │    keyInfo: {                  │
                             │      date, amount, vendor      │
                             │    },                          │
                             │    summary: "...",             │
                             │    tags: ["invoice", ...]      │
                             │  }                             │
                             └────────────────┬───────────────┘
                                              │
                                              ▼
                             ┌────────────────────────────────┐
                             │    FRONTEND VISUALIZATION      │
                             │    & PERSISTENT STORAGE        │
                             └────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19 | UI framework with hooks and component architecture |
| **Icons** | Lucide React | Consistent, minimal icon set |
| **Backend** | Node.js + Express 5 | REST API server and middleware orchestration |
| **OCR** | Azure AI Document Intelligence | Text extraction from images and PDFs |
| **AI Analysis** | OpenAI GPT-4o-mini | Document classification, summarization, key info extraction |
| **File Handling** | Multer | Multipart form-data upload processing |
| **HTTP Client** | Axios | Frontend → backend API communication |
| **Frontend Deploy** | Vercel | Global CDN, zero-config CI/CD |
| **Backend Deploy** | Railway | Managed cloud Node.js hosting |
| **Styling** | Custom CSS | Animations, responsive layout, dark-mode ready |

---

## 📁 Project Structure

```
docugenius/
│
├── README.md
├── .gitignore
├── LICENSE
│
├── backend/                          # Express API server
│   ├── server.js                     # All API routes, Azure + OpenAI integration
│   ├── package.json
│   └── .env.example                  # Environment variable template
│
└── frontend/                         # React 19 SPA
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    └── src/
        ├── App.js                    # Root component: state, routing, API calls
        ├── App.css                   # Global styles and animations
        ├── index.js                  # React entry point
        └── index.css                 # Base styles
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed and configured:

| Requirement | Version | Notes |
|---|---|---|
| [Node.js](https://nodejs.org/) | v18+ | LTS recommended |
| [Azure Account](https://azure.microsoft.com/free/) | — | Free tier F0 available |
| [OpenAI API Key](https://platform.openai.com/api-keys) | — | Pay-as-you-go |

### 1. Clone the Repository

```bash
git clone https://github.com/sammysamad402/docugenius.git
cd docugenius
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Open .env and fill in your Azure and OpenAI credentials
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
# Set REACT_APP_API_URL if your backend runs on a non-default port
```

### 4. Get Your Azure Credentials

1. Log in to the [Azure Portal](https://portal.azure.com)
2. Create a **Document Intelligence** resource (Free tier F0 is sufficient)
3. Navigate to **Keys and Endpoint** under your resource
4. Copy **Endpoint URL** and **Key 1**

---

## ⚙️ Environment Variables

### `backend/.env`

```env
# Azure AI Document Intelligence
AZURE_DOC_INTELLIGENCE_ENDPOINT=https://your-resource.cognitiveservices.azure.com
AZURE_DOC_INTELLIGENCE_KEY=your_azure_key_here

# OpenAI
OPENAI_API_KEY=sk-your_openai_api_key_here

# Server
PORT=5000
```

### `frontend/.env`

```env
# Local Development
REACT_APP_API_URL=http://localhost:5000
```

---

### Production Deployment

#### Vercel Environment Variables

```env
REACT_APP_API_URL=https://docugenius-production.up.railway.app
```

#### Railway Environment Variables

```env
AZURE_DOC_INTELLIGENCE_ENDPOINT=your_endpoint
AZURE_DOC_INTELLIGENCE_KEY=your_key
OPENAI_API_KEY=your_key
FRONTEND_URL=https://docugenius-chi.vercel.app
```

> ⚠️ Never commit `.env` files to GitHub.
>
> Use `.env.example` files as templates and configure secrets through the Vercel and Railway dashboards.
---

## ▶️ Running the App

**Terminal 1 — Backend:**

```bash
cd backend
npm start
# API running at http://localhost:5000
# Health check: http://localhost:5000/api/health
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

---

## 📡 API Endpoints

Base URL (Production): `https://docugenius-production.up.railway.app`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/health` | Server health check | None |
| `POST` | `/api/process-document` | Upload and analyze a document | None |

### `POST /api/process-document`

**Request:** `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | `File` | ✅ | JPG, PNG, or PDF — max 10MB |

**Response:** `application/json`

```json
{
  "success": true,
  "data": {
    "type": "Invoice",
    "category": "Financial",
    "keyInfo": {
      "date": "2025-11-15",
      "amount": "$4,200.00",
      "vendor": "Acme Corp",
      "additionalFields": {}
    },
    "summary": "A vendor invoice from Acme Corp for software licensing services totaling $4,200, dated November 2025 with payment due in 30 days.",
    "tags": ["invoice", "financial", "acme-corp", "software", "licensing"],
    "rawText": "..."
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "File type not supported. Please upload JPG, PNG, or PDF."
}
```

---

## ☁️ Deployment Architecture

```
┌─────────────────────────────────┐    ┌──────────────────────────────────┐
│         VERCEL (Frontend)       │    │        RAILWAY (Backend)          │
│                                 │    │                                   │
│  • Automatic deploys on push    │    │  • Node.js managed runtime        │
│  • Global CDN distribution      │◀──▶│  • Auto-restarts on crash         │
│  • HTTPS by default             │    │  • Environment variable vault     │
│  • Preview deployments per PR   │    │  • Zero-downtime redeploys        │
│                                 │    │                                   │
│  URL: docugenius-chi.vercel.app │    │  URL: docugenius-production       │
│                                 │    │       .up.railway.app             │
└─────────────────────────────────┘    └──────────────────────────────────┘
```

### Deployment Steps

**Frontend → Vercel:**

```bash
# Option 1: Connect GitHub repo to Vercel dashboard (recommended)
# Option 2: CLI
npm install -g vercel
cd frontend
vercel --prod
```

**Backend → Railway:**

```bash
# Option 1: Connect GitHub repo to Railway dashboard (recommended)
# Option 2: CLI
npm install -g @railway/cli
railway login
cd backend
railway up
```

> [!NOTE]
> Set all environment variables via the respective platform dashboards (Vercel → Project Settings → Environment Variables; Railway → Variables tab). Never expose secrets in code or deployment configs.

---

## 🔒 Security & Production Features

| Feature | Implementation |
|---|---|
| 🔑 **Secret Management** | All API keys stored in environment variables, never in source code |
| 📁 **File Validation** | Server-side MIME type and extension checks before processing |
| 📏 **Upload Limits** | Max 10MB per file enforced by Multer middleware |
| 🌐 **CORS Configuration** | Restricted to trusted origins only |
| 🚦 **Rate Limiting** | Per-IP request throttling on the `/api/process-document` route |
| 🛡 **Input Sanitization** | Filename and content validation prior to Azure submission |
| 🔐 **HTTPS Everywhere** | Enforced by Vercel (frontend) and Railway (backend) by default |
| 🗑 **Temp File Cleanup** | Uploaded files purged from server memory after processing |

---

## 🖼 Screenshots

> Screenshots and demo GIF coming soon. A live demo is available at [docugenius-chi.vercel.app](https://docugenius-chi.vercel.app).

| Upload Interface | Analysis Results | Document Gallery |
|:---:|:---:|:---:|
| _(screenshot placeholder)_ | _(screenshot placeholder)_ | _(screenshot placeholder)_ |

<!-- To add screenshots:
1. Create a /docs/screenshots/ folder
2. Replace the placeholders above with:
   ![Upload Interface](docs/screenshots/upload.png)
-->

---

## 🗺 Roadmap

### ✅ Completed (v1.0)

- [x] OCR text extraction via Azure AI Document Intelligence
- [x] AI document classification and structured data extraction
- [x] Full-text search and category filter tabs
- [x] Auto-tagging and key info (date, amount, vendor) extraction
- [x] Export document analysis to `.txt` report
- [x] Persistent localStorage across sessions
- [x] Deployed to Vercel (frontend) and Railway (backend)
- [x] Mobile-responsive UI

### 🔜 Planned (v2.0)

- [ ] ☁️ Cloud sync via Azure Blob Storage
- [ ] 🌍 Multi-language document support
- [ ] 📦 Batch upload and processing mode
- [ ] 📧 Email / WhatsApp document ingestion pipeline
- [ ] 📊 Expense analytics dashboard with charts
- [ ] 🔐 User authentication and personal document vaults
- [ ] 🤝 Team collaboration and document sharing
- [ ] 🔔 Smart alerts for expiring documents (contracts, IDs)

---

## 🤝 Contributing

Contributions are what make open source such an incredible place to learn and build. Any contributions you make are **greatly appreciated**.

1. **Fork** the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a **Pull Request**

Please make sure your PR includes:
- A clear description of the changes
- Updated documentation if applicable
- No committed `.env` files or API keys

---

### 📖 Detailed Case Study on Behance:
https://www.behance.net/gallery/250843061/DocuGenius-AI-Powered-Document-Intelligence-Platform

---

### Live Demo:
https://docugenius-chi.vercel.app

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for full details.

---

<div align="center">

<br />

Built with ❤️ for **Microsoft Imagine Cup 2026**

<br />

<a href="https://docugenius-chi.vercel.app" target="_blank">
  <img src="https://img.shields.io/badge/🌐%20Live%20Demo-docugenius--chi.vercel.app-0078D4?style=for-the-badge" alt="Live Demo" />
</a>

<br /><br />

⭐ **If DocuGenius helped or inspired you, please consider starring the repository!** ⭐

<br />

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:412991,100:0078D4&height=100&section=footer" width="100%" />

</div>
