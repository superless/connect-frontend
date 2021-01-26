import { IResponse } from "@trifenix/trifenix-connect-model";
export declare class BaseConnectSearch<T> {
    private client;
    constructor(endPoint: string, indexName: string, key: string);
    protected searchEntities(query: string): Promise<IResponse<T[]>>;
}
