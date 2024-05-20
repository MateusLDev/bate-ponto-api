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
