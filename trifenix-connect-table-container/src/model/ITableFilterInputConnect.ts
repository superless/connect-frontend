import { FilterModel } from "@trifenix/mdm";
import {AzureInput} from "./AzureInput";
import {ITableFilterInput} from "./ITableFilterInput";



export default interface ITableFilterInputConnect extends ITableFilterInput, AzureInput {
  filter : FilterModel
}