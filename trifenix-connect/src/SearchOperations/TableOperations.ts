import { FilterModel } from "@trifenix/mdm";
import { CollectionResult } from "..";

import { BaseOperations } from "./BaseOperations";



/**
 * TableOperations es la interface a ser implementada por los containers para operaciones de tabla
 * @template T 
 */
export interface TableOperations<T> extends BaseOperations {


    /**
     * Entrega una colección de entidades entitySearch, los facets y la cantidad total de registros 
     * que existen, de acuerdo a un filtro seleccionado.
     * @param index, índice de una entidad.
     * @param page, página actual de la solicitud.
     * @param elementsInPage, número de elementos en la página 
     * @param filter, filtro. 
     * @returns Resultado con las entidades, los facets y el número total de registros. 
     */
    tableFilterSearch(
        index : number, 
        page: number,  
        elementsInPage : number,
        filter : FilterModel,
        ):Promise<CollectionResult<T>>;
}