import {Utils} from "~/scripts/script-collection";

export interface compatibleFlexworker {
  id: number | 0;
  name: string;
  profilePictureUrl: string;
  skills: Skill[];
  compatibility: number;
}

export const UseAlgorithm = () => {
  const defaultData = [] as compatibleFlexworker[];
  const flexworkersState = useState("flexworkers", () => defaultData);
  const lastFetchedJobId = useState<number | null>("lastFetchedJobId", () => null); 

  const data = computed(() => getFlexworkers());

  const getFlexworkers = (): compatibleFlexworker[] => {
    return Utils.deepCopy(flexworkersState.value);
  };

  const fetchFlexworkers = async (jobId: number): Promise<void> => {
    if (lastFetchedJobId.value === jobId) return;
    try {
      const response = await fetchFromClient.get(`/Job/Matches?id=${jobId}`, "main-api");

      if (!response.ok) {
        throw new Error(`Failed to fetch flexworkers: ${response.statusText}`);
      }

      flexworkersState.value = (await response._data) as compatibleFlexworker[];
      lastFetchedJobId.value = jobId; 
    } catch (error: any) {
      throw new Error(error.message || "Error fetching flexworkers.");
    }
  };

  return {
    data,
    fetchFlexworkers,
    lastFetchedJobId,
  };
};
