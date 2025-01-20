import { EventType, HistoricalEvent } from "./models.types";

/* __________ Events __________ */

/* --- GET */

/* --- --- GET /events */
export interface GetEventsResponse {
  events_count: number;
  historical_events: HistoricalEvent[];
  publications_id: number;
}
export interface GetEventsDTO {
  title?: string;
}
/* --- --- GET /events/{eventID} */
export type GetEventByIdResponse = HistoricalEvent;
export interface GetEventByIdDTO {
  eventID: string;
}

/* --- POST */

/* --- PUT */

/* --- DELETE */

/* ________ Publications __________ */

/* --- GET */
/* --- POST */
/* --- PUT */
/* --- DELETE */

/* __________ Events-Publications __________ */

/* --- PUT */
/* --- DELETE */

/* __________ Auth __________ */

/* --- POST */
/* --- PUT */

export interface CreateEventResponse {
  description: string;
  event_type: EventType;
  info: string;
  source: string;
  title: string;
}

export interface UpdateEventRequest {
  description?: string;
  event_type?: EventType;
  info?: string;
  source?: string;
  title?: string;
}
