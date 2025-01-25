import "./PublicationPage.css";
import { BreadCrumbs } from "@/components/Breadcrubs/BreadCrumbs";
import { ModelsGetPublicationDTO } from "@/core/api/Api";
import {
  deleteEventFromPublication,
  updateEventPriority,
} from "@/core/api/events.api";
import {
  deletePublication,
  getPublicationById,
  publicationToProgress,
  updatePublication,
} from "@/core/api/publications.api";
import { getRoute, RoutesEnum } from "@/router";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

export const PublicationPage = () => {
  console.log("Publication Page rendered");

  const { id } = useParams();

  const navigate = useNavigate();

  const [publicationData, setpublicationData] =
    useState<ModelsGetPublicationDTO>();
  const [formData, setFormData] = useState({
    name: "",
    info: "",
  });
  const [loadingState, setLoadingState] = useState({
    save: false,
    priority: false,
    delete: false,
  });

  const handleInfoChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, info: value }));
  };

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, name: value }));
  };

  const handleDeleteEvent = (eventId: number) => {
    if (id) {
      deleteEventFromPublication(eventId).then(() =>
        getPublicationById(+id).then((data) => {
          if (data) {
            setpublicationData(data);
            setFormData({ name: data.title, info: data.description });
          }
        })
      );
    }
  };

  const handleSavePub = () => {
    if (!id) return;
    setLoadingState((prev) => ({ ...prev, save: true }));
    updatePublication(+id, {
      description: formData.info,
      title: formData.name,
    }).then(() => {
      setLoadingState((prev) => ({ ...prev, save: false }));
    });
  };
  const handleFormPub = () => {
    if (!id) return;
    publicationToProgress(+id).then(() => {
      navigate(RoutesEnum.Events, { replace: true });
    });
  };
  const handleDeletePub = () => {
    if (!id) return;
    setLoadingState((prev) => ({ ...prev, delete: true }));
    deletePublication(+id)
      .then(() => {
        navigate(RoutesEnum.Events, { replace: true });
      })
      .finally(() => {
        setLoadingState((prev) => ({ ...prev, delete: false }));
      });
  };
  const handleChangePrioritySubmit = (
    event: FormEvent<HTMLFormElement>,
    eventId: number
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const priority = +(formData.get("priority") as string);
    setLoadingState((prev) => ({ ...prev, priority: true }));
    updateEventPriority(eventId, { priority })
      .then(() => {
        if (!id) return;
        const inputEl = document.getElementById(
          "pub-events-input" + eventId
        ) as HTMLInputElement;
        if (inputEl) {
          inputEl.value = "";
        }
        getPublicationById(+id).then((data) => {
          if (data) {
            setpublicationData(data);
            setFormData({ name: data.title, info: data.description });
          }
        });
      })
      .finally(() => {
        setLoadingState((prev) => ({ ...prev, priority: false }));
      });
  };

  useEffect(() => {
    if (id) {
      getPublicationById(+id).then((data) => {
        if (data) {
          setpublicationData(data);
          setFormData({ name: data.title, info: data.description });
        }
      });
    }
  }, [id]);

  const IS_DRAFT = publicationData?.status === "черновик";

  const IS_SAVE_DISABLED = !formData.name || loadingState.save;
  const IS_FORM_DISABLED = false;
  const IS_DELETE_DISABLED = false;

  return (
    <div className="publication_page">
      <BreadCrumbs crumbs={[{ label: "Публикация" }]} />
      <input
        className="publication_page__title"
        value={formData.name}
        disabled={!IS_DRAFT}
        maxLength={32}
        onChange={handleNameChange}
      />
      <textarea
        className="publication_page__info"
        rows={5}
        disabled={!IS_DRAFT}
        style={{ width: "100%" }}
        value={formData.info}
        onChange={handleInfoChange}
      ></textarea>
      <div className="publication_page__date">
        <p>
          Дата создания:{" "}
          <span style={{ color: "var(--clr-secondary)" }}>
            {new Date(publicationData?.creation_date || "").toLocaleString()}
          </span>
        </p>
        {publicationData?.formation_date && (
          <p>
            Дата формирования:{" "}
            <span style={{ color: "var(--clr-secondary)" }}>
              {new Date(publicationData?.formation_date || "").toLocaleString()}
            </span>
          </p>
        )}
        {publicationData?.completion_date && (
          <p>
            Дата завершения:{" "}
            <span style={{ color: "var(--clr-secondary)" }}>
              {new Date(
                publicationData?.completion_date || ""
              ).toLocaleString()}
            </span>
          </p>
        )}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {IS_DRAFT && (
            <>
              <Button disabled={IS_SAVE_DISABLED} onClick={handleSavePub}>
                Сохранить
              </Button>
              <Button
                disabled={IS_DELETE_DISABLED}
                onClick={handleDeletePub}
                variant="danger"
              >
                Удалить
              </Button>
              <Button
                disabled={IS_FORM_DISABLED}
                onClick={handleFormPub}
                variant="success"
              >
                Сформировать
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="publication_page__events-wrapper">
        {publicationData?.events?.map((event, index) => (
          <div className="publication_page__event" key={index}>
            <Link
              to={getRoute(RoutesEnum.EventById, event.id)}
              className="event_card_href"
            >
              <img
                src={event.photo_url}
                alt=""
                className="image-round publication_page__event__image"
              />
            </Link>
            <div className="publication_page__event__left-part">
              <p className="heading">{event.title}</p>
              <p>{event.description}</p>
              {IS_DRAFT && (
                <form
                  onSubmit={(e) => handleChangePrioritySubmit(e, event.id)}
                  className="publication_page__event__left-part"
                >
                  <label>
                    <span>Приоритет: </span>
                    <input
                      name="priority"
                      className="publication_page__event__input"
                      id={"pub-events-input" + event.id}
                      min={1}
                      max={99}
                      required
                      type="number"
                    />
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      style={{ width: "fit-content" }}
                      variant="outline-danger"
                      disabled={loadingState.delete}
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Удалить
                    </Button>
                    <Button
                      variant="outline-warning"
                      style={{ width: "fit-content" }}
                      disabled={loadingState.priority}
                      type="submit"
                    >
                      Изменить приоритет
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
