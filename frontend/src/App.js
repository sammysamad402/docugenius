import { AlertCircle, Camera, CheckCircle, Download, FileText, FolderOpen, Search, Sparkles, Trash2, TrendingUp, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import './App.css';

// Backend API URL - change this when deploying
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [notification, setNotification] = useState(null);

  // Load documents from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('docugenius_documents');
    if (saved) {
      try {
        setDocuments(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved documents:', e);
      }
    }
  }, []);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem('docugenius_documents', JSON.stringify(documents));
    }
  }, [documents]);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Upload and process document via backend
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      showNotification('Please upload an image (JPG, PNG, GIF) or PDF file', 'error');
      return;
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      showNotification('File size must be less than 10MB', 'error');
      return;
    }

    setLoading(true);
    try {
      showNotification('Uploading and processing document...', 'info');

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Send to backend
      const response = await fetch(`${API_URL}/api/process-document`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process document');
      }

      const result = await response.json();

      // Create document object
      const newDoc = {
        id: Date.now(),
        name: file.name,
        uploadDate: new Date().toLocaleDateString(),
        uploadTime: new Date().toLocaleTimeString(),
        text: result.text,
        type: result.analysis.type,
        category: result.analysis.category,
        keyInfo: result.analysis.keyInfo,
        summary: result.analysis.summary,
        tags: result.analysis.tags,
        preview: URL.createObjectURL(file),
        fileSize: formatFileSize(file.size)
      };

      setDocuments([newDoc, ...documents]);
      setSelectedDoc(newDoc);
      showNotification('Document processed successfully! 🎉', 'success');
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error: ' + error.message, 'error');
    }
    setLoading(false);
    event.target.value = ''; // Reset file input
  };

  // Helper: Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Filter documents
  const filteredDocs = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.keyInfo.vendor && doc.keyInfo.vendor.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = activeTab === 'all' || doc.category.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  // Get statistics
  const stats = {
    total: documents.length,
    financial: documents.filter(d => d.category === 'Financial').length,
    medical: documents.filter(d => d.category === 'Medical').length,
    legal: documents.filter(d => d.category === 'Legal').length,
  };

  // Calculate total expenses
  const totalExpenses = documents
    .filter(d => d.category === 'Financial' && d.keyInfo.amount)
    .reduce((sum, d) => {
      const amount = parseFloat(d.keyInfo.amount.replace(/[^0-9.-]+/g, ''));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

  // Export document
  const exportDocument = (doc) => {
    const report = `
╔════════════════════════════════════════════════╗
║          DOCUGENIUS DOCUMENT REPORT            ║
╚════════════════════════════════════════════════╝

📄 DOCUMENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:          ${doc.name}
Upload Date:   ${doc.uploadDate} ${doc.uploadTime}
File Size:     ${doc.fileSize}

🏷️  CLASSIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type:          ${doc.type}
Category:      ${doc.category}

🔍 KEY INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Date:          ${doc.keyInfo.date || 'N/A'}
Amount:        ${doc.keyInfo.amount || 'N/A'}
Vendor:        ${doc.keyInfo.vendor || 'N/A'}
Important:     ${doc.keyInfo.important || 'N/A'}

📝 SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${doc.summary}

🏷️  TAGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${doc.tags.map(tag => `#${tag}`).join(', ')}

📋 EXTRACTED TEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${doc.text}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by DocuGenius - AI Document Intelligence
Powered by Azure AI Document Intelligence & OpenAI GPT-4o-mini
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.name.replace(/\.[^/.]+$/, '')}-report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Report downloaded successfully!', 'success');
  };

  // Delete document
  const deleteDocument = (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(d => d.id !== docId));
      if (selectedDoc?.id === docId) setSelectedDoc(null);
      showNotification('Document deleted', 'success');
    }
  };

  return (
    <div className="app">
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' && <CheckCircle size={20} />}
          {notification.type === 'error' && <AlertCircle size={20} />}
          {notification.type === 'info' && <AlertCircle size={20} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Sparkles className="logo-icon" />
            <h1>DocuGenius</h1>
          </div>
          <p className="tagline">AI-Powered Document Intelligence • Microsoft Imagine Cup 2026</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        {/* Upload Section */}
        <div className="upload-section">
          <label className="upload-card" htmlFor="file-upload">
            <input
              id="file-upload"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              disabled={loading}
              style={{ display: 'none' }}
            />
            <Camera size={48} />
            <h3>Upload Document</h3>
            <p>Take a photo or select from gallery</p>
            <p className="file-types">Supports: JPG, PNG, PDF (max 10MB)</p>
            <button className="upload-btn" disabled={loading}>
              <Upload size={20} />
              {loading ? 'Processing...' : 'Choose File'}
            </button>
          </label>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card pulse">
              <FileText size={24} />
              <div>
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Documents</div>
              </div>
            </div>
            <div className="stat-card pulse">
              <TrendingUp size={24} />
              <div>
                <div className="stat-number">{stats.financial}</div>
                <div className="stat-label">Financial</div>
                {totalExpenses > 0 && (
                  <div className="stat-detail">₹{totalExpenses.toFixed(2)}</div>
                )}
              </div>
            </div>
            <div className="stat-card pulse">
              <FolderOpen size={24} />
              <div>
                <div className="stat-number">{stats.medical + stats.legal}</div>
                <div className="stat-label">Medical + Legal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="controls">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search documents, amounts, vendors, dates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>
          <div className="tabs">
            <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>
              All ({documents.length})
            </button>
            <button className={activeTab === 'financial' ? 'active' : ''} onClick={() => setActiveTab('financial')}>
              Financial ({stats.financial})
            </button>
            <button className={activeTab === 'medical' ? 'active' : ''} onClick={() => setActiveTab('medical')}>
              Medical ({stats.medical})
            </button>
            <button className={activeTab === 'legal' ? 'active' : ''} onClick={() => setActiveTab('legal')}>
              Legal ({stats.legal})
            </button>
            <button className={activeTab === 'personal' ? 'active' : ''} onClick={() => setActiveTab('personal')}>
              Personal
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p><strong>Processing your document...</strong></p>
            <p className="loading-sub">Extracting text and analyzing with AI ✨</p>
          </div>
        )}

        {/* Documents Grid */}
        <div className="content-grid">
          {/* Documents List */}
          <div className="documents-list">
            <h2>📁 Your Documents ({filteredDocs.length})</h2>
            {filteredDocs.length === 0 && !loading && (
              <div className="empty-state">
                <FileText size={64} />
                {documents.length === 0 ? (
                  <>
                    <p><strong>No documents yet!</strong></p>
                    <p>Upload your first document to get started</p>
                    <p className="empty-hint">Try uploading bills, receipts, or important documents</p>
                  </>
                ) : (
                  <>
                    <p><strong>No documents found</strong></p>
                    <p>Try adjusting your search or filters</p>
                  </>
                )}
              </div>
            )}
            <div className="docs-scroll">
              {filteredDocs.map(doc => (
                <div
                  key={doc.id}
                  className={`doc-card ${selectedDoc?.id === doc.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDoc(doc)}
                >
                  <div className="doc-icon">{getCategoryIcon(doc.category)}</div>
                  <div className="doc-info">
                    <h3>{doc.name}</h3>
                    <div className="doc-meta">
                      <span className={`badge ${doc.category.toLowerCase()}`}>{doc.type}</span>
                      <span className="date">{doc.uploadDate}</span>
                      <span className="size">{doc.fileSize}</span>
                    </div>
                    <p className="doc-summary">{doc.summary}</p>
                    {doc.keyInfo.amount && (
                      <div className="doc-amount">💰 {doc.keyInfo.amount}</div>
                    )}
                    <div className="doc-tags">
                      {doc.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteDocument(doc.id);
                    }}
                    title="Delete document"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Document Details */}
          {selectedDoc ? (
            <div className="document-details">
              <h2>📄 Document Details</h2>
              <div className="detail-card">
                <div className="doc-preview-container">
                  <img src={selectedDoc.preview} alt="Document preview" className="doc-preview" />
                </div>
                
                <div className="detail-section">
                  <h3>🏷️ Classification</h3>
                  <div className="detail-grid">
                    <div>
                      <label>Type:</label>
                      <span className={`badge ${selectedDoc.category.toLowerCase()}`}>{selectedDoc.type}</span>
                    </div>
                    <div>
                      <label>Category:</label>
                      <span className="category-text">{selectedDoc.category}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>🔍 Key Information</h3>
                  <div className="key-info-grid">
                    {selectedDoc.keyInfo.date && (
                      <div className="info-item">
                        <label>📅 Date:</label>
                        <span>{selectedDoc.keyInfo.date}</span>
                      </div>
                    )}
                    {selectedDoc.keyInfo.amount && (
                      <div className="info-item">
                        <label>💰 Amount:</label>
                        <span className="amount">{selectedDoc.keyInfo.amount}</span>
                      </div>
                    )}
                    {selectedDoc.keyInfo.vendor && (
                      <div className="info-item">
                        <label>🏪 Vendor:</label>
                        <span>{selectedDoc.keyInfo.vendor}</span>
                      </div>
                    )}
                    {selectedDoc.keyInfo.important && (
                      <div className="info-item full-width">
                        <label>⭐ Important:</label>
                        <span>{selectedDoc.keyInfo.important}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>📝 Summary</h3>
                  <p className="summary-text">{selectedDoc.summary}</p>
                </div>

                <div className="detail-section">
                  <h3>🏷️ Tags</h3>
                  <div className="doc-tags-detail">
                    {selectedDoc.tags.map((tag, i) => (
                      <span key={i} className="tag-large">#{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>📄 Extracted Text</h3>
                  <div className="extracted-text">
                    {selectedDoc.text}
                  </div>
                </div>

                <button className="download-btn" onClick={() => exportDocument(selectedDoc)}>
                  <Download size={20} />
                  Download Full Report
                </button>
              </div>
            </div>
          ) : (
            <div className="document-details">
              <div className="no-selection">
                <FileText size={80} />
                <h3>Select a document</h3>
                <p>Click on any document from the list to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Built with ❤️ using Azure AI Document Intelligence & OpenAI GPT-4o-mini</p>
        <p>Microsoft Imagine Cup 2026 • DocuGenius</p>
      </footer>
    </div>
  );
}

// Helper function for category icons
function getCategoryIcon(category) {
  switch(category) {
    case 'Financial': return '💰';
    case 'Medical': return '🏥';
    case 'Legal': return '⚖️';
    case 'Personal': return '👤';
    case 'Business': return '💼';
    default: return '📄';
  }
}

export default App;