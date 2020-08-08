import Mark from '../types/mark';
import { toggleMark } from '../../commands'

export default class Superscript extends Mark {
  get name() {
    return 'superscript';
  }

  get schema() {
    return {
      parseDOM: [{ tag: 'sup' }],
      toDOM() { return ['sup', 0] }
    }
  }

  commands({ type }) {
    return () => toggleMark(type);
  }
}
