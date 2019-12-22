import {
  toggleMark
} from 'prosemirror-commands';

import {
  addColumnAfter, addColumnBefore, deleteColumn, addRowAfter, addRowBefore,
  deleteRow, mergeCells, splitCell, toggleHeaderRow, toggleHeaderColumn,
  toggleHeaderCell, deleteTable
} from 'prosemirror-tables';

import addLink from './add-link';
import insertImage from './insert-image';
import setStyle from './set-style';
import createTable from './create-table';

export {
  // prosemirror-commands
  toggleMark,
  addColumnAfter,
  addColumnBefore,
  deleteColumn,
  addRowAfter,
  addRowBefore,
  deleteRow,
  mergeCells,
  splitCell,
  toggleHeaderRow,
  toggleHeaderColumn,
  toggleHeaderCell,
  deleteTable,

  // custom
  addLink,
  insertImage,
  setStyle,
  createTable
};
