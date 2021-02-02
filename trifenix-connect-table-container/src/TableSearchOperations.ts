import { GeographyPoint } from "@azure/search-documents";
import { FilterModel } from "@trifenix/mdm";
import {CollectionResult, TableOperations} from "@trifenix/trifenix-connect"
import { ConnectSearch, BaseSearchOperations, ISearchQuery } from "@trifenix/trifenix-connect-search";
import { TableQueryFilter } from "./queries";
export class TableSearchOperations implements TableOperations<GeographyPoint>
{
    connectSearch : ConnectSearch;
    baseSearch : BaseSearchOperations;

    /**
     * Constructor
     * @param cs, Operador de busquedas de azure search. 
     */
    constructor(cs : ConnectSearch) {
        this.connectSearch = cs;
        this.baseSearch = new BaseSearchOperations(this.connectSearch);
    }
    
    /**
     * Obtiene los nombres de las entidades
     * @param índice de la entidad 
     * @param indexPropName,índices que representan el nombre de la entidad 
     * @param ids, listado de ids a consultar 
     * @returns key value con el id y el nombre 
     */
    async getEntityNames(index: number, indexPropName: number[], ids: string[]): Promise<{ [id: string]: string; } | undefined> {
        return await this.baseSearch.getEntityNames(index, indexPropName, ids);
    }



    /**
     * Filtra los valores de una tabla
     * @param index, índice de la entida de la tabla 
     * @param page, página actual 
     * @param elementsInPage, elementos en la página 
     * @param filter, filtro 
     * @returns colección de entidades de acuerdo al filtro.
     */
    async tableFilterSearch(index: number, page: number, elementsInPage: number, filter: FilterModel): Promise<CollectionResult<GeographyPoint>>{

        var query: ISearchQuery = TableQueryFilter(index, page, elementsInPage, filter);

        return  await this.connectSearch.getEntities(query);
    }

}