# 🌱 Soil Health Analyzer

> **AI-powered soil analysis from a single photo — get pH, nutrients, and crop recommendations in under 30 seconds.**

Upload or capture a soil image and instantly receive a full health report including soil type classification, pH level, NPK nutrient readings, crop compatibility recommendations, and personalized improvement tips. Built for precision agriculture.


## ✨ Features

### 🔬 AI Soil Analysis
- Upload a soil image or capture one directly from your camera
- Image is sent to a vision AI model via **OpenRouter** (with automatic fallback across 3 models: Gemma 4 31B, Kimi K2, Gemma 4 26B)
- Returns a structured JSON report with no markdown or explanation — just clean data
- Non-soil images are automatically rejected with a user-friendly warning

### 📊 Full Results Dashboard
- **Health Score** — 0–100 score with animated SVG ring and label (Poor / Fair / Good / Excellent)
- **Soil Type** — Classifies as Clay, Sandy, Loam, Silt, Peat, Chalk, or Unknown
- **pH Level** — Exact value with Acidic / Neutral / Alkaline label and a visual slider marker
- **NPK Nutrients** — Nitrogen, Phosphorus, and Potassium each with a percentage bar and label (Very Low / Low / Optimal / High)
- **Soil Composition** — Written summary of mineral and organic content
- **Crop Recommendations** — 3 crops with compatibility percentage and icons
- **Improvement Tips** — 3–4 actionable steps to improve soil health

### 🗃️ History & Trend Tracking
- All analyses are saved to **Supabase** (PostgreSQL database + object storage)
- Soil images are uploaded to Supabase Storage and linked to the record
- History page shows paginated records (10 per page) with expand/collapse detail panels
- Bar chart of the last 5 health scores for trend visualization
- Summary card showing average and best score on record
- Each record supports **user field notes** (saved directly to the database on blur)
- **Re-analyze** any past record — pre-fills the upload step with the existing image
- **Delete** records with a confirmation modal (removes the database row)

### 📷 Smart Upload Flow
3-step UI with animated progress indicator:
1. **Upload** — drag-and-drop or file picker, plus camera capture button; live image preview
2. **Scanning** — animated SVG ring, rotating scan status messages, and live scan bars for pH / Nitrogen / Potassium / Composition
3. **Results** — full dashboard populated from the AI response

### 📚 Tips Page
Expert guidance organized into cards:
- How to capture the best soil photos (lighting, distance, scale reference)
- How to interpret pH and nutrient results
- How to improve soil health (compost, lime, irrigation)
- Crop selection by soil type
- Why consistent re-analysis matters

---

## 🗂️ Project Structure

```
soil-health-analyzer/
├── index.html          # Landing page — hero, feature overview, how it works
├── analyzer.html       # Core analysis tool — upload, scan, results
├── history.html        # Analysis history, trends, record management
├── tips.html           # Expert soil analysis tips
└── assets/
    ├── css/
    │   └── shared.css  # Global styles, animations, custom Tailwind tokens
    └── js/
        └── tailwind.config.js  # Custom design system (colors, spacing, typography)
```

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, Tailwind CSS v3 (CDN), Vanilla JavaScript |
| UI Icons | Material Symbols Outlined |
| AI Vision | OpenRouter API (Gemma 4 31B → Kimi K2 → Gemma 4 26B, with fallback) |
| Database | Supabase (PostgreSQL via REST API) |
| Image Storage | Supabase Storage (`soil-images` bucket) |
| Fonts | Inter (Google Fonts) |

---

## ⚙️ Setup & Configuration

This project is fully static — no build step, no Node.js, no bundler required. Just open `index.html` in a browser or deploy to any static host.

### 1. Clone the repository

```bash
git clone https://github.com/edrean-supremo/soil-health-analyzer.git
cd soil-health-analyzer
```

### 2. Configure your API keys

Open `analyzer.html` and replace the placeholder values near the bottom of the `<script>` block:

```js
// OpenRouter — get your key at https://openrouter.ai
const OPENROUTER_API_KEY = 'your-openrouter-api-key';

// Supabase — get these from your Supabase project settings
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';
```

Do the same in `history.html`:

```js
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';
```

### 3. Set up Supabase

In your Supabase project:

**Create the `soil_analyses` table:**

```sql
create table soil_analyses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  soil_type text,
  health_score integer,
  health_label text,
  health_summary text,
  ph_value float,
  ph_label text,
  ph_marker_percent float,
  nitrogen_label text,
  nitrogen_percent integer,
  phosphorus_label text,
  phosphorus_percent integer,
  potassium_label text,
  potassium_percent integer,
  composition text,
  crop_recommendations text,
  improvement_tips text,
  image_path text,
  user_notes text
);
```

**Create the `soil-images` storage bucket:**
- Go to Storage → New Bucket → Name: `soil-images` → Public: ✅

### 4. Open in browser

```bash
# Serve locally (Python)
python -m http.server 8080

# Or open index.html directly in your browser
```

---

## 🖼️ How It Works

1. User uploads or captures a soil photo on `analyzer.html`
2. The image is base64-encoded and sent to OpenRouter with a strict system prompt instructing the AI to return only a JSON object
3. If the first model fails, the app automatically retries with the next model in the fallback list
4. The JSON response is parsed and validated — non-soil images are caught and rejected with an auto-dismissing warning
5. The result is displayed on the Step 3 results dashboard
6. Simultaneously, the result and image are saved to Supabase for history tracking
7. Past analyses can be viewed, re-analyzed, annotated with notes, or deleted from `history.html`

---

## 📐 AI Prompt Schema

The AI is instructed to return exactly this structure:

```json
{
  "soilDetected": true,
  "soilType": "Loam",
  "healthScore": 78,
  "healthLabel": "Good",
  "healthSummary": "Well-structured loam with moderate organic matter.",
  "ph": { "value": 6.5, "label": "Neutral", "markerPercent": 52 },
  "nutrients": {
    "nitrogen":   { "label": "Optimal", "percent": 75 },
    "phosphorus": { "label": "Low",     "percent": 35 },
    "potassium":  { "label": "High",    "percent": 90 }
  },
  "composition": "65% mineral, 30% organic matter, 5% moisture",
  "cropRecommendations": [
    { "name": "Corn", "icon": "grass", "compatibility": 88 },
    { "name": "Wheat", "icon": "grain", "compatibility": 82 },
    { "name": "Tomato", "icon": "eco", "compatibility": 76 }
  ],
  "improvementTips": [
    { "title": "Boost Phosphorus", "detail": "Apply bone meal or rock phosphate to raise phosphorus levels." }
  ]
}
```

---

## 🚀 Deployment

Since this is a static site, it can be deployed to any static hosting platform:

- **GitHub Pages** — push to `main` and enable Pages in repository settings
- **Netlify** — drag and drop the folder or connect the repo
- **Vercel** — import the repo and deploy with zero config

> ⚠️ **Security Note:** For production use, move your API keys to a backend proxy or serverless function to prevent exposing them in client-side code.

---

## 👤 Author

**Edrean Supremo**
Computer Engineering Student | Full-Stack Developer | Embedded Systems Engineer

- Portfolio: *(your portfolio URL)*
- GitHub: [@edrean-supremo](https://github.com/edrean-supremo)
- Email: edrean.supremo@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
