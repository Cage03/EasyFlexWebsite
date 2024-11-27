import {Utils} from "~/scripts/script-collection";

export const UseJob = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  const defaultData = {
    id: null,
    title: "",
    description: "",
    location: "",
    company: "",
    name: "",
    address: "",
    minHours: "",
    maxHours: "",
    startDate: "",
    endDate: "",
  };

  const jobs = useState("jobs", () => [] as Array<typeof defaultData>);
  const page = ref(1);
  const limit = ref(10);
  const loading = ref(false);
  const searchQuery = ref("");
  const currentJob = ref({...defaultData}); // Holds the data for a single job
  const originalJob = ref({...defaultData}); // For detecting changes

  const data = computed(() => Utils.deepCopy(jobs.value));

  const clearJobs = () => {
    jobs.value = [];
    page.value = 1;
  };

  const fetchJobs = async () => {
    if (loading.value) return;

    loading.value = true;
    try {
      const response = await fetch(
        `${apiUrl}/Job/GetJobs?pageNumber=${page.value}&limit=${limit.value}&search=${searchQuery.value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`);
      }

      const newJobs = await response.json();
      jobs.value = [...jobs.value, ...newJobs];
      page.value++;
    } catch (error: any) {
      throw new Error(error.message || "Error fetching jobs.");
    } finally {
      loading.value = false;
    }
  };

  const fetchJobById = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/Job/Get?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch job: ${response.statusText}`);
      }

      const jobData = await response.json();
      currentJob.value = jobData;
      originalJob.value = Utils.deepCopy(jobData);
    } catch (error: any) {
      throw new Error(error.message || "Error fetching job.");
    }
  };

  const saveJob = async (job: typeof defaultData) => {
    try {
      const response = await fetch(`${apiUrl}/Job/Update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        throw new Error(`Failed to save job: ${response.statusText}`);
      }

      originalJob.value = Utils.deepCopy(job);
    } catch (error: any) {
      throw new Error(error.message || "Error saving job.");
    }
  };

  const deleteJob = async (id: number) => {
    const response = await fetch(`${apiUrl}/Job/Delete?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete job: ${response.statusText}`);
    }

    jobs.value = jobs.value.filter((job) => job.id !== id);
  };

  const formatJobProperties = (job: Record<string, any> | null | undefined) => {
    if (!job) {
      return [];
    }
    return Object.entries(job)
      .filter(([key]) => key !== "id")
      .slice(0, 3)
      .map(([key, value]) => ({key, value}));
  };

  const computedSearchQuery = computed({
    get: () => searchQuery.value,
    set: (value: string) => {
      searchQuery.value = value;
      clearJobs();
    },
  });

  const setters = {
    limit: (newLimit: number) => {
      limit.value = newLimit;
    },
    dynamic: (key: keyof typeof defaultData, value: any) => {
      jobs.value = jobs.value.map((job) => ({
        ...job,
        [key]: value,
      }));
    },
  };

  return {
    data,
    currentJob,
    originalJob,
    fetchJobs,
    fetchJobById,
    saveJob,
    deleteJob,
    clearJobs,
    computedSearchQuery,
    setters,
    formatJobProperties,
  };
};
