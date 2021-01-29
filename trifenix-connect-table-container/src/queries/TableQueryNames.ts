import { ISearchQuery } from "@trifenix/trifenix-connect-search";


 /**
 * usa el índice para buscar elementos de un tipo de entidad,
 * además, verifica que exista el campo que ha sido determinado 
 * como el que representa a la entidad
 * y filtra los ids que se indican en la colección de ids
 * !importante, el campo que identifica una entidad esta determinado por un índice en str,
 * se debe considerar suggest tb.
 * @param entityIndex, índice de la entidad a buscar 
 * @param ids, ids a filtrar
 * @param indexPropName, índice de la propiedad que muestra el nombre de la entidad. 
 * @returns  
 */
export const TableQueryNames: (entityIndex : number, ids:string[], indexPropName: number)=>ISearchQuery = (entityIndex, ids, indexPropName) =>{
  return {
    select : ['id','str'],
    filter : `index eq ${entityIndex} and  str/any(element: element/index eq ${indexPropName}) and search.in(id,'${ids.join(",")}')`,
  };
}

 
