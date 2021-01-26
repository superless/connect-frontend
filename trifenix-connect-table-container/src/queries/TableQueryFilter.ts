import { FilterModel } from "@trifenix/mdm";
import { ISearchQuery } from "@trifenix/trifenix-connect-search";
import { ITableFilterInput } from "../model/ITableFilterInput";


export const TableQueryFilter : (input: ITableFilterInput)=>ISearchQuery = input=>{
  
  return {
    skip : (input.page > 1 ? (input.page - 1) * input.elementsInPage : 0),
    facets : ['rel/facet, count:1000'],
    select : [],
    filter : `index eq ${input.entity} ${getFilter(input.filter)}`
  }
}

function getFilter(filter : FilterModel):string {
  
  if (!filter.filterEntity) return "";
  var filtered  = Object.keys(filter.filterEntity);
  if (filtered.length === 0) return "";

  var strs = filtered
    .map(s=>`(rel/any(element:element/index eq ${s} and search.in(element/id, '${filter.filterEntity![Number(s)].map(a=>a.value).join(",")}')))`);
  
  return ` and ${strs.join(" and ")}`;
}




