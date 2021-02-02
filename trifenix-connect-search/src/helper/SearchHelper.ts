import { FacetResult } from "@azure/search-documents";
import { Facet } from "@trifenix/trifenix-connect";



/**
 * Consultas comunes a azure search.
 */
export class SearchHelper {



    /**
     * Convierte los facets de Azure Search a facets de trifenix connect.
     * @param facets, facets de azure search, la key es el campo de consulta. 
     * @returns facets en formato trifenix connect. 
     */
    static GetConnectFacets(facets: {
        [propertyName: string]: FacetResult[]
    } | undefined): { [key: string]: Facet[] } | undefined {
        if (!facets) return undefined;

        let facetsLocal: { [key: string]: Facet[] } = {};
        Object.keys(facets).forEach(g => {
            let value = facets[g] as FacetResult;
            Object.keys(value).forEach(v => {
                facetsLocal = { ...facetsLocal, [g]: [...facetsLocal[g] || [], { count: value[v].count, index: Number(value[v].value.split(",")[0]), value: value[v].value.split(",")[1] } as Facet] }
            });
        })
        return facetsLocal;
    }
}