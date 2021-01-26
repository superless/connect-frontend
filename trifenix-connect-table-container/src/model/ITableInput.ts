
// stages

import {IBaseInput} from "./IBaseInput";



/**
 * Evento de carga de datos de la tabla
 */
export interface ITableInput extends IBaseInput {
  
  /**
   * página a cargar
   */
  page: number;

  /**
   * número de páginas
   */
  elementsInPage: number;


  /**
   * pathname para la ruta de edición.
   */
  pathname:string;
}


