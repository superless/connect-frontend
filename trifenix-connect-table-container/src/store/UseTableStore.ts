import { useContext } from 'react';
import { TableSearchStore } from './TableSearchStore';
import { TableStore } from "@trifenix/trifenix-connect-stores";
import { TableStoreContext } from '../context/TableStoreContext'
import { GeographyPoint } from '@azure/search-documents';
import { ConnectAzure } from '@trifenix/trifenix-connect-search';

export const useTableStore = (connect: ConnectAzure): TableStore<GeographyPoint> => useContext(TableStoreContext(connect));