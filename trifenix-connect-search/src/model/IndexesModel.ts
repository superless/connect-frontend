import { CollectionResult } from "@trifenix/trifenix-connect";
import { ISearchQuery } from ".";



/**
 * Interface base para la ejecución de consultas
 * @template T, tipo Geo, esto podría tener el tipo de dato de Azure Search directamente
 * no afecta por ahora, dado que lo tiene el hijo. 
 */
export interface IndexesModel<T> {
    endpoint: string;
    index_name: string;
    key: string;
    getEntities(query: ISearchQuery): Promise<CollectionResult<T>>;
}
