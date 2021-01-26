import { ISearchQuery } from ".";
import { IResponse } from "./IResponse";
export interface IndexesModel<T> {
    endpoint: string;
    index_name: string;
    key: string;
    getEntities(query: ISearchQuery): Promise<IResponse<T[]>>;
}
