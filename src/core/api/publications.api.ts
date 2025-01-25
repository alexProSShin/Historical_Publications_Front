import { ModelsUpdatePublicationDTO } from "./Api";
import { baseApi } from "./base";

export async function getPublicationById(publicationId: number) {
  try {
    const response =
      await baseApi.publications.publicationsDetail(publicationId);
    return response.data;
  } catch (error) {
    console.error("Error get pub by id:", error);
    throw error;
  }
}

export async function getPublications(query?: {
  status?: string;
  startDate?: string;
  endDate?: string;
}) {
  try {
    const response = await baseApi.publications.publicationsList(query);
    return response.data;
  } catch (error) {
    console.error("Error get pubs:", error);
    throw error;
  }
}

export async function updatePublication(
  publicationId: number,
  publication: ModelsUpdatePublicationDTO
) {
  try {
    const response = await baseApi.publications.publicationsUpdate(
      publicationId,
      publication
    );
    return response.data;
  } catch (error) {
    console.error("Error update Publication:", error);
    throw error;
  }
}

export async function publicationToProgress(publicationId: number) {
  try {
    const response = await baseApi.publications.formCreate(publicationId);
    return response.data;
  } catch (error) {
    console.error("Error publication To Progress:", error);
    throw error;
  }
}

export async function deletePublication(publicationId: number) {
  try {
    const response =
      await baseApi.publications.publicationsDelete(publicationId);
    return response.data;
  } catch (error) {
    console.error("Error publication reject:", error);
    throw error;
  }
}

export async function acceptPublication(publicationId: number) {
  try {
    const response = await baseApi.publications.finalizeCreate(publicationId, {
      status: "завершен",
    });
    return response.data;
  } catch (error) {
    console.error("Error publication reject:", error);
    throw error;
  }
}
export async function rejectPublication(publicationId: number) {
  try {
    const response = await baseApi.publications.finalizeCreate(publicationId, {
      status: "отклонен",
    });
    return response.data;
  } catch (error) {
    console.error("Error publication reject:", error);
    throw error;
  }
}
