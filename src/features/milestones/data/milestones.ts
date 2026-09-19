import type { Milestone } from '@/types/milestone';

export const confirmedMilestones: Milestone[] = [
  {
    id: 'hello-world',
    title: 'Hello, World.',
    description: 'The day Muhammad Gabriel Luca Senna said hello to the world.',
    date: '13 February 2025',
    icon: 'birth',
    confirmed: true,
  },
  {
    id: 'tiny-teeth',
    title: 'Tiny Teeth',
    description: 'Tiny teeth started making their first appearance.',
    ageText: '~7 months',
    icon: 'tooth',
    confirmed: true,
  },
  {
    id: 'brave-chapter',
    title: 'A Brave Little Chapter',
    description:
      'When a fever required a little stay in the hospital, Luca was braver than anyone could imagine.',
    icon: 'health',
    confirmed: true,
  },
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Little feet started carrying Luca toward bigger adventures.',
    ageText: '~1 year',
    icon: 'steps',
    confirmed: true,
  },
  {
    id: 'one-whole-year',
    title: 'One Whole Year',
    description:
      'One year of little discoveries, growing curiosity, and countless memories.',
    date: '13 February 2026',
    icon: 'birthday',
    confirmed: true,
  },
  {
    id: 'future-adventures',
    title: 'Back To Little Adventures',
    description:
      'Healthy, curious, and continuing to explore the world with Popo and Momo.',
    icon: 'family',
    confirmed: true,
  },
];
