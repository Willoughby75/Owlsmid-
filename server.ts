import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Lazy initialize Gemini SDK to prevent startup crashes if GEMINI_API_KEY is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please configure it in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

app.use(express.json({ limit: "15mb" }));

// 1. Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    hasApiKey: !!process.env.GEMINI_API_KEY 
  });
});

// 2. LinguaBot API Endpoint (Understands and translates text, then generates TTS audio)
app.post("/api/linguabot/process", async (req, res) => {
  try {
    const { message, inputLang, targetLang, voiceName, mode } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Input text cannot be empty." });
    }

    const ai = getGeminiClient();
    const voice = voiceName || "Zephyr"; // 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
    const targetLanguageLabel = targetLang || "English";
    const sourceLanguageLabel = inputLang || "Auto-detect";

    let systemPrompt = "";
    if (mode === "translate") {
      systemPrompt = `You are a master linguistic translator and cultural expert. 
Translate the input text from ${sourceLanguageLabel} to ${targetLanguageLabel}. 
Analyze the input text and provide a full linguistic explanation, showing complete cultural and idiom understanding.
Also provide a phonetic pronunciation guide.`;
    } else if (mode === "explain") {
      systemPrompt = `You are a multilingual linguistic scholar. 
Explain the core meaning, context, grammar, and nuance of the input text in ${targetLanguageLabel}.
Translate or paraphrase the input text clearly, and provide a detailed explanation of vocabulary and cultural context.
Also provide a pronunciation guide for any key phrases.`;
    } else {
      // Chat mode
      systemPrompt = `You are "SMID LinguaBot", a friendly, brilliant multilingual AI conversation assistant. 
Reply to the user's message in ${targetLanguageLabel}. 
Provide:
1. Your response in ${targetLanguageLabel}.
2. A detailed linguistic explanation or cultural note about the phrases used in your response.
3. A clear pronunciation guide for your response.`;
    }

    // Call gemini-3.5-flash for the smart content structured as JSON
    const textResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            translatedText: {
              type: Type.STRING,
              description: "The primary translation, explanation, or chat reply in the target language."
            },
            originalExplanation: {
              type: Type.STRING,
              description: "A detailed linguistic explanation, grammar notes, idiom insights, or cultural background showcasing deep understanding."
            },
            pronunciationGuide: {
              type: Type.STRING,
              description: "A step-by-step phonetic pronunciation guide to help the user speak the target language text out loud."
            },
          },
          required: ["translatedText", "originalExplanation", "pronunciationGuide"]
        }
      }
    });

    const resultText = textResponse.text;
    if (!resultText) {
      throw new Error("No response text received from the Gemini analysis model.");
    }

    const parsedResult = JSON.parse(resultText);

    // Now, call gemini-3.1-flash-tts-preview to read the primary text out loud
    let audioBase64 = null;
    try {
      // Use clean text, avoid punctuation characters or markers that confuse speech synthesis if any
      const textToSpeak = parsedResult.translatedText;
      
      const ttsResponse = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: textToSpeak }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice }
            }
          }
        }
      });

      const audioPart = ttsResponse.candidates?.[0]?.content?.parts?.[0];
      if (audioPart && audioPart.inlineData) {
        audioBase64 = audioPart.inlineData.data;
      }
    } catch (ttsErr: any) {
      console.error("TTS generation error:", ttsErr);
      // We will not fail the whole request just because TTS is offline or limited
    }

    return res.json({
      translatedText: parsedResult.translatedText,
      originalExplanation: parsedResult.originalExplanation,
      pronunciationGuide: parsedResult.pronunciationGuide,
      audioBase64: audioBase64,
    });

  } catch (error: any) {
    console.error("LinguaBot Processing Error:", error);
    return res.status(500).json({ 
      error: error.message || "An internal error occurred during translation processing." 
    });
  }
});

// 3. Alternate Birth Certificate Trust Validator Endpoint
app.post("/api/verify/birth-certificate", async (req, res) => {
  try {
    const { documentText, fullName, dob, parentName } = req.body;
    
    const ai = getGeminiClient();
    
    const systemPrompt = `You are the official SMID Alternative Birth Certificate Trust Validator. 
Verify the legitimacy of the alternative Birth Certificate details provided for registration.
Analyze if the name, date of birth, and parent name meet valid social and civil register patterns.
Generate a high-security analysis of the document's trust parameters and issue a verified cryptographically sound security token (starting with SMID-ALT-BC-) if acceptable.`;

    const modelInput = `
Submitted Details:
- Full Name: ${fullName || 'Not specified'}
- Date of Birth: ${dob || 'Not specified'}
- Parent/Guardian Name: ${parentName || 'Not specified'}
- Raw Certificate Data or Description: ${documentText || 'Authentic State Registered Birth Record with holographic seal'}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: modelInput,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValid: { type: Type.BOOLEAN },
            trustScore: { type: Type.INTEGER },
            verifiedName: { type: Type.STRING },
            verifiedDob: { type: Type.STRING },
            verificationSeal: { type: Type.STRING },
            auditLog: { type: Type.STRING, description: "Detailed structural audit review explaining how the birth certificate verifies identity and what security markers were verified." },
            nextSteps: { type: Type.STRING, description: "Next actions for the registrant to complete registration." }
          },
          required: ["isValid", "trustScore", "verifiedName", "verifiedDob", "verificationSeal", "auditLog", "nextSteps"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Failed to receive structured validation response from Gemini.");
    }

    const parsedResult = JSON.parse(resultText);
    return res.json(parsedResult);

  } catch (error: any) {
    console.error("Birth Certificate Verification Error:", error);
    return res.status(500).json({ 
      error: error.message || "Birth Certificate Validation service is temporarily offline." 
    });
  }
});

// 4. Mini BSMID Online-Only Storefront & Digital Presence Analyzer Endpoint
app.post("/api/verify/mini-bsmid", async (req, res) => {
  try {
    const { documentText, businessName, country, registrationType } = req.body;
    
    const ai = getGeminiClient();
    
    const systemPrompt = `You are the official SMID Mini BSMID Digital Trust Auditor. 
This tier is specifically designed for online-only micro-merchants, social commerce creators, and independent entrepreneurs who DO NOT have formal government registration papers or corporate documents yet and want to start small online.
Analyze the submitted digital presence details (such as active Shopify/Etsy shop links, Instagram/TikTok business handles, custom domain registration info, or payment processing pages).
Evaluate the validity of the brand name, active listings/products, or web presence details.
Generate a structured trust report containing a digital starter trust score (0-100), verified parameters, and issue an online-only verified Micro-Business security token starting with SMID-MINI-BIZ-.`;

    const modelInput = `
Submitted Startup Details:
- Business/Brand Name: ${businessName || 'Not specified'}
- Digital Presence/Store Type: ${registrationType || 'Online Storefront Link (Shopify/Etsy/Amazon)'}
- Target/Operating Country: ${country || 'United States'}
- Raw Link, Description, or Screenshot Info: ${documentText || 'Active Etsy store with positive custom feedback and linked social media handle.'}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: modelInput,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValid: { type: Type.BOOLEAN },
            trustScore: { type: Type.INTEGER, description: "A trust score from 0 to 100 representing the strength of their active online footprint." },
            verifiedBusinessName: { type: Type.STRING },
            verifiedRegistrationType: { type: Type.STRING, description: "Type of digital verification analyzed (e.g. Verified Shopify Store, Verified Social Seller, Verified Custom Domain)." },
            verificationSeal: { type: Type.STRING, description: "A secure verification code starting with SMID-MINI-BIZ- followed by randomized alphanumeric characters." },
            auditLog: { type: Type.STRING, description: "Detailed digital auditing evaluation describing the active online presence, estimated traffic/sales trust, and web footprint." },
            nextSteps: { type: Type.STRING, description: "Actionable advice for the micro-merchant to further protect their brand and eventually transition to full BSMID." }
          },
          required: ["isValid", "trustScore", "verifiedBusinessName", "verifiedRegistrationType", "verificationSeal", "auditLog", "nextSteps"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Failed to analyze digital storefront presence via Gemini.");
    }

    const parsedResult = JSON.parse(resultText);
    return res.json(parsedResult);

  } catch (error: any) {
    console.error("Mini BSMID Verification Error:", error);
    return res.status(500).json({ 
      error: error.message || "Mini BSMID Digital Trust service is temporarily offline." 
    });
  }
});

// Vite middleware / asset serving
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

initServer();
