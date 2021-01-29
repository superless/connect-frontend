import { CollectionResult } from "..";



/**
 * Interface de operaciones de conexión al modelo mdm,
 * de trifenix connect.
 * @template T 
 */
export interface BaseOperations{
    
    /**
     * Obtiene los nombres de una colección de ids de una entidad.
     * @param index, índice de la entidad  
     * @param indexPropName, índice de la propiedad del nombre del elemento a obtener. 
     * @param ids, colección de ids. 
     * @returns entity names 
     */
    getEntityNames(
        index : number,
        indexPropName : number[],
        ids : string[],
        ):Promise<{[id:string] : string}>
    }