import { BreadCrumbs } from "@/components/Breadcrubs/BreadCrumbs";
import { Filters, IFiltersProps } from "@/components/Filters";
import { PublicationsTable } from "@/components/PublicationsTable/PublicationsTable";
import { ModelsPublication, ModelsPublicationStatus } from "@/core/api/Api";
import { useAppDispatch, useAppSelector } from "@/core/store/store";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import "./PublicationsPage.css";
import {
  savePubEndFormationFilter,
  savePubNameFilter,
  savePubStartFormationFilter,
  savePubStatusFilter,
} from "@/core/store/app.slice";
import {
  getPublications,
  acceptPublication,
  rejectPublication,
} from "@/core/api/publications.api";

export const PublicationsPage = () => {
  const dispatch = useAppDispatch();

  const [publications, setPublications] = useState<ModelsPublication[]>();

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [buttonLoadingId, setButtonLoadingId] = useState(0);
  const [buttonLoadingStatus, setButtonLoadingStatus] =
    useState<ModelsPublicationStatus>(
      ModelsPublicationStatus.WorkPublicationStatus
    );

  const prevPublications = useRef<ModelsPublication[]>();

  const {
    pubNameFilter: searchPublicationName,
    pubEndFormationFilter: selectedEndDate,
    pubStartFormationFilter: selectedStartDate,
    pubStatusFilter: selectedStatus,
  } = useAppSelector((state) => state.app);

  const TIMER_POOL = 1000;

  useEffect(() => {
    if (publications) {
      if (searchPublicationName) {
        filterPublications(searchPublicationName, publications);
      } else {
        setPublications(prevPublications.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPublicationName]);

  //первый запрос
  useEffect(() => {
    loadHistoryHandler({
      status: selectedStatus,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEndDate, selectedStartDate, selectedStatus]);

  /* pooling */
  /*  useEffect(() => {
    const longPooling = setInterval(
      () =>
        loadHistoryHandler({
          status: selectedStatus,
          startDate: selectedStartDate,
          endDate: selectedEndDate,
        }),
      TIMER_POOL
    );
    return () => clearInterval(longPooling);
  }, [
    selectedEndDate,
    selectedStartDate,
    selectedStatus,
    searchPublicationName,
  ]); */
  /* no pooling */

  const loadHistoryHandler = (params: {
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    getPublications(params)
      .then((data) => {
        if (data) {
          filterPublications(searchPublicationName, data);
        }
        setIsPageLoading(false);
      })
      .catch(() => {
        setIsPageLoading(false);
      });
  };

  /* TODO: */
  const updatePublicationStatus = (
    id: number,
    status: ModelsPublicationStatus
  ) => {
    setButtonLoadingId(id);
    setButtonLoadingStatus(status);

    if (status === ModelsPublicationStatus.CompletedPublicationStatus) {
      acceptPublication(id)
        .then(() => {
          setButtonLoadingId(0);
          setButtonLoadingStatus(
            ModelsPublicationStatus.DraftPublicationStatus
          );
        })
        .catch(() => {
          setButtonLoadingId(0);
          setButtonLoadingStatus(
            ModelsPublicationStatus.DraftPublicationStatus
          );
        });
    } else {
      rejectPublication(id)
        .then(() => {
          setButtonLoadingId(0);
          setButtonLoadingStatus(
            ModelsPublicationStatus.DraftPublicationStatus
          );
        })
        .catch(() => {
          setButtonLoadingId(0);
          setButtonLoadingStatus(
            ModelsPublicationStatus.DraftPublicationStatus
          );
        });
    }
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(savePubStatusFilter(value));
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "constName") {
      dispatch(savePubNameFilter(value));
      return;
    }
    if (name === "startDate") {
      dispatch(savePubStartFormationFilter(value));
    } else {
      dispatch(savePubEndFormationFilter(value));
    }
  };

  function filterPublications(
    filterName: string,
    publications: ModelsPublication[]
  ) {
    if (publications && publications.length) {
      prevPublications.current = publications;
    }
    const newPublications = publications.filter((publication) =>
      publication.title.includes(filterName)
    );
    setPublications(newPublications);
  }

  const tableProps = {
    dataRows: publications,
    isAdmin: false,
    completeHandler: updatePublicationStatus,
    buttonLoadingId: buttonLoadingId,
    buttonLoadingStatus: buttonLoadingStatus,
  };

  const filtersProps: IFiltersProps = {
    handleStatusChange: handleStatusChange,
    handleDateChange: handleDateChange,
    selectedStatus: selectedStatus,
    selectedStartDate: selectedStartDate,
    selectedEndDate: selectedEndDate,
    selectedName: searchPublicationName,
    isAdmin: false,
  };

  return (
    <div className="publications_page">
      <BreadCrumbs crumbs={[{ label: "Публикации" }]} />
      <Filters {...filtersProps} />
      {isPageLoading ? (
        <div className="publications_page_loader">
          <p className="heading">Загрузка</p>
        </div>
      ) : (
        <PublicationsTable {...tableProps} />
      )}
    </div>
  );
};
