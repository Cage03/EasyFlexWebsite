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
            throw new Error(`Failed to create categories: ${response.statusText}`);
        }
        return response;
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

    async function updateCategory(id:string, name :string):Promise<any>{
        const response = await fetchFromClient.put(
            `/Category/Update`,
            "main-api",
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id,name: name})
            })
        if (!response.ok) {
            throw new Error(`Failed to update categories: ${response.statusText}`);
        }
        /*
        Error Returns
        when a problem occurs it return a 400 error, this contains a message and 3 other fields, these fields are used to define why it's an error
        the fields are as follows
          "alreadyExists" --this field will be true if the name of the category already exists
          "doesNotExist" --this field will be true if you are updating a category that doesn't exist
          "isSameName" -- this field will be true if the new name matches the Old name (for example "CurrentName" == "CurrentName" will return a true)

        to access these for handling look below

        catch(error:any){
            let alreadyExists = error.response._data.alreadyExist
            let doesNotExist = error.response._data.doesNotExist
            let isSameName =  error.response._data.isSameName
        }
        */
    }

    return{
        createCategory,
        fetchCategories
    }

}