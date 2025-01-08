import { ref } from 'vue';

export interface compatibleFlexworker {
  id: number | 0;
  name: string;
  profilePictureUrl: string;
  skills: Skill[];
  compatibility: number;
}

export interface compatibleJob {
  id: number | 0;
  name: string;
  description: string;
  commonSkills: Skill[];
  compatibility: number;
}

export const UseAlgorithm = () => {
  const flexworkers = ref<compatibleFlexworker[]>([]);
  const jobs = ref<compatibleJob[]>([]);

  const fetchFlexworkers = async (jobId: number) => {
    try {
      console.log(`'/Job/Matches?id=${jobId}'`)
      const response = await fetchFromClient.get(`/Job/Matches?id=${jobId}`, 'main-api');

      if (!response.ok) {
        throw new Error(`Failed to fetch flexworkers: ${response.statusText}`);
      }

      flexworkers.value = (await response._data) as compatibleFlexworker[];
    } catch (error: any) {
      throw new Error(error.message || "Error fetching flexworkers.");
    }
  };

  const fetchJobs = async (flexworkerId: number) => {
    try {
      const response = await fetchFromClient.get(`/Flexworker/Matches?id=${flexworkerId}`, 'main-api');

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`);
      }

      return await response._data as compatibleJob[];

    }catch (error: any) {
      throw new Error(error.message || "Error fetching flexworkers.");
  }
}

  return {
    flexworkers,
    jobs,
    fetchFlexworkers,
    fetchJobs
  };
};