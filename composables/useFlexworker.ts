
export const UseFlexworker = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;
    

    
    async function deleteFlexworker(id:number):Promise<any> {
        const response = await fetch(`${apiUrl}/Flexworker/Delete?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete flexworker: ${response.statusText}`);
        }
    }
    
    return{
        deleteFlexworker
    }
}