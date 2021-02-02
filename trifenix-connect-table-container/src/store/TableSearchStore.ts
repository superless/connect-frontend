import { GeographyPoint } from "@azure/search-documents"
import { TableOperations } from "@trifenix/trifenix-connect"
import { ConnectSearch } from "@trifenix/trifenix-connect-search"
import { TableStore } from "@trifenix/trifenix-connect-stores"
import { TableSearchOperations } from "../TableSearchOperations"


/**
 * Tables search store
 * @param endpoint 
 * @param index_name 
 * @param key 
 * @returns search store 
 */
export function TableSearchStore(endpoint: string,
    index_name: string,
    key: string): TableStore<GeographyPoint> {

        return new TableStore<GeographyPoint>(new TableSearchOperations(new ConnectSearch(endpoint, index_name, key)) as  TableOperations<GeographyPoint>);
    }