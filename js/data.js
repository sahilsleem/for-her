/**
 * Personalization & Romantic Content Data
 * 
 * You can easily customize any text or name here.
 * Defaults are written in an intimate, heartfelt boyfriend voice.
 */

export const ROMANTIC_CONFIG = {
  // Names & Placeholders (Feel free to edit these!)
  girlfriendName: "my love",          // e.g. "Maya", "Sarah", or keep as "my love"
  boyfriendName: "me",                // e.g. "Sahil", or "your boy"
  nickname: "my favourite person",    // e.g. "sweetheart", "bubs", "angel"
  
  // Set to true once you place couple-hero.jpg & couple-1.jpg... in assets/photos/
  hasRealPhotos: false,

  // Set to true if you place our-song.mp3 in assets/audio/
  useCustomSong: false,

  // Custom contact action for the morning text button:
  // e.g. "sms:+1234567890?body=I'm awake! ♡ I loved the surprise..."
  // or leave as null for default celebratory message
  directSmsNumber: null,
  whatsappNumber: null,
};

// 45 Curated, deeply heartfelt reasons why I love you
export const REASONS_I_LOVE_YOU = [
  "The quiet, effortless way you make anywhere we are feel like home.",
  "Your genuine laugh—the unfiltered, breathless one that escapes when something is truly funny.",
  "How deeply and sincerely you care about the people you love.",
  "The sleepy, soft sound of your voice when you answer my morning call.",
  "The way your hand instinctively reaches for mine whenever we cross the street or walk side by side.",
  "Your kindness, which you give so naturally without ever asking for recognition.",
  "How passionate you become when you talk about something that excites your soul.",
  "The little scrunch in your nose when you're concentrating or teasing me.",
  "How safe and understood I feel with you, even when I'm at my lowest.",
  "The way you remember the smallest, quietest details about my life that even I forget.",
  "Your resilience—how gracefully you carry so much on your shoulders, even when you're tired.",
  "The warmth of your hugs; the way you melt into my chest as if all the world's noise disappeared.",
  "How breathtaking you look when the morning light hits your face, completely bare and natural.",
  "Your sense of humor, especially the silly private jokes only the two of us understand.",
  "The way you look at me across a crowded room, like we're sharing a quiet secret nobody else knows.",
  "How you encourage me to be a better man, simply by existing as the extraordinary person you are.",
  "The patience you've shown me, even when I've stumbled or failed to show up the way I should.",
  "Your beautiful, radiant smile that genuinely lights up the entire room.",
  "The cute little sounds you make when you stretch or get cozy under a heavy blanket.",
  "How much you appreciate the little things: a warm cup of coffee, a gentle breeze, a pretty sky.",
  "The way you tuck your hair behind your ear when you're thinking or a little nervous.",
  "How comforting your silence is. With you, I never feel pressured to fill the quiet.",
  "The way you get excited about food you love and do a tiny happy dance.",
  "Your loyalty and how steadfast you are in what you believe in.",
  "The way you forgive and hold space for honesty.",
  "How you look at baby animals or cute things with pure, innocent wonder.",
  "The warmth of your hands when it's chilly outside.",
  "How you listen—not just waiting for your turn to speak, but truly hearing my heart.",
  "The way my heart still skips a beat whenever I see your name appear on my screen.",
  "Your taste in music and the way you sing along softly under your breath.",
  "How incredibly thoughtful you are, always thinking of ways to make someone else's day softer.",
  "The way your eyes crinkle up at the corners when you're truly happy.",
  "How you make ordinary errands feel like the best part of my weekend.",
  "Your courage, even when you are scared of the outcome.",
  "The scent of your perfume on my sweaters long after we've said goodbye.",
  "How you hold my arm when we're walking somewhere new.",
  "The gentle, reassuring touch of your fingers when I'm stressed or overwhelmed.",
  "The fact that among eight billion people on this planet, my heart found and chose you.",
  "How proud I am to stand beside you and call you my girlfriend.",
  "The way you protect your peace and the dignity you carry yourself with.",
  "How you still manage to surprise me with new depths of your intelligence and grace.",
  "The cute, sleepy voice notes you leave me when you're dozing off.",
  "The way you never pretend to be someone you're not.",
  "How simply sitting next to you doing nothing is better than doing everything with anyone else.",
  "Because loving you is the easiest, truest thing I have ever done."
];

// Open When Letters (Full, comforting letters)
export const OPEN_WHEN_LETTERS = [
  {
    id: "miss-me",
    tag: "Open when",
    title: "you miss me ♡",
    envelopeIcon: "💌",
    preview: "For the quiet hours when distance feels a little too heavy...",
    content: `
      <p class="letter-salutation">My sweet girl,</p>
      <p>If you're opening this, it means you're missing me right now, and I wish more than anything that I could just step through the door and wrap both arms around you.</p>
      <p>I know life gets busy, schedules clash, and sometimes the space between our moments together feels way too wide. But I need you to know something with absolute certainty: <strong>there is never a single day where you aren't on my mind.</strong></p>
      <p>When I'm walking between places, when I hear a song you like, when something funny happens that I want to tell you first—you are always right there in my thoughts. You aren't just someone I see when it's convenient; you are stitched into the fabric of my everyday life.</p>
      <p>Close your eyes for three seconds right now. Take a deep, gentle breath. Imagine my arms around you, my chin resting on your head, and my hand gently holding yours. You are loved, you are missed just as much, and we will be together again so soon.</p>
      <p>Until then, hold this letter close. I'm right here in your heart.</p>
      <p class="letter-signoff">Forever yours,<br><span>Your boy ♡</span></p>
    `
  },
  {
    id: "overwhelmed",
    tag: "Open when",
    title: "you feel overwhelmed or stressed",
    envelopeIcon: "🌿",
    preview: "For the days when the weight of everything feels too much to carry...",
    content: `
      <p class="letter-salutation">Hey, take a slow breath with me,</p>
      <p>First, put whatever you're holding down. Relax your shoulders. Unclench your jaw. Let your tongue rest from the roof of your mouth. Inhale deeply... and let it all out.</p>
      <p>I know how hard you try. I see how much effort, care, and emotion you pour into everything you do, and I know that sometimes the world asks too much of you all at once. It's okay to feel exhausted. It's okay if today wasn't your most productive day. You do not have to be invincible every second of every hour.</p>
      <p>Please remember: <strong>you don't have to carry the whole world on your own shoulders.</strong> And you certainly don't have to go through tough days alone. Whenever it feels like too much, lean on me. Tell me everything, or tell me nothing at all and just let me sit with you in the quiet.</p>
      <p>You have survived 100% of your hardest days so far, and you will get through this one too. But you don't have to prove anything to me. To me, you are already everything.</p>
      <p class="letter-signoff">I've got your back always,<br><span>With all my warmth ♡</span></p>
    `
  },
  {
    id: "doubt",
    tag: "Open when",
    title: "you doubt how beautiful you are",
    envelopeIcon: "✨",
    preview: "For when your mirror isn't telling you the truth...",
    content: `
      <p class="letter-salutation">My gorgeous girl,</p>
      <p>I wish you could borrow my eyes for just ten seconds. If you could see yourself the way I see you, you would never spend another second doubting how utterly captivating you are.</p>
      <p>I'm not just talking about when you get dressed up—even though you take my breath away every single time you do. I'm talking about when you've just rolled out of bed, your hair a little messy, your oversized t-shirt hanging loose, wearing zero makeup with sleep still in your eyes. In those raw, unedited moments, I look at you and genuinely think you are the most beautiful human on earth.</p>
      <p>And your beauty goes so much deeper than the surface. It's in the softness of your voice when you care for someone. It's in the fire in your eyes when you speak about things you love. It's in your laugh, your soul, your mind.</p>
      <p>Don't ever let a harsh mirror, a bad day, or unrealistic standards convince you otherwise. To me, you are art.</p>
      <p class="letter-signoff">Always mesmerized by you,<br><span>Your biggest admirer ♡</span></p>
    `
  },
  {
    id: "sleep",
    tag: "Open when",
    title: "you can't fall asleep",
    envelopeIcon: "🌙",
    preview: "For the late nights when your thoughts won't settle down...",
    content: `
      <p class="letter-salutation">Sweet dreams waiting for you,</p>
      <p>It's late, isn't it? The room is quiet, the night is dark, and your brain is refusing to turn off. Whatever is keeping you awake right now—worries about tomorrow, replays of today, or just restless energy—let it pause. Tomorrow will take care of itself.</p>
      <p>Imagine me tucking the blanket around your shoulders, brushing that soft strand of hair away from your forehead, and whispering that everything is going to be completely okay.</p>
      <p>You have done enough today. Your mind has worked hard, your heart has loved well, and now you are allowed to rest. No problems need to be solved at this hour. Just close your eyes, listen to the quiet, and drift off knowing that you are safe, cherished, and deeply loved.</p>
      <p class="letter-signoff">Sleep peacefully, my love,<br><span>See you in the morning ♡</span></p>
    `
  },
  {
    id: "forgive-me",
    tag: "Open when",
    title: "you need reassurance about us",
    envelopeIcon: "🤍",
    preview: "For when you need an unwavering reminder of where we stand...",
    content: `
      <p class="letter-salutation">My favorite person,</p>
      <p>If you're opening this, maybe you're feeling a little distant from me, or maybe you're wondering if my busy days mean my feelings have changed. I want to look you in the eyes and tell you clearly: <strong>not even a fraction.</strong></p>
      <p>I am human and I make mistakes. Sometimes I get caught up in deadlines and distractions and fail to show you the deliberate attention you deserve. But my heart has never wavered. Choosing you is the easiest, most certain choice of my life.</p>
      <p>You are not hard to love. You are not asking for too much when you want my time. You deserve someone who shows up, who plans dates, who listens attentively, and who remembers that love is an active verb, not an afterthought.</p>
      <p>I am working every day to be that man for you. Thank you for your grace, thank you for your patience, and thank you for being the best thing in my world.</p>
      <p class="letter-signoff">Committed to you completely,<br><span>Always ♡</span></p>
    `
  }
];

// Interactive Date Bucket List
export const DATE_BUCKET_LIST = [
  { id: "date-1", title: "Cook a cozy dinner together", desc: "Phones on airplane mode, our favorite playlist in the background, dancing in the kitchen while pasta boils.", checked: true },
  { id: "date-2", title: "Spontaneous late-night dessert run", desc: "Hop in the car in pajamas, roll windows down, and go grab ice cream or warm churros.", checked: true },
  { id: "date-3", title: "A whole Sunday with no alarms", desc: "Zero rush, breakfast in bed, cuddling under two heavy blankets, and watching movies until afternoon.", checked: false },
  { id: "date-4", title: "Bookstore & coffee crawl", desc: "Wander through aisles of old books, pick out a book for each other, and read together in a quiet café corner.", checked: false },
  { id: "date-5", title: "Stargazing picnic outside the city", desc: "A cozy quilt, a thermos of hot cocoa or tea, and lying on our backs counting shooting stars together.", checked: false },
  { id: "date-6", title: "A full surprise date planned entirely by me", desc: "You don't have to make a single decision. Just get dressed up, and let me take care of every single detail.", checked: false },
  { id: "date-7", title: "Build a massive living-room pillow fort", desc: "Fairy lights, softest cushions, snacks, and our favorite comfort show playing on the laptop.", checked: false },
  { id: "date-8", title: "Silly photobooth session", desc: "Making the goofiest faces together and putting the photo strip inside our phone cases.", checked: false },
  { id: "date-9", title: "A quiet sunset walk by the water", desc: "Just holding hands, breathing in the evening breeze, talking about our dreams.", checked: false },
  { id: "date-10", title: "Try that new restaurant you've been eyeing", desc: "Dress up, order dessert first, and celebrate simply having each other.", checked: false }
];

// Photo Album Manifest
export const PHOTO_MANIFEST = [
  {
    id: "hero",
    realPath: "assets/photos/couple-hero.jpg",
    placeholderPath: "assets/photos/placeholder-hero.svg",
    title: "the way you look at me",
    caption: "My absolute favorite photograph. Whenever I look at this, I remember why everything else in life can wait.",
    date: "A moment I treasure"
  },
  {
    id: "photo-1",
    realPath: "assets/photos/couple-1.jpg",
    placeholderPath: "assets/photos/placeholder-1.svg",
    title: "our quiet mornings",
    caption: "No alarms, tea steaming on the counter, and your head resting on my shoulder. Perfection.",
    date: "Quiet Mornings"
  },
  {
    id: "photo-2",
    realPath: "assets/photos/couple-2.jpg",
    placeholderPath: "assets/photos/placeholder-2.svg",
    title: "your unposed laugh",
    caption: "I will spend the rest of my life trying to make you laugh exactly like this every single day.",
    date: "Pure Joy"
  },
  {
    id: "photo-3",
    realPath: "assets/photos/couple-3.jpg",
    placeholderPath: "assets/photos/placeholder-3.svg",
    title: "our little adventure",
    caption: "Windows down, singing off-key, getting lost and not caring one bit because I was with you.",
    date: "On The Road"
  },
  {
    id: "photo-4",
    realPath: "assets/photos/couple-4.jpg",
    placeholderPath: "assets/photos/placeholder-4.svg",
    title: "being completely silly",
    caption: "With you, I never have to hide or pretend. We get to be our total, dorky, authentic selves.",
    date: "Unfiltered Us"
  },
  {
    id: "photo-5",
    realPath: "assets/photos/couple-5.jpg",
    placeholderPath: "assets/photos/placeholder-5.svg",
    title: "golden hour magic",
    caption: "The sunlight was beautiful that evening, but honestly, it was just trying to compete with you.",
    date: "Golden Hour"
  },
  {
    id: "photo-6",
    realPath: "assets/photos/couple-6.jpg",
    placeholderPath: "assets/photos/placeholder-6.svg",
    title: "holding your hand",
    caption: "My favorite place in the whole universe is wherever my hand fits into yours.",
    date: "Always Beside You"
  }
];

// Attach to window as fallback for any legacy access
if (typeof window !== 'undefined') {
  window.ROMANTIC_CONFIG = ROMANTIC_CONFIG;
  window.REASONS_I_LOVE_YOU = REASONS_I_LOVE_YOU;
  window.OPEN_WHEN_LETTERS = OPEN_WHEN_LETTERS;
  window.DATE_BUCKET_LIST = DATE_BUCKET_LIST;
  window.PHOTO_MANIFEST = PHOTO_MANIFEST;
}
