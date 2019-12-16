import Node from '../../types/node';
import TableNodes from './all';

export default class Table extends Node {
  get name() {
    return 'table';
  }

  get schema() {
    return TableNodes.table;
  }
}
