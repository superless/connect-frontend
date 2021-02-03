import { EntityBaseSearch} from "@trifenix/mdm";
import { ICommonTableProperties } from "@trifenix/trifenix-connect";

/**
 * Propiedades de table fenix.
 */
export interface ITableBaseProps<T, T2> extends ICommonTableProperties<T,T2> {
  visible : boolean;
  /**
   * JSX para renderizar en las cabeceras de la tabla.
   */
  cellheaders?: JSX.Element[];
  /**
   * JSX para renderizar cada celda recibiendo como entrada la entidad que corresponde a la fila.
  */
  cells?: ((elem: EntityBaseSearch<T>) => JSX.Element)[];


  



  
}
