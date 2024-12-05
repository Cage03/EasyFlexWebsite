import { fetchFromClient } from "~/composables/fetchFromClient";
import type { Skill } from "./useSkill";

export interface Category {
    id: number;
    name: string;
    skills: Skill[];
}

export const UseCategory = () => {
    const handleResponse = async (response: any) => {
        if (!response.ok) {
            const errorData = await response._data.catch(() => ({}));
            throw {
                status: response.status,
                message: response.statusText,
                data: errorData,
            };
        }
        return response._data || response;
    };

    const createCategory = async (name: string): Promise<Category> => {
        const response = await fetchFromClient.post(
          `/Category/Create`,
          "main-api",
          {
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name }),
          }
        );
        return handleResponse(response);
    };

    const fetchCategories = async (limit: number, pageNumber = 1): Promise<Category[]> => {
        const response = await fetchFromClient.get(
          `/Category/GetCategories?pageNumber=${pageNumber}&limit=${limit}`,
          "main-api",
          { headers: { "Content-Type": "application/json" } }
        );
        return handleResponse(response);
    };

    const updateCategory = async ( id: number, name: string ): Promise<Category> => {
        let category = { id, name };
        const response = await fetchFromClient.put(
          `/Category/Update`,
          "main-api",
          {
              headers: { "Content-Type": "application/json" },
                body: JSON.stringify(category),
          }
        );
        return handleResponse(response);
    };

    const deleteCategory = async (id: number): Promise<void> => {
        const response = await fetchFromClient.delete(
          `/Category/Delete?id=${id}`,
          "main-api",
          { headers: { "Content-Type": "application/json" } }
        );
        return handleResponse(response);
    };

    const fetchCategoryById = async (id: number): Promise<Category> => {
        const response = await fetchFromClient.get(`/Category/Get?id=${id}`, "main-api");
        return handleResponse(response);
    };

    return {
        createCategory,
        fetchCategories,
        updateCategory,
        deleteCategory,
        fetchCategoryById,
    };
};
