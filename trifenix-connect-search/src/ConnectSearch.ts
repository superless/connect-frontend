import { GeographyPoint } from "@azure/search-documents";
import { EntityBaseSearch } from "@trifenix/mdm";
import {IndexesModel, IResponse} from "@trifenix/trifenix-connect-model"
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
        index: number
    ): Promise<IResponse<EntityBaseSearch<GeographyPoint>[]>> {
        const res = await this.searchEntities(`index eq ${index}`);

        return res;
    }
}