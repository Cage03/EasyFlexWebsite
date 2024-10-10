
export const UseJob = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;
    
    async function getJobs(pageNumber = 1, limit:number) {
        const response = await fetch(`${apiUrl}/Job/GetJobs?pageNumber=${pageNumber}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch jobs: ${response.statusText}`);
        }

        return await response.json();
    }
    
    return{
        getJobs
    }
}