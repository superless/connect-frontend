import { EntityBaseSearch, FilterModel, OrderItem } from "@trifenix/mdm";
import { Facet } from "./Facet";



/**
 * State de tableState, esto debería considerarse como props 
 * de un componente container, ya que tiene los parámetros de entrada de 
 * la consulta y los resultados obtenidos.
 * permitiendo asignar estos.
 * @template T tipo geo
 * current, página actual.
 * index, índice de la entidad que usará la tabla
 * filter, filtro para la tabla (para todas las propiedades).
 * indexPropNames, indica cual es el index de la propiedad string o suggest que indica el nombre de la entidad relacionada.
 * orderItems, colección de parámetros de ordenamiento de la tabla.
 * itemsByPage, colección de entitySearch, agrupadas por página.
 * facets, facets encontrados en la colección.
 * colección que identifica las relaciones, el index principal es el índice de la entidad
 * que a su vez mantiene una colección con el id que representa el id de la entidad y 
 * el nombre que debería mantener bajo ese id.
 */
export interface CollectionTableState<T> {
    current: number;
    index: number;
    filter: FilterModel | undefined;
    indexPropNames: { [key: number]: number[]; } | {};
    orderItems: OrderItem[] | [];
    itemsByPage : { [key: number] : EntityBaseSearch<T>[]} | {}
    facets?: Facet[] | [];
    rels : {[key:number]: {[id:string] : string} } | {}
    load : boolean;
    elementsInPage : number;
    total : number;

}


