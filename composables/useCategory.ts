import {type Skill, UseSkill} from "./useSkill";
export interface Category {
    id:number,
    name:string,
    skills:Array<Skill>
}

export const UseCategory = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    async function createCategory(name: string): Promise<any> {
        console.log(`Create category: ${name}`);
        console.log(`Create new category: ${JSON.stringify(name)}`);
        const response = await fetch(`${apiUrl}/Category/Create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        });

        if (!response.ok) {
            throw new Error(`Failed to create category: ${response.statusText}`);
        }
    }


    async function fetchCategories(limit: number, pageNumber = 1): Promise<any> {
        const response = await fetch(`${apiUrl}/Category/GetCategories?pageNumber=${pageNumber}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }
        // console.log(await response.json());
        return await response.json();
    }

    async function fetchCategoryById(id: number): Promise<any> {
        const response = await fetch(`${apiUrl}/Category/Get?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch category: ${response.statusText}`);
        }

        return await response.json();
    }

    return {
        createCategory,
        fetchCategories,
        fetchCategoryById
    };

};