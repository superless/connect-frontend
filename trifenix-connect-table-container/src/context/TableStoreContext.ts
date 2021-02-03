import { createContext, Context, FC, ReactElement, ReactNode } from "react";
import { TableStore } from "@trifenix/trifenix-connect-stores";
import { GeographyPoint } from "@azure/search-documents";
import { TableSearchStore } from "../store/TableSearchStore";
import { ConnectAzure } from "@trifenix/trifenix-connect-search";


export function TableStoreContext(connect: ConnectAzure):Context<TableStore<GeographyPoint>>{
    return createContext<TableStore<GeographyPoint>>(TableSearchStore(connect) as TableStore<GeographyPoint>);
}


