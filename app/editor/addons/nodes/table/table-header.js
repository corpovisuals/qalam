import Node from '../../types/node';
import TableNodes from './all';
import {
  toggleHeaderRow,
  toggleHeaderColumn,
  toggleHeaderCell
} from '../../../commands';

export default class TableHeader extends Node {
  get name() {
    return 'table_header';
  }

  get schema() {
    return TableNodes.table_header;
  }

  commands() {
    return {
      toggleHeaderRow: () => toggleHeaderRow,
      toggleHeaderColumn: () => toggleHeaderColumn,
      toggleHeaderCell: () => toggleHeaderCell
    }
  }
}
