
export const UseJob = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;
    
    async function getJobs(pageNumber = 1) {
        const response = await fetch(`${apiUrl}/Jobs/GetJobs?pageNumber=${pageNumber}`, {
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