import Node from '../../types/node';
import TableNodes from './all';
import { keymap } from 'prosemirror-keymap';
import { goToNextCell } from 'prosemirror-tables';
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

  get plugins() {
    return [
      keymap({
        'Tab': goToNextCell(1),
        'Shift-Tab': goToNextCell(-1)
      })
    ]
  }

  commands() {
    return {
      mergeCells: () => mergeCells,
      splitCell: () => splitCell,
    }
  }
}
