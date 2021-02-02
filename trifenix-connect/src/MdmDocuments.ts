import { EntityBaseSearch, FilterModel, FilterType, RelatedId } from "@trifenix/mdm"
import { Facet } from ".";
import _ from "lodash";


/**
 * Operaciones sobre el metadata-model de trifenix connect.
 */
export class MdmDocuments {


  /**
   * Obtiene un diccionario con los facets 
   * obteniendo el índice de cada facet encontrado
   * y el listado de ids.
   * @param facets, facets desde una base de datos de busqueda
   * @returns diccionario de facets.
   */
  static GetFacetDictionary(facets: Facet[]): { [key: number]: string[] } {

    return facets.reduce((p, u) => ({
      ...p,
      [u.index]: [...(p[u.index] || []), u.value]
    }), {} as { [key: number]: string[] }
    );


  }
  /**
   * obtiene el listado de relaciones de un grupo de entidades,
   * asignando un diccionario con la key como el índice de la entidad relacionada
   * y una colección de identificadores para ese índice como una colección.
   * @template T, tipo geo, es determinado el tipo de base de datos de busqueda.
   * @param entities, colección de entitySearchs. 
   * @returns diccionario con la entidad como índice y las ids encontradas como valor. 
   */
  static GetIdRelations<T>(entities: EntityBaseSearch<T>[]): { [key: number]: string[]; } {

    // toma todos los relatedId (rel) desde las entidades 
    const allRelations: RelatedId[] = entities.reduce((p, u) => [
      ...p,  // previo
      ...u.rel],
      [] as RelatedId[]
    );


    // crea un diccionario con los índices y la colección de ids que se encuentran en 
    // los relateds de la colección ingresada.
    return allRelations.reduce((p, u) => ({
      ...p,
      [u.index]: [...(p[u.index] || []), u.id]
    }), {} as { [key: number]: string[] }
    );
  }

  static GetFilteredEntityDictionary(filter: FilterModel | undefined) : { [key: number]: string[] } | undefined{
    if (filter === undefined) return undefined;
    if (filter.filterEntity === undefined) return undefined;

    let filtered = {};

    Object.keys(filter.filterEntity).forEach(key =>{
        var value = filter.filterEntity![Number(key)];
        filtered = {...filtered, [key]:value.map(f=>f.value)}

    });
    return filtered;
  }

  static SetFilter(filter : FilterModel | undefined, filteredEntity:{[key: string]: string[]}): FilterModel{
      let localFilter:FilterModel | undefined = filter;
      if (localFilter === undefined){
        localFilter = {};
        
      }
      localFilter.filterEntity = {};
      Object.keys(filteredEntity).forEach(key => {
        localFilter!.filterEntity = {...localFilter!.filterEntity, [key]:{value : filteredEntity[key], filterType: FilterType.EQUAL}};
      });

      return localFilter;
  }


}