import { FC } from "react";
import "./Filters.css";
import { ModelsPublicationStatus } from "@/core/api/Api";
export interface IFiltersProps {
  handleStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedStatus: string;
  selectedStartDate: string;
  selectedEndDate: string;
  selectedName: string;
  isAdmin?: boolean;
}

export interface ISelectOption {
  value: string;
  label: string;
}

export const Filters: FC<IFiltersProps> = (props) => {
  const {
    handleStatusChange,
    handleDateChange,
    selectedStatus,
    selectedStartDate,
    selectedEndDate,
    selectedName,
    isAdmin,
  } = props;

  const options: ISelectOption[] = [
    {
      label: "В работе",
      value: ModelsPublicationStatus.WorkPublicationStatus,
    },
    {
      label: "Отклонено",
      value: ModelsPublicationStatus.RejectedPublicationStatus,
    },
    {
      label: "Завершено",
      value: ModelsPublicationStatus.CompletedPublicationStatus,
    },
  ];

  return (
    <div className="filters">
      <div className="item">
        <p>Начало формирования:</p>
        <input
          type="date"
          name="startDate"
          value={selectedStartDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="item">
        <p>Конец формирования:</p>
        <input
          type="date"
          name="endDate"
          value={selectedEndDate}
          onChange={handleDateChange}
        />
      </div>
      {isAdmin && (
        <div className="item">
          <p>Автор:</p>
          <input
            type="text"
            name="constName"
            value={selectedName}
            onChange={handleDateChange}
          />
        </div>
      )}
      <div className="item">
        <p>Статус:</p>
        <select
          value={selectedStatus}
          name="status"
          onChange={handleStatusChange}
        >
          <option value="">Выберите статус</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
