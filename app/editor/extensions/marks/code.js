import Mark from '../types/mark';

export default class Code extends Mark {
  get name() {
    return 'code';
  }

  get schema() {
    return {
      parseDOM: [{tag: "code"}],
      toDOM() { return ["code", 0] }
    }
  }
}
