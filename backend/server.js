const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
require('dotenv').config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());

// =======================
// Health check
// =======================
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DocuGenius API is running!' });
});

// =======================
// Helpers
// =======================
function normalizeEndpoint(endpoint) {
  if (!endpoint) return '';
  // remove trailing slash
  endpoint = endpoint.trim().replace(/\/+$/, '');
  // remove accidental paths
  endpoint = endpoint.replace(/\/formrecognizer.*$/i, '');
  return endpoint;
}

// =======================
// Document processing
// =======================
app.post('/api/process-document', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('📄 Processing:', req.file.originalname);

    const extractedText = await extractTextFromDocument(req.file);

    if (!extractedText || !extractedText.trim()) {
      return res.status(400).json({ error: 'No text extracted' });
    }

    const analysis = await analyzeDocument(extractedText);

    res.json({
      success: true,
      text: extractedText,
      analysis
    });

  } catch (err) {
    console.error('❌ Processing error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// =======================
// Azure Document Intelligence (READ)
// =======================
async function extractTextFromDocument(file) {
  try {
    const endpoint = normalizeEndpoint(process.env.AZURE_DOC_INTELLIGENCE_ENDPOINT);
    const key = process.env.AZURE_DOC_INTELLIGENCE_KEY;

    console.log('🔍 Azure Endpoint:', endpoint);
    console.log('🔑 Key length:', key?.length);

    if (!endpoint || !key) {
      throw new Error('Azure endpoint or key missing');
    }

    const analyzeUrl =
      `${endpoint}/formrecognizer/documentModels/prebuilt-read:analyze` +
      `?api-version=2023-07-31`;

    const analyzeResponse = await axios.post(
      analyzeUrl,
      file.buffer,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Content-Type': 'application/octet-stream'
        },
        maxBodyLength: Infinity
      }
    );

    const operationLocation = analyzeResponse.headers['operation-location'];
    if (!operationLocation) {
      throw new Error('No operation-location header returned');
    }

    // Poll result
    let attempts = 0;
    let result;

    while (attempts < 30) {
      await new Promise(r => setTimeout(r, 1000));

      const poll = await axios.get(operationLocation, {
        headers: {
          'Ocp-Apim-Subscription-Key': key
        }
      });

      result = poll.data;

      if (result.status === 'succeeded') break;
      if (result.status === 'failed') {
        throw new Error(result.error?.message || 'Azure analysis failed');
      }

      attempts++;
    }

    if (!result?.analyzeResult) {
      throw new Error('No analyzeResult returned');
    }

    // Extract text
    return result.analyzeResult.content?.trim() || '';

  } catch (err) {
    console.error('🧠 Azure OCR error:', err.response?.data || err.message);
    throw new Error(`Failed to extract text: ${err.message}`);
  }
}

// =======================
// OpenAI Analysis
// =======================
async function analyzeDocument(text) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Return ONLY valid JSON. No markdown. No explanations.'
          },
          {
            role: 'user',
            content: `Analyze this document and return JSON only:

${text.slice(0, 3000)}

JSON format:
{
  "type": "Bill|Receipt|Invoice|ID Card|Medical|Contract|Tax Document|Bank Statement|Other",
  "category": "Financial|Medical|Legal|Personal|Business",
  "keyInfo": {
    "date": "string or null",
    "amount": "string or null",
    "vendor": "string or null",
    "important": "string"
  },
  "summary": "string",
  "tags": ["string"]
}`
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return JSON.parse(response.data.choices[0].message.content);

  } catch (err) {
    console.error('🤖 OpenAI error:', err.response?.data || err.message);
    throw new Error('Document analysis failed');
  }
}

// =======================
// Server
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 DocuGenius Backend running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}/api/health`);
});
