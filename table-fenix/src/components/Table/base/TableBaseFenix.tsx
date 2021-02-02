import * as React from 'react';
import { EntityBaseSearch, FilterBase, FilterModel, KindProperty } from '@trifenix/mdm';
import {MdmDocuments} from "@trifenix/trifenix-connect"
import _ from 'lodash';
import { GetPropHeaders, GetEntityHeaders } from '../../../helpers/headers';
import TableHeader from './components/header/TableHeader';
import TableCell from './components/cell/TableCell';

import { Table, Segment, Pagination, PaginationItemProps, Menu, Icon, Button } from 'semantic-ui-react';
import { IEntityNameId } from './model';
import { ITableBaseProps } from '../props/ITableBaseProps';

export interface ITableBaseFenixState {
  filtersSelected?: { [key: number]: string[] };
}

/**
 * Tabla basada en EntitySearchs.
 */
export default class TableBaseFenix<T> extends React.Component<ITableBaseProps<T>, ITableBaseFenixState> {
  /**
   * Tabla basada en EntitySearchs.
   * @param props propedades del componente
   */
  constructor(props: ITableBaseProps<T>) {
    super(props);
    
    this.setPaginationValue = this.setPaginationValue.bind(this);
    this.setFilters = this.setFilters.bind(this);
    
    this.state = {
      filtersSelected: MdmDocuments.GetFilteredEntityDictionary(props.filter)
    };

    this.getEntityFilters = this.getEntityFilters.bind(this);
    this.getEntitySelected = this.getEntitySelected.bind(this);
  }

  public render() {
    // inicializa entidades.
    const {current, itemsByPage, filter, total, elementsInPage} = this.props;

    
    const filtersSelected = MdmDocuments.GetFilteredEntityDictionary(filter);

    let entities:EntityBaseSearch<T>[];

    let itemPage: {[key:number]:EntityBaseSearch<T>[]} = itemsByPage;

    entities = itemPage[current] as EntityBaseSearch<T>[]?? [] as EntityBaseSearch<T>[];

    // obtiene cabeceras de acuerdo al tipo de typeSearch, las entidades y el método que retorna el título en base al indice.
    const suggestHeaders = GetPropHeaders(entities, KindProperty.SUGGESTION, this.props.headerProperty);
    const strHeaders = GetPropHeaders(entities, KindProperty.STR, this.props.headerProperty);
    const num32Headers = GetPropHeaders(entities, KindProperty.NUM32, this.props.headerProperty);
    const num64Headers = GetPropHeaders(entities, KindProperty.NUM64, this.props.headerProperty);
    const doubleHeaders = GetPropHeaders(entities, KindProperty.DBL, this.props.headerProperty);
    const boolHeaders = GetPropHeaders(entities, KindProperty.BOOL, this.props.headerProperty);
    const dtHeaders = GetPropHeaders(entities, KindProperty.DATE, this.props.headerProperty);
    const enumHeaders = GetPropHeaders(entities, KindProperty.ENUM, this.props.headerProperty);
    //const geoHeaders = GetPropHeaders(entities, KindProperty.GEO, this.props.headerProperty);
    const RelatedHeaders = GetEntityHeaders(entities, this.props.headerRelated);

    const colspan =
      suggestHeaders.length +
      strHeaders.length +
      num32Headers.length +
      num64Headers.length +
      doubleHeaders.length +
      boolHeaders.length +
      dtHeaders.length +
      enumHeaders.length +
      RelatedHeaders.length;

    return (
      <>
        <Table compact celled selectable color="violet">
          <Table.Header>
            <Table.Row>
              {suggestHeaders.map(h => (
                <TableHeader {...h} related={KindProperty.SUGGESTION} />
              ))}
              {strHeaders.map(h => (
                <TableHeader {...h} related={KindProperty.STR} />
              ))}
              {num32Headers.map(h => (
                <TableHeader {...h} related={KindProperty.NUM32} />
              ))}
              {num64Headers.map(h => (
                <TableHeader {...h} related={KindProperty.NUM64} />
              ))}
              {doubleHeaders.map(h => (
                <TableHeader {...h} related={KindProperty.DBL} />
              ))}
              {boolHeaders.map(h => (
                <TableHeader {...h} related={KindProperty.BOOL} />
              ))}
              {enumHeaders.map(h => (
                <TableHeader {...h} related={KindProperty.ENUM} />
              ))}
              {dtHeaders.map(h => (
                <TableHeader {...h} related={KindProperty.DATE} />
              ))}
              {/* {geoHeaders.map(h => tableHeader(h.title, h.index, Related.GEO) )} */}
              {RelatedHeaders.map(h => (
                <TableHeader
                  {...h}
                  related={10}
                  visible={this.props.visible}
                  filterList={this.getEntityFilters(h.index)}
                  selected={this.getEntitySelected(h.index)}
                  select={selecteds => this.setFilters(h.index, selecteds)}
                />
              ))}
              {this.props.cellheaders &&
                this.props.cellheaders.map(ch => <Table.HeaderCell textAlign="center">{ch}</Table.HeaderCell>)}
            </Table.Row>
            <Table.Row>
              {filtersSelected && Object.keys(filtersSelected).length > 0 && (
                <Table.HeaderCell colSpan={colspan}>
                  <Button color="youtube" floated="right" onClick={this.props.clean}>
                    <Icon name="filter" /> Limpiar
                  </Button>
                </Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {entities!.map(entity => (
              <Table.Row key={entity.id}>
                {suggestHeaders.map((h, i) => (
                  <TableCell
                    related={KindProperty.SUGGESTION}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {strHeaders.map((h, i) => (
                  <TableCell
                    related={KindProperty.STR}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {num32Headers.map((h, i) => (
                  <TableCell
                    related={KindProperty.NUM32}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {num64Headers.map((h, i) => (
                  <TableCell
                    related={KindProperty.NUM64}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {doubleHeaders.map((h, i) => (
                  <TableCell
                    related={KindProperty.DBL}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {boolHeaders.map((h, i) => (
                  <TableCell
                    related={KindProperty.BOOL}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {enumHeaders.map((h, i) => (
                  <TableCell
                    related={KindProperty.ENUM}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {dtHeaders.map((h, i) => (
                  <TableCell
                    related={KindProperty.DATE}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {/* falta campos de tipo ubicacion geografica*/}

                {RelatedHeaders.map((h, i) => (
                  <TableCell
                    related={"related"}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {this.props.cells &&
                  this.props.cells.map(ch => <Table.Cell textAlign="center">{ch(entity)}</Table.Cell>)}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Segment textAlign="center" basic>
          <Pagination
            stackable
            disabled={total === 0}
            activePage={current ==0?1:current}
            onPageChange={this.setPaginationValue}
            totalPages={Math.ceil(total / elementsInPage) || 1}
          />
        </Segment>
      </>
    );
  }


  /**
   * asigna los filtros
   * @param índice del filtro a asignar
   * @param filtros seleccionados
   */
  setFilters(index: number, entities: string[]) {
    this.props.filters && this.props.filters(index, entities);
  }


  /**
   * Obtiene todos los elementos del filtro
   * @param índice de la cabecera donde se encuentra el filtro 
   * @returns filtros seleccionados.
   */
  getEntityFilters(index: number): IEntityNameId[] {
      const {filter} = this.props;
      if (filter === undefined) return [];
      if (filter.filterEntity === undefined) return [];
      if (Object.keys(filter.filterEntity).length === 0) return [];
      if (!Object.keys(filter.filterEntity).some(v=>Number(v) === index)) return [];
      const filterLocal : FilterModel = filter as FilterModel;
      const filterEntity: {[key : string]:FilterBase<string>} = filterLocal.filterEntity as unknown as {[key : string]:FilterBase<string>};
      
      return Object.keys(filterEntity).map(v=>({index : v, title : filterEntity[v]!.value}))

  }

  
  /**
   * Obtiene los elementos seleccionados del filtro.
   * @param índice de la cabecera donde se encuentra el filtro 
   * @returns filtros seleccionados.
   */
  getEntitySelected(index: number): string[] {
    return (this.state.filtersSelected && this.state.filtersSelected[index]) ?? [];
  }

  /**
   * envía a la propiedad de selección de página, la página activa.   *
   * @param event evento del botón de paginación
   * @param data propiedades de la paginación (Semantic ui).
   */
  setPaginationValue(event: React.MouseEvent<HTMLAnchorElement>, data: PaginationItemProps) {
    this.props.selectPage && this.props.selectPage(data.activePage);
    if (event == null) console.log(event);
  }
}
