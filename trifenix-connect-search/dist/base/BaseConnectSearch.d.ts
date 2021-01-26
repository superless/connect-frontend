import { SearchClient } from "@azure/search-documents";
export declare class BaseConnectSearch<T> {
    protected client: SearchClient<T>;
    constructor(endPoint: string, indexName: string, key: string);
}
