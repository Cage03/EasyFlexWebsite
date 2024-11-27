import {Utils} from "~/scripts/script-collection";

export const UseJob = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const defaultData = {
        id: null,
        title: '',
        description: '',
        location: '',
        company: '',
    };

    const jobs = useState('jobs', () => [] as Array<typeof defaultData>);
    const page = ref(1);
    const limit = ref(10);
    const loading = ref(false);
    const searchQuery = ref('');

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
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
            );
            

            if (!response.ok) {
                throw new Error(`Failed to fetch jobs: ${response.statusText}`);
            }

            const newJobs = await response.json();
            jobs.value = [...jobs.value, ...newJobs];
            page.value++;
            
            console.log(jobs.value);
        } catch (error:any) {
            throw new Error(error.message || 'Error fetching jobs.');
        } finally {
            loading.value = false;
        }
    };

    const deleteJob = async (id: number) => {
        const response = await fetch(`${apiUrl}/Job/Delete?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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
          .filter(([key]) => key !== 'id')
          .slice(0, 3)
          .map(([key, value]) => ({ key, value }));
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
        fetchJobs,
        deleteJob,
        clearJobs,
        computedSearchQuery,
        setters,
        formatJobProperties,
    };
};
