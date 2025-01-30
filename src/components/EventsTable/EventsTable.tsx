import "./EventsTable.css";
import { useNavigate } from "react-router-dom";

import unknownImage from "@assets/defaultImage.webp";
import { ModelsHistoricalEvent } from "@/core/api/Api";
import { Button } from "react-bootstrap";
import { getRoute, RoutesEnum } from "@/router";

export interface IEventsTableProps {
  dataRows: ModelsHistoricalEvent[];
  deleteHandler: (id: number) => void;
  addHandler: (id: number) => void;
  buttonLoadingId: number;
}

export const EventsTable = (props: IEventsTableProps) => {
  const { dataRows, deleteHandler, buttonLoadingId, addHandler } = props;

  const navigate = useNavigate();

  if (!dataRows || !dataRows.length)
    return (
      <div className="event_table_empty">
        <h3>Отсутсвуют данные</h3>
      </div>
    );

  return (
    <div className="event_table">
      <table>
        <thead>
          <tr>
            <th>Изображение</th>
            <th>Название</th>
            <th>Тип</th>
            <th>Статус</th>
            <th style={{ textAlign: "center" }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row) => (
            <tr
              key={row.id}
              className={"no_hover"}
              style={{ borderTop: "1px solid var(--clr-disabled)" }}
            >
              <td className="event_td">
                <img
                  style={{ height: "100px" }}
                  src={row.photo_url ? row.photo_url : unknownImage}
                  alt=""
                />
              </td>
              <td>{row.title}</td>
              <td>{row.event_type}</td>
              <td>{row.status}</td>
              <td>
                <div className="table_manage_buttons">
                  <Button
                    onClick={() => addHandler(row.id)}
                    disabled={row.id === buttonLoadingId}
                  >
                    Добавить
                  </Button>

                  <Button
                    onClick={() =>
                      navigate(getRoute(RoutesEnum.EventById, row.id))
                    }
                    variant="info"
                  >
                    Подробнее
                  </Button>

                  <Button
                    onClick={() => deleteHandler(row.id)}
                    disabled={row.id === buttonLoadingId}
                    variant="danger"
                  >
                    Удалить
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
