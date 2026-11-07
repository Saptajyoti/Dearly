/**
 * DEARLY - Centralized Birthday Configuration & Personalization Data
 * ===================================================================
 * Personalized for Bhavna (Sushi)'s 24th Birthday on 8 November 2026.
 * Edit this single file to update greetings, letter content, photo captions,
 * mini-game messages, and music settings.
 */

export const birthdayData = {
  // Website Identity
  websiteName: "Dearly",
  tagline: "A little website. A lot of love.",

  // Recipient & Sender Personalization
  recipientName: "Bhavna",
  nickname: "Sushi",
  milestone: "24th Birthday",
  birthDate: "8 November 2002",
  celebrationDate: "8 November 2026",
  senderName: "From someone who's glad to have you as a friend.",

  // Stage 1: Welcome Screen
  welcome: {
    badgeLabel: "A Birthday Surprise for Sushi 🎀",
    greeting: "Happy 24th Birthday, Sushi!",
    subtitle:
      "A little something to celebrate you today. Made with a little love, a few memories, and lots of wishes just for you. Enjoy it, Sushi!",
    buttonLabel: "Open Your Surprise",
  },

  // Stage 2: Birthday Surprise Box & Card
  surprise: {
    badge: "Special Delivery for Sushi 🎀",
    title: "Today is all about you, Bhavna.",
    subtitle: "Someone made a little surprise to make your 24th birthday extra special.",
    cardPrompt: "Tap the gift card to reveal your surprise, Sushi!",
    hiddenMessageTitle: "You are truly appreciated, Sushi ✨",
    hiddenMessage:
      "Every single moment ahead was gathered with warmth and fond wishes. Take your time, smile lots, and enjoy this little world created just for you.",
    buttonLabel: "Meet Your Strawberry Friend 🍓",
  },

  // Stage 3: Interactive Strawberry Character
  strawberry: {
    badge: "Strawberry Sweet 🍓",
    title: "A Sweet Birthday Friend for Sushi",
    subtitle: "Tap the strawberry to hear sweet little birthday thoughts for Sushi!",
    tapPrompt: "Tap me, Sushi! 🍓",
    messages: [
      "You're berry special, Sushi! 🍓",
      "Happy 24th Birthday, Bhavna! 💖",
      "Thank you for always being you! ✨",
      "Never stop replying to random reels! 😭🌸",
      "May all your quiet wishes come true! 🎂",
      "You make everyday life a little brighter, Sushi! ☀️",
    ],
    buttonLabel: "Sushi 🎀",
  },

  // Stage 4: Polaroid Photo Memories (Scrapbook)
  memories: {
    badge: "Cherished Moments 📸",
    title: "Moments & Memories",
    subtitle: "A little scrapbook of moments and reasons to smile on your 24th birthday, Sushi.",
    placeholderTip: "Add personal photos of Bhavna to public/images/ and update birthdayData.js",
    buttonLabel: "Read Your Letter 💌",
    photos: [
      {
        id: 1,
        src: "/images/photo3.jpg",
        caption: "The smile that brightens any day",
        objectPosition: "center 12%",
      },
      {
        id: 2,
        src: "/images/photo2.jpg",
        caption: "For all the random reels & laughs",
      },
      {
        id: 3,
        src: "/images/photo1.jpg",
        caption: "Making everyday life a little better",
      },
      {
        id: 4,
        src: "/images/photo4.jpg",
        caption: "Here's to a wonderful 24th year, Sushi",
      },
    ],
  },

  // Stage 5: Handwritten Birthday Letter
  letter: {
    badge: "From the Heart 💌",
    envelopeTitle: "A Letter For Sushi",
    envelopePrompt: "Click the wax seal to open your letter",
    openButtonLabel: "Open Your Letter 💌",
    title: "Happy 24th Birthday, Sushi!",
    date: "8 November 2026",
    paragraphs: [
      "I was trying to find the right words, but honestly, samajh nahi aa raha aur kya likhu. Some people just make everyday life a little better without even realising it, and you're definitely one of them.",
      "Having you as a friend makes my days a little brighter. Thank you for always replying to my random reels (seriously, never stop 😭), listening whenever we talk, and being someone I can genuinely count on. You might not realise it, but these little things mean a lot.",
      "I hope you never underestimate how wonderful you are. You deserve people who appreciate you, moments that make you genuinely happy, and days when everything just falls into place. And even when things don't go as planned, I hope you always find the strength to keep going.",
      "As you step into another year of life, I wish you loads of happiness, peace of mind, good health, success, and countless reasons to smile. May you achieve the things you've been quietly wishing for, experience beautiful new adventures, and create memories worth keeping.",
      "And please, never lose that wonderful version of yourself. Keep being you, Sushi!",
      "Once again, Happy 24th Birthday, Bhavna! Have the most amazing day. You deserve all the good things coming your way.",
    ],
    postscript: "P.S. There is still one last sweet surprise waiting for you...",
    buttonLabel: "One Last Surprise 🎂",
  },

  // Stage 6: Final Surprise (Cake & Wish)
  finalSurprise: {
    badge: "Make a 24th Birthday Wish ✨",
    title: "Happy 24th Birthday, Bhavna!",
    subtitle: "You're one of the most wonderful people. Close your eyes, make a sweet wish, and blow out your candles, Sushi! 🕯️",
    instruction: "Close your eyes, make a sweet 24th birthday wish, and blow out the candles! 🕯️",
    blowButtonLabel: "Blow Out the Candles 🌬️🎂",
    blownTitle: "May All Your Wishes Come True, Sushi! 🎉💖",
    blownMessage:
      "Wishing you loads of happiness, peace of mind, good health, success, and countless reasons to smile in your 24th year.",
    replayButtonLabel: "Start Again 🔁",
    gamesButtonLabel: "Play Little Games for Sushi 🍓🎮",
  },

  // Bonus Chapter: Mini-Games Area for Sushi
  miniGames: {
    badge: "Bonus Birthday Fun 🍓",
    title: "Little Games for Sushi 🍓",
    subtitle: "Three sweet little mini-games made especially to bring a smile to your 24th birthday!",
    
    // Game 1: Catch the Hearts
    catchHearts: {
      title: "Catch the Hearts 💖",
      description: "Catch as many falling hearts as you can in 20 seconds!",
      duration: 20,
      targetScore: 10,
      completionMessage: "Great job, Sushi! You caught so much love! 💖",
      replayLabel: "Play Again 🔁",
    },

    // Game 2: Scratch to Reveal
    scratchCard: {
      title: "Scratch to Reveal ✨",
      description: "Scratch the card below with your finger or mouse to uncover a secret note!",
      hiddenMessage:
        "You're genuinely one of the nicest people I've had the pleasure of knowing. Never forget that. ❤️",
      scratchPrompt: "Scratch here, Sushi! 🎀",
      revealedBadge: "Message Unlocked! 🌸",
      replayLabel: "Scratch Again 🔁",
      revealButtonLabel: "Scratch All for Me ✨",
    },

    // Game 3: Memory Match
    memoryMatch: {
      title: "Memory Match 🍓",
      description: "Find all 4 matching pairs of sweet birthday treats!",
      completionMessage: "Sweet memory match, Sushi! Every pair found! 🎉",
      replayLabel: "Match Again 🔁",
      pairs: [
        { id: "strawberry", label: "Strawberry", emoji: "🍓" },
        { id: "heart", label: "Pink Heart", emoji: "💖" },
        { id: "cake", label: "Birthday Cake", emoji: "🎂" },
        { id: "flower", label: "Sakura Blossom", emoji: "🌸" },
      ],
    },

    // Reward when all 3 games are completed
    reward: {
      badge: "All Games Completed! 🏆",
      title: "You did it, Sushi! Hope these little games made you smile. ❤️",
      secretNoteTitle: "Secret Birthday Message for Bhavna ✨",
      secretNote:
        "Here's to another beautiful year of laughing at random reels, achieving quiet dreams, and being the wonderful human that you are. Thank you for being such a genuine friend, Sushi! Happy 24th Birthday! 🎂🌸",
      replayAllLabel: "Replay All Games 🔁",
    },
  },

  // Background Music Configuration
  music: {
    enabled: true, // Set to true to show music controller in top-right corner
    src: "/assets/birthday-song.mp3", // User-provided custom birthday song
    title: "Happy Birthday Song 🎵",
  },
};

export default birthdayData;
