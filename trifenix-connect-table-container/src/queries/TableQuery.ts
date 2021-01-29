import { ITableInput } from "../model/ITableInput";
import {ISearchQuery} from "@trifenix/trifenix-connect-search"



 /**
 * Consulta normal para una tabla.
 * consulta para tabla, incluye el índice de los elementos a traer y 
 * su página.
 * @param input
 * skip, cálculo para páginación
 * facets, nulo, para obtener los facets que se definan.
 * select, campos a consultar.
 * filter, filtro en este caso para indicar el índice.
 */
export const TableQuery:(input : ITableInput)=>ISearchQuery = (input)=>({    
  skip : (input.page > 1 ? (input.page - 1) * input.elementsInPage : 0),
  facets : undefined,
  select : [],
  filter : `index eq ${input.entity}`
})

