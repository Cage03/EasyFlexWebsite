import { ref } from 'vue';

export interface compatibleFlexworker {
  id: number | 0;
  name: string;
  profilePictureUrl: string;
  skills: Skill[];
  compatibility: number;
}

export const UseAlgorithm = () => {
  const flexworkers = ref<compatibleFlexworker[]>([]);

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

  return {
    flexworkers,
    fetchFlexworkers,
  };
};