import {
  ModelsCreateEventDTO,
  ModelsUpdateEventDTO,
  ModelsUpdateEventPriority,
} from "./Api";
import { baseApi } from "./base";

export async function getEvents(title?: string) {
  try {
    const response = await baseApi.events.eventsList({
      title: title || undefined,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

export async function getEventById(id: number) {
  try {
    const response = await baseApi.events.eventsDetail(id);
    return response.data;
  } catch (error) {
    console.error("Error fetching event by id:", error);
    throw error;
  }
}

export async function deleteEventById(id: number) {
  try {
    const response = await baseApi.events.eventsDelete(id);
    return response.data;
  } catch (error) {
    console.error("Error delete event by id:", error);
    throw error;
  }
}

export async function createEvent(event: ModelsCreateEventDTO) {
  try {
    const response = await baseApi.events.eventsCreate(event);
    return response.data;
  } catch (error) {
    console.error("Error create event:", error);
    throw error;
  }
}

export async function updateEvent(
  eventId: number,
  event: ModelsUpdateEventDTO
) {
  try {
    const response = await baseApi.events.eventsUpdate(eventId, event);
    return response.data;
  } catch (error) {
    console.error("Error update event:", error);
    throw error;
  }
}

export async function updateEventImage(
  eventId: number,
  data: {
    image: File;
  }
) {
  try {
    const response = await baseApi.events.imageCreate(eventId, data);
    return response.data;
  } catch (error) {
    console.error("Error update event image:", error);
    throw error;
  }
}

export async function updateEventPriority(
  eventId: number,
  priority: ModelsUpdateEventPriority
) {
  try {
    const response = await baseApi.events.priorityUpdate(eventId, priority);
    return response.data;
  } catch (error) {
    console.error("Error update event priority:", error);
    throw error;
  }
}

export async function addEventToPublication(eventId: number) {
  try {
    const response = await baseApi.events.publicationsCreate(eventId);
    return response.data;
  } catch (error) {
    console.error("Error update event:", error);
    throw error;
  }
}
export async function deleteEventFromPublication(eventId: number) {
  try {
    const response = await baseApi.events.publicationsDelete(eventId);
    return response.data;
  } catch (error) {
    console.error("Error delete publication event:", error);
    throw error;
  }
}
