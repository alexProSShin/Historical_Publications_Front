import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getEventById,
  updateEvent,
  updateEventImage,
} from "@/core/api/events.api";

import { Button, Container, Form } from "react-bootstrap";

import { BreadCrumbs } from "@/components/Breadcrubs/BreadCrumbs";
import { RoutesEnum } from "@/router";
import defaultImage from "@/assets/defaultImage.webp";
import "./EventPage.css";
import {
  ModelsEventType,
  ModelsHistoricalEvent,
  ModelsUpdateEventDTO,
} from "@/core/api/Api";
import { useAuthState } from "@/core/store/useAuthState";

export const EventPage = () => {
  console.log("Event Page rendered");

  const { id } = useParams();

  const { IS_MODERATOR } = useAuthState();

  /* edit */
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isPhotoButtonLoading, setIsPhotoButtonLoading] = useState(false);
  const [formData, setFormData] = useState<ModelsUpdateEventDTO>({
    title: "",
    description: "",
    event_type: ModelsEventType.EventTypeEvent,
    info: "",
    source: "",
  });
  const [img, setImg] = useState<File | null>();

  const [eventData, setEventData] = useState<ModelsHistoricalEvent>();

  /* get event data */
  const loadEventData = () => {
    if (id) {
      getEventById(+id).then((data) => {
        setEventData(data);
        setFormData(data);
      });
    }
  };

  useEffect(() => {
    loadEventData();
  }, [id]);

  /* update event data */
  const updateEventHandler = () => {
    const loadingTimer = setTimeout(() => {
      setIsButtonLoading(true);
    }, 250);
    updateEvent(+(id || 0), formData)
      .then(() => {
        loadEventData();
        setIsButtonLoading(false);
        clearTimeout(loadingTimer);
      })
      .catch(() => {
        setIsButtonLoading(false);
        clearTimeout(loadingTimer);
      });
  };

  const addEventPhoto = () => {
    const loadingTimer = setTimeout(() => {
      setIsPhotoButtonLoading(true);
    }, 250);
    if (!img || !id) return;
    updateEventImage(+id, { image: img })
      .then(() => {
        loadEventData();
        setImg(null);
        setIsPhotoButtonLoading(false);
        clearTimeout(loadingTimer);
      })
      .catch(() => {
        setImg(null);
        setIsPhotoButtonLoading(false);
        clearTimeout(loadingTimer);
      });
  };

  if (!eventData) {
    return (
      <Container className="d-flex mt-5 h-100 justify-content-center">
        <BreadCrumbs crumbs={[{ label: "События", path: RoutesEnum.Events }]} />
        <h1>Загрузка</h1>
      </Container>
    );
  }

  const isSaveChangesButtonDisabled = isButtonLoading || !formData.title || !formData.description;

  return (
    <div className="event_page">
      <BreadCrumbs
        crumbs={[
          { label: "События", path: RoutesEnum.Events },
          { label: eventData.title ?? "Неизвестно" },
        ]}
      />

      {IS_MODERATOR ? (
        <>
          <div className="event_page__head">
            <div
              className="event_page__head__image_block"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                className="image-round"
                src={eventData.photo_url || defaultImage}
                alt=""
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Form.Control
                  style={{}}
                  type="file"
                  name="img"
                  onChange={(e) =>
                    setImg((e.target as HTMLInputElement).files?.[0] || null)
                  }
                />
                <Button
                  onClick={addEventPhoto}
                  disabled={!img || isPhotoButtonLoading}
                >
                  Сохранить
                </Button>
              </div>
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
                <Button onClick={updateEventHandler} disabled={isSaveChangesButtonDisabled}>
                  Сохранить
                </Button>
              </li>
              <li>
                <p>
                  <span className="event_page__content__list__key">
                    Название:
                  </span>
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
              {!!eventData.source && (
                <li>
                  <p>
                    <span className="event_page__content__list__key">
                      Источник:
                    </span>{" "}
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
              )}
            </ul>
          </div>
        </>
      ) : (
        <>
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
                  <span className="event_page__content__list__key">
                    Название:
                  </span>
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
        </>
      )}
    </div>
  );
};
