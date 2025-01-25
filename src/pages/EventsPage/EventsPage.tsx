import { EventCard } from "@/components/EventCard/EventCard";

import "./EventsPage.css";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";

import { addEventToPublication, getEvents } from "@/core/api/events.api";
import { Container } from "react-bootstrap";
import { BreadCrumbs } from "@/components/Breadcrubs/BreadCrumbs";
import searchIcon from "@assets/search.svg";
import {
  changePublicationData,
  saveEventTitleFilter,
} from "@/core/store/app.slice";
import { useAppDispatch, useAppSelector } from "@/core/store/store";
import { ModelsHistoricalEvent } from "@/core/api/Api";

export const EventsPage = () => {
  const dispatch = useAppDispatch();

  const [events, setEvents] = useState<ModelsHistoricalEvent[]>([]);

  const eventTitleFilter = useAppSelector(
    (state) => state.app.eventTitleFilter
  );

  /* card */

  const handleAddCardClick = (id: number) => {
    addEventToPublication(id).then(() => {
      getEvents(eventTitleFilter).then((data) => {
        setEvents(data.historical_events || []);
        dispatch(
          changePublicationData({
            publicationId: data.publications_id,
            eventsCount: data.events_count,
          })
        );
      });
    });
  };

  /* search */

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    dispatch(saveEventTitleFilter(value));
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;

    getEvents(title).then((data) => {
      setEvents(data.historical_events || []);
      dispatch(
        changePublicationData({
          publicationId: data.publications_id,
          eventsCount: data.events_count,
        })
      );
    });
  };

  /* initial */
  useEffect(() => {
    getEvents(eventTitleFilter).then((data) => {
      setEvents(data.historical_events || []);
      dispatch(
        changePublicationData({
          publicationId: data.publications_id,
          eventsCount: data.events_count,
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BreadCrumbs crumbs={[{ label: "События" }]} />

      <div className="events_page_search__block">
        <form onSubmit={handleSearchSubmit} method="GET">
          <button className="icon-btn" type="submit">
            <img src={searchIcon} alt="Поиск" className="search-icon" />
          </button>
          <input
            className="events_page_search__input"
            onChange={handleInputChange}
            value={eventTitleFilter}
            name="title"
            placeholder="Найти место, событие или личность"
          />
        </form>
      </div>
      {!!events.length && (
        <div className="events_page_grid-container">
          {events.map((event, index) => (
            <div key={index} className="events_page_grid-item">
              <EventCard
                eventData={event}
                onClick={() => handleAddCardClick(event.id)}
                disabled={false}
              />
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
