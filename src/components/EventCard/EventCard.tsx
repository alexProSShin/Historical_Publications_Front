import "./EventCard.css";
import defaultImage from "@/assets/defaultImage.webp";
import { Link } from "react-router-dom";
import { getRoute, RoutesEnum } from "@/router";
import { ModelsHistoricalEvent } from "@/core/api/Api";
import { useAuthState } from "@/core/store/useAuthState";

interface IEventCardProps {
  eventData: ModelsHistoricalEvent;
  onClick: () => void;
  disabled: boolean;
}

export const EventCard = ({ eventData, onClick }: IEventCardProps) => {
  const { IS_GUEST } = useAuthState();

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

      {!IS_GUEST && (
        <div className="event_card__button">
          <button onClick={onClick} className="button-primary">
            Добавит
          </button>
        </div>
      )}
    </div>
  );
};
