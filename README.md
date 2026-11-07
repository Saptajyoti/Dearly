# Dearly 🎀

> *A little website. A lot of love.*

**Dearly** is a personalized, interactive birthday surprise website inspired by romantic, soft pastel-pink aesthetics. Designed with care, micro-interactions, floating hearts, and an adorable vector strawberry mascot, Dearly creates a warm, intimate digital birthday card, photo scrapbook, handwritten letter, and interactive candle wish experience.

---

## 🍓 The 6-Stage Birthday Experience

1. **Stage 1 — Welcome (`Welcome.jsx`):**
   A romantic birthday landing screen featuring personalized greetings for the recipient, animated floating hearts, and the interactive strawberry mascot.
2. **Stage 2 — Birthday Surprise (`BirthdaySurprise.jsx`):**
   An interactive surprise gift card. Tapping unseals the card, triggering a burst of floating hearts, gentle sparkle chimes, and revealing a hidden birthday message with *"Meet Your Strawberry Friend 🍓"*.
3. **Stage 3 — Interactive Strawberry (`Strawberry.jsx`):**
   A sweet birthday character that responds to taps with blushing cheeks, sparkling winks, cute sound effects, and rotating birthday thoughts in an animated speech bubble, inviting the user to *"See Our Memories 📸"*.
4. **Stage 4 — Photo Memories Scrapbook (`Memories.jsx`):**
   A polaroid-inspired scrapbook with washi tape, gentle tilts, handwritten captions, and an interactive zoom lightbox. Automatically displays tasteful placeholders when personal photos are not yet added.
5. **Stage 5 — Handwritten Birthday Letter (`BirthdayLetter.jsx`):**
   A sealed vintage envelope with a wax stamp. Clicking unseals and unfolds a multiline letter on cream stationery with cursive script, postscript note, and sender signature.
6. **Stage 6 — Final Surprise & Candle Wish (`FinalSurprise.jsx`):**
   A multi-tier strawberry cream birthday cake with glowing, flickering candles. When blown out, smoke curls upward, confetti and hearts shower down, a celebration wish appears, and options to replay or play the bonus mini-games appear.
7. **Bonus Chapter — Little Games for Sushi (`MiniGames.jsx`):**
   An optional, delightful mini-games arcade featuring:
   - **Catch the Hearts:** 20-second falling heart arcade game with live scoring.
   - **Scratch to Reveal:** Interactive canvas scratch card uncovering a heartfelt appreciation message.
   - **Memory Match:** 8-card (4 pairs) matching game featuring strawberries, hearts, cakes, and flowers with a move counter.
   - **Completion Reward:** When all three games are cleared, a confetti celebration unlocks a secret birthday message!

---

## 🛠️ Technology Stack

- **Framework:** [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Language:** JavaScript (ES Modules)
- **Styling:** Modern CSS3 with Custom Properties (Design System)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Audio & Micro-sounds:** HTML5 Audio + Web Audio API (zero external sound dependencies)
- **Zero Heavy Bundles:** No Next.js, no Tailwind CSS, no database, no backend.

---

## 📁 Project Structure

```text
Dearly/
├── public/
│   ├── assets/
│   │   ├── .gitkeep
│   │   └── birthday-song.mp3 # Place optional background music here
│   ├── images/
│   │   ├── .gitkeep
│   │   ├── photo1.jpg        # Place your personal photos here
│   │   ├── photo2.jpg
│   │   ├── photo3.jpg
│   │   └── photo4.jpg
│   └── favicon.svg           # Custom vector strawberry heart favicon
│
├── src/
│   ├── assets/
│   │   └── .gitkeep
│   ├── components/
│   │   ├── FloatingHearts.jsx    # Ambient non-intrusive floating hearts
│   │   ├── MusicPlayer.jsx       # Floating background music controller
│   │   └── TransitionScreen.jsx  # Smooth animated page transitions
│   │
│   ├── sections/
│   │   ├── Welcome.jsx           # Stage 1: Welcome landing screen
│   │   ├── BirthdaySurprise.jsx  # Stage 2: Interactive birthday surprise card
│   │   ├── Strawberry.jsx        # Stage 3: Interactive strawberry mascot
│   │   ├── Memories.jsx          # Stage 4: Polaroid photo scrapbook & lightbox
│   │   ├── BirthdayLetter.jsx    # Stage 5: Handwritten birthday letter
│   │   ├── FinalSurprise.jsx     # Stage 6: Birthday cake & candle finale
│   │   ├── MiniGames.jsx         # Bonus Stage: Little Games for Sushi 🍓
│   │   └── games/
│   │       ├── CatchHeartsGame.jsx # Game 1: 20-second arcade tap game
│   │       ├── ScratchCardGame.jsx # Game 2: Canvas scratch card
│   │       └── MemoryMatchGame.jsx # Game 3: 4-pair memory card match
│   │
│   ├── data/
│   │   └── birthdayData.js       # Centralized personalization & content config
│   │
│   ├── utils/
│   │   └── audioEffects.js       # Web Audio API micro-interaction sound synthesizers
│   │
│   ├── App.jsx                   # Experience state, chapter tracker & flow
│   ├── App.css                   # Complete responsive styles (320px - 1440px)
│   ├── index.css                 # Design system tokens & base reset
│   └── main.jsx                  # React application entry
│
├── index.html                    # SEO metadata, web fonts & viewport
├── package.json                  # Dependencies & npm scripts
├── vercel.json                   # Vercel deployment & routing configuration
├── vite.config.js                # Vite configuration
└── README.md                     # Documentation & personalization checklist
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (comes with Node.js)

### Installation

```bash
# Clone or navigate to the project directory
cd Dearly

# Install dependencies
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open your browser at: **`http://localhost:3000/`**

### Production Build & Preview

```bash
# Build production bundle to dist/
npm run build

# Preview production bundle locally
npm run preview
```

---

## 🎀 10-Step Personalization Checklist

All personal content is centralized in **`src/data/birthdayData.js`**. You do **not** need to touch React code. Simply open this single file and customize the fields below:

### 1. Change the Recipient Name
Set `recipientName` to your loved one's name:
```javascript
recipientName: "Sophia",
```

### 2. Change the Sender Name
Set `senderName` to your name or signature:
```javascript
senderName: "Yours always, Alex",
```

### 3. Edit the Welcome Greeting
Customize the headline and subtitle on the first screen:
```javascript
welcome: {
  badgeLabel: "A Birthday Surprise 🎀",
  greeting: "Happy 24th Birthday, Sophia!",
  subtitle: "Someone made a little something just for you.",
  buttonLabel: "Open Your Surprise",
},
```

### 4. Edit the Birthday Surprise Message
Customize the hidden card message revealed when the gift card is tapped:
```javascript
surprise: {
  title: "Today is all about you.",
  subtitle: "Someone made a little surprise to make your day extra special.",
  cardPrompt: "Tap the gift card to reveal your surprise!",
  hiddenMessageTitle: "You are truly cherished ✨",
  hiddenMessage: "Every single moment ahead was gathered with love. Take your time and enjoy!",
},
```

### 5. Change Strawberry Messages
Add or edit the cute thoughts the strawberry speaks when tapped:
```javascript
strawberry: {
  messages: [
    "You're berry special! 🍓",
    "You're sweeter than strawberries! 💖",
    "Today is your day to shine! ✨",
    "Sending you the warmest birthday hug! 🌸",
  ],
},
```

### 6. Add Personal Photos
Save your personal photos into the `public/images/` directory:
- `public/images/photo1.jpg`
- `public/images/photo2.jpg`
- `public/images/photo3.jpg`
- `public/images/photo4.jpg`

### 7. Edit Photo Captions & Dates
Update the `photos` list in `birthdayData.js`:
```javascript
photos: [
  {
    id: 1,
    src: "/images/photo1.jpg",
    caption: "Our coffee date in Kyoto",
    date: "Sunny Days",
  },
  {
    id: 2,
    src: "/images/photo2.jpg",
    caption: "The beach sunset that took our breath away",
    date: "Golden Afternoons",
  },
],
```
*(If a photo has not been placed yet, a tasteful cream polaroid placeholder automatically displays without broken icons!)*

### 8. Write the Birthday Letter
Add heartfelt paragraphs to `letter.paragraphs`:
```javascript
letter: {
  title: "Happy Birthday, My Favorite Person",
  date: "October 14",
  paragraphs: [
    "I wanted to take a quiet moment today to remind you just how special you are...",
    "Thank you for all the laughter, the little inside jokes, and the comfort of your presence...",
    "May this upcoming chapter bring you everything your heart has been longing for.",
  ],
  postscript: "P.S. There is still one last surprise waiting for you...",
},
```

### 9. Customize the Final Surprise
Set the birthday wish text displayed after blowing out the candles:
```javascript
finalSurprise: {
  title: "Happy Birthday, {name}!",
  subtitle: "You're one of the most special people in my life.",
  instruction: "Close your eyes, make a sweet wish, and blow out the candles! 🕯️",
  blownTitle: "May All Your Wishes Come True! 🎉💖",
  blownMessage: "Here's to another year filled with gentle mornings, big dreams, and infinite happiness.",
},
```

### 10. Add Background Music
1. Save an MP3 file into `public/assets/birthday-song.mp3`.
2. In `birthdayData.js`, configure `music`:
```javascript
music: {
  enabled: true,
  src: "/assets/birthday-song.mp3",
  title: "Romantic Birthday Melody",
},
```
*(If no MP3 is present, clicking "Music On" automatically plays a soothing built-in music box chime lullaby using the Web Audio API!)*

---

## 🚀 Deployment Guide (Vercel)

Dearly is 100% frontend and requires no backend, database, or API keys.

### Method 1: Deploy with Vercel CLI

```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Build and verify production bundle locally
npm run build

# 3. Deploy to Vercel
vercel
```

Follow the interactive prompts:
- **Set up and deploy?** `yes`
- **Which scope?** (Select your account)
- **Link to existing project?** `no`
- **What’s your project’s name?** `dearly`
- **In which directory is your code located?** `./`
- Vercel automatically detects the Vite framework and uses `vercel.json`!

### Method 2: Deploy with GitHub & Vercel Dashboard

1. Push your Dearly repository to GitHub (or GitLab/Bitbucket).
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Click **"Add New..."** > **"Project"** and import your repository.
4. Framework Preset will automatically detect **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **"Deploy"**. Within seconds, your personalized birthday website will be live with a free SSL `.vercel.app` URL to share with your loved one!

---

## 📱 Mobile Responsiveness & Accessibility

- **Mobile Viewports Verified:** 320px (iPhone SE), 375px (iPhone 12/13 mini), 390px (iPhone 14/15), 430px (iPhone 15 Pro Max), 768px (iPad/Tablet), 1024px, 1440px+ (Desktop).
- **Touch Friendly:** All buttons, cards, and modal close triggers have comfortable tap targets (≥ 44px).
- **Reduced Motion Support:** Respects system `prefers-reduced-motion` settings.
- **Zero Horizontal Overflow:** Seamless full-width background with responsive text wrapping and fluid clamp sizing.

---

## 📄 License

Created with ❤️ for special moments. Free to customize for personal birthday surprises.
#   D e a r l y  
 