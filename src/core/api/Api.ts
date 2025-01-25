/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ModelsCreateEventDTO {
  /** Краткое описание события */
  description: string;
  /** тип события: локация, событие, артефакт */
  event_type: ModelsEventType;
  /** информация о событии */
  info: string;
  /** Источник информации об этом событии */
  source?: string;
  /** Название события */
  title: string;
}

export enum ModelsEventStatus {
  ActiveEventStatus = "активно",
  DeletedEventStatus = "удалено",
}

export enum ModelsEventType {
  EventTypeLocation = "Локация",
  EventTypeEvent = "Событие",
  EventTypeArtifact = "Артефакт",
}

export interface ModelsGetEventsDTO {
  events_count: number;
  historical_events?: ModelsHistoricalEvent[];
  publications_id: number;
}

export interface ModelsGetPublicationDTO {
  completion_date?: string;
  creation_date: string;
  /** Краткое описание события */
  description: string;
  events?: ModelsHistoricalEvent[];
  formation_date?: string;
  id: number;
  moderator_id?: number;
  /** Установлен статус по умолчанию */
  status: ModelsPublicationStatus;
  /** Название публикации (исторического события) */
  title: string;
  trust_score?: number;
  user_id: number;
}

export interface ModelsHistoricalEvent {
  /** Краткое описание события */
  description: string;
  /** тип события: локация, событие, артефакт */
  event_type: ModelsEventType;
  /** Уникальный идентификатор события */
  id: number;
  /** информация о событии */
  info: string;
  /** URL фотографии, связанной с событием */
  photo_url?: string;
  /** Источник информации об этом событии */
  source?: string;
  /** Установлен статус по умолчанию */
  status: ModelsEventStatus;
  /** Название события */
  title: string;
  priority?: number
}

export interface ModelsLoginResponseDTO {
  token: string;
  user: ModelsUser;
}

export interface ModelsLoginUserDTO {
  email: string;
  password: string;
}

export interface ModelsPublication {
  completion_date?: string;
  creation_date: string;
  /** Краткое описание события */
  description: string;
  formation_date?: string;
  id: number;
  moderator_id?: number;
  /** Установлен статус по умолчанию */
  status: ModelsPublicationStatus;
  /** Название публикации (исторического события) */
  title: string;
  trust_score?: number;
  user_id: number;
}

export enum ModelsPublicationStatus {
  DraftPublicationStatus = "черновик",
  WorkPublicationStatus = "в работе",
  CompletedPublicationStatus = "завершен",
  RejectedPublicationStatus = "отклонен",
  DeletedPublicationStatus = "удален",
}

export interface ModelsRegisterUserDTO {
  email: string;
  name: string;
  /** @minLength 6 */
  password: string;
}

export enum ModelsRole {
  RoleUser = "user",
  RoleModerator = "moderator",
}

export interface ModelsUpdateEventDTO {
  /** Краткое описание события */
  description?: string;
  /** тип события: локация, событие, артефакт */
  event_type?: ModelsEventType;
  /** информация о событии */
  info?: string;
  /** Источник информации об этом событии */
  source?: string;
  /** Название события */
  title?: string;
}

export interface ModelsUpdateEventPriority {
  priority?: number;
}

export interface ModelsUpdatePublicationDTO {
  description: string;
  title: string;
}

export interface ModelsUpdateUserDTO {
  email?: string;
  name?: string;
  /** @minLength 6 */
  password?: string;
}

export interface ModelsUser {
  email: string;
  name: string;
  role: ModelsRole;
  user_id: number;
}

export interface RespErrorDetail {
  /** Поле, связанное с ошибкой */
  field?: string;
  /** Сообщение об ошибке */
  message: string;
}

export interface RespErrorResponse {
  /** Детали ошибок */
  errors: RespErrorDetail[];
  /** Метаданные (опционально) */
  meta?: any;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8080",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title RIP API
 * @version 1.0
 * @license Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html)
 * @termsOfService http://example.com/terms/
 * @baseUrl http://localhost:8080
 * @contact API Support <support@example.com> (http://www.example.com/support)
 *
 * API для управления событиями, публикациями и изображениями.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  events = {
    /**
     * @description Возвращает список событий с возможностью фильтрации по названию. Также возвращает черновик публикации пользователя, если он существует.
     *
     * @tags Events
     * @name EventsList
     * @summary Получить список событий
     * @request GET:/events
     * @secure
     */
    eventsList: (
      query?: {
        /** Название события */
        title?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<ModelsGetEventsDTO, RespErrorResponse>({
        path: `/events`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавляет новое событие в систему.
     *
     * @tags Events
     * @name EventsCreate
     * @summary Добавить новое событие
     * @request POST:/events
     * @secure
     */
    eventsCreate: (event: ModelsCreateEventDTO, params: RequestParams = {}) =>
      this.request<ModelsHistoricalEvent, RespErrorResponse>({
        path: `/events`,
        method: "POST",
        body: event,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает событие по уникальному идентификатору.
     *
     * @tags Events
     * @name EventsDetail
     * @summary Получить событие по ID
     * @request GET:/events/{eventID}
     * @secure
     */
    eventsDetail: (eventId: number, params: RequestParams = {}) =>
      this.request<ModelsHistoricalEvent, RespErrorResponse>({
        path: `/events/${eventId}`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет информацию о событии по его уникальному идентификатору.
     *
     * @tags Events
     * @name EventsUpdate
     * @summary Обновить событие по ID
     * @request PUT:/events/{eventID}
     * @secure
     */
    eventsUpdate: (
      eventId: number,
      event: ModelsUpdateEventDTO,
      params: RequestParams = {}
    ) =>
      this.request<ModelsHistoricalEvent, RespErrorResponse>({
        path: `/events/${eventId}`,
        method: "PUT",
        body: event,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет событие по его уникальному идентификатору.
     *
     * @tags Events
     * @name EventsDelete
     * @summary Удалить событие по ID
     * @request DELETE:/events/{eventID}
     * @secure
     */
    eventsDelete: (eventId: number, params: RequestParams = {}) =>
      this.request<void, RespErrorResponse>({
        path: `/events/${eventId}`,
        method: "DELETE",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Добавляет изображение к событию по его ID.
     *
     * @tags Events
     * @name ImageCreate
     * @summary Добавить изображение к событию
     * @request POST:/events/{eventID}/image
     * @secure
     */
    imageCreate: (
      eventId: number,
      data: {
        /** Изображение события */
        image: File;
      },
      params: RequestParams = {}
    ) =>
      this.request<void, RespErrorResponse>({
        path: `/events/${eventId}/image`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Обновляет приоритет события в черновике публикации пользователя.
     *
     * @tags Events-Publications
     * @name PriorityUpdate
     * @summary Обновить приоритет события
     * @request PUT:/events/{eventID}/priority
     * @secure
     */
    priorityUpdate: (
      eventId: number,
      priority: ModelsUpdateEventPriority,
      params: RequestParams = {}
    ) =>
      this.request<void, RespErrorResponse>({
        path: `/events/${eventId}/publications`,
        method: "PUT",
        body: priority,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Добавляет событие в черновик публикации пользователя.
     *
     * @tags Events
     * @name PublicationsCreate
     * @summary Добавить событие в публикацию
     * @request POST:/events/{eventID}/publications
     * @secure
     */
    publicationsCreate: (eventId: number, params: RequestParams = {}) =>
      this.request<void, RespErrorResponse>({
        path: `/events/${eventId}/publications`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Удаляет событие из черновика публикации пользователя.
     *
     * @tags Events-Publications
     * @name PublicationsDelete
     * @summary Удалить событие из публикации
     * @request DELETE:/events/{eventID}/publications
     * @secure
     */
    publicationsDelete: (eventId: number, params: RequestParams = {}) =>
      this.request<void, RespErrorResponse>({
        path: `/events/${eventId}/publications`,
        method: "DELETE",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  publications = {
    /**
     * @description Возвращает список публикаций с возможностью фильтрации по статусу и диапазону дат.
     *
     * @tags Publications
     * @name PublicationsList
     * @summary Получить список публикаций
     * @request GET:/publications
     * @secure
     */
    publicationsList: (
      query?: {
        /** Статус публикации */
        status?: string;
        /** Дата начала (формат: yyyy-mm-dd) */
        startDate?: string;
        /** Дата окончания (формат: yyyy-mm-dd) */
        endDate?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<ModelsPublication[], RespErrorResponse>({
        path: `/publications`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает публикацию по уникальному идентификатору.
     *
     * @tags Publications
     * @name PublicationsDetail
     * @summary Получить публикацию по ID
     * @request GET:/publications/{publicationID}
     * @secure
     */
    publicationsDetail: (publicationId: number, params: RequestParams = {}) =>
      this.request<ModelsGetPublicationDTO, RespErrorResponse>({
        path: `/publications/${publicationId}`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет информацию о публикации по уникальному идентификатору.
     *
     * @tags Publications
     * @name PublicationsUpdate
     * @summary Обновить публикацию по ID
     * @request PUT:/publications/{publicationID}
     * @secure
     */
    publicationsUpdate: (
      publicationId: number,
      publication: ModelsUpdatePublicationDTO,
      params: RequestParams = {}
    ) =>
      this.request<ModelsPublication, RespErrorResponse>({
        path: `/publications/${publicationId}`,
        method: "PUT",
        body: publication,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет публикацию по уникальному идентификатору.
     *
     * @tags Publications
     * @name PublicationsDelete
     * @summary Удалить публикацию по ID
     * @request DELETE:/publications/{publicationID}
     * @secure
     */
    publicationsDelete: (publicationId: number, params: RequestParams = {}) =>
      this.request<void, RespErrorResponse>({
        path: `/publications/${publicationId}`,
        method: "DELETE",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Переводит публикацию в финальный статус.
     *
     * @tags Publications
     * @name FinalizeCreate
     * @summary Завершить публикацию
     * @request POST:/publications/{publicationID}/finalize
     * @secure
     */
    finalizeCreate: (
      publicationId: number,
      query: {
        /** Статус публикации */
        status: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<ModelsPublication, RespErrorResponse>({
        path: `/publications/${publicationId}/finalize`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Переводит черновик публикации в статус работы.
     *
     * @tags Publications
     * @name FormCreate
     * @summary Перевести публикацию в статус работы
     * @request POST:/publications/{publicationID}/form
     * @secure
     */
    formCreate: (publicationId: number, params: RequestParams = {}) =>
      this.request<ModelsPublication, RespErrorResponse>({
        path: `/publications/${publicationId}/form`,
        method: "PUT",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * @description Осуществляет вход пользователя, если его учетные данные верны, и возвращает JWT токен.
     *
     * @tags Auth
     * @name LoginCreate
     * @summary Вход пользователя
     * @request POST:/users/login
     */
    loginCreate: (
      credentials: ModelsLoginUserDTO,
      params: RequestParams = {}
    ) =>
      this.request<ModelsLoginResponseDTO, RespErrorResponse>({
        path: `/users/login`,
        method: "POST",
        body: credentials,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Завершаем сессию пользователя и удаляем его токен.
     *
     * @tags Auth
     * @name LogoutCreate
     * @summary Выход пользователя
     * @request POST:/users/logout
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, RespErrorResponse>({
        path: `/users/logout`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Регистрирует нового пользователя и возвращает JWT токен.
     *
     * @tags Auth
     * @name RegisterCreate
     * @summary Регистрация нового пользователя
     * @request POST:/users/register
     */
    registerCreate: (user: ModelsRegisterUserDTO, params: RequestParams = {}) =>
      this.request<ModelsLoginResponseDTO, RespErrorResponse>({
        path: `/users/register`,
        method: "POST",
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет данные пользователя.
     *
     * @tags Auth
     * @name UpdateUpdate
     * @summary Обновить информацию о пользователе
     * @request PUT:/users/update
     * @secure
     */
    updateUpdate: (
      updateData: ModelsUpdateUserDTO,
      params: RequestParams = {}
    ) =>
      this.request<ModelsUser, RespErrorResponse>({
        path: `/users/me`,
        method: "PUT",
        body: updateData,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
