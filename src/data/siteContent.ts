import type { ChildProfile } from '@/types/child';

export const siteContent = {
  child: {
    fullName: 'Muhammad Gabriel Luca Senna',
    shortName: 'Senna',
    alternateName: 'Luca',
    birthDate: '2025-02-13',
    gender: 'male',
    futureDream: 'Software Engineer',
  } satisfies ChildProfile,

  brand: {
    name: 'LUCA',
    fullName: 'Muhammad Gabriel Luca Senna',
    signature: 'Hello, World.',
    established: 'EST. 2025',
    philosophy: 'Hello, World. Keep becoming.',
    values: [
      {
        title: 'Curious Today',
        description:
          'Asking questions, noticing the little wonders, and exploring with open eyes.',
      },
      {
        title: 'Growing Always',
        description:
          'Learning step by step, one little discovery and milestone at a time.',
      },
      {
        title: 'Brighter Tomorrows',
        description:
          'Carrying warmth, curiosity, and bright possibilities forward.',
      },
      {
        title: 'Build With Purpose',
        description:
          'Not creating for the sake of creating, but making things with care, kindness, and meaning for people.',
      },
    ],
    meaning: [
      {
        title: 'Create',
        symbol: '< >',
        description:
          'A small nod to code, making, and the possibility of one day becoming a software engineer.',
      },
      {
        title: 'Wonder',
        symbol: '✦',
        description:
          'A spark of curiosity, possibility, and the bright spark of imagination.',
      },
      {
        title: 'Explore',
        symbol: 'Orbit & Dot',
        description:
          'A reminder that learning is an expanding journey, with Luca moving through life and still discovering.',
      },
      {
        title: 'Become',
        symbol: 'Hello, World.',
        description:
          "The first line of many beginnings — Luca's first hello to the world, and perhaps one day his first line of code.",
      },
    ],
    narrative: {
      intro:
        'The LUCA mark was created as a first personal identity for Muhammad Gabriel Luca Senna. It is a gentle symbol of who he is today and who he may become tomorrow — curious, growing, and discovering the world one step at a time.',
      details:
        "The code brackets hint at creation. The star holds possibility. The orbit suggests exploration. And 'Hello, World.' reminds us that every meaningful journey begins with a first hello.",
    },
    alternativeDirections: [
      'Curious today. Building a brighter tomorrow.',
      'Grow with curiosity.',
      'Explore. Learn. Create.',
      'Made to wonder.',
      'Build a kinder tomorrow.',
    ],
  },

  hero: {
    portfolioBadge: 'MY FIRST PORTFOLIO · EST. 2025',
    eyebrow: 'OUR LITTLE SENNA',
    title: 'Muhammad Gabriel Luca Senna',
    description:
      'A little soul, a growing story, and countless memories still waiting to be written.',
    introEntity:
      'Muhammad Gabriel Luca Senna, lovingly called Senna or Luca, was born on 13 February 2025.',
    birthDateFormatted: '13 February 2025',
    ctaText: 'Explore His Story',
  },

  story: {
    eyebrow: 'WHERE THE STORY BEGAN',
    title: 'Hello, World.',
    paragraphs: [
      'On 13 February 2025, Muhammad Gabriel Luca Senna said hello to the world.',
      'This little space keeps pieces of his journey together — the ordinary days, the growing milestones, the brave moments, and everything still ahead.',
    ],
    birthMetadata: {
      date: '13 February 2025',
      iso: '2025-02-13',
      label: 'Arrival Day',
    },
  },

  milestones: {
    eyebrow: 'LITTLE STEPS, BIG WONDERS',
    title: 'Growing Up',
    subtitle:
      "Every small progress is a monumental chapter in Luca's growing story.",
    endingText: 'More chapters are still being written...',
    continuedText: 'To be continued...',
  },

  memories: {
    eyebrow: 'CAPTURED IN TIME',
    title: 'Little Moments',
    subtitle:
      'The ordinary everyday moments that quietly become unforgettable memories.',
  },

  family: {
    eyebrow: 'GROWING TOGETHER',
    title: 'Loved From The Beginning',
    description:
      "For now, Luca's biggest job is simple: grow, explore, make a little mess, and keep Popo and Momo company along the way.",
  },

  hospital: {
    eyebrow: 'A GENTLE CHAPTER',
    title: 'A Little Brave Chapter',
    paragraphs: [
      'Not every little chapter is an easy one.',
      'Some days asked Luca to be a little braver.',
      'Then came rest, recovery, and more little adventures waiting ahead.',
    ],
  },

  remembrance: {
    eyebrow: 'ALWAYS IN OUR HEARTS',
    title: 'Before Luca, There Was Junior',
    date: '2023-04-10',
    dateFormatted: '10 April 2023',
    quote: 'A very short hello, but a love that never left.',
    paragraph1:
      "Before Luca's story began, there was Muhammad Alqi Parikesit — Popo and Momo's first little boy, lovingly called Junior.",
    paragraph2:
      '10 April 2023 was both the day Junior came into this world and the day he returned to heaven.',
    paragraph3:
      "To Popo and Momo, he will always be Junior. And now, in Luca's story, he is Abang Aqi — his older brother, forever part of this family.",
    paragraph4:
      'Today, Luca carries his own little story forward, growing one day at a time, surrounded by the same love that has always lived here.',
    bridge:
      "And so Luca's story continues — one little day, one little challenge, and one little adventure at a time.",
  },

  lucaProtocol: {
    eyebrow: 'THE FIVE LAWS OF LUCA',
    title: 'Luca Protocol v1.0',
    subtitle: 'A non-negotiable, highly affectionate family constitution.',
    metadata: {
      version: '1.0',
      momoLove: 'Infinity',
      authorityLevel: 'Popo',
      appealAllowed: false,
    },
    rules: [
      { id: '01', canonical: 'Sayang sama Momo.' },
      { id: '02', canonical: 'Sayang sama Momo.' },
      { id: '03', canonical: 'Sayang sama Momo.' },
      { id: '04', canonical: 'Nurut sama Momo.' },
      { id: '05', canonical: 'Tunduk sama Popo.' },
    ],
    protection: {
      eyebrow: 'NO OUTSIDE BULLIES',
      title: 'House Protection Policy',
      text: 'No outside bullies allowed. Popo and Momo already run the family teasing department.',
      code: 'outsideBullies = false; teasingLicense = ["Popo", "Momo"];',
    },
    mischief: {
      eyebrow: 'BOUNDARIES & LIMITS',
      title: 'Mischief Training',
      canonical:
        'Sebelum nakal sama orang lain, ayo sini belajar nakal sama Popo.',
      supporting:
        'Better to test the limits at home, where the lesson still comes with love.',
      code: 'training.mode = "Popo"; difficulty = "insanity";',
    },
  },

  parentMessage: {
    eyebrow: 'A LETTER FROM POPO & MOMO',
    title: 'For Senna',
    paragraphs: [
      'Someday you may look back at this page and see only photographs and a few words.',
      'For us, every one of them carries a whole memory.',
      'Keep exploring, keep wondering, and keep becoming your own person.',
      'There will always be more chapters waiting for you.',
    ],
    signoff: 'With all our love, always.',
  },

  future: {
    eyebrow: 'A LITTLE DREAM FOR TOMORROW',
    title: 'Future Software Engineer',
    description:
      'For now, there are toys to explore, questions to ask, things to discover, and a whole world to understand.',
    codeEasterEgg: 'journey.status = "just getting started";',
  },

  footer: {
    dedication: 'Made with ♥ for Muhammad Gabriel Luca Senna',
    storySignature: '// Popo wrote the code. Luca writes the story.',
    secondary: 'Crafted with <3 for Luca',
    author: 'a MODULA Project',
    portfolioMetadata:
      'portfolio.version = "1.0"; status = "growing"; next.release = "whenever Luca is ready";',
  },
} as const;
