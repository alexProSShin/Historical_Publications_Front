import {
  GetEventByIdDTO,
  GetEventByIdResponse,
  GetEventsDTO,
  GetEventsResponse,
} from "../types/api.types";
import { sendRequest } from "./sendRequest";

export const getEvents = async ({ title }: GetEventsDTO) => {
  try {
    const response: GetEventsResponse = await sendRequest({
      method: "GET",
      path: "/events",
      params: title ? { title } : undefined,
    });
    return response;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getEventById = async ({ eventID }: GetEventByIdDTO) => {
  try {
    const response: GetEventByIdResponse = await sendRequest({
      method: "GET",
      path: `/events/${eventID}`,
    });
    return response;
  } catch (error) {
    console.error("Error fetching event by id:", error);
    throw error;
  }
};
