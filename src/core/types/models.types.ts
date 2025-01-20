export type EventType = "Локация" | "Событие" | "Артефакт";
export type EventStatus = "активно" | "удалено";

export interface HistoricalEvent {
  description: string;
  event_type: EventType;
  id: number;
  info: string;
  photo_url?: string;
  source?: string;
  status: EventStatus;
  title: string;
}

export interface Publication {
  completion_date?: string;
  creation_date: string;
  description: string;
  formation_date?: string;
  id: number;
  moderator_id?: number;
  status: string;
  title: string;
  trust_score: number;
  user_id: number;
}
