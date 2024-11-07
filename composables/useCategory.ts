import { fetchFromClient } from "~/composables/fetchFromClient"

export const UseCategory = () => {
    async function createCategory(name :string):Promise<any>{
        const response = await fetchFromClient.post(
            `/Category/Create`,
            "main-api",
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name})
            })
        if (!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }

    }


    async function fetchCategories(limit:number, pageNumber = 1):Promise<any> {

        const response = await fetchFromClient.get(
            `/Category/GetCategories?pageNumber=${pageNumber}&limit=${limit}`,
            "main-api",
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }
        return response._data;
    }
    return{
        createCategory,
        fetchCategories
    }

}