<div align="center">

# ✨ DocuGenius

### AI-Powered Document Intelligence

[![Microsoft Imagine Cup 2026](https://img.shields.io/badge/Microsoft-Imagine%20Cup%202026-0078D4?style=for-the-badge&logo=microsoft&logoColor=white)](https://imaginecup.microsoft.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Azure AI](https://img.shields.io/badge/Azure-Document%20Intelligence-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/en-us/products/ai-services/ai-document-intelligence)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

**Upload any document. Get instant AI-powered analysis, classification, and key information extraction.**

[Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Running the App](#-running-the-app)
- [How It Works](#-how-it-works)
- [Roadmap](#-roadmap)

---

## 🧠 About

DocuGenius is an AI-powered document management app built for **Microsoft Imagine Cup 2026**. Upload photos or scans of physical documents — receipts, bills, medical records, contracts, IDs — and instantly receive structured analysis powered by **Microsoft Azure AI Document Intelligence** and **OpenAI GPT-4o-mini**.

No manual data entry. No lost paperwork. Just upload and understand.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📤 Smart Upload | JPG, PNG, or PDF — up to 10MB |
| 🔍 OCR Extraction | Azure reads text from any document, even handwritten |
| 🤖 AI Classification | Auto-categorizes: Financial, Medical, Legal, Personal, Business |
| 📊 Key Info Extraction | Pulls dates, amounts, vendors, and critical fields |
| 🏷️ Auto-Tagging | Generates relevant tags for easy searchability |
| 🔎 Full-Text Search | Search across all documents instantly |
| 📁 Category Filters | Browse by tab: Financial, Medical, Legal, Personal |
| 📥 Export Reports | Download a formatted `.txt` report for any document |
| 💾 Persistent Storage | Documents saved to localStorage between sessions |
| 📱 Responsive | Works on mobile and desktop |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Lucide React Icons |
| **Backend** | Node.js, Express 5 |
| **OCR / Document AI** | Azure AI Document Intelligence (prebuilt-read model) |
| **AI Analysis** | OpenAI GPT-4o-mini |
| **File Handling** | Multer (multipart uploads) |
| **HTTP Client** | Axios |
| **Styling** | Custom CSS with animations |

---

## 📁 Project Structure

```
docugenius/
├── README.md
├── .gitignore
├── LICENSE
│
├── backend/                      # Express API server
│   ├── server.js                 # All API routes + Azure + OpenAI logic
│   ├── package.json
│   └── .env.example              # Environment variable template
│
└── frontend/                     # React application
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src/
    │   ├── App.js                # Main application component
    │   ├── App.css               # Styles and animations
    │   ├── App.test.js
    │   ├── index.js              # React entry point
    │   ├── index.css
    │   ├── reportWebVitals.js
    │   └── setupTests.js
    ├── package.json
    └── .env.example
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- An [Azure account](https://azure.microsoft.com/free/) with a Document Intelligence resource (Free tier F0 available)
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/docugenius.git
cd docugenius
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and fill in your Azure + OpenAI keys
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
cp .env.example .env
# Edit .env if your backend runs on a different port
```

### Environment Variables

**`backend/.env`**
```env
AZURE_DOC_INTELLIGENCE_ENDPOINT=https://your-resource.cognitiveservices.azure.com
AZURE_DOC_INTELLIGENCE_KEY=your_azure_key_here
OPENAI_API_KEY=sk-your_openai_api_key_here
PORT=5000
```

**`frontend/.env`**
```env
REACT_APP_API_URL=http://localhost:5000
```

> ⚠️ Never commit `.env` files. They are blocked by `.gitignore`.

**How to get Azure credentials:**
1. Go to [Azure Portal](https://portal.azure.com)
2. Create a **Document Intelligence** resource
3. Go to **Keys and Endpoint** under your resource
4. Copy **Endpoint** and **Key 1**

---

## ▶️ Running the App

**Terminal 1 — Start backend:**
```bash
cd backend
npm start
# Runs at http://localhost:5000
# Health check: http://localhost:5000/api/health
```

**Terminal 2 — Start frontend:**
```bash
cd frontend
npm start
# Opens at http://localhost:3000
```

---

## ⚙️ How It Works

```
User uploads document (image or PDF)
         ↓
Backend receives file via Express + Multer
         ↓
Azure Document Intelligence extracts raw text (OCR)
         ↓
Extracted text is sent to OpenAI GPT-4o-mini
         ↓
AI returns structured JSON:
  type, category, keyInfo (date/amount/vendor), summary, tags
         ↓
Frontend displays full analysis with document preview
```

**Supported document types:**
- 🧾 Bills & Receipts
- 📄 Invoices
- 🪪 ID Cards
- 🏥 Medical Records
- ⚖️ Legal Contracts
- 🗂 Tax Documents
- 🏦 Bank Statements

---

## 🗺 Roadmap

- [x] OCR text extraction via Azure AI
- [x] AI document classification and analysis
- [x] Full-text search and category filters
- [x] Export to text report
- [ ] Cloud sync via Azure Blob Storage
- [ ] Multi-language document support
- [ ] Batch upload mode
- [ ] Email/WhatsApp document ingestion
- [ ] Expense analytics dashboard

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ for **Microsoft Imagine Cup 2026**

⭐ Star this repo if you find it useful!

</div>
