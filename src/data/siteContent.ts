import type { ChildProfile } from "@/types/child";

export const siteContent = {
  child: {
    fullName: "Muhammad Gabriel Luca Senna",
    shortName: "Senna",
    alternateName: "Luca",
    birthDate: "2025-02-13",
    gender: "male",
    futureDream: "Software Engineer",
  } satisfies ChildProfile,

  hero: {
    portfolioBadge: "MY FIRST PORTFOLIO · EST. 2025",
    eyebrow: "OUR LITTLE SENNA",
    title: "Muhammad Gabriel Luca Senna",
    description:
      "A little soul, a growing story, and countless memories still waiting to be written.",
    introEntity:
      "Muhammad Gabriel Luca Senna, lovingly called Senna or Luca, was born on 13 February 2025.",
    birthDateFormatted: "13 February 2025",
    ctaText: "Explore His Story",
  },

  story: {
    eyebrow: "WHERE THE STORY BEGAN",
    title: "Hello, World.",
    paragraphs: [
      "On 13 February 2025, Muhammad Gabriel Luca Senna said hello to the world.",
      "This little space keeps pieces of his journey together — the ordinary days, the growing milestones, the brave moments, and everything still ahead.",
    ],
    birthMetadata: {
      date: "13 February 2025",
      iso: "2025-02-13",
      label: "Arrival Day",
    },
  },

  milestones: {
    eyebrow: "LITTLE STEPS, BIG WONDERS",
    title: "Growing Up",
    subtitle:
      "Every small progress is a monumental chapter in Luca's growing story.",
    endingText: "More chapters are still being written...",
    continuedText: "To be continued...",
  },

  memories: {
    eyebrow: "CAPTURED IN TIME",
    title: "Little Moments",
    subtitle:
      "The ordinary everyday moments that quietly become unforgettable memories.",
  },

  family: {
    eyebrow: "GROWING TOGETHER",
    title: "Loved From The Beginning",
    description:
      "For now, Luca's biggest job is simple: grow, explore, make a little mess, and keep Popo and Momo company along the way.",
  },

  hospital: {
    eyebrow: "A GENTLE CHAPTER",
    title: "A Little Brave Chapter",
    paragraphs: [
      "Not every little chapter is an easy one.",
      "Some days asked Luca to be a little braver.",
      "Then came rest, recovery, and more little adventures waiting ahead.",
    ],
  },

  remembrance: {
    eyebrow: "ALWAYS IN OUR HEARTS",
    title: "A Story That Started With Love",
    paragraph1:
      "Before Luca's story began, there was Muhammad Alqi Parikesit — his older brother, forever part of this family and now at peace in heaven.",
    paragraph2:
      "Today, Luca carries his own little story forward, growing one day at a time while keeping Popo and Momo company through all the ordinary moments that slowly become memories.",
  },

  parentMessage: {
    eyebrow: "A LETTER FROM MOM & DAD",
    title: "For Senna",
    paragraphs: [
      "Someday you may look back at this page and see only photographs and a few words.",
      "For us, every one of them carries a whole memory.",
      "Keep exploring, keep wondering, and keep becoming your own person.",
      "There will always be more chapters waiting for you.",
    ],
    signoff: "With all our love, always.",
  },

  future: {
    eyebrow: "A LITTLE DREAM FOR TOMORROW",
    title: "Future Software Engineer",
    description:
      "For now, there are toys to explore, questions to ask, things to discover, and a whole world to understand.",
    codeEasterEgg: 'journey.status = "just getting started";',
  },

  footer: {
    dedication: "Made with ♥ for Muhammad Gabriel Luca Senna",
    secondary: "Crafted with <3 by Luca",
    author: "built by parikesitad-pm",
    portfolioMetadata: 'portfolio.version = "1.0"; status = "growing";',
  },
} as const;
