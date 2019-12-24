import Node from '../../types/node';
import TableNodes from './all';
import { tableEditing } from 'prosemirror-tables';
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

  get plugins() {
    return [
      tableEditing()
    ]
  }

  commands({ schema }) {
    return {
      createTable: () => createTable(schema),
      deleteTable: () => deleteTable
    }
  }
}
