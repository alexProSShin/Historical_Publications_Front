import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HistoricalEvent } from "@/core/types/models.types";
import { getEventById } from "@/core/api/events.api";
import { eventsMock } from "@/core/mock/events";
import { Container } from "react-bootstrap";
import { Portal } from "@/components/Portal";
import { BreadCrumbs } from "@/components/Breadcrubs/BreadCrumbs";
import { RoutesEnum } from "@/router";
import defaultImage from "@/assets/defaultImage.webp";
import "./EventPage.css";

export const EventPage = () => {
  console.log("Event Page rendered");

  const { id } = useParams();

  const [eventData, setEventData] = useState<HistoricalEvent>();

  useEffect(() => {
    if (id) {
      getEventById({ eventID: id })
        .then((data) => {
          setEventData(data);
        })
        .catch(() => {
          const event = eventsMock.historical_events.find(
            (event) => event.id === Number(id)
          );
          setEventData(event);
        });
    }
  }, [id]);

  if (!eventData) {
    return (
      <Container className="d-flex mt-5 h-100 justify-content-center">
        <h1>Загрузка</h1>
      </Container>
    );
  }

  return (
    <div className="event_page">
      <Portal element={document.getElementById("bread-portal")}>
        <BreadCrumbs
          crumbs={[
            { label: "События", path: RoutesEnum.Events },
            { label: eventData.title ?? "Неизвестно" },
          ]}
        />
      </Portal>
      <div className="event_page__head">
        <div className="event_page__head__image_block">
          <img
            className="image-round"
            src={eventData.photo_url || defaultImage}
            alt=""
          />
        </div>
        <div className="event_page__head__main">
          <p>{eventData.event_type}</p>
          <p className="heading">{eventData?.title}</p>
          <p>{eventData.description}</p>
        </div>
      </div>
      <div className="event_page__content">
        <ul className="event_page__content__list">
          <li>
            <p>
              <span className="event_page__content__list__key">Название:</span>
              {eventData.title}
            </p>
          </li>
          <li>
            <p>
              <span className="event_page__content__list__key info">
                Информация:{" "}
              </span>
              {eventData.info}
            </p>
          </li>
          {!!eventData.source && (
            <li>
              <p>
                <span className="event_page__content__list__key">
                  Источник:
                </span>{" "}
                {eventData.source}
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
