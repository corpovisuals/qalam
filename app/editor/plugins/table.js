import {
  goToNextCell, tableEditing, columnResizing
} from 'prosemirror-tables';
import { keymap } from 'prosemirror-keymap';

export default [
  columnResizing(),
  tableEditing(),
  keymap({
    'Tab': goToNextCell(1),
    'Shift-Tab': goToNextCell(-1)
  })
];
