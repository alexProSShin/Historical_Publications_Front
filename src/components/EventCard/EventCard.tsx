import "./EventCard.css";
import { HistoricalEvent } from "@/core/types/models.types";
import defaultImage from "@/assets/defaultImage.webp";
import { Link } from "react-router-dom";
import { getRoute, RoutesEnum } from "@/router";

interface IEventCardProps {
  eventData: HistoricalEvent;
}

export const EventCard = ({ eventData }: IEventCardProps) => {
  return (
    <div className="event_card">
      <Link
        to={getRoute(RoutesEnum.EventById, eventData.id)}
        className="event_card_href"
      >
        <img
          className="event_card_image image-arch"
          src={eventData.photo_url ?? defaultImage}
          alt=""
        />
      </Link>
      <p className="event_card__caption">{eventData.event_type}</p>
      <p className="heading event_card__title">{eventData.title}</p>
      <p className="event_card__description">{eventData.description}</p>

      {/*  <div className="event_card__button">
        <Button>Добавит</Button>
      </div> */}
    </div>
  );
};
