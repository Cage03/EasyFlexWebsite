import {Utils} from "~/scripts/script-collection";

export interface Skill{
  id:number,
  categoryId:number,
  name:string
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
    createSkill
  }
}