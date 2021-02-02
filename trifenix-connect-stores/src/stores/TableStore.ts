import { FilterModel, OrderItem } from "@trifenix/mdm";
import { CollectionResult, CollectionTableState, Facet, MdmDocuments, TableOperations } from "@trifenix/trifenix-connect";
import { makeAutoObservable } from "mobx";

/**
 * Store de Table Fenix y operaciones con inyección de dependencias.
 * el constructor permite inyectar dependencias.
 * en prueba
 * @template T tipo geo
 */
export class TableStore<T> implements CollectionTableState<T>{
    operations: TableOperations<T>;
    current = 1;
    index = 1;
    filter: FilterModel | undefined  = undefined;
    indexPropNames : { [key: number]: number[]; } | {} = {};
    orderItems: OrderItem[] | [] = [];
    itemsByPage = {};
    facets?: Facet[] | [] = [];
    rels = {};
    load = false;
    elementsInPage = 10;
    total = 0;
   


    /**
     * usa operaciones de tabla como inyección de dependencias
     * esta inyección debería ser usada por el contenedor de tablas
     * @param tableOperations, operaciones en base de datos  de busqueda. 
     */
    constructor(tableOperations: TableOperations<T>) {
        makeAutoObservable(this);
        this.operations = tableOperations;
    }

    
    /**
     * Busca los entitySearch desde la base de datos de busqueda
     * 
     */
    async SetValues(){
        this.load = true;
        var response = await this.operations.tableFilterSearch(this.index, this.current, this.elementsInPage, this.filter as FilterModel);
        this.SetFilterSearch(response)
    }

    
    /**
     * Asigna un resultado al store.
     * @param result, resultado de una consulta al search 
     */
    SetFilterSearch(result : CollectionResult<T>):void{
        // propiedades de resultado.
        const {total, entities, facets} = result;

        // asignando los valores por página, usa current como página actual
        // y asigna los valores encontrados.
        this.itemsByPage = {...this.itemsByPage, [this.current]: entities};

        // total de registros
        this.total = total;

        // facets 
        this.facets = facets;

        
        this.load = false;

        // si no existen facets
        if (!facets || facets.length==0) return;

        // se usan los facets para recargar los nombres.
        this.SetNames(facets as Facet[]);
    }

    /**
     * Guarda los nombres del os facets en rel
     * !importante, como esta ahora solo irá a buscar datos, si no existe el índice del facet.
     * Con el fin de no ir a buscar cada vez que se cargue la tabla.
     * el facet va a buscar todas las entidades que existen en la busqueda
     * con un máximo de 1000.
     * Se puede incorporar actualizar en vez de omitir cuando ya tenga valores.
     * @param facets, facets obtenidos de la consulta a la base de datos de busqueda. 
     */
    async SetNames(facets: Facet[]){

        // usa trifenix connect para retornar los ids de cada facet.
        const fcts = MdmDocuments.GetFacetDictionary(facets);

        // recorre los facets
        for (let [key, value] of Object.entries(fcts)) {

            // índice del facet.
            const n = Number(key);

            // índices de las propiedades (str o suggest), que dan nombre a las entidades
            const propNames = this.indexPropNames as { [key: number]: number[]; };

            // usa relsLocal con el solo fin de verificar si existe previamente el índice
            let relsLocal = this.rels as {[key:number]: {[id:string] : string} };

            // si el índice ya existe, no lo irá a buscar y continuará con la iteración.
            if (Object.keys(relsLocal).some(s=>Number(s) === n)){
                continue;
            }
            
            // usa la operación de inyección para obtener los nombres. 
            var response = await this.operations.getEntityNames(n, propNames[n], value);

            this.load = false;

            // asigna el nombre de cada entidad 
            // generando un diccionario con el id y el nombre, dentro del contenedor
            // con el índice del facet actual (el índice del entityRelated).
            this.rels = {...this.rels, [n]:{response}};

            this.load = true;

        }
       
    }


    
    /**
     * Configura los valores del state de la tabla.
     * @param collectionTable 
     */
    SetValueCollection(collectionTable:CollectionTableState<T>){

        this.current = collectionTable.current;
        this.itemsByPage = collectionTable.itemsByPage;
        this.facets = collectionTable.facets;
        this.filter = collectionTable.filter;
        this.orderItems = collectionTable.orderItems;
        this.index = collectionTable.index;
        this.indexPropNames = collectionTable.indexPropNames;
        this.load = collectionTable.load;
        this.rels = collectionTable.rels;
        this.elementsInPage = collectionTable.elementsInPage;
    }


    



}







