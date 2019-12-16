import Node from '../../types/node';
import TableNodes from './all';

export default class TableRow extends Node {
  get name() {
    return 'table_row';
  }

  get schema() {
    return TableNodes.table_row;
  }
}
