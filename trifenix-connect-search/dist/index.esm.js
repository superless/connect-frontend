import { SearchClient, AzureKeyCredential } from '@azure/search-documents';

/**
 * Clase base para la ejecución de operaciones sobre azure search.
 * @template T, tipo geo
 */
class BaseConnectSearch {
    /**
     * Azure Search parámetros
     * @param endPoint, url de azure search.
     * @param indexName, índice del azure seach.
     * @param key, clave del azure search.
     */
    constructor(endPoint, indexName, key) {
        this.client = new SearchClient(endPoint, indexName, new AzureKeyCredential(key));
    }
}

/**
 * Consultas comunes a azure search.
 */
class SearchHelper {
    /**
     * Convierte los facets de Azure Search a facets de trifenix connect.
     * @param facets, facets de azure search, la key es el campo de consulta.
     * @returns facets en formato trifenix connect.
     */
    static GetConnectFacets(facets) {
        if (!facets)
            return undefined;
        let facetsLocal = {};
        Object.keys(facets).forEach(g => {
            let value = facets[g];
            Object.keys(value).forEach(v => {
                facetsLocal = { ...facetsLocal, [g]: [...facetsLocal[g] || [], { count: value[v].count, index: Number(value[v].value.split(",")[0]), value: value[v].value.split(",")[1] }] };
            });
        });
        return facetsLocal;
    }
}

/**
 * Programa principal de conexión a trifenix a azure search
 * con el modelo trifenix connect
 */
class ConnectSearch extends BaseConnectSearch {
    /**
     * Usa las variables de conexión para inicializar.
     * @param endpoint
     * @param index_name
     * @param key
     */
    constructor(endpoint, index_name, key) {
        super(endpoint, index_name, key);
        this.endpoint = endpoint;
        this.index_name = index_name;
        this.key = key;
    }
    /**
     * Obtiene los entitySearch desde Azure Search
     * @param query, parámetros de la consulta.
     * @returns colección de entitySearch.
     */
    async getEntities(query) {
        const results = [];
        try {
            // busqueda en base a la consulta.
            const searchResults = await this.client.search("*", {
                filter: query.filter,
                facets: query.facets,
                select: query.select,
                skip: query.skip
            });
            // asigna los resultados
            for await (const result of searchResults.results) {
                results.push(result.document);
            }
            // quedan los facets.
            return {
                entities: results,
                total: searchResults.count || 0,
                facets: SearchHelper.GetConnectFacets(searchResults.facets)
            };
        }
        catch (error) {
            // usar el state para mostrar el error.
            throw error;
        }
    }
}

/**
* usa el índice para buscar elementos de un tipo de entidad,
* además, verifica que exista el campo que ha sido determinado
* como el que representa a la entidad
* y filtra los ids que se indican en la colección de ids
* @param entityIndex, índice de la entidad a buscar
* @param ids, ids a filtrar
* @param indexPropName, índice de la propiedad que muestra el nombre de la entidad.
* @returns
*/
const EntityNames = (entityIndex, ids, indexPropName) => {
    // el filtro usa el índice de la entidad
    // busca que se encuentren las propiedades tanto en str o sug (los índices de str y suggest son los mismos).
    // busca que los ids coincidan.
    return {
        select: ['id', 'str', 'sug'],
        filter: `index eq ${entityIndex} and (str/any(element: search.in(element/index, '${indexPropName.join(",")}')) or sug/any(element: search.in(element/index, '${indexPropName.join(",")}'))) and search.in(id,'${ids.join(",")}')`,
    };
};

/**
 * Operaciones en AzureSearch
 */
class BaseSearchOperations {
    /**
     * Constructor
     * @param cs, Operador de busquedas de azure search.
     */
    constructor(cs) {
        this.connectSearch = cs;
    }
    /**
     * Obtiene los nombres de las entidades
     * @param índice de la entidad
     * @param indexPropName,índices que representan el nombre de la entidad
     * @param ids, listado de ids a consultar
     * @returns key value con el id y el nombre
     */
    async getEntityNames(index, indexPropName, ids) {
        // usa consultas de EntityNames.
        var query = EntityNames(index, ids, indexPropName);
        // usa operador de busquedas para traer los resultados.
        var response = await this.connectSearch.getEntities(query);
        // entidades encontradas
        var entities = response.entities;
        // si no hay resultados retorna undifened.
        if (response.total == 0)
            return undefined;
        // inicializa el resultado.
        let rslt = {};
        entities.forEach(s => {
            // por cada entidad, toma los suggest y str encontrados.
            var strs = s.sug.map(s => s.value).concat(s.str.map(s => s.value));
            // los une con coma, esto puede cambiar.
            var strToShow = strs.join(",");
            // acumula resultados.
            rslt = { ...rslt, [s.id]: strToShow };
        });
        return rslt;
    }
}

export { BaseSearchOperations, ConnectSearch, SearchHelper };
