import { GeographyPoint } from "@azure/search-documents";
import { EntityBaseSearch } from "@trifenix/mdm";
import { IndexesModel, IResponse, ISearchQuery } from "./model";
import { BaseConnectSearch } from "./base/BaseConnectSearch";
export declare class ConnectSearch extends BaseConnectSearch<EntityBaseSearch<GeographyPoint>> implements IndexesModel<EntityBaseSearch<GeographyPoint>> {
    endpoint: string;
    index_name: string;
    key: string;
    constructor(endpoint?: string, index_name?: string, key?: string);
    getEntities(query: ISearchQuery): Promise<IResponse<EntityBaseSearch<GeographyPoint>[]>>;
}
