import { GeographyPoint } from "@azure/search-documents";
import { CollectionResult, Facet } from "@trifenix/trifenix-connect";
import { EntityBaseSearch } from "@trifenix/mdm";
import { IndexesModel, ISearchQuery } from "./model"
import { BaseConnectSearch } from "./base/BaseConnectSearch";
import { SearchHelper } from "./helper";
import {ConnectAzure} from "./ConnectAzure";


/**
 * Programa principal de conexión a trifenix a azure search 
 * con el modelo trifenix connect
 */
export class ConnectSearch extends BaseConnectSearch<EntityBaseSearch<GeographyPoint>>
    implements IndexesModel<GeographyPoint> {

    endpoint: string;
    index_name: string;
    key: string;


    /**
     * Usa las variables de conexión para inicializar.
     * @param endpoint 
     * @param index_name 
     * @param key 
     */
    constructor(connect:ConnectAzure
    ) {
        super(connect.endpoint, connect.index, connect.key);
        this.endpoint = connect.endpoint;
        this.index_name = connect.index;
        this.key = connect.key;
    }

    /**
     * Obtiene los entitySearch desde Azure Search
     * @param query, parámetros de la consulta. 
     * @returns colección de entitySearch. 
     */
    public async getEntities(
        query: ISearchQuery
    ): Promise<CollectionResult<GeographyPoint>> {

        const results: EntityBaseSearch<GeographyPoint>[] = [];

        try {

            // busqueda en base a la consulta.
            const searchResults = await this.client.search("*", {
                filter: query.filter,
                facets: query.facets,
                select: query.select,
                skip: query.skip

            });


            // asigna los resultados
            for await (const result of searchResults.results) {
                results.push(result.document);
            }

            // quedan los facets.

            return {
                entities: results,
                total: searchResults.count || 0,
                facets : SearchHelper.GetConnectFacets(searchResults.facets) as {[key: string]: Facet[]}| undefined

            };
        } catch (error) {
            // usar el state para mostrar el error.
            throw error;
        }
    }
}