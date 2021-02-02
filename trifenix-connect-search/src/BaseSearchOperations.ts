import { BaseOperations } from "@trifenix/trifenix-connect";
import { ConnectSearch } from "./ConnectSearch";
import { ISearchQuery } from "./model";
import { EntityNames } from "./queries/EntityNames";


/**
 * Operaciones en AzureSearch
 */
export class BaseSearchOperations implements BaseOperations {

    /**
     * Operador de busquedas
     */
    connectSearch : ConnectSearch;


    /**
     * Constructor
     * @param cs, Operador de busquedas de azure search. 
     */
    constructor(cs : ConnectSearch) {
        this.connectSearch = cs;
        
    }
    
    /**
     * Obtiene los nombres de las entidades
     * @param índice de la entidad 
     * @param indexPropName,índices que representan el nombre de la entidad 
     * @param ids, listado de ids a consultar 
     * @returns key value con el id y el nombre 
     */
    async getEntityNames(index: number, indexPropName: number[], ids: string[]): Promise<{ [id: string]: string; } | undefined> {
        
        // usa consultas de EntityNames.
        var query: ISearchQuery = EntityNames(index, ids, indexPropName);
        
        // usa operador de busquedas para traer los resultados.
        var response =  await this.connectSearch.getEntities(query);

        // entidades encontradas
        var entities = response.entities;

        // si no hay resultados retorna undifened.
        if (response.total==0) return undefined;
        
        // inicializa el resultado.
        let rslt:{ [id: string]: string; } = {};

        entities.forEach(s=>{
            // por cada entidad, toma los suggest y str encontrados.
            var strs = s.sug.map(s=>s.value).concat(s.str.map(s=>s.value));

            // los une con coma, esto puede cambiar.
            var strToShow = strs.join(",");

            // acumula resultados.
            rslt = {...rslt, [s.id]:strToShow}
        });
        return rslt;

    }

}