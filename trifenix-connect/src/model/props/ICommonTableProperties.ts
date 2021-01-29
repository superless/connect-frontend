import { KindProperty } from "@trifenix/mdm";
import { CollectionTableState } from "../CollectionTableState";

/**
 * las propiedades para table quedarán en trifenix-connect,
 * con el fin de que un contenedor de tabla (inicialmente tenemos azure search),
 * pueda tener como entrada un componente que mantenga una herencia de esta propiedad.
 * @template T tipogeo
 */
export interface ICommonTableProperties<T> extends CollectionTableState<T> {

    /**
     * obtiene el nombre de la cabecera desde el índice 
     * para una entidad.
     */
    headerRelated: (header: number) => string;

    /**
   * Renderiza el título de la cabecera de acuerdo al índice de un typeSearch
   * y el tipo de typeSearch  (STR, DT, BL, GEO, NUM, etc.) y
   * retorna el nombre de la cabecera
   * @param {number} header índice de la cabecera, bajo el modelo será una enumeración por cada tipo de typeSearch.
   * @param {Related} typeRelated tipo de cabecera.
   * @returns {string} el nombre de la cabecera.
   */

    headerProperty: (header: number, typeRelated: KindProperty) => string;
    /**
     * muestra el valor de una enumeración de acuerdo al índice de propiedad correspondiente a typeSearch de tipo enumeración dentro del entitySearch.
     * @param {number} indexEnun índice del typeSearch de tipo ENUM dentro de una entidad (EntitySearch).
     * @param {number} valueEnum índice del valor de la enumeración dentro del typeSearch de la entidad.
     * @returns {string} valor de la enumeración.
     */
    enumValue: (indexEnun: number, valueEnum: number) => string;
    /**
     * evento de selección de página.
     * @param {number} page número de página actual.
     */

    selectPage?: (page: number) => void;

    /**
     * número de items que se mostrarán por página.
     */
    
    /**
   * evento de filtro, que índica el índice de la cabecera y los elementos seleccionados.
   */
    filters? : (index:number, selecteds:string[])=>void;

    // limpia el filtro.
    clean: ()=>void;

    // cada vez que se modifica el tableState se genera un evento.
    snapshot : (stateTable : CollectionTableState<T>) => void;
}