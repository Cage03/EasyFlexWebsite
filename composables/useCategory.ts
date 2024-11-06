
export const UseCategory = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    async function createCategory(name :string):Promise<any>{
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


    async function fecthCategories( limit:number,pageNumber = 1):Promise<any> {
        const response = await fetch(`${apiUrl}/Category/GetCategories?pageNumber=${pageNumber}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }

        return await response.json();
    }
    return{
        createCategory,
        fecthCategories
    }

}