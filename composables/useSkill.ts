import {Utils} from "~/scripts/script-collection";
import {fetchFromClient} from "~/composables/fetchFromClient";
import type {Category} from "~/composables/useCategory";

export interface Skill{
  id?:number,
  categoryId?:number,
  name?:string
}

export const UseSkill = () => {
  
  const defaultData = [] as Skill[]

  const skillData = useState("skillData", () => defaultData);
  const data = computed(() => get());
  
  const get = (): Skill[] => {
    return Utils.deepCopy(skillData.value);
  };

  const handleResponse = async (response: any) => {
    if (!response.ok) {
      const errorData = await response._data.catch(() => ({}));
      throw {
        status: response.status,
        message: response.statusText,
        data: errorData,
      };
    }
    return response._data || response;
  };
  
  async function createSkill(skill:Skill):Promise<void>{
    try{
      const res = await fetchFromClient.post('/Skill/Create', 'main-api', {
        body:JSON.stringify({name:skill.name, categoryId:1}) //todo add proper category id when implementing
      })
      
      if(!res.ok){
        throw new Error(res.statusText);
      }
    }
    catch(e:any){
      throw new Error(e.message);
    }
  }

  const updateSkill = async (skill: { id: string; name: string }): Promise<Skill> => {
    const response = await fetchFromClient.put(
        `/Skill/Update`,
        "main-api",
        {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(skill),
        }
    );
    return handleResponse(response);
  };
  
  async function deleteSkill(id:number):Promise<void>{
    try{
      const res = await fetchFromClient.delete(`/Skill/Delete?id=${id}`, "main-api");

      if(!res.ok){
        throw new Error(res.statusText);
      }
    }
    catch(e:any){
      throw new Error(e.message);
    }
  }
  
  
  
  return{
    data,
    createSkill,
    deleteSkill,
    updateSkill,
  }
}