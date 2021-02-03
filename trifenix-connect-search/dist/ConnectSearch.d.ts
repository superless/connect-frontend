import { GeographyPoint } from "@azure/search-documents";
import { CollectionResult } from "@trifenix/trifenix-connect";
import { EntityBaseSearch } from "@trifenix/mdm";
import { IndexesModel, ISearchQuery } from "./model";
import { BaseConnectSearch } from "./base/BaseConnectSearch";
import { ConnectAzure } from "./ConnectAzure";
/**
 * Programa principal de conexión a trifenix a azure search
 * con el modelo trifenix connect
 */
export declare class ConnectSearch extends BaseConnectSearch<EntityBaseSearch<GeographyPoint>> implements IndexesModel<GeographyPoint> {
    endpoint: string;
    index_name: string;
    key: string;
    /**
     * Usa las variables de conexión para inicializar.
     * @param endpoint
     * @param index_name
     * @param key
     */
    constructor(connect: ConnectAzure);
    /**
     * Obtiene los entitySearch desde Azure Search
     * @param query, parámetros de la consulta.
     * @returns colección de entitySearch.
     */
    getEntities(query: ISearchQuery): Promise<CollectionResult<GeographyPoint>>;
}
