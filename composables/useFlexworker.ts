import { Utils } from "~/scripts/script-collection";

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
    const defaultData = {
        id: null,
        name: "",
        address: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: "",
        profilePictureUrl: "",
        skills: [],
    };

    const flexworkers = useState("flexworkers", () => [] as Array<typeof defaultData>);
    const page = ref(1);
    const limit = ref(10);
    const loading = ref(false);
    const searchQuery = ref("");
    const currentFlexworker = ref({ ...defaultData });
    const originalFlexworker = ref({ ...defaultData });

    const data = computed(() => Utils.deepCopy(flexworkers.value));

    const clearFlexworkers = () => {
        flexworkers.value = [];
        page.value = 1;
    };

    const fetchFlexworkers = async () => {
        if (loading.value) return;

        loading.value = true;
        try {
            const response = await fetchFromClient.get(
              `/Flexworker/Get?limit=${limit.value}&page=${page.value}&search=${searchQuery.value}`,
              "main-api"
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch flexworkers: ${response.statusText}`);
            }

            const newFlexworkers = (await response._data) as any;
            flexworkers.value = [...flexworkers.value, ...newFlexworkers];
            page.value++;
        } catch (error: any) {
            throw new Error(error.message || "Error fetching flexworkers.");
        } finally {
            loading.value = false;
        }
    };

    const fetchFlexworkerById = async (id: number) => {
        try {
            const response = await fetchFromClient.get(`/Flexworker/GetById?id=${id}`, "main-api");

            if (!response.ok) {
                throw new Error(`Failed to fetch flexworker: ${response.statusText}`);
            }

            const flexworkerData = (await response._data) as any;
            currentFlexworker.value = flexworkerData;
            originalFlexworker.value = Utils.deepCopy(flexworkerData);
        } catch (error: any) {
            throw new Error(error.message || "Error fetching flexworker.");
        }
    };

    const saveFlexworker = async (flexworker: typeof defaultData) => {
        try {
            const response = await fetchFromClient.post(`/Flexworker/Update`, "main-api", {
                body: JSON.stringify(flexworker),
            });

            if (!response.ok) {
                throw new Error(`Failed to save flexworker: ${response.statusText}`);
            }

            originalFlexworker.value = Utils.deepCopy(flexworker);
        } catch (error: any) {
            throw new Error(error.message || "Error saving flexworker.");
        }
    };

    const deleteFlexworker = async (id: number) => {
        const response = await fetchFromClient.delete(`/Flexworker/Delete?id=${id}`, "main-api");

        if (!response.ok) {
            throw new Error(`Failed to delete flexworker: ${response.statusText}`);
        }

        flexworkers.value = flexworkers.value.filter((flexworker) => flexworker.id !== id);
    };

    const addSkillsToFlexworker = async (flexworkerId: string, skills: number[]) => {
        const response = await fetchFromClient.post(`/Flexworker/AddSkills`, "main-api", {
            body: JSON.stringify({ flexWorkerId: flexworkerId, skillIds: skills }),
        });

        if (!response.ok) {
            throw new Error(`Failed to add skills to flexworker: ${response.statusText}`);
        }
    };

    const removeSkillsFromFlexworker = async (flexworkerId: string, skills: number[]) => {
        const response = await fetchFromClient.delete(`/Flexworker/RemoveSkills`, "main-api", {
            body: JSON.stringify({ flexWorkerId: flexworkerId, skillIds: skills }),
        });

        if (!response.ok) {
            throw new Error(`Failed to remove skills from flexworker: ${response.statusText}`);
        }
    };

    const formatFlexworkerProperties = (flexworker: Record<string, any> | null | undefined) => {
        if (!flexworker) {
            return [];
        }
        return Object.entries(flexworker)
          .filter(([key]) => key !== "id")
          .slice(0, 3)
          .map(([key, value]) => ({ key, value }));
    };

    const computedSearchQuery = computed({
        get: () => searchQuery.value,
        set: (value: string) => {
            searchQuery.value = value;
            clearFlexworkers();
        },
    });

    const setters = {
        limit: (newLimit: number) => {
            limit.value = newLimit;
        },
        dynamic: (key: keyof typeof defaultData, value: any) => {
            flexworkers.value = flexworkers.value.map((flexworker) => ({
                ...flexworker,
                [key]: value,
            }));
        },
    };

    return {
        data,
        currentFlexworker,
        originalFlexworker,
        fetchFlexworkers,
        fetchFlexworkerById,
        saveFlexworker,
        deleteFlexworker,
        addSkillsToFlexworker,
        removeSkillsFromFlexworker,
        clearFlexworkers,
        computedSearchQuery,
        setters,
        formatFlexworkerProperties,
    };
};
