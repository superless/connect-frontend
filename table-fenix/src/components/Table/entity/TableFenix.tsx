import * as React from 'react';
import { ITableBaseProps } from '../props/ITableBaseProps';
import TableBaseFenix from '../base/TableBaseFenix';
import { GetEntityHeaders, GetPropHeaders } from '../../../helpers';
import { IEntityNameIndex } from '../base/model';
import { EntityBaseSearch } from '@trifenix/mdm';




/**
 * Itable fenix props
 * se deja una herencia para ver la posibilidad de precargar 
 * las cabeceras.
 */
export interface ITableFenixProps<T,T2> extends ITableBaseProps<T,T2> {
}



/**
 * Se usa tablaBaseFanix para extender.
 * @param props 
 * @returns  
 */
export function TableFenix<T,T2>(props: ITableFenixProps<T,T2>) {
  const headers : (entities: EntityBaseSearch<T>[], header: (header: number) => string)=>IEntityNameIndex[] = GetEntityHeaders;
  return (
    <TableBaseFenix  {...props}/>
  );
}
