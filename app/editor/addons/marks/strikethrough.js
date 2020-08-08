import Mark from '../types/mark';
import { toggleMark } from '../../commands'

export default class Strikethrough extends Mark {
  get name() {
    return 'strikethrough';
  }

  get schema() {
    return {
      parseDOM: [{ style: 'text-decoration=line-through' }],
      toDOM() {
        let style = 'text-decoration: line-through;';
        return ['span', { style }, 0];
      }
    }
  }

  commands({ type }) {
    return () => toggleMark(type);
  }
}
