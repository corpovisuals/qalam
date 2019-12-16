import Node from '../../types/node';
import TableNodes from './all';

export default class TableHeader extends Node {
  get name() {
    return 'table_header';
  }

  get schema() {
    return TableNodes.table_header;
  }
}
