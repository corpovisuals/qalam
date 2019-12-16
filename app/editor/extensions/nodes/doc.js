import Node from '../types/node';

export default class Doc extends Node {
  get name() {
    return 'doc';
  }

  get schema() {
    return {
      content: "block+"
    }
  }
}
