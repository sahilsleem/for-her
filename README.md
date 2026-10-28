# A Little Universe For My Girlfriend ♡

> *"no website could ever fit all the love i have for you in it. but this is a little piece of my heart, made just for you. ♡"*

A mobile-first, handcrafted romantic website designed to surprise your girlfriend when she wakes up. It combines the tactile warmth of a digital scrapbook with an interactive, heartfelt love letter.

---

## ✨ Features

- **Morning Surprise Entrance**: Full-screen opening scene with an animated wax-sealed envelope and a gentle morning greeting.
- **The Main Love Letter**: A sincere, emotionally grounded letter acknowledging that you haven't been giving her enough time lately, expressing honest regret, and committing to consistent effort without making excuses or pressuring her.
- **Photo Scrapbook & Lightbox**:
  - Polaroid gallery with delicate washi tape, paper shadows, tilt angles, and handwritten captions.
  - Built-in graceful fallbacks: includes 7 illustrated pastel SVG placeholders so the website looks complete right out of the box even before photos are added.
  - Interactive tap-to-zoom lightbox modal for every memory.
- **A Collection of 11 Love Notes**:
  - *The little things I love about you*
  - *Things about you that I hope you never stop seeing in yourself*
  - *The comfort you bring me*
  - *Things I might not say often enough*
  - *Little everyday moments I want more of*
  - *Why I choose to make room for us*
  - *Things I want us to experience together*
  - *What I want you to remember on a difficult day*
  - *A letter for when you miss me*
  - *A letter for when you need reassurance*
  - *A final letter just for you*
- **Interactive Surprises**:
  - **Reasons I Love You Jar**: 45 unique, deeply emotional reasons with flip animations and heart bursts.
  - **"Open When..." Letters**: 5 sealed postal envelopes that open into comforting parchment letters for different moods.
  - **A Tiny Promise**: Interactive pledge card with commitment checkboxes and a stampable wax seal that saves to `localStorage`.
  - **Date Bucket List**: 10 cute dates with checkable boxes, live memory counter, and an interactive input allowing her to add your own date ideas.
  - **"One Last Thing..."**: Hidden ribbon reveal that awards an *Uninterrupted Date Voucher*.
- **Ambient Soundtrack & Visual Magic**:
  - **Zero-Dependency Web Audio Synth**: Plays a warm, soothing ambient lullaby arpeggio progression (Fmaj7 - Am7 - Dm7 - Bbmaj7) that works completely offline and never fails.
  - **Custom Song Support**: Drop `assets/audio/our-song.mp3` to play your shared song.
  - **Cherry Blossom & Heart Particles**: HTML5 canvas system with drifting petals, heart bursts on interaction, and battery-friendly pause when tab is inactive.
  - Full respect for `prefers-reduced-motion`.

---

## 📸 How to Add Your Couple Photographs

Open the `assets/photos/` folder and drop in your real photos with these filenames:

| Filename | Placement in Website | Recommended Aspect Ratio |
| :--- | :--- | :--- |
| `couple-hero.jpg` | **Featured Polaroid** at the top of the scrapbook | Portrait or Square (4:5) |
| `couple-1.jpg` | "Our quiet mornings" | Portrait or Square (4:5) |
| `couple-2.jpg` | "Your unposed laugh" | Portrait or Square (4:5) |
| `couple-3.jpg` | "Our little adventure" | Portrait or Square (4:5) |
| `couple-4.jpg` | "Being completely silly" | Portrait or Square (4:5) |
| `couple-5.jpg` | "Golden hour magic" | Portrait or Square (4:5) |
| `couple-6.jpg` | "Holding your hand" | Portrait or Square (4:5) |

*Note: If any photograph is omitted or missing, the website automatically falls back to an illustrated romantic vector placeholder so the layout never breaks.*

---

## ✏️ How to Personalize the Content

1. **Names & Contact Info (`js/data.js`)**:
   Open `js/data.js` to change names, or configure SMS / WhatsApp numbers for the morning text button:
   ```javascript
   const ROMANTIC_CONFIG = {
     girlfriendName: "my love",
     boyfriendName: "Sahil",
     nickname: "my favourite person",
     directSmsNumber: null, // e.g. "+1234567890"
     whatsappNumber: null,  // e.g. "1234567890"
   };
   ```
2. **Main Letter (`index.html`)**:
   Around line 70 in `index.html`, you can edit the text inside `<div class="letter-content-text">` to add specific private memories or nicknames.
3. **Audio (`assets/audio/`)**:
   Drop your favorite song as `assets/audio/our-song.mp3`. The audio engine will automatically detect and play it instead of the ambient synthesizer!

---

## 🚀 How to Run Locally

You can run this project with any local server:

### Option 1: Using Vite (Recommended)
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Option 2: Using Python (No npm required)
```bash
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

### Option 3: Using Node / npx serve
```bash
npx serve .
```

---

## 💌 How to Share It With Her

Because this project is built as a clean, static web application with relative paths and zero required backend databases, sharing it is seamless:

1. **Vercel / Netlify (Free & Takes 60 Seconds)**:
   - Drag and drop the `amazing-babbage` folder directly into [Netlify Drop](https://app.netlify.com/drop) or import the repository in [Vercel](https://vercel.com).
   - You will get a live link (e.g. `for-my-favourite-person.vercel.app`) that you can send to her phone.
2. **GitHub Pages (Free)**:
   - Push to a GitHub repository, go to **Settings > Pages**, choose `master` branch and `/root`, and click Save.
3. **Local Wi-Fi Testing on her Phone**:
   - Run `npm run dev -- --host` and open the local network IP displayed in your terminal (e.g. `http://192.168.1.X:5173`) on her mobile browser.
