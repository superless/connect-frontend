export interface IBaseInput {
    /**
     * Entidad de la tabla.
     *
     */
    entity: number;
    /**
     * diccionario con el índice de una entidad relacionada y
     * que índice dentro de esa entidad relacionada, es el nombre que lo representa.
     */
    propIndexName:  { [key: number]: number; };
  }
  