export interface PointsList {
  date: string
  startTime: string;
  endTime: string;
  hasInterval: boolean;
  intervalDuration: string | null
  totalHours: string
}

export interface Points {
  id: string,
  date: string;
  activities: Activities[];
}

export interface Activities {
  startTime: string;
  endTime: string;
  description: string;
  category: string;
}
