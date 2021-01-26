import { GeographyPoint } from "@azure/search-documents";
import { EntityBaseSearch } from "@trifenix/mdm";
import { IndexesModel, IResponse } from "@trifenix/trifenix-connect-model";
import { BaseConnectSearch } from "./base/BaseConnectSearch";
export declare class ConnectSearch extends BaseConnectSearch<EntityBaseSearch<GeographyPoint>> implements IndexesModel<EntityBaseSearch<GeographyPoint>> {
    endpoint: string;
    index_name: string;
    key: string;
    constructor(endpoint?: string, index_name?: string, key?: string);
    getEntities(index: number): Promise<IResponse<EntityBaseSearch<GeographyPoint>[]>>;
}
