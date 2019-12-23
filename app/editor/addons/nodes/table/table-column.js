import Extension from '../../types/extension';
import {
  addColumnAfter,
  addColumnBefore,
  deleteColumn
} from '../../../commands';

export default class TableColumn extends Extension {
  get name() {
    return 'table_column';
  }

  commands() {
    return {
      addColumnAfter: () => addColumnAfter,
      addColumnBefore: () => addColumnBefore,
      deleteColumn: () => deleteColumn
    }
  }
}
