export type MilestoneIcon =
  | 'birth'
  | 'tooth'
  | 'steps'
  | 'birthday'
  | 'health'
  | 'family'
  | 'future';

export type Milestone = {
  id: string;
  title: string;
  description: string;
  date?: string;
  ageText?: string;
  icon: MilestoneIcon;
  confirmed: boolean;
};
