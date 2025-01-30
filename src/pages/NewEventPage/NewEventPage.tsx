import { useState } from "react";
import { createEvent } from "@/core/api/events.api";

import { Button } from "react-bootstrap";

import { BreadCrumbs } from "@/components/Breadcrubs/BreadCrumbs";
import { getRoute, RoutesEnum } from "@/router";
import defaultImage from "@/assets/defaultImage.webp";
import "./NewEventPage.css";
import { ModelsEventType, ModelsUpdateEventDTO } from "@/core/api/Api";
import { useNavigate } from "react-router-dom";

export const NewEventPage = () => {
  console.log("NewEvent Page rendered");

  const navigate = useNavigate();

  /* edit */
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [formData, setFormData] = useState<Required<ModelsUpdateEventDTO>>({
    title: "",
    description: "",
    event_type: ModelsEventType.EventTypeEvent,
    info: "",
    source: "",
  });

  /* update event data */
  const updateEventHandler = () => {
    setIsButtonLoading(true);

    createEvent(formData)
      .then((data) => {
        navigate(getRoute(RoutesEnum.EventById, data.id));
      })
      .catch(() => {
        navigate(RoutesEnum.Events);
      });
  };

  const isSaveChangesButtonDisabled =
    isButtonLoading ||
    !formData.title ||
    !formData.description ||
    !formData.info;

  return (
    <div className="event_page">
      <BreadCrumbs crumbs={[{ label: "Новое событие" }]} />
      <div className="event_page__head">
        <div
          className="event_page__head__image_block"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img className="image-round" src={defaultImage} alt="" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          ></div>
        </div>
        <div className="event_page__head__main">
          {/* <p>{eventData.event_type}</p> */}
          <select
            value={formData.event_type}
            name="status"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                event_type: e.target.value as ModelsEventType,
              }))
            }
          >
            {[
              ModelsEventType.EventTypeArtifact,
              ModelsEventType.EventTypeEvent,
              ModelsEventType.EventTypeLocation,
            ].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input
            style={{ fontSize: "2rem", width: "100%" }}
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />

          <input
            style={{ width: "100%" }}
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="event_page__content">
        <ul className="event_page__content__list">
          <li>
            <Button
              onClick={updateEventHandler}
              disabled={isSaveChangesButtonDisabled}
            >
              Сохранить
            </Button>
          </li>
          <li>
            <p>
              <span className="event_page__content__list__key">Название:</span>
              {formData.title}
            </p>
          </li>
          <li>
            <p>
              <span className="event_page__content__list__key info">
                Информация:{" "}
              </span>
              <input
                style={{ width: "100%" }}
                value={formData.info}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    info: e.target.value,
                  }))
                }
              />
            </p>
          </li>
          <li>
            <p>
              <span className="event_page__content__list__key">Источник:</span>{" "}
              <input
                style={{ width: "100%" }}
                value={formData.source}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    source: e.target.value,
                  }))
                }
              />
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
