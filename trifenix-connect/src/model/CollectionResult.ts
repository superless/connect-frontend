import { EntityBaseSearch } from "@trifenix/mdm";
import { Facet } from "./Facet";



/**
 * Resultado de una consulta de una base de busqueda 
 * con el modelo entitySearch
 * @template T tipo geo
 * total, el total de registros encontrados (para paginación).
 * entities, colección de entitySearch,
 * facets, facets encontrados (si se especifica facets en la consulta).
 * usa un diccionario en que el key es el nombre del facet solicitado.
 */
export interface CollectionResult<T> {
    total: number;
    entities: EntityBaseSearch<T>[];
    facets?: {[key: string]: Facet[]};
}