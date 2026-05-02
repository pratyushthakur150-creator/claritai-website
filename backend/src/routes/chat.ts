import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

const SYSTEM_PROMPT = `You are the ClaritAI Assistant — a premium AI chatbot on the ClaritAI website (claritai.in).
ClaritAI builds AI-powered lead conversion tools for coaching institutes in India.

PRODUCTS:
1. **Sia Chatbot** (₹4,999/mo) — 24/7 AI chatbot for coaching websites. Captures leads, answers FAQs, books demos. Trained for JEE, NEET, CBSE.
2. **Voice AI** (₹7,999/mo) — AI voice caller that calls leads within 2 min. Qualifies, answers questions, books appointments.
3. **CRM Suite** (₹9,999/mo) — Full pipeline CRM with AI dropout prediction, lead scoring, analytics dashboard.
4. **Complete Bundle** (₹14,999/mo) — All 3 products + priority support + custom training.

KEY FACTS:
- Founded by Aman Saraswat (Founder), Piyush Kumar (CEO), Pratyush Singh (Co-Founder)
- 550+ coaching institutes use ClaritAI
- 20,000+ students connected
- 5-minute setup, no coding required
- DPDP compliant (Indian data protection)
- Free trial available, no setup fee
- Contact: +91 8953960991, s.pratyush@iitg.ac.in
- Office: Noida, India

YOUR BEHAVIOR:
- Be enthusiastic, helpful, and professional
- Keep responses concise (2-4 sentences max)
- Use emoji sparingly (1-2 per message)
- Always try to guide toward booking a demo or starting a free trial
- If asked about competitors, highlight ClaritAI's India-focused advantage
- Offer quick reply chips in [brackets] like: [Book a Demo] [View Pricing] [Talk to Team]
- If the user shares their name/phone/email, acknowledge warmly
- Reply in the same language the user uses (Hindi/Hinglish/English)`;

router.post('/', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!OPENAI_API_KEY) {
      // Fallback: smart rule-based responses when no API key
      const lower = message.toLowerCase();
      let response = "Thanks for your interest! I'd love to help. Could you tell me more about what you're looking for? [Book a Demo] [View Pricing] [Talk to Team]";

      if (/pric|cost|plan|kitna|rate/i.test(lower)) {
        response = "Great question! 💰 Our plans:\n\n• **Sia Chatbot** — ₹4,999/mo\n• **Voice AI** — ₹7,999/mo\n• **CRM Suite** — ₹9,999/mo\n• **Complete Bundle** — ₹14,999/mo (best value!)\n\nAll plans include a free trial with no setup fee. [Start Free Trial] [Book a Demo] [Compare Plans]";
      } else if (/demo|book|schedule|appointment/i.test(lower)) {
        response = "Awesome! 📅 I'd love to show you ClaritAI in action. You can book a free 30-min demo with our team right now!\n\nJust visit our demo page or call us at +91 8953960991. [Book Demo Now] [Call Us] [Learn More First]";
      } else if (/sia|chatbot|chat bot/i.test(lower)) {
        response = "🤖 **Sia Chatbot** is our flagship product! It's a 24/7 AI chatbot trained specifically for coaching institutes.\n\nIt captures leads, answers student queries about courses/fees/timings, and books demos — all while you sleep! Starting at just ₹4,999/mo. [See Sia in Action] [View Pricing] [Book a Demo]";
      } else if (/voice|call|caller/i.test(lower)) {
        response = "📞 **Voice AI** calls your leads within 2 minutes of inquiry! It qualifies leads, answers questions, and books appointments automatically.\n\nImagine — a student fills a form at 11 PM, and gets a call within 2 minutes. That's Voice AI! ₹7,999/mo. [Learn More] [Book a Demo] [View Pricing]";
      } else if (/crm|dashboard|analytics/i.test(lower)) {
        response = "📊 **CRM Suite** gives you full pipeline visibility with AI-powered features:\n\n• Lead scoring & dropout prediction\n• Automated follow-ups\n• Analytics dashboard\n• Team performance tracking\n\nStarting at ₹9,999/mo. [See CRM Demo] [View Pricing] [Book a Demo]";
      } else if (/hi|hello|hey|hii/i.test(lower)) {
        response = "Hey there! 👋 Welcome to ClaritAI! I'm here to help you learn about our AI-powered lead conversion tools for coaching institutes.\n\nWhat would you like to know? [How It Works] [Pricing] [Book a Demo] [Talk to Team]";
      } else if (/contact|phone|call|email|reach/i.test(lower)) {
        response = "📞 You can reach our team anytime!\n\n• **Phone/WhatsApp**: +91 8953960991\n• **Email**: s.pratyush@iitg.ac.in\n• **Office**: Noida, India\n\nOr I can help you right here! [Book a Demo] [Start Free Trial]";
      } else if (/free|trial|try/i.test(lower)) {
        response = "Yes! 🎉 We offer a **free trial** with absolutely no setup fee. You can try any of our products risk-free.\n\nJust book a quick demo and we'll get you started in 5 minutes! [Start Free Trial] [Book a Demo] [View Pricing]";
      }

      return res.json({ response });
    }

    // OpenAI API call
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(history || []).slice(-8),
      { role: 'user', content: message },
    ];

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: apiMessages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!openaiRes.ok) {
      console.error('[Chat] OpenAI error:', openaiRes.status);
      return res.json({ response: "I'm experiencing a brief hiccup. Please try again in a moment! 🙏 [Try Again] [Talk to Team]" });
    }

    const openaiData = await openaiRes.json();
    const botResponse = openaiData.choices?.[0]?.message?.content || "I'd love to help! Could you rephrase that? [Book a Demo] [Pricing] [Talk to Team]";

    // Try to extract and save lead info
    try {
      const phoneMatch = message.match(/(?:\+?91[\s-]?)?([6-9]\d{9})/);
      const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      const nameMatch = message.match(/(?:my name is|i'm|i am|this is)\s+([A-Za-z][a-zA-Z]*(?:\s+[A-Za-z][a-zA-Z]*){0,2})/i);

      if (phoneMatch || emailMatch) {
        await prisma.contactSubmission.create({
          data: {
            name: nameMatch ? nameMatch[1].trim() : 'Chatbot Lead',
            email: emailMatch ? emailMatch[0] : 'chatbot@claritai.in',
            phone: phoneMatch ? phoneMatch[1] : '',
            interest: 'Chatbot Inquiry',
            message: `[Chatbot] ${message}`,
          },
        });
        console.log('[Chat] Lead auto-captured from chatbot');
      }
    } catch (err) {
      console.warn('[Chat] Lead capture skipped:', err);
    }

    res.json({ response: botResponse });
  } catch (err) {
    console.error('[Chat] Error:', err);
    res.status(500).json({ response: "Something went wrong. Please try again! [Try Again]" });
  }
});

export default router;
