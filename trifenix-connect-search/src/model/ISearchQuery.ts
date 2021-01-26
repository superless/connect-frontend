
import { GeographyPoint, SearchRequestOptions } from "@azure/search-documents";
import {EntityBaseSearch } from "@trifenix/mdm"


export interface ISearchQuery extends ISearchBaseQuery<keyof EntityBaseSearch<GeographyPoint>>
{

}

/**
 * SearchQuery Base 
 */
export interface ISearchBaseQuery<K extends keyof EntityBaseSearch<GeographyPoint>>{

  /**
   * campos que regresará desde el search
   */
  select?: K[] | undefined;

  /**
   * facets del search
   */
  facets?:string[];

  /**
   * filtro del search
   */
  filter:string;
  
  /**
   * skip para calcular donde obtener los datos
   * de la página.
   */
  skip? : number,
}


