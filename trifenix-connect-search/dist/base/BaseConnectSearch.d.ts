import { SearchClient } from "@azure/search-documents";
/**
 * Clase base para la ejecución de operaciones sobre azure search.
 * @template T, tipo geo
 */
export declare class BaseConnectSearch<T> {
    protected client: SearchClient<T>;
    /**
     * Azure Search parámetros
     * @param endPoint, url de azure search.
     * @param indexName, índice del azure seach.
     * @param key, clave del azure search.
     */
    constructor(endPoint: string, indexName: string, key: string);
}
