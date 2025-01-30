import { FC } from "react";
import "./PublicationsTable.css";
import { useNavigate } from "react-router-dom";
import { getRoute, RoutesEnum } from "@/router";
import { ModelsPublication, ModelsPublicationStatus } from "@/core/api/Api";
import { Button } from "react-bootstrap";

export interface IPublicationTableProps {
  dataRows: ModelsPublication[] | undefined | null;
  isAdmin?: boolean;
  completeHandler?: (id: number, status: ModelsPublicationStatus) => void;
  buttonLoadingId?: number;
  buttonLoadingStatus?: ModelsPublicationStatus;
}

export const PublicationsTable: FC<IPublicationTableProps> = (props) => {
  const {
    dataRows,
    isAdmin,
    completeHandler,
    buttonLoadingId,
    buttonLoadingStatus,
  } = props;

  const navigate = useNavigate();

  if (!dataRows || !dataRows.length)
    return (
      <div className="publication_table_empty">
        <h3>Отсутсвуют данные</h3>
      </div>
    );

  const statusColors: Record<ModelsPublicationStatus, string> = {
    [ModelsPublicationStatus.DraftPublicationStatus]: "",
    [ModelsPublicationStatus.WorkPublicationStatus]: "",
    [ModelsPublicationStatus.RejectedPublicationStatus]: "#e80909",
    [ModelsPublicationStatus.CompletedPublicationStatus]: "#47b62e",
    [ModelsPublicationStatus.DeletedPublicationStatus]: "#e80909",
  };

  const getNormalDateTime = (date: string) => {
    if (date === "") return "Отсутствует";
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };
  const getStatusColor = (status: ModelsPublicationStatus) => {
    return statusColors[status];
  };

  const handleRowClick = (id: number) => {
    if (isAdmin) return;
    navigate(getRoute(RoutesEnum.PublicationById, id));
  };

  const isCancelButtonLoading =
    buttonLoadingStatus === ModelsPublicationStatus.RejectedPublicationStatus;
  const isCompleteButtonLoading =
    buttonLoadingStatus === ModelsPublicationStatus.CompletedPublicationStatus;

  return (
    <div className="publication_table">
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Дата создания</th>
            <th>Дата формирования</th>
            <th>Дата подтверждения</th>
            <th>Статус</th>
            {isAdmin && <th>Имя</th>}
            {isAdmin && <th>Действия</th>}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row) => {
            const isCompleteDisabled =
              (isCompleteButtonLoading && row.id === buttonLoadingId) ||
              row.status !== ModelsPublicationStatus.WorkPublicationStatus;
            const isRejectDisabled =
              (isCancelButtonLoading && row.id === buttonLoadingId) ||
              row.status !== ModelsPublicationStatus.WorkPublicationStatus;
            return (
              <tr
                key={row.id}
                style={{ cursor: isAdmin ? "" : "pointer" }}
                onClick={() => handleRowClick(row.id)}
                className={isAdmin ? "no_hover" : ""}
              >
                <td>{row.title}</td>
                <td>{getNormalDateTime(row.creation_date)}</td>
                <td>{getNormalDateTime(row.formation_date || "")}</td>
                <td>{getNormalDateTime(row.completion_date || "")}</td>
                <td style={{ color: getStatusColor(row.status) }}>
                  {row.status}
                </td>
                {isAdmin && <td>{row.user_name || ""}</td>}
                {isAdmin && completeHandler && (
                  <td className="table_manage_buttons">
                    <Button
                      variant="info"
                      onClick={() =>
                        navigate(`/publications/${row.id}`, {
                          state: { prevPage: "/publications" },
                        })
                      }
                    >
                      Подбробнее
                    </Button>

                    <Button
                      variant={isCompleteDisabled ? "secondary" : "success"}
                      onClick={() =>
                        completeHandler(
                          row.id,
                          ModelsPublicationStatus.CompletedPublicationStatus
                        )
                      }
                      disabled={isCompleteDisabled}
                    >
                      Подтвердить
                    </Button>
                    <Button
                      variant={isCompleteDisabled ? "secondary" : "danger"}
                      onClick={() =>
                        completeHandler(
                          row.id,
                          ModelsPublicationStatus.RejectedPublicationStatus
                        )
                      }
                      disabled={isRejectDisabled}
                    >
                      Отменить
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
