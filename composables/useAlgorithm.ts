import type { requireModule } from "nuxt/kit";

const useFlexworker = UseFlexworker();

export interface compatibleFlexworker {
  id: string;
  address: string;
  name: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  profilePictureUrl: string;
  skills: Skill[];
  compatibilty: number;
}

export const useUseAlgorithm = () => {

  const flexworkers = ref<compatibleFlexworker[]>([]);

  const addFlexworker = (newFlexworker: compatibleFlexworker) => {
    flexworkers.value.push(newFlexworker);
  };

  const getFlexworkers = async (jobId: number) => {
    const response = await fetchFromClient.get('/Algorithm/GetFlexworkers', 'main-api');

  };




  return {

  }
}
