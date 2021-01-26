import {IBaseInput} from "./IBaseInput";
import {ITableInput} from "./ITableInput";
import {FilterModel} from "@trifenix/mdm";



export interface ITableFilterInput extends ITableInput {
  filter : FilterModel 
}


