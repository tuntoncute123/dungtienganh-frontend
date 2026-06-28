export interface NavItem {
  key: string;
  label: string;
  icon: string;
  active?: boolean;
}

export interface Course {
  id: string;
  title: string;
  image: string;
  studiedUnits: number;
  totalUnits: number;
  studiedLessons: number;
  totalLessons: number;
}

export interface DailyTask {
  id: string;
  icon: string;
  title: string;
  description?: string;
  actionLabel?: string;
  locked?: boolean;
}

export interface LearningStat {
  icon: string;
  label: string;
  value: string;
  color: string;
}

export interface LevelInfo {
  entry: string | number;
  predicted: string | number;
  target: string | number;
  entryIcon: string;
  predictedIcon: string;
  targetIcon: string;
}
