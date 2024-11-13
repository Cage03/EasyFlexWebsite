import type {Skill} from "~/composables/useSkill";

export interface flexworker {
    id: string;
    address: string;
    name: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    profilePictureUrl: string;
    skills: Skill[];
}

export const UseFlexworker = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;
    
    async function getFlexworker(id:any):Promise<any>{
        const response = await fetch(`${apiUrl}/Flexworker/GetById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch flexworker: ${response.statusText}`);
        }

        return await response.json();
    }
    
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

    async function updateFlexworker(flexworker:flexworker):Promise<any>{
        const response = await fetchFromClient.post(`/Flexworker/Update`, "main-api", {
            body: JSON.stringify(flexworker)
        });

        if (!response.ok) {
            throw new Error(`Failed to update flexworker: ${response.statusText}`);
        }

        return await response.json();
    }

    // add skills to flexworker
    async function addSkillsToFlexworker(flexworkerId: string, skills: number[]): Promise<any> {
        const response = await fetchFromClient.post(`/Flexworker/AddSkills`, "main-api", {
            body: JSON.stringify({flexWorkerId: flexworkerId, skillIds: skills})
        });

        if (!response.ok) {
            throw new Error(`Failed to add skills to flexworker: ${response.statusText}`);
        }
    }
    
    return{
        getFlexworker,
        deleteFlexworker,
        updateFlexworker,
        addSkillsToFlexworker
    }
}