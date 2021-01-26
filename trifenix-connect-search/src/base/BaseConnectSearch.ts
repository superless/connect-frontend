import { AzureKeyCredential, SearchClient } from "@azure/search-documents";

import { ISearchQuery } from "..";

export class BaseConnectSearch<T> {
    protected client: SearchClient<T>;

    constructor(endPoint: string, indexName: string, key: string) {
        this.client = new SearchClient<T>(
            endPoint,
            indexName,
            new AzureKeyCredential(key)
        );
    }

    



}

