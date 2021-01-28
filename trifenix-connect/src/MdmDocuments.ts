import { EntityBaseSearch, RelatedId } from "@trifenix/mdm"


/**
 * Operaciones sobre el metadata-model de trifenix connect.
 */
export class MdmDocuments {
    /**
     * obtiene el listado de relaciones de un grupo de entidades,
     * asignando un diccionario con la key como el índice de la entidad relacionada
     * y una colección de identificadores para ese índice como
     * @template T, tipo geo, es determinado el tipo de base de datos de busqueda.
     * @param entities, colección de entitySearchs. 
     * @returns diccionario con la entidad como índice y las ids encontradas como valor. 
     */
    static GetIdRelations<T>(entities : EntityBaseSearch<T>[] ): { [key: number]: string[]; }{
        const allRelations: RelatedId[] = entities.reduce((p,u)=>[
            ...p,  // previo
            ...u.rel], 
            [] as RelatedId[]
          );
        
          
          return allRelations.reduce((p,u)=>({
            ...p,
            [u.index] : [...(p[u.index]|| []), u.id]
          } ),{} as { [key: number]: string[] }
          );
        }

    
}