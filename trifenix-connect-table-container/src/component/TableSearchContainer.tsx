import { FC} from "react";
import {observer} from "mobx-react";


import { GeographyPoint } from "@azure/search-documents";
import {useTableStore} from "../store/UseTableStore";

import { ConnectAzure } from "@trifenix/trifenix-connect-search";
import { TableFenix } from "@trifenix/table-fenix";
import { ITableBaseProps } from "@trifenix/table-fenix/dist/components/Table/props/ITableBaseProps";

export const TableSearchContainer: FC<ITableBaseProps<GeographyPoint, ConnectAzure>> = observer((props : ITableBaseProps<GeographyPoint, ConnectAzure>): JSX.Element => {
    const store = useTableStore(props.connect);
    console.log(store);
    return (
        <TableFenix {...props}  />
    )
  });




