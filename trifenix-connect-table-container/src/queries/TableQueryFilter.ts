import { FilterModel } from "@trifenix/mdm";
import { ISearchQuery } from "@trifenix/trifenix-connect-search";
import { ITableFilterInput } from "../model/ITableFilterInput";


 /**
 * Table filter incluye la paginación y el facet para obtener los filtros.
 * además incluye los ids de elementos de entidades relacionadas que se 
 * encuentran en el filtro
 * @param input 
 * TableInput 
 * @returns
 * ISearchQuery.  
 */
export const TableQueryFilter : (input: ITableFilterInput)=>ISearchQuery = input=>{
  
  return {
    skip : (input.page > 1 ? (input.page - 1) * input.elementsInPage : 0),
    facets : ['rel/facet, count:1000'],
    select : [],
    filter : `index eq ${input.entity} ${getFilter(input.filter)}`
  }
}

/**
 * TODO: !Importante, el filtro tiene distintos tipos de comparaciones determinadas por @trifenix/mdm/FilterType, esto no está implementado.
 * TODO: el filtro también tiene la posibilidad de filtrar más tipos de campos.
 * obtiene el filtro que incluye las relaciones
 * a elementos.
 * En el filtro se indican los identificadores de relaciones
 * que deben ser filtradas para el resultado
 * @param Filter Model 
 * @returns filtro como string.
 */
function getFilter(filter : FilterModel):string {
  
  // revisa si existen entidades en el filtro
  if (!filter.filterEntity) return "";

  // obtiene los índices que deben ser filtrados (cada key).
  var filtered  = Object.keys(filter.filterEntity);

  // si no existe ningún índice retorna un string vacio
  if (filtered.length === 0) return "";

  // mapea todos las entidades a filtrar, generando una sub-consulta por cada índice (tipo de entidad)
  // de acuerdo al índice, buscara las ids encontradas (value),
  // Cada filtro de entidad también tiene filterType, que reemplazaría a 'eq' pr el filtro que más acomode.
  var strs = filtered
    .map(s=>`(rel/any(element:element/index eq ${s} and search.in(element/id, 
      '${filter.filterEntity![Number(s)].map(a=>a.value).join(",")}')))`);
  

  // hace un join de las consultas, incorporando el and antes.
  return ` and ${strs.join(" and ")}`;
}




