import Node from '../../types/node';
import TableNodes from './all';
import {
  mergeCells,
  splitCell
} from '../../../commands';

export default class TableCell extends Node {
  get name() {
    return 'table_cell';
  }

  get schema() {
    return TableNodes.table_cell;
  }

  commands() {
    return {
      mergeCells: () => mergeCells,
      splitCell: () => splitCell,
    }
  }
}
