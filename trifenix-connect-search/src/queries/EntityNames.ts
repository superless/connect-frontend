import { ISearchQuery } from "../model/ISearchQuery";



 /**
 * usa el índice para buscar elementos de un tipo de entidad,
 * además, verifica que exista el campo que ha sido determinado 
 * como el que representa a la entidad
 * y filtra los ids que se indican en la colección de ids
 * @param entityIndex, índice de la entidad a buscar 
 * @param ids, ids a filtrar
 * @param indexPropName, índice de la propiedad que muestra el nombre de la entidad. 
 * @returns  
 */
export const EntityNames: (entityIndex : number, ids:string[], indexPropName: number[])=>ISearchQuery = (entityIndex, ids, indexPropName) =>{

  // el filtro usa el índice de la entidad
  // busca que se encuentren las propiedades tanto en str o sug (los índices de str y suggest son los mismos).
  // busca que los ids coincidan.
  return {
    select : ['id','str','sug'],
    filter : `index eq ${entityIndex} and (str/any(element: search.in(element/index, '${indexPropName.join(",")}')) or sug/any(element: search.in(element/index, '${indexPropName.join(",")}'))) and search.in(id,'${ids.join(",")}')`,
  };
}

 
