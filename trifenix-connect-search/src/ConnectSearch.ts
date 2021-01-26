import { GeographyPoint, SearchOptions } from "@azure/search-documents";
import { EntityBaseSearch } from "@trifenix/mdm";
import {IndexesModel, IResponse, ISearchQuery} from "./model"
import { BaseConnectSearch } from "./base/BaseConnectSearch";


export class ConnectSearch extends BaseConnectSearch<EntityBaseSearch<GeographyPoint>>
    implements IndexesModel<EntityBaseSearch<GeographyPoint>> {
    public endpoint: string;
    public index_name: string;
    public key: string;

    constructor(
        endpoint = "https://search-agro.search.windows.net/",
        index_name = "entities-agro",
        key = "7902C1E82BEEDC85AC0E535CF45DFC77"
    ) {
        super(endpoint, index_name, key);
        this.endpoint = endpoint;
        this.index_name = index_name;
        this.key = key;
    }
    public async getEntities(
        query: ISearchQuery
    ): Promise<IResponse<EntityBaseSearch<GeographyPoint>[]>> {

        const results: EntityBaseSearch<GeographyPoint>[] = [];

        try {
            const searchResults = await this.client.search("*", {
                filter: query.filter,
                facets : query.facets,
                select : query.select,
                skip : query.skip
    
            });
            
            

            for await (const result of searchResults.results) {
                results.push(result.document);
            }

            return {
                data: results,
                error: null,
            };
        } catch (error) {
            return {
                data: results,
                error: error.message,
            };
        }
    }
}