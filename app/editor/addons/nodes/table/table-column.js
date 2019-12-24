import Extension from '../../types/extension';
import { columnResizing } from 'prosemirror-tables';
import {
  addColumnAfter,
  addColumnBefore,
  deleteColumn
} from '../../../commands';

export default class TableColumn extends Extension {
  get name() {
    return 'table_column';
  }

  get plugins() {
    return [
      columnResizing()
    ]
  }

  commands() {
    return {
      addColumnAfter: () => addColumnAfter,
      addColumnBefore: () => addColumnBefore,
      deleteColumn: () => deleteColumn
    }
  }
}
