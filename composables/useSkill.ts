import {Utils} from "~/scripts/script-collection";

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
  
  async function updateSkill(skill:Skill):Promise<void>{
    try{
      const res = await fetchFromClient.post('/Skill/Update', 'main-api', {
        body:JSON.stringify(skill)
      })

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
    updateSkill
  }
}