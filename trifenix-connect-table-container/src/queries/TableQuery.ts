import { ITableInput } from "../model/ITableInput";
import {ISearchQuery} from "@trifenix/trifenix-connect-search"



export const TableQuery:(input : ITableInput)=>ISearchQuery = (input)=>({    
  skip : (input.page > 1 ? (input.page - 1) * input.elementsInPage : 0),
  facets : undefined,
  select : [],
  filter : `index eq ${input.entity}`
})

