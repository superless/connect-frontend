import { ISearchQuery } from "@trifenix/trifenix-connect-search";

export const TableQueryNames: (entityIndex : number, ids:string[], indexPropName: number)=>ISearchQuery = (entityIndex, ids, indexPropName) =>{
  return {
    select : ['id','str'],
    filter : `index eq ${entityIndex} and  str/any(element: element/index eq ${indexPropName}) and search.in(id,'${ids.join(",")}')`,
  };
}

 
