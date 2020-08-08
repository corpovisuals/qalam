import Mark from '../types/mark';
import { toggleMark } from '../../commands';

export default class Code extends Mark {
  get name() {
    return 'code';
  }

  get schema() {
    return {
      parseDOM: [{ tag: 'code' }],
      toDOM() { return ['code', 0] }
    }
  }

  keys({ type }) {
    return {
      'Mod-`': toggleMark(type)
    }
  }
}
