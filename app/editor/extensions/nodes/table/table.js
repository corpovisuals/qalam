import Node from '../../types/node';
import TableNodes from './all';
import {
  createTable,
  deleteTable
} from '../../../commands';

export default class Table extends Node {
  get name() {
    return 'table';
  }

  get schema() {
    return TableNodes.table;
  }

  commands({ schema }) {
    return {
      createTable: () => createTable(schema),
      deleteTable: () => deleteTable
    }
  }
}
