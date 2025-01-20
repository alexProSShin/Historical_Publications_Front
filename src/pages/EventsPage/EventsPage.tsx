import { EventCard } from "@/components/EventCard/EventCard";

import "./EventsPage.css";
import { FormEventHandler, useEffect, useState } from "react";

import { HistoricalEvent } from "@/core/types/models.types";
import { getEvents } from "@/core/api/events.api";
import { eventsMock } from "@/core/mock/events";
import { Container } from "react-bootstrap";
import { Portal } from "@/components/Portal";
import { BreadCrumbs } from "@/components/Breadcrubs/BreadCrumbs";

export const EventsPage = () => {
  const [events, setEvents] = useState<HistoricalEvent[]>([]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;

    getEvents({ title })
      .then((data) => {
        setEvents(data.historical_events);
        console.log(data);
      })
      .catch(() => {
        const filteredEvents = eventsMock.historical_events.filter((event) =>
          event.title.toLowerCase().startsWith(title.toLowerCase())
        );
        setEvents(filteredEvents);
      }); // mock данные
  };

  useEffect(() => {
    getEvents({})
      .then((data) => {
        setEvents(data.historical_events);
        console.log(data);
      })
      .catch(() => {
        setEvents(eventsMock.historical_events);
      }); // mock данные
  }, []);

  return (
    <>
      <Portal element={document.getElementById("bread-portal")}>
        <BreadCrumbs crumbs={[{ label: "События" }]} />
      </Portal>
      <div className="events_page_search__block">
        <form onSubmit={handleSubmit} method="GET">
          <button className="icon-btn" type="submit">
            <img
              src="src/assets/search.svg"
              alt="Поиск"
              className="search-icon"
            />
          </button>
          <input
            className="events_page_search__input"
            name="title"
            placeholder="Найти место, событие или личность"
          />
        </form>
      </div>
      {!!events.length && (
        <div className="events_page_grid-container">
          {events.map((event, index) => (
            <div key={index} className="events_page_grid-item">
              <EventCard eventData={event} />
            </div>
          ))}
        </div>
      )}

      {!events.length && (
        <Container className="d-flex mt-5 h-100 justify-content-center">
          <p className="heading">События не найдены</p>
        </Container>
      )}
    </>
  );
};
