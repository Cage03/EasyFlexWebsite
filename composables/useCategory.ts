
export const UseCategory = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;


    interface category {
        id: string,
        name: string,
    }
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

    return{
        createCategory,
    }

}