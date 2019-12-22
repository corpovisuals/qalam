import Node from '../../types/node';
import TableNodes from './all';
import {
  addRowAfter,
  addRowBefore,
  deleteRow
} from '../../../commands';

export default class TableRow extends Node {
  get name() {
    return 'table_row';
  }

  get schema() {
    return TableNodes.table_row;
  }

  commands() {
    return {
      addRowAfter: () => addRowAfter,
      addRowBefore: () => addRowBefore,
      deleteRow: () => deleteRow
    }
  }
}
