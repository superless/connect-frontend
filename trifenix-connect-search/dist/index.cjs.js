'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var searchDocuments = require('@azure/search-documents');

class BaseConnectSearch {
    constructor(endPoint, indexName, key) {
        this.client = new searchDocuments.SearchClient(endPoint, indexName, new searchDocuments.AzureKeyCredential(key));
    }
}

class SearchHelper {
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

exports.ConnectSearch = ConnectSearch;
exports.SearchHelper = SearchHelper;
